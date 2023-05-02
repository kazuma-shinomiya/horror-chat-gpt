import axios from "axios";
import { BASE_PROMPT, OPENAI_API_URL } from "./const";
import getRandomAdditionalPrompt from "./function";

// https://platform.openai.com/docs/api-reference/chat

type Request = {
  model: string;
  messages: { role: string; content: string }[];
  max_tokens: number;
};

type Response = {
  choices: [
    {
      message: {
        content: string;
      };
    },
  ];
};

const getHorrorStory = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_SECRET_KEY}`,
    },
  };

  const prompt = BASE_PROMPT + getRandomAdditionalPrompt();

  const data: Request = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 800,
  };
  try {
    const response = await axios.post<Response>(OPENAI_API_URL, data, config);
    const responseData = response.data.choices[0].message.content.trim();

    return responseData;
  } catch (error) {
    return "";
  }
};

export default getHorrorStory;
