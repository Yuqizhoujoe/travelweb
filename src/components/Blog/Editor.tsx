// src/components/Editor.tsx
import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
// import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Image from "@editorjs/image";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import Delimiter from "@editorjs/delimiter";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Checklist from "@editorjs/checklist";
import Warning from "@editorjs/warning";
import ImageTool from "@editorjs/image";
import {
  Header1,
  Header2,
  Header3,
} from "../../shared/editor/CustomHeaderConfig";

import axios from "../../shared/api/axios";

// styles
import "../../styles/editor.css";

function Editor({
  onSave,
  data,
}: {
  onSave: (data: OutputData) => Promise<void>;
  data?: OutputData;
}) {
  const editorRef = useRef<EditorJS | null>(null);

  const [gcsLink, setGcsLink] = useState<string | null>(null);

  const uploadImgae = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:8081/travel/posts/upload-image",
        formData
      );
      const data = response.data;
      setGcsLink(data.url);
      return {
        success: 1,
        file: {
          url: data.url,
        },
      };
    } catch (error: any) {
      console.error("EDITOR_UPLOAD_IMAGE_ERROR: ", error);
      return {
        success: 0,
        file: {
          url: "",
        },
      };
    }
  };

  const accessImageUrl = (url: string) => {
    return {
      success: 1,
      file: {
        url: gcsLink || url,
      },
    };
  };

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        placeholder: "Write something or press / for command", // Add placeholder for the editor
        data: data,
        tools: {
          header1: Header1,
          header2: Header2,
          header3: Header3,
          list: List,
          paragraph: Paragraph,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: uploadImgae,
                uploadByUrl: accessImageUrl,
              },
            },
          },
          quote: Quote,
          table: Table,
          embed: Embed,
          delimiter: Delimiter,
          code: Code,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "http://localhost:8081/travel/posts/upload-link",
            },
          },
          checklist: Checklist,
          warning: Warning,
        },
        autofocus: true,
      });
    }

    return () => {
      if (editorRef && editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [data]);

  const saveEditorData = async () => {
    const savedData = await editorRef.current?.save();
    if (savedData) onSave(savedData);
  };

  return (
    <div className="flex flex-col">
      <div className="w-100 flex justify-end">
        <button
          className="btn btn-primary mt-4 cursor-pointer"
          onClick={saveEditorData}
        >
          Save Data
        </button>
      </div>
      <div id="editorjs" className="editor"></div>
    </div>
  );
}

export default Editor;
