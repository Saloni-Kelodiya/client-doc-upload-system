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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">📊 Client Dashboard</h2>

        {user ? (
          <div className="mb-6 text-center">
            <p className="text-lg"><strong>Name:</strong> {user.name}</p>
            <p className="text-lg"><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Fetching user info...</p>
        )}

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/upload"
            className="flex-1 text-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            📤 Upload Document
          </Link>
          <Link
            to="/documents"
            className="flex-1 text-center bg-gray-200 text-gray-800 py-2 px-4 rounded-lg shadow hover:bg-gray-300 transition duration-300"
          >
            📄 View My Documents
          </Link>
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition duration-300"
          >
            🔓 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
