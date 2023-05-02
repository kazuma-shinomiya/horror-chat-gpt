export const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export const BASE_PROMPT = "500文字ぐらいの怖い話を作って\n";

export const ADDITIONAL_PROMPT = {
  LAST: "最後にゾッとする",
  HUMAN: "人間が怖い",
  CONVERSATION: "会話形式",
};
export type AdditionalPrompt = typeof ADDITIONAL_PROMPT;
