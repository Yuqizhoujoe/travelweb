import React from "react";
import ReactMarkdown from "react-markdown";
import { ChatMessage } from "../../shared/type/aichat";

// styles
import "../../styles/chat.css";

const ChatMessageComponent = (props: ChatMessage) => {
  const { content, role } = props;
  return (
    <div
      className={`chat-message-container ${role === "user" ? "flex justify-end" : "w-full"}`}
    >
      <div
        className={`chat-message text-lg p-3 rounded-lg ${role === "user" ? "bg-blue-500 text-white max-w-xs" : "bg-gray-200 w-full"}`}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessageComponent;
