import "react"
import  "../styles/Home.css"// make sure this file exists

const Home = () => {
  return (
    <div className="home-page">
      <h3 className="home-heading">Welcome to  Client Document System</h3>
      <p className="home-subtext">
        Securely register, upload your identity documents, and manage them easily from your dashboard.
      </p>
      <div className="home-instructions">
        <p>
          To get started, click <strong>Register</strong> or <strong>Login</strong> using the buttons above.
        </p>
      </div>
    </div>
  );
};

export default Home;
