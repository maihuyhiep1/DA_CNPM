import styles from "./style_createPost.module.css";
import { useState, useEffect, useRef, useMemo } from "react";

import Editor from "../../components/CKEditor/CKEditor5";

const CreatePost = () => {
  const [titleWordCount, setTitleWordCount] = useState(0);
  const [contentWordCount, setContentWordCount] = useState(0);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [text, setText] = useState(""); //Input của CKEditor

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
    formData.append("content", content); // Nội dung CKEditor
    formData.append("image", image); // Nếu có ảnh

    try {
      console.log("SUBMIT");
      const response = await fetch("http://localhost:8386/api/posts", {
        method: "POST",
        body: formData, // Gửi dữ liệu dưới dạng FormData
      });
      console.log("SUBMIT");

      const data = await response.json();
      console.log(data); // Xử lý phản hồi từ server
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data); // Cập nhật state content với nội dung từ CKEditor
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

  // const CKEditorContent = useMemo(() => {
  //   function convertBase64ImagesToBlobs(htmlString) {
  //     const parser = new DOMParser();
  //     const doc = parser.parseFromString(htmlString, "text/html");
  //     const images = doc.querySelectorAll("img");
  //     images.forEach((img) => {
  //       const src = img.src;
  //       if (src.startsWith("data:image")) {
  //         const [header, base64Data] = src.split(",");
  //         const mimeType = header.match(/data:(image\/\w+);base64/)[1];

  //         const byteCharacters = atob(base64Data);
  //         const byteNumbers = new Array(byteCharacters.length);
  //         for (let i = 0; i < byteCharacters.length; i++) {
  //           byteNumbers[i] = byteCharacters.charCodeAt(i);
  //         }

  //         const byteArray = new Uint8Array(byteNumbers);
  //         const blob = new Blob([byteArray], { type: mimeType });
  //         const blobUrl = URL.createObjectURL(blob);
  //         img.src = blobUrl;
  //       }
  //     });
  //     return new XMLSerializer().serializeToString(doc);
  //   }

  //   return convertBase64ImagesToBlobs(content.CKEditorContent);
  // }, []);

  return (
    <div className={styles.background}>
      <div className={styles.guideLink}>
        <div className={styles.guideText}>Hướng dẫn viết bài</div>
        <div className={styles.guideImage}></div>
      </div>

      <form className={styles.postForm}>
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

        {/* <textarea
          className={styles.textArea}
          name="content"
          placeholder="Nhập đoạn giới thiệu tổng quan của bài để anh em hiểu được nội dung bài viết..."
          rows="5"
          onChange={handleWordCount}
          style={{ overflow: "hidden" }}
        ></textarea> */}

        {/* <div className="main-container">
          <div
            className="editor-container editor-container_classic-editor editor-container_include-block-toolbar"
            ref={editorContainerRef}
          >
            <div className="editor-container__editor">
              <div ref={editorRef}>
                {isLayoutReady && (
                  <CKEditor
                    editor={ClassicEditor}
                    config={editorConfig}
                    onChange={handleEditorChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div> */}
        <Editor initData="Helllo" setData={setText} />

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
        <button
          onClick={handleSubmit}
          type="submit"
          className={styles.submitButton}
        >
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
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
