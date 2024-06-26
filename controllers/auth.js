import { registerUser, loginUser } from "../services/auth.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const result = await registerUser({ email, password });
    if (result.success) {
      return res.status(201).json({ message: "Registration successful" });
    } else {
      return res.status(500).json({ message: "Registration failed" });
    } 
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser({ email, password });
    if (result.success) {
      const maxAge = 1 * 60 * 60 * 1000;
      res.cookie("jwt", result.token, {
        httpOnly: true,
        maxAge: maxAge,
      });
      return res.status(200).json({ token: result.token });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login };
