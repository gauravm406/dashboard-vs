import jwt from "jsonwebtoken";
import User from "../models/user.js";

// protect route
export const protect = async (req, res, next) => {
  let token;

  // get token from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user details excluding password
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res
        .status(401)
        .json({ status: false, msg: "Not authorized, Token failed" });
    }
  } else {
    res.status(401).json({ status: false, msg: "Not authorized, no token" });
  }
};
