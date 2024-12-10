import jwt from "jsonwebtoken";

export const GENERATE_TOKEN = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Cannot be accessed by JavaScript on the client side
    secure: process.env.NODE_ENV === "production", // Secure flag only for production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Use "None" for cross-site in production, "Lax" in development
    maxAge: 6 * 24 * 60 * 60 * 1000, // 6 days in milliseconds
  });
};
