const express = require("express");

const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes");
const authMiddleware = require("./src/midlewares/authmiddleware"); // ✅ fixed spelling

const app = express();

app.use(cors());
app.use(express.json());

// Public route
app.use("/auth", authRoutes);
<<<<<<< HEAD
app.use(authMiddleware); // Apply auth middleware to all routes below

app.listen(5000, () => {
  console.log("Server started on port 5000");
=======
app.use(authMiddleware); 

app.listen(5000, () => {
  console.log("Server started on port 5000");
>>>>>>> 3a258ec177fba08efe49543d6fd47e3534dd6a72
});
