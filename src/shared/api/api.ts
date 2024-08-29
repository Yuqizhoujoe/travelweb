import axios from "../api/axios";
import { auth } from "../../firebase";

import { Post, CreateOrUpdatePostResponse } from "../type/post";
import { ChatMessage } from "../type/aichat";

export const createNewBlog = async (
  post: Post
): Promise<CreateOrUpdatePostResponse | null> => {
  try {
    const token = await auth.currentUser?.getIdToken();

    const response = await axios.post("/travel/posts", post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = auth.currentUser?.getIdToken();
    const response = await axios.put(`/travel/posts/${postId}`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response && response.data;
  } catch (error) {
    console.error("Update Blog data Error: ", error);
    return null;
  }
};

export const getAIMessageResponse = async (
  messageData: ChatMessage
): Promise<ChatMessage | null> => {
  try {
    const token = auth.currentUser?.getIdToken();
    const response = await axios.post(
      "http://localhost:8082/ai/messages/room123",
      {
        content: messageData.content,
        timestamp: messageData.timestamp,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.error("Get AI response error: ", error);
    return null;
  }
};

export const generateTravelJson =
  async (): Promise<CreateOrUpdatePostResponse | null> => {
    try {
      const token = auth.currentUser?.getIdToken();
      const response = await axios.post(
        "http://localhost:8082/ai/messages/room123/generate",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error: any) {
      console.error("Generate travel json error: ", error);
      return null;
    }
  };

export const createRoom = async (roomTitle: string) => {
  try {
    const response = await axios.post("http://localhost:8082/rooms/", {
      roomTitle: roomTitle,
    });
    const data = response.data;
    return data && data.roomId;
  } catch (error: any) {
    console.error("Create room API error: ", error);
  }
};

export const getRoom = async (roomId: string) => {
  try {
    const token = auth.currentUser?.getIdToken();
    const response = await axios.get(`http://localhost:8082/rooms/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data;
  } catch (error: any) {
    console.error("Get room API error: ", error);
  }
};

export const getRooms = async () => {
  try {
    const token = auth.currentUser?.getIdToken();
    const response = await axios.get("http://localhost:8082/rooms/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data;
  } catch (error: any) {
    console.error("Get Rooms API error: ", error);
    throw error;
  }
};
