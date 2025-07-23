const User = require("../models/User");
const JWT = require("jsonwebtoken");

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send token + user info (no password)
    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        // optionally: role, email, etc.
      },
      message: "Login successful"
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { login };
