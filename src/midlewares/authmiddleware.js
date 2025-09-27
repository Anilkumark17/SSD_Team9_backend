const db = require("../db/db"); 

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }
    const { data, error } = await db.auth.getUser(token);
    if (error || !data.user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = data.user;
    next(); 
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).json({ message: "Server error during authentication" });
  }
};


module.exports = authMiddleware;
