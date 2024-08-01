import axios from "../api/axios";

import { Post, CreateOrUpdatePostResponse } from "../type/post";
import { ChatMessage } from "../type/aichat";

export const createNewBlog = async (
  post: Post
): Promise<CreateOrUpdatePostResponse | null> => {
  try {
    const response = await axios.post("/travel/posts", post);
    console.log(response);
    return response && response.data;
  } catch (error) {
    console.error("Save Blog Data Error: ", error);
    return null;
  }
};

export const updateBlog = async (
  postId: string,
  post: Post
): Promise<CreateOrUpdatePostResponse | null> => {
  try {
    const response = await axios.put(`/travel/posts/${postId}`, post);
    return response && response.data;
  } catch (error) {
    console.error("Update Blog data Error: ", error);
    return null;
  }
};

export const getLangChainResponse = async (
  messageData: ChatMessage
): Promise<ChatMessage | null> => {
  try {
    const response = await axios.post(
      "http://localhost:8082/ai/messages/room123",
      {
        content: messageData.content,
        timestamp: messageData.timestamp,
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.error("Get LangChain AI response error: ", error);
    return null;
  }
};
