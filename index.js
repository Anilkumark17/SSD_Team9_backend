const express = require("express");

const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes");
const authMiddleware = require("./src/midlewares/authmiddleware"); // ✅ fixed spelling

const app = express();

app.use(cors());
app.use(express.json());

// Public route
app.use("/auth", authRoutes);
app.use(authMiddleware); 

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
