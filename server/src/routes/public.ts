import { Router } from "express";
import { config } from "../config";
import { prisma } from "../prisma";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, phone, service, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required" });
  }

  if (!config.privyrWebhookUrl) {
    return res.status(500).json({ message: "Contact webhook is not configured" });
  }

  const payload = {
    name: String(name),
    display_name: String(name),
    email: String(email),
    phone: phone ? String(phone) : "",
    phone_number: phone ? String(phone) : "",
    service: service ? String(service) : "",
    message: String(message),
    notes: String(message),
    source: "BrandBandhu Contact Form",
    custom_fields: {
      service: service ? String(service) : "",
      message: String(message),
      source: "BrandBandhu Contact Form",
    },
  };

  try {
    const webhookUrl = new URL(config.privyrWebhookUrl);
    webhookUrl.hash = "";

    const webhookResponse = await fetch(webhookUrl.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!webhookResponse.ok) {
      const responseText = await webhookResponse.text();
      console.error("Privyr webhook failed", webhookResponse.status, responseText);
      return res.status(502).json({ message: "Failed to submit lead to notification provider" });
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error("Privyr webhook error", error);
    return res.status(502).json({ message: "Failed to submit lead to notification provider" });
  }
});

router.get("/blogs", async (_req, res) => {
  const blogs = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return res.json(
    blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      published: blog.published,
      publishedAt: blog.publishedAt,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      hasImage: Boolean(blog.imageData),
      imageUrl: blog.imageData ? `/api/blogs/${blog.id}/image` : null,
    }))
  );
});

router.get("/blogs/:slug", async (req, res) => {
  const blog = await prisma.blogPost.findUnique({ where: { slug: req.params.slug } });
  if (!blog || !blog.published) return res.status(404).json({ message: "Blog not found" });

  return res.json({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    published: blog.published,
    publishedAt: blog.publishedAt,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    hasImage: Boolean(blog.imageData),
    imageUrl: blog.imageData ? `/api/blogs/${blog.id}/image` : null,
  });
});

router.get("/blogs/:id/image", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid blog id" });

  const blog = await prisma.blogPost.findUnique({
    where: { id },
    select: { published: true, imageData: true, imageMimeType: true },
  });
  if (!blog || !blog.published || !blog.imageData) {
    return res.status(404).json({ message: "Image not found" });
  }

  res.setHeader("Content-Type", blog.imageMimeType ?? "application/octet-stream");
  return res.send(Buffer.from(blog.imageData));
});

router.get("/case-studies", async (_req, res) => {
  const caseStudies = await prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return res.json(
    caseStudies.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      clientName: item.clientName,
      industry: item.industry,
      challenge: item.challenge,
      solution: item.solution,
      results: item.results,
      published: item.published,
      publishedAt: item.publishedAt,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      hasImage: Boolean(item.imageData),
      imageUrl: item.imageData ? `/api/case-studies/${item.id}/image` : null,
    }))
  );
});

router.get("/case-studies/:slug", async (req, res) => {
  const item = await prisma.caseStudy.findUnique({ where: { slug: req.params.slug } });
  if (!item || !item.published) return res.status(404).json({ message: "Case study not found" });

  return res.json({
    id: item.id,
    title: item.title,
    slug: item.slug,
    clientName: item.clientName,
    industry: item.industry,
    challenge: item.challenge,
    solution: item.solution,
    results: item.results,
    published: item.published,
    publishedAt: item.publishedAt,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    hasImage: Boolean(item.imageData),
    imageUrl: item.imageData ? `/api/case-studies/${item.id}/image` : null,
  });
});

router.get("/case-studies/:id/image", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid case study id" });

  const item = await prisma.caseStudy.findUnique({
    where: { id },
    select: { published: true, imageData: true, imageMimeType: true },
  });
  if (!item || !item.published || !item.imageData) {
    return res.status(404).json({ message: "Image not found" });
  }

  res.setHeader("Content-Type", item.imageMimeType ?? "application/octet-stream");
  return res.send(Buffer.from(item.imageData));
});

export default router;
