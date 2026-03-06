import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { ensureDefaultAdmin } from "./auth";
import { config } from "./config";
import { prisma } from "./prisma";
import adminRoutes from "./routes/admin";
import publicRoutes from "./routes/public";

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.clientOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS blocked: origin not allowed"));
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/admin", adminRoutes);
app.use("/api", publicRoutes);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

const start = async () => {
  await prisma.$connect();
  await ensureDefaultAdmin();

  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
};

start().catch(async (error) => {
  console.error("Failed to start server", error);
  await prisma.$disconnect();
  process.exit(1);
});
