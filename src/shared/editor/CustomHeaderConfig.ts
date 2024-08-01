// src/shared/editor/CustomHeaderConfig.ts
import Header from "@editorjs/header";
import { ToolConstructable } from "@editorjs/editorjs";

interface HeaderToolConfig {
  class: ToolConstructable;
  inlineToolbar: boolean;
  config: {
    placeholder: string;
    levels: number[];
    defaultLevel: number;
  };
  toolbox: {
    title: string;
    icon?: string;
  };
}

const createHeaderTool = (title: string, level: number): HeaderToolConfig => {
  return {
    class: Header as unknown as ToolConstructable, // Type assertion workaround
    inlineToolbar: true,
    config: {
      placeholder: "Enter a header",
      levels: [level],
      defaultLevel: level,
    },
    toolbox: {
      title,
    },
  };
};

export const Header1 = createHeaderTool("Heading 1", 1);
export const Header2 = createHeaderTool("Heading 2", 2);
export const Header3 = createHeaderTool("Heading 3", 3);
