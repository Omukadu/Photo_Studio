// Tiny REST client for the Express backend.
export const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const TOKEN_KEY = "pp_admin_token";

export const tokenStore = {
  get: () => (typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

async function request(path, init = {}) {
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
  return data;
}

function safeJson(s) {
  try { return JSON.parse(s); } catch { return null; }
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  put: (path, body) => request(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),
  del: (path) => request(path, { method: "DELETE" }),
  upload: async (preset, file) => {
    const fd = new FormData();
    fd.append("image", file);
    return request(`/upload/${preset}`, { method: "POST", body: fd });
  },
};

export async function login(email, password) {
  const data = await api.post("/auth/login", { email, password });
  tokenStore.set(data.token);
  return data;
}

export function logout() {
  tokenStore.clear();
}
