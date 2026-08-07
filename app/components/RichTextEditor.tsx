"use client";

import React, { useEffect, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

const lowlight = createLowlight(common);

interface TiptapEditorProps {
  content?: string;
  value?: string;
  onChange: (content: string) => void;
  className?: string;
}

// Add image compression helper function
const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions while maintaining aspect ratio
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round(height * (MAX_WIDTH / width));
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round(width * (MAX_HEIGHT / height));
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas to Blob conversion failed"));
              return;
            }
            
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            
            resolve(compressedFile);
          },
          "image/jpeg",
          0.7
        );
      };
      
      img.onerror = () => {
        reject(new Error("Error loading image for compression"));
      };
    };
    
    reader.onerror = () => {
      reject(new Error("Error reading file for compression"));
    };
  });
};

// MenuBar component
const MenuBar = ({ editor }: { editor: any }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  // Color options
  const colors = [
    { name: "Default", value: "#000000" },
    { name: "Gray", value: "#4B5563" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Yellow", value: "#EAB308" },
    { name: "Green", value: "#22C55E" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Pink", value: "#EC4899" },
  ];

  // Handle image upload to Firebase
  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      
      // Check file size (limit to 10MB)
      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        alert("Image is too large. Maximum size is 10MB.");
        return;
      }

      // Compress the image if it's an image file
      let fileToUpload = file;
      if (file.type.startsWith("image/")) {
        fileToUpload = await compressImage(file);
      }

      const fileExtension = fileToUpload.name.split('.').pop() || 'jpeg';
      const fileName = `editor/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
      const storageRef = ref(storage, fileName);

      await uploadBytes(storageRef, fileToUpload);
      const downloadURL = await getDownloadURL(storageRef);
      
      editor.chain().focus().setImage({ src: downloadURL, alt: file.name }).run();
      
    } catch (error: any) {
      console.error("Error uploading image to Firebase:", error);
      alert(`Failed to upload image: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="sticky top-0 z-10 border-b border-gray-300 p-2 flex flex-wrap gap-1 bg-gray-50 text-slate-800">
      {/* Text Formatting */}
      <div className="flex gap-1 mr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 px-2 rounded hover:bg-gray-250 cursor-pointer ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 px-2 rounded hover:bg-gray-250 cursor-pointer ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1 px-2 rounded hover:bg-gray-250 cursor-pointer ${editor.isActive("underline") ? "bg-gray-200" : ""}`}
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1 px-2 rounded hover:bg-gray-250 cursor-pointer ${editor.isActive("strike") ? "bg-gray-200" : ""}`}
          title="Strike"
        >
          <s>S</s>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={`p-1 px-2 rounded hover:bg-gray-250 cursor-pointer ${editor.isActive("subscript") ? "bg-gray-200" : ""}`}
          title="Subscript"
        >
          <span>X<sub>2</sub></span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={`p-1 px-2 rounded hover:bg-gray-250 cursor-pointer ${editor.isActive("superscript") ? "bg-gray-200" : ""}`}
          title="Superscript"
        >
          <span>X<sup>2</sup></span>
        </button>
      </div>

      <span className="border-r border-gray-300 mx-1"></span>
      
      {/* Headings */}
      <div className="flex gap-1 mr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive("paragraph") ? "bg-gray-200" : ""}`}
          title="Paragraph"
        >
          P
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""}`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""}`}
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive("heading", { level: 4 }) ? "bg-gray-200" : ""}`}
          title="Heading 4"
        >
          H4
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive("heading", { level: 5 }) ? "bg-gray-200" : ""}`}
          title="Heading 5"
        >
          H5
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive("heading", { level: 6 }) ? "bg-gray-200" : ""}`}
          title="Heading 6"
        >
          H6
        </button>
      </div>

      <span className="border-r border-gray-300 mx-1"></span>
      
      {/* Lists */}
      <div className="flex gap-1 mr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive("bulletList") ? "bg-gray-200" : ""}`}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive("orderedList") ? "bg-gray-200" : ""}`}
          title="Ordered List"
        >
          1. List
        </button>
      </div>

      <span className="border-r border-gray-300 mx-1"></span>
      
      {/* Alignment */}
      <div className="flex gap-1 mr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""}`}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""}`}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""}`}
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive({ textAlign: "justify" }) ? "bg-gray-200" : ""}`}
          title="Justify"
        >
          <AlignJustify size={16} />
        </button>
      </div>

      <span className="border-r border-gray-300 mx-1"></span>
      
      {/* Special Elements */}
      <div className="flex gap-1 mr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive("blockquote") ? "bg-gray-200" : ""}`}
          title="Blockquote"
        >
          &quot;Quote&quot;
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive("codeBlock") ? "bg-gray-200" : ""}`}
          title="Code Block"
        >
          {"</>"}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
          title="Horizontal Rule"
        >
          –
        </button>
      </div>

      <span className="border-r border-gray-300 mx-1"></span>
      
      {/* Color */}
      <div className="flex gap-1 mr-2">
        <select
          className="p-1 rounded border border-gray-300 bg-white text-xs font-semibold"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          title="Text Color"
        >
          <option value="">Text Color</option>
          {colors.map((color) => (
            <option key={color.value} value={color.value}>
              {color.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive("highlight") ? "bg-gray-200" : ""}`}
          title="Highlight"
        >
          <span className="bg-yellow-200 px-1 font-bold">H</span>
        </button>
      </div>

      <span className="border-r border-gray-300 mx-1"></span>
      
      {/* Links and Media */}
      <div className="flex gap-1 mr-2">
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Enter the URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`p-1 px-2 rounded hover:bg-gray-255 cursor-pointer ${editor.isActive("link") ? "bg-gray-200" : ""}`}
          title="Link"
        >
          🔗
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          className="p-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
          title="Remove Link"
        >
          🔗❌
        </button>
        <button
          type="button"
          onClick={() => {
            if (uploading) return;
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
          className="p-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
          title="Image"
        >
          {uploading ? "..." : "🖼️"}
        </button>
      </div>

      <span className="border-r border-gray-300 mx-1"></span>
      
      {/* Table */}
      <div className="flex gap-1 mr-2">
        <button
          type="button"
          onClick={() => {
            const rows = parseInt(window.prompt("Number of rows", "3") || "3");
            const cols = parseInt(window.prompt("Number of columns", "3") || "3");
            editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
          }}
          className="p-1 px-2 rounded hover:bg-gray-200 cursor-pointer text-xs font-semibold"
          title="Insert Table"
        >
          Table
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          disabled={!editor.can().addColumnBefore()}
          className="p-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
          title="Add Column Before"
        >
          ◀️|
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          disabled={!editor.can().addColumnAfter()}
          className="p-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
          title="Add Column After"
        >
          |▶️
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().addRowBefore().run()}
          disabled={!editor.can().addRowBefore()}
          className="p-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
          title="Add Row Before"
        >
          ▲_
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().addRowAfter().run()}
          disabled={!editor.can().addRowAfter()}
          className="p-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
          title="Add Row After"
        >
          _▼
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.can().deleteTable()}
          className="p-1 px-2 rounded hover:bg-gray-200 cursor-pointer text-xs font-semibold"
          title="Delete Table"
        >
          🗑️ Table
        </button>
      </div>

      <span className="border-r border-gray-300 mx-1"></span>
      
      {/* Undo/Redo and Clear */}
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
          title="Undo"
          disabled={!editor.can().chain().focus().undo().run()}
        >
          ↩
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
          title="Redo"
          disabled={!editor.can().chain().focus().redo().run()}
        >
          ↪
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().unsetAllMarks().run();
            editor.chain().focus().clearNodes().run();
          }}
          className="p-1 px-2 rounded hover:bg-gray-200 cursor-pointer text-xs font-semibold"
          title="Clear Formatting"
        >
          Clear
        </button>
      </div>

      {/* Add file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleImageUpload(file);
          }
        }}
      />
    </div>
  );
};

const RichTextEditor: React.FC<TiptapEditorProps> = ({ content, value, onChange, className = "" }) => {
  const [isMounted, setIsMounted] = useState(false);
  const activeContent = content !== undefined ? content : (value || "");
  
  // Define the editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-xl border border-gray-200 my-4",
          loading: "lazy",
          onerror: "this.onerror=null; this.src='/images/placeholder.png'; this.classList.add('error-image');",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Subscript,
      Superscript,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: activeContent || "<p>Start writing your blog...</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg max-w-none p-6 min-h-[350px] focus:outline-none text-black",
      },
    },
    autofocus: "end",
  });

  // Handle client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set content when the prop changes and the editor is ready
  useEffect(() => {
    const active = content !== undefined ? content : (value || "");
    if (editor && active && active !== editor.getHTML()) {
      editor.commands.setContent(active);
    }
  }, [content, value, editor]);

  // Custom styles for headings and editor elements
  const editorStyles = `
    .ProseMirror {
      min-height: 350px;
      outline: none;
      color: #000000;
    }
    .ProseMirror h1 { font-size: 2em; font-weight: bold; margin-top: 0.67em; margin-bottom: 0.67em; }
    .ProseMirror h2 { font-size: 1.5em; font-weight: bold; margin-top: 0.83em; margin-bottom: 0.83em; }
    .ProseMirror h3 { font-size: 1.17em; font-weight: bold; margin-top: 1em; margin-bottom: 1em; }
    .ProseMirror h4 { font-size: 1em; font-weight: bold; margin-top: 1.33em; margin-bottom: 1.33em; }
    .ProseMirror h5 { font-size: 0.83em; font-weight: bold; margin-top: 1.67em; margin-bottom: 1.67em; }
    .ProseMirror h6 { font-size: 0.67em; font-weight: bold; margin-top: 2.33em; margin-bottom: 2.33em; }
    
    .ProseMirror p { margin: 1em 0; }
    .ProseMirror blockquote { border-left: 4px solid #ccc; margin-left: 0; padding-left: 1em; color: #4B5563; font-style: italic; }
    .ProseMirror pre { background-color: #f5f5f5; padding: 0.5em; border-radius: 0.3em; font-family: monospace; }
    .ProseMirror table { border-collapse: collapse; margin: 1em 0; overflow: hidden; table-layout: fixed; width: 100%; }
    .ProseMirror table td, .ProseMirror table th { border: 2px solid #ced4da; box-sizing: border-box; min-width: 1em; padding: 6px 10px; position: relative; vertical-align: top; }
    .ProseMirror table th { background-color: #f8f9fa; font-weight: bold; text-align: left; }
    
    /* List styles - Fixed to show bullets and numbers */
    .ProseMirror ul { 
      list-style-type: disc; 
      padding-left: 1.5em; 
      margin: 1em 0;
    }
    .ProseMirror ol { 
      list-style-type: decimal; 
      padding-left: 1.5em; 
      margin: 1em 0;
    }
    .ProseMirror li { 
      margin: 0.5em 0; 
      display: list-item;
    }
    .ProseMirror ul ul { 
      list-style-type: circle; 
      margin: 0.5em 0;
    }
    .ProseMirror ul ul ul { 
      list-style-type: square; 
      margin: 0.5em 0;
    }
    .ProseMirror ol ol { 
      list-style-type: lower-alpha; 
      margin: 0.5em 0;
    }
    .ProseMirror ol ol ol { 
      list-style-type: lower-roman; 
      margin: 0.5em 0;
    }
    
    .ProseMirror hr { border: none; border-top: 2px solid #ced4da; margin: 1em 0; }
    .ProseMirror img { max-width: 100%; height: auto; }
    
    .ProseMirror img.error-image {
      border: 2px solid #EF4444;
      min-height: 100px;
      min-width: 100px;
      position: relative;
    }
    
    .ProseMirror img.error-image::after {
      content: 'Failed to load image';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #EF4444;
      font-size: 0.875rem;
      text-align: center;
    }
  `;

  // Return the editor content with the MenuBar
  return (
    <div className={`${className} relative border border-gray-300 rounded-2xl overflow-hidden bg-white`}>
      <style>{editorStyles}</style>
      {isMounted && editor && (
        <div className="flex flex-col h-full">
          <MenuBar editor={editor} />
          <div className="overflow-y-auto flex-1 bg-white">
            <EditorContent 
              editor={editor} 
              onDrop={(event) => {
                if (event.dataTransfer?.files.length) {
                  const file = event.dataTransfer.files[0];
                  if (file.type.startsWith("image/")) {
                    event.preventDefault();
                    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
                    if (input) {
                      const dataTransfer = new DataTransfer();
                      dataTransfer.items.add(file);
                      input.files = dataTransfer.files;
                      input.dispatchEvent(new Event("change", { bubbles: true }));
                    }
                    return true;
                  }
                }
                return false;
              }}
              onPaste={(event) => {
                if (event.clipboardData?.files.length) {
                  const file = event.clipboardData.files[0];
                  if (file.type.startsWith("image/")) {
                    event.preventDefault();
                    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
                    if (input) {
                      const dataTransfer = new DataTransfer();
                      dataTransfer.items.add(file);
                      input.files = dataTransfer.files;
                      input.dispatchEvent(new Event("change", { bubbles: true }));
                    }
                    return true;
                  }
                }
                return false;
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
