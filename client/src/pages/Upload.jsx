import { useState, useEffect } from "react";
import axios from "axios";



const Upload = () => {
  const [form, setForm] = useState({ type: "", description: "", deadline: "", file: null });
  const [message, setMessage] = useState("");
  const [documents, setDocuments] = useState([]);
  const token = localStorage.getItem("token");

  const fetchDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/documents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(res.data.documents)) setDocuments(res.data.documents);
      else setDocuments([]);
    } catch (err) {
      console.error("❌ Failed to fetch documents:", err);
      setMessage("Failed to fetch documents");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

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
      setDocuments(prev => [res.data.document, ...prev]);
      setMessage("✅ Upload successful");
      setForm({ type: "", description: "", deadline: "", file: null });
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setMessage("❌ Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Upload Document</h3>
        {message && <p className="text-center text-green-600 mb-4">{message}</p>}

        <form onSubmit={handleUpload} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            placeholder="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Upload
          </button>
        </form>

        <h4 className="mt-6 text-xl font-semibold text-gray-800">Uploaded Documents</h4>
        {documents.length === 0 ? (
          <p className="text-gray-600 mt-2">No documents uploaded yet.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {documents.map((doc) => (
              <li key={doc._id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100">
                <div>
                  <a
  href={doc.fileUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="font-medium text-blue-600 hover:underline"
>
  {doc.originalName}
</a>
{" "}
                  — <span className="text-gray-700">{doc.type}</span>
                </div>
                <div className="text-gray-500 text-sm">{doc.expiryDate?.slice(0, 10)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Upload;
