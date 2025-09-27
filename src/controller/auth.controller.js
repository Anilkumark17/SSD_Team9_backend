const db = require("../db/db");

<<<<<<< HEAD


=======
>>>>>>> 3a258ec177fba08efe49543d6fd47e3534dd6a72
exports.LoginAPI = async (req, res) => {
  try {
    const { email, password } = req.body;

<<<<<<< HEAD
    // Authenticate using Supabase
=======
>>>>>>> 3a258ec177fba08efe49543d6fd47e3534dd6a72
    const { data, error } = await db.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

<<<<<<< HEAD
    // ✅ Only return user basic info
=======
>>>>>>> 3a258ec177fba08efe49543d6fd47e3534dd6a72
    res.status(200).json({
      message: "Login successful",
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
<<<<<<< HEAD
    res.status(500).json({ message: "Internal server error" });
  }
=======
    res.status(500).json({ message: "Internal server error" });
  }
>>>>>>> 3a258ec177fba08efe49543d6fd47e3534dd6a72
};
