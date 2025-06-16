import { Link } from "react-router";
import "../styles/Layout.css";
function Layout({ children }) {
  return (
    <div className="container mt-4 " style={{ color: 'black', backgroundColor: 'lightgray', padding: '20px' }}>
      <header>
        <h1>Client Document System</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </nav>
      </header>
      <hr />
      <main>{children}</main>
    </div>
  );
}
export default Layout;