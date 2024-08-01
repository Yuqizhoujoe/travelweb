import React, { useState } from "react";
import { ChatInputProps } from "../../shared/type/aichat";
import Icon from "../Icon";

const ChatInput = (props: ChatInputProps) => {
  const { onSend } = props;

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input flex items-center p-5 mb-12 bg-gray-100 rounded-full shadow-md">
      <textarea
        className="flex-grow text-lg p-4 mx-4 bg-transparent border-none outline-none resize-none"
        placeholder="Message ChatGPT"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
      />
      <button
        onClick={handleSend}
        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full border-none cursor-pointer"
      >
        <Icon name="send" className="text-gray-500" />
      </button>
    </div>
  );
};

export default ChatInput;
