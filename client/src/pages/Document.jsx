import { useEffect, useState } from "react";
import axios from "axios";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState("");

  const fetchDocuments = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/documents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle both possible shapes of response
      const docs = res.data.documents || res.data;
      setDocuments(docs);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setMessage("Failed to fetch documents");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/documents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
    } catch (err) {
      console.error("❌ Delete error:", err);
      setMessage("Failed to delete document");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Your Documents</h2>
      {message && <p className="text-danger" style={{ justifyContent:"space-between" }}>{message}</p>}
      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Filename</th>
              <th>Type</th>
              <th>Description</th>
              <th>Expiry</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          <tbody style={{ justifyContent:"space-between", objectFit:"cover"}}>
            {documents.map((doc) => (
              <tr key={doc._id}>
                <td style={{padding:"10px"}}>{doc.originalName}</td>
                <td style={{padding:"10px"}}>{doc.type}</td>
                <td style={{padding:"10px"}}>{doc.description}</td>
                <td style={{padding:"10px"}}>{doc.expiryDate?.slice(0, 10)}</td>
                <td>

                  <a
                    className="btn btn-primary btn-sm me-2"
                    href={`http://localhost:5000/api/documents/${doc._id}/view`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(doc._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Documents;
