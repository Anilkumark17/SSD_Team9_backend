const db = require("../db/db");

exports.LoginAPI = async (req, res) => {
try {
    const { email, password } = req.body;

    // Authenticate via Supabase Auth
    const { data, error } = await db.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Return full session + user info
    res.status(200).json({
      message: "Login successful",
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      session: data.session, // Full session
    });
  }catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
