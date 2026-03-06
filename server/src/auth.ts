import bcrypt from "bcryptjs";
import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import { config } from "./config";
import { prisma } from "./prisma";

type AuthenticatedRequest = Request & {
  adminUser?: { id: number; username: string; passwordHash: string };
};

const getTokenHash = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const ensureDefaultAdmin = async () => {
  const existing = await prisma.adminUser.findUnique({
    where: { username: config.adminUsername },
  });

  if (!existing) {
    const passwordHash = await bcrypt.hash(config.adminPassword, 12);
    await prisma.adminUser.create({
      data: {
        username: config.adminUsername,
        passwordHash,
      },
    });
  }
};

export const createSession = async (adminUserId: number) => {
  const rawToken = crypto.randomBytes(48).toString("hex");
  const tokenHash = getTokenHash(rawToken);
  const expiresAt = new Date(Date.now() + config.sessionTtlHours * 60 * 60 * 1000);

  await prisma.adminSession.create({
    data: {
      tokenHash,
      expiresAt,
      adminUserId,
    },
  });

  return { rawToken, expiresAt };
};

export const revokeSession = async (rawToken?: string) => {
  if (!rawToken) return;

  const tokenHash = getTokenHash(rawToken);
  await prisma.adminSession.updateMany({
    where: { tokenHash, revokedAt: null },
    data: { revokedAt: new Date() },
  });
};

export const requireAdminAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const rawToken = req.cookies?.[config.sessionCookieName] as string | undefined;
  if (!rawToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const tokenHash = getTokenHash(rawToken);
  const session = await prisma.adminSession.findFirst({
    where: {
      tokenHash,
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
    include: { adminUser: true },
  });

  if (!session) {
    return res.status(401).json({ message: "Session expired or invalid" });
  }

  req.adminUser = session.adminUser;
  return next();
};
