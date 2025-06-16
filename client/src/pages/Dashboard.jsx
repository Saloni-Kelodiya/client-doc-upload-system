import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm rounded">
        <h2 className="mb-3">📊 Client Dashboard</h2>

        {user ? (
          <div className="mb-4">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p className="text-muted">Fetching user info...</p>
        )}

        <div className="d-flex flex-column flex-md-row gap-3">
          <Link to="/upload" className="btn btn-outline-primary">
            📤 Upload Document
          </Link>
          <Link to="/documents" className="btn btn-outline-secondary">
            📄 View My Documents
          </Link>
          <button onClick={handleLogout} className="btn btn-outline-danger">
            🔓 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
