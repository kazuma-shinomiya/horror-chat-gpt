import type { NextApiRequest, NextApiResponse } from "next";
import getHorrorStory from "src/features/chatGPT/api";

type Data = {
  result: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!req.query.debug || req.query.debug !== "debug") {
    res.status(405).end();
  }

  const result = await getHorrorStory();
  res.status(200).json({ result });
}
