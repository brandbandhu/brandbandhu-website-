import dotenv from "dotenv";

dotenv.config();

const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminUsername || !adminPassword) {
  throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD are required in server/.env");
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
  adminUsername,
  adminPassword,
  sessionCookieName: "admin_session",
  sessionTtlHours: Number(process.env.SESSION_TTL_HOURS ?? 24),
};
