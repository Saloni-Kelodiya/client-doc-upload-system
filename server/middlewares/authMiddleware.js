//Verifie token
import jwt from "jsonwebtoken";
import axios from "../axiosInstance";

// axiosInstance.js



const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Format: "Bearer token"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
