import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "@line/bot-sdk/dist/middleware";
import { client, middleware } from "src/lib/line";
import { WebhookRequestBody } from "@line/bot-sdk";
import HORROR_STORY_MESSAGE from "src/const/userMessage";
import getHorrorStory from "src/features/chatGPT/api";
import RESPONSE_MESSAGE from "src/const/responseMessage";

export const config = {
  api: {
    bodyParser: false, // Necessary for line.middleware
  },
};

async function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Middleware) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      // Validate request
      await runMiddleware(req, res, middleware);

      // Handle events
      const body: WebhookRequestBody = req.body;
      await Promise.all(
        body.events.map((event) =>
          (async () => {
            if (event.mode === "active") {
              switch (event.type) {
                case "message": {
                  const userText = event.message.type === "text" ? event.message.text : "";
                  if (userText !== HORROR_STORY_MESSAGE) {
                    await client.replyMessage(event.replyToken, {
                      type: "text",
                      text: RESPONSE_MESSAGE.UNEXPECTED,
                    });
                    return;
                  }

                  await client.replyMessage(event.replyToken, {
                    type: "text",
                    text: RESPONSE_MESSAGE.WAITING,
                  });

                  const horrorStory = await getHorrorStory();

                  if (!horrorStory) {
                    await client.replyMessage(event.replyToken, {
                      type: "text",
                      text: RESPONSE_MESSAGE.ERROR,
                    });

                    return;
                  }

                  await client.replyMessage(event.replyToken, {
                    type: "text",
                    text: horrorStory,
                  });
                  break;
                }
                default: {
                  break;
                }
              }
            }
          })(),
        ),
      );
      res.status(200).end();
    } else {
      res.status(405).end();
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ name: e.name, message: e.message });
    } else {
      res.status(500).end();
    }
  }
};

export default handler;
