import React, { useEffect, useState } from "react";
// Components
import Editor from "./Editor";
// types
import { OutputData } from "@editorjs/editorjs";
import { CreateOrUpdatePostResponse, Post } from "../../shared/type/post";

import { createNewBlog, updateBlog } from "../../shared/api/api";
import { useNavigate } from "react-router-dom";

export default function BlogEditor({
  data,
  postId,
}: {
  data?: Post;
  postId?: string;
}) {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (data && data?.postTitle) {
      setTitle(data.postTitle);
    }
  }, [data]);

  /*
  {
    "postTitle": "",
    "editorJsData": {
        "time": 1721971492700,
        "blocks": [
            {
                "id": "z5VSMjNY6A",
                "type": "header1",
                "data": {
                    "text": "Title",
                    "level": 1
                }
            },
            {
                "id": "PbUGfnhdZU",
                "type": "header2",
                "data": {
                    "text": "Second Title",
                    "level": 2
                }
            },
            {
                "id": "mN1OXYkLBl",
                "type": "header3",
                "data": {
                    "text": "Third Title",
                    "level": 3
                }
            },
            {
                "id": "sJbj-8_CNY",
                "type": "paragraph",
                "data": {
                    "text": "what do you think"
                }
            },
            {
                "id": "KfWy7_QNwL",
                "type": "image",
                "data": {
                    "caption": "anime boys",
                    "withBorder": false,
                    "withBackground": false,
                    "stretched": false,
                    "file": {
                        "url": "https://storage.googleapis.com/travel-go-f77a8.appspot.com/_%20%281%29.jpeg?Expires=1721975079&GoogleAccessId=firebase-adminsdk-5ax28%40travel-go-f77a8.iam.gserviceaccount.com&Signature=N2Fkg4hIvZUdRKoQYDup0zPNDYzy1l438Jrko%2FyuiPASfS3HpldP3hwU4d%2FIlVN%2BC8%2BR33iM1p6Uk3Y%2BjJGnuv%2Fkyoy78NdKRRLjWkJOhxnGB7UWuMJ8smJds9ALfmaLH1OzC3UboCsPZtXYbEVlCNiWsdLBtY%2FG4agEDM32N%2FI2Ubsn03bKeGRXQtJSiHDCKXicgJsef09rRjltgc7qQ7eO8XxMjbapEfCnUihflM50lOLSdQmtoZDGGbR45w%2FWyj3Cyq%2FtgEtoPDt%2Fmhpqz3rrk4Q%2Fq%2FLzMlwQSQsIbnjTfmq5Vtlshsxn%2BcfI7usyoMGnYHik3vVc04dpWu8Ojw%3D%3D"
                    }
                }
            }
        ],
        "version": "2.30.2"
    }
}
  */
  const handleOnSave = async (data: OutputData) => {
    let response: CreateOrUpdatePostResponse | null;
    if (postId) {
      response = await updateBlog(postId, {
        postTitle: title,
        editorJsData: data,
      });
    } else {
      response = await createNewBlog({
        postTitle: title,
        editorJsData: data,
      });
    }

    if (response && response?.postId) {
      navigate(`/blog/${response.postId}`);
    }
  };

  return (
    <div className="blog-editor m-2 p-3 flex flex-col items-center">
      <input
        className="border-solid border-4 border-black rounded-lg placeholder-black text-center text-4xl font-bold mb-4 outline-none p-2"
        placeholder="Enter Blog Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="editor-container w-10/12 rounded-lg p-4">
        <Editor onSave={handleOnSave} data={data?.editorJsData} />
      </div>
    </div>
  );
}
