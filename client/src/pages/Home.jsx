import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Welcome to Client Document System
      </h1>
      <p className="text-lg md:text-xl mb-6 text-center max-w-xl">
        Securely register, upload your identity documents, and manage them easily from your dashboard.
      </p>
      <div className="bg-white bg-opacity-20 p-6 rounded-xl shadow-lg max-w-lg text-center">
        <p className="text-white text-base md:text-lg">
          To get started, click <strong className="underline">Register</strong> or{" "}
          <strong className="underline">Login</strong> using the buttons above.
        </p>
      </div>
      {/* <div className="mt-8 flex gap-4">
        <a
          href="/register"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-100 transition duration-300"
        >
          Register
        </a>
        <a
          href="/login"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-100 transition duration-300"
        >
          Login
        </a>
      </div> */}
    </div>
  );
};

export default Home;
