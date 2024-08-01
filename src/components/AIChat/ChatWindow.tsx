import React, { useEffect, useState } from "react";
import { ChatMessage, ChatMessageProps } from "../../shared/type/aichat";

import ChatMessageComponent from "./ChatMessage";
import ChatInput from "./ChatInput";

import {
  getAIMessageResponse,
  generateTravelJson,
  getRoom,
} from "../../shared/api/api";
import { useNavigate, useParams } from "react-router-dom";

// TODO: create generate blog button
const ChatWindow = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (roomId) {
      const fetchRoom = async () => {
        const roomData = await getRoom(roomId);
        if (roomData && roomData.messages) {
          setMessages(roomData.messages);
        }
      };

      fetchRoom();
    }
  }, [roomId]);

  const handleSend = async (message: string) => {
    const userMessageData: ChatMessage = {
      content: message,
      timestamp: new Date().toISOString(),
      role: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessageData]);

    const botResponse = await getAIMessageResponse(userMessageData);
    if (botResponse) {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }
  };

  const handleGenerateJson = async () => {
    try {
      const response = await generateTravelJson();
      if (response && response.postId) {
        navigate(`/blog/${response.postId}`);
      }
      // Handle the JSON data as needed
    } catch (error) {
      console.error("Error generating JSON:", error);
    }
  };

  return (
    <div className="chat-window flex flex-col relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleGenerateJson}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer"
        >
          Generate JSON
        </button>
      </div>
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
