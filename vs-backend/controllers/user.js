import User from "../models/user.js";
import { GENERATE_TOKEN } from "../utils/GENERATE_TOKEN.js";
import bcrypt from "bcrypt";

// @POST
// "/api/auth/register"
export async function registerUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ msg: "Invalid credentials", status: false });

    const isUserExists = await User.findOne({ email });
    if (isUserExists)
      return res
        .status(400)
        .json({ msg: "User already exists", status: false });

    const user = await User.create({ email, password });

    if (user) {
      GENERATE_TOKEN(res, user._id);
      return res.status(201).json({
        msg: "User created successfully",
        status: true,
        data: {
          _id: user._id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", status: false });
  }
}

//@POST
// "/api/auth/login"
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ msg: "Invalid credentials", status: false });

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (isPasswordMatched) {
      GENERATE_TOKEN(res, user._id);
      return res.status(200).json({
        msg: "Logged in successfully",
        status: true,
        data: {
          _id: user._id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    }

    return res.status(400).json({ msg: "Invalid credentials", status: false });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", status: false });
  }
}

//@GET
// "/api/auth/logout"
export const logoutUser = async (req, res) => {
  res.clearCookie("jwt").status(200).json({ msg: "Logged out successfully" });
};
