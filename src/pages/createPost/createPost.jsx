import styles from "./style_createPost.module.css";
import { useState, useEffect } from "react";
import Editor from "../../components/CKEditor/CKEditor5";

const CreatePost = () => {
  const [titleWordCount, setTitleWordCount] = useState(0);
  const [contentWordCount, setContentWordCount] = useState(0);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState(""); // Nội dung từ CKEditor
  const [title, setTitle] = useState(""); // Tiêu đề bài viết

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

  // Tổng số từ trong cả title và content
  const totalWordCount = titleWordCount + contentWordCount;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file); // Tạo URL từ file
        setImage(imageUrl); // Cập nhật state bằng URL
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
  
    if (image) {
      formData.append("image", image); // Sử dụng file từ state `image`
    }
  
    try {
      const response = await fetch("http://localhost:8386/api/posts", {
        method: "POST",
        body: formData,
        credentials: "include", // Đảm bảo gửi cookie nếu cần
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Response:", result);
      alert("Bài viết đã được đăng thành công!");
  
      // Lưu URL ảnh đã tải lên vào state
      setImage(result.imageUrl); // URL server trả về
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Có lỗi xảy ra: " + error.message);
    }
  };
  

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file); // Lưu file trực tiếp
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

        {/* Sử dụng CKEditor để nhập nội dung bài viết */}
        <Editor initData="Helllo" setData={setContent} />

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
          {/* Hiển thị HTML nội dung của CKEditor */}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
