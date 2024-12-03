import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

// Plugin Upload Adapter
class CloudinaryUploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.url = "https://api.cloudinary.com/v1_1/dymqzmlcm/image/upload"; // Thay bằng URL Cloudinary của bạn
    this.uploadPreset = "no39tpbp"; // Thay bằng upload preset của bạn
  }

  // Upload file lên Cloudinary
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", this.uploadPreset);

          axios
            .post(this.url, formData)
            .then((response) => {
              if (response.data.secure_url) {
                resolve({
                  default: response.data.secure_url, // URL ảnh từ Cloudinary
                });
              } else {
                reject("Upload failed");
              }
            })
            .catch((error) => {
              console.error("Upload failed:", error);
              reject(error);
            });
        })
    );
  }

  abort() {
    // Optional: Handle abort logic here
  }
}

// Plugin CKEditor
function CloudinaryUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new CloudinaryUploadAdapter(loader);
  };
}

export default function Editor({ initData, setData }) {
  const [editorData, setEditorData] = useState(initData || "");

  // Cấu hình CKEditor
  const editorConfig = {
    toolbar: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "|",
      "link",
      "imageUpload",
      "mediaEmbed",
      "insertTable",
      "blockQuote",
      "|",
      "bulletedList",
      "numberedList",
      "todoList",
      "outdent",
      "indent",
    ],
    image: {
      toolbar: [
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    extraPlugins: [CloudinaryUploadAdapterPlugin], // Thêm plugin upload ảnh
    placeholder: "Type or paste  content here!",
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        data={editorData}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(data); // Xem dữ liệu HTML trong console
          setEditorData(data);
          if (setData) setData(data);
        }}
      />
    </div>
  );
}