import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3002/api/upload";

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadedUrl("");
    setMessage("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please choose an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedUrl(response.data?.imageUrl || "");
      setMessage(response.data?.message || "Image uploaded successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Image Upload</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {previewUrl ? (
          <img src={previewUrl} alt="Preview" style={styles.preview} />
        ) : null}

        <button type="button" onClick={handleUpload} disabled={loading} style={styles.button}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>

        {message ? <p style={styles.message}>{message}</p> : null}

        {uploadedUrl ? (
          <div style={styles.result}>
            <p>Uploaded Image:</p>
            <a href={uploadedUrl} target="_blank" rel="noreferrer">
              {uploadedUrl}
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#f4f4f5",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    display: "grid",
    gap: "16px",
  },
  title: {
    margin: 0,
    fontSize: "28px",
  },
  preview: {
    width: "100%",
    borderRadius: "12px",
    objectFit: "cover",
  },
  button: {
    border: 0,
    borderRadius: "10px",
    padding: "12px 16px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "15px",
    cursor: "pointer",
  },
  message: {
    margin: 0,
    color: "#374151",
  },
  result: {
    display: "grid",
    gap: "8px",
    wordBreak: "break-all",
  },
};

export default ImageUpload;
