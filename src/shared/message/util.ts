import { ChatMessage } from "../type/aichat";

export const transformMessgae = (
  message: string,
  role: "assistant" | "user"
): ChatMessage => {
  const messageFormatData: ChatMessage = {
    timestamp: new Date().toISOString(),
    role: role,
    content: message,
  };

  return messageFormatData;
};
