import Cookies from "js-cookie";
import axios from "./axios";

export const GetBlogByPostId = async (postId: string) => {
  try {
    const token = Cookies.get("authToken");
    const response = await axios.get(`/travel/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response && response.data;
  } catch (error: any) {
    throw error;
  }
};
