import { useState, useRef, useCallback } from "react";
import {
  Bold,
  Italic,
  Eye,
  EyeOff,
  Image,
  Code,
  List,
  ListOrdered,
  Link,
  Quote,
  X,
  Upload,
} from "lucide-react";
import styles from "../styles/createcampaign.module.css";

interface ImageData {
  id: number;
  url: string;
  filename: string;
  alt: string;
}
interface ToolbarButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  title: string;
  active?: boolean;
}

const CreateCampaign = () => {
  // Mock image database
  const [imageDatabase, setImageDatabase] = useState([
    {
      id: 1,
      url: "https://images.freeimages.com/image/large-previews/607/imperial-dunes-landscape-5697034.jpeg?fmt=webp&w=500",
      filename: "landscape.jpg",
      alt: "Beautiful landscape",
    },
  ]);

  const [content, setContent] = useState(`# Welcome to Markdown Editor

## Getting Started
This editor works just like GitHub README files!

### Headers Are Now Properly Styled
Use # for headers:
- # Main Header (H1)
- ## Section Header (H2)
- ### Subsection (H3)

### Text Formatting
- **Bold text** works perfectly
- *Italic text* is styled
- ~~Strikethrough text~~ has line through
- \`inline code\` has background

### Links and Images
[Link text](https://example.com)

Using image from gallery:
![Beautiful landscape](img:1)

### Lists
1. Numbered list item
2. Another numbered item

- Bullet point
- Another bullet point

> This is a blockquote with proper styling

---

Start editing to see the magic happen!`);

  const [preview, setPreview] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertText = useCallback(
    (before: string, after: string = "", placeholder = "text") => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = (textarea as HTMLTextAreaElement).selectionStart;
      const end = (textarea as HTMLTextAreaElement).selectionEnd;
      const selectedText = content.substring(start, end);
      const textToInsert = selectedText || placeholder;

      const newText =
        content.substring(0, start) +
        before +
        textToInsert +
        after +
        content.substring(end);
      setContent(newText);

      setTimeout(() => {
        (textarea as HTMLTextAreaElement).focus({ preventScroll: true });
        const newCursorPos =
          start + before.length + textToInsert.length + after.length;
        (textarea as HTMLTextAreaElement).setSelectionRange(
          newCursorPos,
          newCursorPos,
        );
      }, 0);
    },
    [content],
  );

  const insertAtCursor = useCallback(
    (text: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = (textarea as HTMLTextAreaElement).selectionStart;
      const newText =
        content.substring(0, start) + text + content.substring(start);
      setContent(newText);

      setTimeout(() => {
        (textarea as HTMLTextAreaElement).focus({ preventScroll: true });
        const newCursorPos = start + text.length;
        (textarea as HTMLTextAreaElement).setSelectionRange(
          newCursorPos,
          newCursorPos,
        );
      }, 0);
    },
    [content],
  );

  const handleImageUpload = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const newId =
              Math.max(...imageDatabase.map((img) => img.id), 0) + 1;
            const newImage = {
              id: newId,
              url: e.target.result as string,
              filename: file.name,
              alt: file.name.split(".")[0],
            };
            setImageDatabase((prev) => [...prev, newImage]);
            const imageMarkdown = `![${newImage.alt}](img:${newId})\n\n`;
            insertAtCursor(imageMarkdown);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [insertAtCursor, imageDatabase],
  );

  const insertImageFromGallery = useCallback(
    (image: ImageData) => {
      const imageMarkdown = `![${image.alt}](img:${image.id})`;
      insertAtCursor(imageMarkdown);
      setShowGallery(false);
    },
    [insertAtCursor],
  );

  const deleteImage = useCallback(
    (imageId: number) => {
      setImageDatabase((prev) => prev.filter((img) => img.id !== imageId));
      const newContent = content.replace(
        new RegExp(`!\\[[^\\]]*\\]\\(img:${imageId}\\)`, "g"),
        "",
      );
      setContent(newContent);
    },
    [content],
  );

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        handleImageUpload(file);
      }
      event.target.value = "";
    },
    [handleImageUpload],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);

      const files = Array.from(event.dataTransfer.files);
      files.forEach((file) => {
        if (file.type.startsWith("image/")) {
          handleImageUpload(file);
        }
      });
    },
    [handleImageUpload],
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(true);
    },
    [],
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);
    },
    [],
  );

  const markdownToHtml = useCallback(
    (markdown: string) => {
      let html = markdown;

      // Replace image IDs with actual URLs
      html = html.replace(/!\[([^\]]*)\]\(img:(\d+)\)/g, (alt, id) => {
        const image = imageDatabase.find((img) => img.id === parseInt(id));
        if (image) {
          return `![${alt}](${image.url})`;
        }
        return `![${alt}](broken-image)`;
      });

      const lines = html.split("\n");
      const processedLines = lines.map((line) => {
        if (line.match(/^### /)) {
          return line.replace(
            /^### (.*)/,
            '<h3 style="font-size: 20px; font-weight: 600; margin: 16px 0 8px 0; color: #1f2937;">$1</h3>',
          );
        } else if (line.match(/^## /)) {
          return line.replace(
            /^## (.*)/,
            '<h2 style="font-size: 24px; font-weight: 700; margin: 24px 0 12px 0; color: #111827;">$1</h2>',
          );
        } else if (line.match(/^# /)) {
          return line.replace(
            /^# (.*)/,
            '<h1 style="font-size: 32px; font-weight: 800; margin: 32px 0 16px 0; color: #000000;">$1</h1>',
          );
        } else if (line.match(/^> /)) {
          return line.replace(
            /^> (.*)/,
            '<blockquote style="border-left: 4px solid #3b82f6; padding-left: 16px; margin: 16px 0; color: #6b7280; font-style: italic; background: #f8fafc; padding: 12px 16px; border-radius: 4px;">$1</blockquote>',
          );
        } else if (line.match(/^---$/)) {
          return '<hr style="border: none; border-top: 2px solid #e5e7eb; margin: 24px 0;">';
        } else if (line.match(/^- /)) {
          return line.replace(
            /^- (.*)/,
            '<li style="margin: 4px 0; padding-left: 8px; list-style-type: disc; margin-left: 20px;">$1</li>',
          );
        } else if (line.match(/^\d+\. /)) {
          return line.replace(
            /^\d+\. (.*)/,
            '<li style="margin: 4px 0; padding-left: 8px; list-style-type: decimal; margin-left: 20px;">$1</li>',
          );
        }
        return line;
      });

      html = processedLines.join("\n");

      html = html
        .replace(
          /!\[([^\]]*)\]\(([^)]+)\)/g,
          '<img src="$2" alt="$1" style="max-width: 100%; height: auto; margin: 16px 0; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" onError="this.style.display=\'none\'; this.nextSibling.style.display=\'block\';" /><div style="display:none; padding: 20px; background: #fee2e2; border: 1px solid #fecaca; border-radius: 8px; color: #dc2626; text-align: center;">Image failed to load: $1</div>',
        )
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" target="_blank" style="color: #3b82f6; text-decoration: underline; font-weight: 500;">$1</a>',
        )
        .replace(
          /\*\*(.*?)\*\*/g,
          '<strong style="font-weight: 700;">$1</strong>',
        )
        .replace(/__(.*?)__/g, '<strong style="font-weight: 700;">$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em style="font-style: italic;">$1</em>')
        .replace(/_([^_]+)_/g, '<em style="font-style: italic;">$1</em>')
        .replace(
          /~~(.*?)~~/g,
          '<del style="text-decoration: line-through; color: #6b7280;">$1</del>',
        )
        .replace(
          /`([^`]+)`/g,
          '<code style="background: #f1f5f9; color: #1e293b; padding: 2px 6px; border-radius: 4px; font-family: Monaco, Menlo, monospace; font-size: 14px;">$1</code>',
        )
        .replace(/\n/g, "<br>");

      return html;
    },
    [imageDatabase],
  );

  const ToolbarButton = ({
    onClick,
    children,
    title,
    active = false,
  }: ToolbarButtonProps) => {
    return (
      <button
        className={`${styles.button} ${active ? styles.buttonActive : ""}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick(e);
        }}
        title={title}
      >
        {children}
      </button>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Markdown Editor</h1>
        <div className={styles.headerControls}>
          <span className={styles.stats}>
            {content.length} characters | {imageDatabase.length} images
          </span>
          <ToolbarButton
            onClick={() => setShowGallery(!showGallery)}
            title="Image Gallery"
            active={showGallery}
          >
            <Image size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => setPreview(!preview)}
            title={preview ? "Edit Mode" : "Preview Mode"}
            active={preview}
          >
            {preview ? <EyeOff size={16} /> : <Eye size={16} />}
          </ToolbarButton>
        </div>
      </div>

      {/* Image Gallery */}
      {showGallery && (
        <div className={styles.gallery}>
          <div className={styles.galleryHeader}>
            <h3 className={styles.galleryTitle}>Image Gallery</h3>
            <div className={styles.galleryControls}>
              <button
                onClick={() => fileInputRef.current?.click()}
                className={styles.uploadButton}
              >
                <Upload size={14} />
                Upload
              </button>
              <button
                onClick={() => setShowGallery(false)}
                className={styles.button}
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div className={styles.galleryGrid}>
            {imageDatabase.map((image) => (
              <div key={image.id} className={styles.galleryItem}>
                <img
                  src={image.url}
                  alt={image.alt}
                  className={styles.galleryImage}
                  onClick={() => insertImageFromGallery(image)}
                />
                <button
                  onClick={() => deleteImage(image.id)}
                  className={styles.deleteButton}
                  title="Delete image"
                >
                  <X size={12} />
                </button>
                <div className={styles.imageFilename} title={image.filename}>
                  {image.filename} (ID: {image.id})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarContent}>
          <div className={styles.toolbarGroup}>
            <ToolbarButton
              onClick={() => insertText("**", "**", "bold text")}
              title="Bold (**text**)"
            >
              <Bold size={16} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => insertText("*", "*", "italic text")}
              title="Italic (*text*)"
            >
              <Italic size={16} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => insertText("`", "`", "code")}
              title="Inline Code (`code`)"
            >
              <Code size={16} />
            </ToolbarButton>
          </div>

          <div className={styles.separator}></div>

          <div className={styles.toolbarGroup}>
            <button
              className={styles.button}
              onClick={() => insertAtCursor("# ")}
              title="Header 1"
            >
              H1
            </button>
            <button
              className={styles.button}
              onClick={() => insertAtCursor("## ")}
              title="Header 2"
            >
              H2
            </button>
            <button
              className={styles.button}
              onClick={() => insertAtCursor("### ")}
              title="Header 3"
            >
              H3
            </button>
          </div>

          <div className={styles.separator}></div>

          <div className={styles.toolbarGroup}>
            <ToolbarButton
              onClick={() => insertAtCursor("- ")}
              title="Bullet List (- item)"
            >
              <List size={16} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => insertAtCursor("1. ")}
              title="Numbered List (1. item)"
            >
              <ListOrdered size={16} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => insertAtCursor("> ")}
              title="Quote (> text)"
            >
              <Quote size={16} />
            </ToolbarButton>
          </div>

          <div className={styles.separator}></div>

          <div className={styles.toolbarGroup}>
            <ToolbarButton
              onClick={() => insertText("[", "](url)", "link text")}
              title="Link [text](url)"
            >
              <Link size={16} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => setShowGallery(!showGallery)}
              title="Image Gallery"
            >
              <Image size={16} />
            </ToolbarButton>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className={styles.hiddenInput}
        multiple
      />

      {/* Editor/Preview */}
      <div className={preview ? styles.previewOnly : styles.editorSection}>
        {/* Editor */}
        <div
          className={
            preview ? styles.editorSectionHidden : styles.editorSection
          }
        >
          <h3 className={styles.sectionTitle}>Editor</h3>
          <div
            className={`${styles.textareaContainer} ${dragOver ? styles.textareaContainerDrag : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={styles.textarea}
              placeholder="# Start writing your markdown here..."
            />
            {dragOver && (
              <div className={styles.dragOverlay}>
                <div className={styles.dragContent}>
                  <Image size={48} />
                  <p>Drop images here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        {preview && (
          <div className={styles.editorSection}>
            <h3 className={styles.sectionTitle}>Preview</h3>
            <div
              className={styles.preview}
              dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
            />
          </div>
        )}
      </div>

      {/* Quick Guide */}
      <div className={styles.guide}>
        <h4 className={styles.guideTitle}>Markdown Quick Guide:</h4>
        <div className={styles.guideGrid}>
          <div className={styles.guideSection}>
            <h5 className={styles.guideSectionTitle}>Headers:</h5>
            <code className={styles.codeBlock}>
              {`# Header 1
## Header 2
### Header 3`}
            </code>
          </div>
          <div className={styles.guideSection}>
            <h5 className={styles.guideSectionTitle}>Images:</h5>
            <code className={styles.codeBlock}>
              {`![Alt text](img:1) - Gallery image
![Alt text](url) - External image
Click gallery images to insert`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
