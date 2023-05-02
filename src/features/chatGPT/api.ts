import axios from "axios";
import { BASE_PROMPT, OPENAI_API_URL } from "./const";
import getRandomAdditionalPrompt from "./function";

// https://platform.openai.com/docs/api-reference/chat

type Request = {
  model: string;
  prompt: string;
  max_tokens: number;
};

type Response = {
  choices: [
    {
      text: string;
    },
  ];
};

const getHorrorStory = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  };

  const prompt = BASE_PROMPT + getRandomAdditionalPrompt();

  const data: Request = {
    model: "text-davinci-002",
    prompt,
    max_tokens: 600,
  };

  try {
    const response = await axios.post<Response>(OPENAI_API_URL, data, config);

    const responseData = response.data.choices[0].text.trim();

    return responseData;
  } catch (error) {
    return "";
  }
};

export default getHorrorStory;
