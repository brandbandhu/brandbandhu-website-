const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4001";

type JsonValue = Record<string, unknown> | Array<unknown> | string | number | boolean | null;

const parseResponse = async (response: Response): Promise<JsonValue> => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as JsonValue;
  } catch {
    return text;
  }
};

const throwIfNotOk = async (response: Response) => {
  if (response.ok) return;
  const payload = await parseResponse(response);
  const message =
    typeof payload === "object" &&
    payload !== null &&
    "message" in payload &&
    typeof payload.message === "string"
      ? payload.message
      : `Request failed with status ${response.status}`;
  throw new Error(message);
};

export const adminApi = {
  baseUrl: API_BASE,

  async login(username: string, password: string) {
    const response = await fetch(`${API_BASE}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    await throwIfNotOk(response);
    return parseResponse(response);
  },

  async me() {
    const response = await fetch(`${API_BASE}/api/admin/me`, {
      credentials: "include",
    });
    await throwIfNotOk(response);
    return parseResponse(response);
  },

  async logout() {
    const response = await fetch(`${API_BASE}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    await throwIfNotOk(response);
    return parseResponse(response);
  },

  async listBlogs() {
    const response = await fetch(`${API_BASE}/api/admin/blogs`, {
      credentials: "include",
    });
    await throwIfNotOk(response);
    return parseResponse(response);
  },

  async listCaseStudies() {
    const response = await fetch(`${API_BASE}/api/admin/case-studies`, {
      credentials: "include",
    });
    await throwIfNotOk(response);
    return parseResponse(response);
  },

  async createBlog(formData: FormData) {
    const response = await fetch(`${API_BASE}/api/admin/blogs`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    await throwIfNotOk(response);
    return parseResponse(response);
  },

  async createCaseStudy(formData: FormData) {
    const response = await fetch(`${API_BASE}/api/admin/case-studies`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    await throwIfNotOk(response);
    return parseResponse(response);
  },
};
