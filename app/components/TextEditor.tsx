import "~/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "~/components/tiptap-node/image-node/image-node.scss";

import {forwardRef, HTMLAttributes, useEffect, useRef, useState} from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

import { StarterKit } from "@tiptap/starter-kit";
import { HeadingButton } from "./tiptap-ui/heading-button";
import { Separator } from "./ui/Separator";
import { Image } from "@tiptap/extension-image";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Underline } from "@tiptap/extension-underline";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import { MarkButton } from "./tiptap-ui/mark-button";
import { TextAlignButton } from "./tiptap-ui/text-align-button";
import { TextAlign } from "@tiptap/extension-text-align";
import { Editor } from "@tiptap/core";

const content = "<p>Hello World!</p>";
const TextEditor = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    TextEditor.displayName = "Editor";

    const editor = useEditor({

      extensions: [
        StarterKit,
        Image,
        Underline,
        Superscript,
        Subscript,
          Paragraph.configure({
              HTMLAttributes: {
                  class: 'fixspace',
              },
          }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ],
      immediatelyRender: false,
      content: content,
      autofocus: true,
    });

    return (
      <EditorContext.Provider value={{ editor }}>
        <div
          className="tiptap-button-group border rounded-lg bg-slate-50/50 p-4"
          data-orientation="horizontal"
        >
          <HeadingButton level={1}></HeadingButton>
          <HeadingButton level={2}></HeadingButton>
          <HeadingButton level={3}></HeadingButton>
          <HeadingButton level={4}></HeadingButton>

          <Separator orientation="vertical" className="h-6 w-0.5" />
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="strike" />
          <MarkButton type="underline" />
          <MarkButton type="superscript" />
          <MarkButton type="subscript" />

          <Separator orientation="vertical" className="h-6 w-0.5" />

          <TextAlignButton align="left" />
          <TextAlignButton align="center" />
          <TextAlignButton align="right" />
          <TextAlignButton align="justify" />
          <Separator orientation="vertical" className="h-6 w-0.5" />
          {/*<ImageUploadButton text="Add" />*/}
        </div>
        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    );
  }
);

export { TextEditor as Editor };
