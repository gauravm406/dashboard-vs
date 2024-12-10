import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import { connectToDatabase } from "./config/database.js";
import userRoutes from "./router/user.js";
import analyticsRoutes from "./router/analytics.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// origin configurations
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

// sample route
app.get("/", (req, res) => {
  res.send("Server is working fine");
});

// routes
app.use("/api/auth", userRoutes);
app.use("/api", analyticsRoutes);

// port
const PORT = process.env.PORT || 5000;

//server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// database connection
connectToDatabase();
