// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { Middleware } from '@line/bot-sdk/dist/middleware';
import { client, middleware } from 'src/lib/line';
import { WebhookRequestBody } from '@line/bot-sdk';

export const config = {
  api: {
    bodyParser: false, // Necessary for line.middleware
  },
};

async function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Middleware) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => 
      result instanceof Error
        ? reject(result)
        : resolve(result)
    )
  });
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      // Validate request
      console.log()
      await runMiddleware(req, res, middleware);

      // Handle events
      const body: WebhookRequestBody = req.body;
      await Promise.all(body.events.map(event => (async () => {
        if (event.mode === 'active') {
          switch(event.type) {
            case 'message': {
              const name = event.source.userId
                ? (await client.getProfile(event.source.userId)).displayName 
                : 'User';
              await client.replyMessage(event.replyToken, {
                type: 'text',
                text: `Hi, ${name}!`
              });
              break;
            }
            case 'follow': {
              // Do something.
              break;
            }
          }
        }
      })()));
      res.status(200).end();
    } else {
      res.status(405).end();
    }
  } catch(e) {
    if (e instanceof Error) {
      res.status(500).json({ name: e.name, message: e.message });
    } else {
      res.status(500).json({message: "この500エラー"});
    }
  }
};
