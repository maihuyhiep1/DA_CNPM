import styles from "./style_createPost.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Editor from "../../components/CKEditor/CKEditor5";

const CreatePost = ({ qua: boolean}) => {
  const location = useLocation(); // Hook để lấy thông tin từ state của navigate
  const { qna } = location.state || {};
  const [titleWordCount, setTitleWordCount] = useState(0);
  const [contentWordCount, setContentWordCount] = useState(0);

  const [image, setImage] = useState(null);
  const [content, setContent] = useState(""); // Nội dung từ CKEditor
  const [title, setTitle] = useState(""); // Tiêu đề bài viết
  const [isQna, setIsQna] = useState(qna || false);

  const handleWordCount = (e) => {
    const text = e.target.value;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word);

    if (e.target.name === "title") {
      setTitle(text);
      setTitleWordCount(words.length);
    }

    e.target.style.height = "auto"; // Reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set to scroll height
  };

  // Tổng số từ trong cả title và content
  const totalWordCount = titleWordCount + contentWordCount;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file); // Lưu đúng file gốc
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề.");
      return;
    }

    if (!content.trim()) {
      alert("Vui lòng nhập nội dung bài viết.");
      return;
    }

    // Tạo FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content); // Nội dung từ CKEditor
    if (image && image instanceof File) {
      formData.append("avatar", image); // Key phải khớp với định nghĩa multer trên server
    }
    formData.append("is_qna", isQna); // Add the checkbox value to the form data

    console.log("THÔNG TIN BÀI POST ĐƯỢC ĐĂNG:");

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch("http://localhost:8386/api/posts", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert("Bài viết đã được đăng thành công!");
      setTitle("");
      setContent("");
      setImage(null);
      setIsQna(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Có lỗi xảy ra khi đăng bài viết.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Chỉ chấp nhận file hình ảnh!");
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const countWordsFromHTML = (html) => {
    // Parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Extract only the visible text
    const plainText = doc.body.textContent || ""; // Extracts visible text

    // Count words by splitting and filtering
    const words = plainText
      .trim()
      .split(/\s+/) // Split by whitespace
      .filter((word) => word); // Remove empty strings

    return words.length; // Return the word count
  };

  const handleCheckboxChange = () => {
    setIsQna((prev) => !prev); // Toggle checkbox state
  };

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
          value={title} // Đảm bảo giá trị title được liên kết với state
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
              src={URL.createObjectURL(image)} // Hiển thị preview từ File
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

        {/* Sử dụng CKEditor để nhập nội dung bài viết */}
        <Editor
          initData=""
          setData={(data) => {
            setContent(data); // Update the content state
            const wordCount = countWordsFromHTML(data); // Count words in the content
            setContentWordCount(wordCount); // Update the word count state
          }}
        />

        <div className={styles.wordCount}>
          <span>Bài viết {totalWordCount} từ</span>
        </div>
        <div className={styles.checkboxWrapper}>
          <input
            id="example-1"
            className={styles.substituted}
            type="checkbox"
            aria-hidden="true"
            checked={isQna} // Bind checkbox state to the value
            onChange={handleCheckboxChange} // Listen to changes
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
        {image ? (
          <img
            src={URL.createObjectURL(image)} // Preview từ file
            alt="Uploaded preview"
            className={styles.previewImage}
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        ) : (
          <p>Chưa chọn ảnh</p>
        )}
        <h3>Tiêu đề: </h3>
        <p>{title}</p>
        <div>
          <h4>Nội dung:</h4>
          <p>{`ĐÂY LÀ NỘI DUNG CKEDITOR: ${content}`}</p>
          {/* Hiển thị HTML nội dung của CKEditor */}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
