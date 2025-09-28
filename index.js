const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const authRoutes = require("./src/routes/auth.routes");
const authMiddleware = require("./src/midlewares/authmiddleware");

const app = express();
const server = http.createServer(app);

// Setup socket.io
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

// Public routes (signup, login, etc.)
app.use("/auth", authRoutes);

// Protected routes example
app.use(authMiddleware);
app.get("/protected", (req, res) => {
  res.json({ message: "You are authorized!", user: req.user });
});

// ---------------- SOCKET.IO ----------------
io.on("connection", (socket) => {
  console.log("⚡ A user connected:", socket.id);

  // Student/Professor joins a class room
  socket.on("joinClass", (classCode) => {
    socket.join(classCode);
    console.log(`👥 User ${socket.id} joined class: ${classCode}`);
  });

  // Student posts a question
  socket.on("askQuestion", (data) => {
    console.log("📩 New Question:", data);

    // Broadcast only inside the same class room
    io.to(data.classCode).emit("newQuestion", data);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ---------------- SERVER ----------------
server.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
