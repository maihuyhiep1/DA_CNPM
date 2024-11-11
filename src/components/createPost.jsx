import React from "react";
import styles from "./style_createPost.module.css";
import { useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CreatePost = () => {
  const [titleWordCount, setTitleWordCount] = useState(0);
  const [contentWordCount, setContentWordCount] = useState(0);
  const [image, setImage] = useState(null);

  const [editorData, setEditorData] = useState("");

  const handleWordCount = (e) => {
    const text = e.target.value;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word);

    if (e.target.name === "title") {
      setTitleWordCount(words.length);
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

        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          config={{
            ckfinder: {
              uploadUrl: "/upload/image", // Your backend endpoint for image uploads
            },
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "|",
              "insertTable",
              "blockQuote",
              "mediaEmbed",
              "|",
              "undo",
              "redo",
              "imageUpload",
            ],
            image: {
              toolbar: [
                "imageStyle:full",
                "imageStyle:side",
                "|",
                "imageTextAlternative",
              ],
            },
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setEditorData(data);
          }}
        />
        <div>
          <h3>Editor Data:</h3>
          <div dangerouslySetInnerHTML={{ __html: editorData }} />
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
        <button type="submit" className={styles.submitButton}>
          <span>Đăng</span>
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
