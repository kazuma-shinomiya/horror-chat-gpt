import { AdditionalPrompt, ADDITIONAL_PROMPT } from "./const";

const getRandomAdditionalPrompt = () => {
  const keys = Object.keys(ADDITIONAL_PROMPT) as (keyof AdditionalPrompt)[];
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return ADDITIONAL_PROMPT[randomKey];
};

export default getRandomAdditionalPrompt;
