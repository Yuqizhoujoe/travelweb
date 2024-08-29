import { ChatMessage } from "./aichat";

export interface Room {
  roomId: string;
  roomTitle: string;
  messages: ChatMessage[];
}
