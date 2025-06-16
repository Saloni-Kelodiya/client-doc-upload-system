import { useState, useEffect } from "react";
import axios from "axios";
const Upload = () => {
  const [form, setForm] = useState({ type: "", description: "", deadline: "", file: null });
  const [message, setMessage] = useState("");
  const [documents, setDocuments] = useState([]);
  const token = localStorage.getItem("token");
  const fetchDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/documents", { headers: { Authorization: `Bearer ${token}` } });
      if (Array.isArray(res.data.documents)) setDocuments(res.data.documents);
      else setDocuments([]);
    } catch (err) {
      console.error("❌ Failed to fetch documents:", err);
      setMessage("Failed to fetch documents");
    }
  };
  useEffect(() => { fetchDocuments(); }, []);
  const handleUpload = async (e) => {
    e.preventDefault();
    const { type, description, deadline, file } = form;
    if (!type || !description || !deadline || !file) return alert("❌ Missing required fields");
    const formData = new FormData();
    formData.append("type", type);
    formData.append("description", description);
    formData.append("expiryDate", deadline);
    formData.append("document", file);
    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Upload successful");
      setForm({ type: "", description: "", deadline: "", file: null });
      fetchDocuments();
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setMessage("❌ Upload failed");
    }
  };
  return (
    <div className="container mt-5">
      <h3>Upload Document</h3>
      {message && <p className="text-info">{message}</p>}
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <input type="text" placeholder="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required /><br /><br />
        <input type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /><br /><br />
        <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} required /><br /><br />
        <input type="file" onChange={(e) => setForm({ ...form, file: e.target.files[0] })} required /><br /><br />
        <button type="submit">Upload</button>
      </form>
      <h4>Uploaded Documents</h4>
      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc._id}>
              <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">{doc.originalName}</a> — {doc.type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Upload;