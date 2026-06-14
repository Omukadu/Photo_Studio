// Tiny REST client for the Express backend.
// Configure with `VITE_API_URL` (defaults to http://localhost:5000/api).

export const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:5000/api";

const TOKEN_KEY = "pp_admin_token";

export const tokenStore = {
  get: () => (typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null),
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

async function request<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const token = tokenStore.get();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(`${API_URL}${path}`, { ...init, headers });
  const text = await res.text();
  const data = text ? safeJson(text) : null;
  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || res.statusText;
    throw new Error(msg);
  }
  return data as T;
}

function safeJson(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

export const api = {
  get: <T = any>(path: string) => request<T>(path),
  post: <T = any>(path: string, body?: any) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  put: <T = any>(path: string, body?: any) =>
    request<T>(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),
  del: <T = any>(path: string) => request<T>(path, { method: "DELETE" }),
  upload: async (preset: string, file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    return request<{ url: string; publicId: string }>(`/upload/${preset}`, {
      method: "POST",
      body: fd,
    });
  },
};

export async function login(email: string, password: string) {
  const data = await api.post<{ token: string; user: any }>("/auth/login", { email, password });
  tokenStore.set(data.token);
  return data;
}

export function logout() {
  tokenStore.clear();
}
