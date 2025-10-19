const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const authRoutes = require("./src/routes/auth.routes");
const authMiddleware = require("./src/midlewares/authmiddleware");

const app = express();
const server = http.createServer(app);

// ✅ Enable CORS
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// ✅ Public routes
app.use("/auth", authRoutes);

// ✅ Protected route example
app.use(authMiddleware);
app.get("/protected", (req, res) => {
  res.json({ message: "You are authorized!", user: req.user });
});

// ✅ WebSocket Setup
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("⚡ A user connected:", socket.id);

  // Join a specific room (e.g., class, ward, or ICU)
  socket.on("joinRoom", (roomCode) => {
    socket.join(roomCode);
    console.log(`👥 User ${socket.id} joined room: ${roomCode}`);
  });

  // Example: user sends message/question
  socket.on("sendMessage", (data) => {
    console.log("📩 New Message:", data);
    io.to(data.roomCode).emit("newMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT =  5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
