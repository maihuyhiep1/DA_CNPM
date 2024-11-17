import React from "react";
import styles from "./style_createPost.module.css";
import { useState, useEffect, useRef } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  Autosave,
  Base64UploadAdapter,
  BlockQuote,
  BlockToolbar,
  Bold,
  Essentials,
  FindAndReplace,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

import "./CKEditor5.css";

const CreatePost = () => {
  const [titleWordCount, setTitleWordCount] = useState(0);
  const [contentWordCount, setContentWordCount] = useState(0);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "findAndReplace",
        "|",
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "link",
        "insertImage",
        "insertTable",
        "blockQuote",
        "|",
        "bulletedList",
        "numberedList",
        "outdent",
        "indent",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      AutoImage,
      Autosave,
      Base64UploadAdapter,
      BlockQuote,
      BlockToolbar,
      Bold,
      Essentials,
      FindAndReplace,
      Heading,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Paragraph,
      PasteFromOffice,
      SelectAll,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      Underline,
      Undo,
    ],
    blockToolbar: [
      "bold",
      "italic",
      "|",
      "link",
      "insertImage",
      "insertTable",
      "|",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
    ],
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    initialData: "",
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    placeholder: "Nhập đoạn giới thiệu tổng quan của bài để anh em hiểu được nội dung bài viết...",
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
  };

  const handleWordCount = (e) => {
    const text = e.target.value;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word);

    if (e.target.name === "title") {
      setTitleWordCount(words.length);
      setTitle(text);
    } else if (e.target.name === "content") {
      setContentWordCount(words.length);
    }

    e.target.style.height = "auto"; // Reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set to scroll height
  };
  //Tổng số từ trong cả title và content
  const totalWordCount = titleWordCount + contentWordCount;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);  // Nội dung CKEditor
    formData.append("image", image);  // Nếu có ảnh

    try {
      console.log("SUBMIT")
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: formData,  // Gửi dữ liệu dưới dạng FormData
      });
      console.log("SUBMIT")

      const data = await response.json();
      console.log(data);  // Xử lý phản hồi từ server
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);  // Cập nhật state content với nội dung từ CKEditor
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.background}>
      <div className={styles.guideLink}>
        <div className={styles.guideText}>Hướng dẫn viết bài</div>
        <div className={styles.guideImage}></div>
      </div>

      <form action="/submit-post" method="POST" className={styles.postForm}>
        <textarea
          className={styles.titleTextArea}
          name="title"
          placeholder="Nhập tiêu đề bài viết..."
          rows="2"
          onChange={handleWordCount}
          style={{ overflow: "hidden" }}
        ></textarea>

        <div
          className={styles.fileUpload}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("imageInput").click()}
        >
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          {image ? (
            <img
              src={image}
              alt="Uploaded preview"
              className={styles.previewImage}
            />
          ) : (
            <>
              <img
                className={styles.uploadIcon}
                src="img_createPost/addImageIcon.png"
                alt="Add"
              />
              <div className={styles.uploadText}>Thêm ảnh đại diện</div>
              <div className={styles.dragDropText}>Hoặc kéo và thả</div>
            </>
          )}
        </div>

        <textarea
          className={styles.textArea}
          name="content"
          placeholder="Nhập đoạn giới thiệu tổng quan của bài để anh em hiểu được nội dung bài viết..."
          rows="5"
          onChange={handleWordCount}
          style={{ overflow: "hidden" }}
        ></textarea>

        <div className="main-container">
          <div
            className="editor-container editor-container_classic-editor editor-container_include-block-toolbar"
            ref={editorContainerRef}
          >
            <div className="editor-container__editor">
              <div ref={editorRef}>
                {isLayoutReady && (
                  <CKEditor editor={ClassicEditor} config={editorConfig}
                    onChange={handleEditorChange} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.wordCount}>
          <span>Bài viết {totalWordCount} từ</span>
        </div>
        <div className={styles.checkboxWrapper}>
          <input
            id="example-1"
            className={styles.substituted}
            type="checkbox"
            aria-hidden="true"
          />
          <label htmlFor="example-1" className={styles.label}>
            QnA
          </label>
        </div>
        <button onClick={handleSubmit} type="submit" className={styles.submitButton}>
          <span>Đăng</span>
        </button>
      </form>

      <div>
        <h2>Preview</h2>
        <h3>Ảnh bìa</h3>
        <p>{image}</p>
        <h3>Tiêu đề: </h3>
        <p>{title}</p>
        <div>
          <h4>Nội dung:</h4>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
