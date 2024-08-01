import { OutputData } from "@editorjs/editorjs";

export type Post = {
  postId?: string;
  postTitle: string;
  editorJsData: OutputData;
  timestamp?: string;
};

export type CreateOrUpdatePostResponse = {
  success: boolean;
  postId: string;
};
