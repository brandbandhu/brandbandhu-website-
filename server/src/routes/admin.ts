import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Router } from "express";
import multer from "multer";
import { z } from "zod";
import { config } from "../config";
import { createSession, requireAdminAuth, revokeSession } from "../auth";
import { prisma } from "../prisma";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  published: z.boolean().optional(),
});

const caseStudySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  clientName: z.string().optional(),
  industry: z.string().optional(),
  challenge: z.string().min(1),
  solution: z.string().min(1),
  results: z.string().min(1),
  published: z.boolean().optional(),
});

const parseBoolean = (value: unknown) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return false;
};

router.post("/login", async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Invalid login payload" });
  }

  const { username, password } = result.data;
  const admin = await prisma.adminUser.findUnique({ where: { username } });
  if (!admin) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const matches = await bcrypt.compare(password, admin.passwordHash);
  if (!matches) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const { rawToken, expiresAt } = await createSession(admin.id);
  res.cookie(config.sessionCookieName, rawToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    expires: expiresAt,
  });

  return res.json({
    message: "Login successful",
    admin: { id: admin.id, username: admin.username },
  });
});

router.post("/logout", async (req, res) => {
  const token = req.cookies?.[config.sessionCookieName] as string | undefined;
  await revokeSession(token);
  res.clearCookie(config.sessionCookieName);
  return res.json({ message: "Logged out" });
});

router.get("/me", requireAdminAuth, async (req, res) => {
  const token = req.cookies?.[config.sessionCookieName] as string | undefined;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  const session = await prisma.adminSession.findFirst({
    where: {
      tokenHash: crypto.createHash("sha256").update(token).digest("hex"),
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
    include: { adminUser: true },
  });

  if (!session) return res.status(401).json({ message: "Not authenticated" });
  return res.json({
    admin: { id: session.adminUser.id, username: session.adminUser.username },
  });
});

router.get("/blogs", requireAdminAuth, async (_req, res) => {
  const blogs = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return res.json(
    blogs.map((blog) => ({
      ...blog,
      imageData: undefined,
      hasImage: Boolean(blog.imageData),
      imageUrl: blog.imageData ? `/api/blogs/${blog.id}/image` : null,
    }))
  );
});

router.post("/blogs", requireAdminAuth, upload.single("image"), async (req, res) => {
  const payload = {
    title: req.body.title,
    slug: req.body.slug,
    excerpt: req.body.excerpt,
    content: req.body.content,
    published: parseBoolean(req.body.published),
  };
  const parsed = blogSchema.safeParse(payload);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid blog payload", errors: parsed.error.flatten() });
  }

  const blog = await prisma.blogPost.create({
    data: {
      ...parsed.data,
      publishedAt: parsed.data.published ? new Date() : null,
      imageData: req.file ? new Uint8Array(req.file.buffer) : undefined,
      imageMimeType: req.file?.mimetype,
      imageName: req.file?.originalname,
    },
  });

  return res.status(201).json({
    ...blog,
    imageData: undefined,
    hasImage: Boolean(blog.imageData),
    imageUrl: blog.imageData ? `/api/blogs/${blog.id}/image` : null,
  });
});

router.put("/blogs/:id", requireAdminAuth, upload.single("image"), async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid blog id" });

  const payload = {
    title: req.body.title,
    slug: req.body.slug,
    excerpt: req.body.excerpt,
    content: req.body.content,
    published: parseBoolean(req.body.published),
  };
  const parsed = blogSchema.safeParse(payload);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid blog payload", errors: parsed.error.flatten() });
  }

  const blog = await prisma.blogPost.update({
    where: { id },
    data: {
      ...parsed.data,
      publishedAt: parsed.data.published ? new Date() : null,
      ...(req.file
        ? {
            imageData: new Uint8Array(req.file.buffer),
            imageMimeType: req.file.mimetype,
            imageName: req.file.originalname,
          }
        : {}),
    },
  });

  return res.json({
    ...blog,
    imageData: undefined,
    hasImage: Boolean(blog.imageData),
    imageUrl: blog.imageData ? `/api/blogs/${blog.id}/image` : null,
  });
});

router.delete("/blogs/:id", requireAdminAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid blog id" });
  await prisma.blogPost.delete({ where: { id } });
  return res.status(204).send();
});

router.get("/case-studies", requireAdminAuth, async (_req, res) => {
  const caseStudies = await prisma.caseStudy.findMany({ orderBy: { createdAt: "desc" } });
  return res.json(
    caseStudies.map((caseStudy) => ({
      ...caseStudy,
      imageData: undefined,
      hasImage: Boolean(caseStudy.imageData),
      imageUrl: caseStudy.imageData ? `/api/case-studies/${caseStudy.id}/image` : null,
    }))
  );
});

router.post("/case-studies", requireAdminAuth, upload.single("image"), async (req, res) => {
  const payload = {
    title: req.body.title,
    slug: req.body.slug,
    clientName: req.body.clientName,
    industry: req.body.industry,
    challenge: req.body.challenge,
    solution: req.body.solution,
    results: req.body.results,
    published: parseBoolean(req.body.published),
  };
  const parsed = caseStudySchema.safeParse(payload);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid case study payload", errors: parsed.error.flatten() });
  }

  const caseStudy = await prisma.caseStudy.create({
    data: {
      ...parsed.data,
      publishedAt: parsed.data.published ? new Date() : null,
      imageData: req.file ? new Uint8Array(req.file.buffer) : undefined,
      imageMimeType: req.file?.mimetype,
      imageName: req.file?.originalname,
    },
  });

  return res.status(201).json({
    ...caseStudy,
    imageData: undefined,
    hasImage: Boolean(caseStudy.imageData),
    imageUrl: caseStudy.imageData ? `/api/case-studies/${caseStudy.id}/image` : null,
  });
});

router.put("/case-studies/:id", requireAdminAuth, upload.single("image"), async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid case study id" });

  const payload = {
    title: req.body.title,
    slug: req.body.slug,
    clientName: req.body.clientName,
    industry: req.body.industry,
    challenge: req.body.challenge,
    solution: req.body.solution,
    results: req.body.results,
    published: parseBoolean(req.body.published),
  };
  const parsed = caseStudySchema.safeParse(payload);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid case study payload", errors: parsed.error.flatten() });
  }

  const caseStudy = await prisma.caseStudy.update({
    where: { id },
    data: {
      ...parsed.data,
      publishedAt: parsed.data.published ? new Date() : null,
      ...(req.file
        ? {
            imageData: new Uint8Array(req.file.buffer),
            imageMimeType: req.file.mimetype,
            imageName: req.file.originalname,
          }
        : {}),
    },
  });

  return res.json({
    ...caseStudy,
    imageData: undefined,
    hasImage: Boolean(caseStudy.imageData),
    imageUrl: caseStudy.imageData ? `/api/case-studies/${caseStudy.id}/image` : null,
  });
});

router.delete("/case-studies/:id", requireAdminAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid case study id" });
  await prisma.caseStudy.delete({ where: { id } });
  return res.status(204).send();
});

export default router;
