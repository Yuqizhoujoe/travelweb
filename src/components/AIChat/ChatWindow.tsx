import React, { useState } from "react";
import { ChatMessage, ChatMessageProps } from "../../shared/type/aichat";

import ChatMessageComponent from "./ChatMessage";
import ChatInput from "./ChatInput";

import { getLangChainResponse } from "../../shared/api/api";

// TODO: create generate blog button
const ChatWindow = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = async (message: string) => {
    const userMessageData: ChatMessage = {
      content: message,
      timestamp: new Date().toISOString(),
      role: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessageData]);

    const botResponse = await getLangChainResponse(userMessageData);
    if (botResponse) {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }
  };

  return (
    <div className="chat-window flex flex-col">
      <div className="chat-messages flex gap-5 flex-col flex-grow p-16 overflow-auto">
        {messages.map((msg, index) => (
          <ChatMessageComponent
            key={index}
            content={msg.content}
            role={msg.role}
            timestamp={msg.timestamp}
          />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
