import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const OPENAI_API_URL = "https://api.openai.com/v1/engines/davinci-codex/completions";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // APIキーを環境変数から取得
  const apiKey = process.env.OPENAI_API_KEY;

  // リクエストメソッドがPOSTの場合のみ処理を実行
  if (req.method === "POST") {
    // ChatGPTへのリクエストヘッダーを設定
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    // プロンプトをリクエスト本文から取得
    const { prompt } = req.body;

    // ChatGPT APIへのリクエスト本文を設定
    const data = {
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.8,
    };

    try {
      // ChatGPT APIにリクエストを送信
      const response = await axios.post(OPENAI_API_URL, data, config);

      // レスポンスデータを取得
      const responseData = response.data.choices[0].text.trim();

      // 成功時のレスポンスを返す
      res.status(200).json({ data: responseData });
    } catch (error) {
      // エラー時のレスポンスを返す
      res.status(500).json({ error: "Error connecting to ChatGPT API" });
    }
  } else {
    // POSTメソッド以外のリクエストに対するレスポンスを返す
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
