import { config } from "dotenv";

config();

export const JWT_SECRET_ACCESS_TOKEN = process.env.JWT_SECRET_ACCESS_TOKEN || "secret";
export const JWT_SECRET_REFRESH_TOKEN = process.env.JWT_SECRET_REFRESH_TOKEN || "secret";
export const DOMAIN = process.env.DOMAIN || "http://localhost:3000";