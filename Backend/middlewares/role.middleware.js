import { ROLES } from "../constants/roles.js";

// 🔒 Middleware: सिर्फ उसी role को access मिलेगा जो allowed हो
export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "⛔ Access denied. Insufficient permissions.",
      });
    }
    next();
  };
};
// 🔒 Middleware: सिर्फ admin role को access मिलेगा
