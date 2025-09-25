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

  const viewDocument = (fileName) => {
    if (!fileName) {
      alert("No file found!");
      return;
    }
    window.open(`http://localhost:5000/uploads/${fileName}`, "_blank");
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
                        onClick={() => viewDocument(doc.fileName)}
                        className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition duration-300"
                      >
                        View
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
