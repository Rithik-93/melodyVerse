import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRouter.js";
import { authLimiter } from "./rateLimiter.js";

export const app = express();

app.use(helmet());
app.use(
  cors()
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authLimiter, authRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// app.use("/docs", route);

app.listen(3000, () => {
  console.log("running 3000");
});
