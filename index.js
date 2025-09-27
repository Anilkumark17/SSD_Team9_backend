const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const db = require("./src/db/db"); // Supabase client
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

// Endpoint to submit question
app.post("/questions", async (req, res) => {
  try {
    const { student_name, question } = req.body;

    const { data, error } = await db
      .from("questions")
      .insert([{ student_name, question }])
      .select();

    if (error) return res.status(400).json({ error });

    // Emit new question to all connected mentors
    io.emit("new-question", data[0]);

    res.status(200).json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint to get all questions
app.get("/questions", async (req, res) => {
  try {
    const { data, error } = await db
      .from("questions")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) return res.status(400).json({ error });

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
server.listen(5000, () => console.log("Server running on port 5000"));
