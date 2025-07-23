import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user; // Add user to request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

export const isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Access denied: Users only" });
  }
  next();
};