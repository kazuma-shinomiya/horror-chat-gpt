import type { NextApiRequest, NextApiResponse } from "next";
import getHorrorStory from "src/features/chatGPT/api";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const result = await getHorrorStory();
  res.status(200).json({ name: result });
}
