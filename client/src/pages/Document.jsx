import { useEffect, useState } from "react";
import axios from "axios";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState("");

  const fetchDocuments = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/documents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(res.data.documents || []);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setMessage("Failed to fetch documents");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);
  const downloadDocument = (fileUrl, originalName) => {
  if (!fileUrl) return alert("No file found!");
  
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = originalName; // sets filename for download
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const deleteDocument = async (id) => {
  if (!window.confirm("Are you sure you want to delete this document?")) return;

  const token = localStorage.getItem("token");
  try {
    await axios.delete(`http://localhost:5000/api/documents/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Document deleted successfully");
    setDocuments(prev => prev.filter(doc => doc._id !== id));
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete document");
  }
};

const viewDocument = (fileUrl) => {
  if (!fileUrl) {
    console.log(fileUrl)
    alert("No file found!");
    return;
  }
  window.open(fileUrl, "_blank");
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Documents</h2>

        {message && <p className="text-red-500 mb-4">{message}</p>}

        {documents.length === 0 ? (
          <p className="text-gray-600">No documents uploaded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Filename</th>
                  <th className="py-2 px-4 border-b text-left">Type</th>
                  <th className="py-2 px-4 border-b text-left">Description</th>
                  <th className="py-2 px-4 border-b text-left">Expiry</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{doc.originalName}</td>
                    <td className="py-2 px-4 border-b">{doc.type}</td>
                    <td className="py-2 px-4 border-b">{doc.description}</td>
                    <td className="py-2 px-4 border-b">{doc.expiryDate?.slice(0, 10)}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                         onClick={() => {
        if (!doc.fileUrl) return alert("No file found!");
        window.open(doc.fileUrl, "_blank");
      }}
                        className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition duration-300"
                      >
                        View
                      </button>
                    <button
  onClick={() => downloadDocument(doc.fileUrl, doc.originalName)}
  className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700 transition duration-300"
>
  Download
</button>

                        <button
  onClick={() => deleteDocument(doc._id)}
  className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
>
  Delete
</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
