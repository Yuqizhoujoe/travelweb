export interface ChatMessageProps {
  message: string;
  sender: "user" | "bot";
}

export interface ChatInputProps {
  onSend: (message: string) => void;
}

export interface ChatMessage {
  messageId?: string;
  timestamp: string;
  content: string;
  role: "user" | "assistant";
}
