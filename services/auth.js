import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const registerUser = async ({ email, password }) => {
  try {
    const newUser = new User({
      email,
      password,
    });
    await newUser.save();
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return { success: false };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return { success: false };
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return { success: true, token };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export { registerUser, loginUser };
