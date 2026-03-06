import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "@/lib/adminApi";

type ContentItem = {
  id: number;
  title: string;
  slug: string;
  imageUrl?: string | null;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState<ContentItem[]>([]);
  const [caseStudies, setCaseStudies] = useState<ContentItem[]>([]);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogPublished, setBlogPublished] = useState(true);
  const [blogImage, setBlogImage] = useState<File | null>(null);

  const [csTitle, setCsTitle] = useState("");
  const [csSlug, setCsSlug] = useState("");
  const [csClientName, setCsClientName] = useState("");
  const [csIndustry, setCsIndustry] = useState("");
  const [csChallenge, setCsChallenge] = useState("");
  const [csSolution, setCsSolution] = useState("");
  const [csResults, setCsResults] = useState("");
  const [csPublished, setCsPublished] = useState(true);
  const [csImage, setCsImage] = useState<File | null>(null);

  const loadData = async () => {
    const [blogRes, csRes] = await Promise.all([adminApi.listBlogs(), adminApi.listCaseStudies()]);
    setBlogs(Array.isArray(blogRes) ? (blogRes as ContentItem[]) : []);
    setCaseStudies(Array.isArray(csRes) ? (csRes as ContentItem[]) : []);
  };

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await adminApi.me();
        await loadData();
      } catch {
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    void bootstrap();
  }, [navigate]);

  const submitBlog = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", blogTitle);
      formData.append("slug", blogSlug);
      formData.append("excerpt", blogExcerpt);
      formData.append("content", blogContent);
      formData.append("published", String(blogPublished));
      if (blogImage) formData.append("image", blogImage);

      await adminApi.createBlog(formData);
      setMessage("Blog created successfully.");
      setBlogTitle("");
      setBlogSlug("");
      setBlogExcerpt("");
      setBlogContent("");
      setBlogImage(null);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create blog");
    }
  };

  const submitCaseStudy = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", csTitle);
      formData.append("slug", csSlug);
      formData.append("clientName", csClientName);
      formData.append("industry", csIndustry);
      formData.append("challenge", csChallenge);
      formData.append("solution", csSolution);
      formData.append("results", csResults);
      formData.append("published", String(csPublished));
      if (csImage) formData.append("image", csImage);

      await adminApi.createCaseStudy(formData);
      setMessage("Case study created successfully.");
      setCsTitle("");
      setCsSlug("");
      setCsClientName("");
      setCsIndustry("");
      setCsChallenge("");
      setCsSolution("");
      setCsResults("");
      setCsImage(null);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create case study");
    }
  };

  const onLogout = async () => {
    await adminApi.logout();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage blogs and case studies from here.</p>
          </div>
          <button onClick={onLogout} className="rounded-md border border-border px-4 py-2 font-medium hover:bg-muted">
            Logout
          </button>
        </div>

        {message ? <p className="text-green-600">{message}</p> : null}
        {error ? <p className="text-destructive">{error}</p> : null}

        <div className="grid lg:grid-cols-2 gap-6">
          <form onSubmit={submitBlog} className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <h2 className="font-heading text-xl font-semibold">Create Blog</h2>
            <input className="w-full rounded-md border border-border px-3 py-2 bg-background" placeholder="Title" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} required />
            <input className="w-full rounded-md border border-border px-3 py-2 bg-background" placeholder="Slug (example: my-first-blog)" value={blogSlug} onChange={(e) => setBlogSlug(e.target.value)} required />
            <input className="w-full rounded-md border border-border px-3 py-2 bg-background" placeholder="Excerpt" value={blogExcerpt} onChange={(e) => setBlogExcerpt(e.target.value)} />
            <textarea className="w-full rounded-md border border-border px-3 py-2 bg-background min-h-28" placeholder="Content" value={blogContent} onChange={(e) => setBlogContent(e.target.value)} required />
            <input type="file" accept="image/*" onChange={(e) => setBlogImage(e.target.files?.[0] ?? null)} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={blogPublished} onChange={(e) => setBlogPublished(e.target.checked)} />
              Published
            </label>
            <button type="submit" className="rounded-md bg-secondary text-secondary-foreground px-4 py-2 font-semibold">Save Blog</button>
          </form>

          <form onSubmit={submitCaseStudy} className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <h2 className="font-heading text-xl font-semibold">Create Case Study</h2>
            <input className="w-full rounded-md border border-border px-3 py-2 bg-background" placeholder="Title" value={csTitle} onChange={(e) => setCsTitle(e.target.value)} required />
            <input className="w-full rounded-md border border-border px-3 py-2 bg-background" placeholder="Slug (example: retail-growth-story)" value={csSlug} onChange={(e) => setCsSlug(e.target.value)} required />
            <input className="w-full rounded-md border border-border px-3 py-2 bg-background" placeholder="Client name" value={csClientName} onChange={(e) => setCsClientName(e.target.value)} />
            <input className="w-full rounded-md border border-border px-3 py-2 bg-background" placeholder="Industry" value={csIndustry} onChange={(e) => setCsIndustry(e.target.value)} />
            <textarea className="w-full rounded-md border border-border px-3 py-2 bg-background min-h-20" placeholder="Challenge" value={csChallenge} onChange={(e) => setCsChallenge(e.target.value)} required />
            <textarea className="w-full rounded-md border border-border px-3 py-2 bg-background min-h-20" placeholder="Solution" value={csSolution} onChange={(e) => setCsSolution(e.target.value)} required />
            <textarea className="w-full rounded-md border border-border px-3 py-2 bg-background min-h-20" placeholder="Results" value={csResults} onChange={(e) => setCsResults(e.target.value)} required />
            <input type="file" accept="image/*" onChange={(e) => setCsImage(e.target.files?.[0] ?? null)} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={csPublished} onChange={(e) => setCsPublished(e.target.checked)} />
              Published
            </label>
            <button type="submit" className="rounded-md bg-secondary text-secondary-foreground px-4 py-2 font-semibold">Save Case Study</button>
          </form>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-heading text-lg font-semibold mb-3">Existing Blogs</h3>
            <ul className="space-y-2 text-sm">
              {blogs.length === 0 ? <li className="text-muted-foreground">No blogs yet.</li> : null}
              {blogs.map((blog) => (
                <li key={blog.id} className="p-2 rounded border border-border/70">
                  <p className="font-medium">{blog.title}</p>
                  <p className="text-muted-foreground">/{blog.slug}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-heading text-lg font-semibold mb-3">Existing Case Studies</h3>
            <ul className="space-y-2 text-sm">
              {caseStudies.length === 0 ? <li className="text-muted-foreground">No case studies yet.</li> : null}
              {caseStudies.map((item) => (
                <li key={item.id} className="p-2 rounded border border-border/70">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground">/{item.slug}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
