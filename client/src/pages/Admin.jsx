import { useEffect, useState } from "react";
import { login, logout, tokenStore } from "@/lib/api";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { SingletonEditor } from "@/components/admin/SingletonEditor";
import { Loader2, LogOut } from "lucide-react";

const TABS = [
  { id: "hero", label: "Hero" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "categories", label: "Categories" },
  { id: "featured", label: "Featured" },
  { id: "testimonials", label: "Testimonials" },
  { id: "why", label: "Why Choose" },
  { id: "stats", label: "Stats" },
  { id: "instagram", label: "Instagram" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Admin() {
  const [authed, setAuthed] = useState(null);
  useEffect(() => setAuthed(!!tokenStore.get()), []);
  if (authed === null) return null;
  return (
    <div className="min-h-screen bg-secondary/30">
      {authed ? (
        <Dashboard onLogout={() => setAuthed(false)} />
      ) : (
        <LoginForm onSuccess={() => setAuthed(true)} />
      )}
    </div>
  );
}

function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(email, password);
      onSuccess();
    } catch (e) {
      setErr(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "mt-2 h-10 w-full rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-5 border border-border bg-background p-8"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Studio
          </p>
          <h1 className="mt-1 font-serif text-3xl">Admin Sign In</h1>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            className={inputCls}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            className={inputCls}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
        </button>
        <p className="text-xs text-muted-foreground">
          Default (from server seed): admin@studio.com / admin123
        </p>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("hero");

  function handleLogout() {
    logout();
    onLogout();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Omkar Chavan Studio
          </p>
          <h1 className="font-serif text-3xl">Admin Panel</h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded border border-border bg-background px-3 py-1.5 text-sm hover:bg-secondary"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </header>

      <div className="flex flex-wrap gap-1 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-2 text-sm transition ${
              tab === t.id
                ? "border-b-2 border-[var(--gold)] text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded border border-border bg-background p-6">
        {tab === "hero" && (
          <ResourceManager
            resource="hero-slides"
            title="Hero Slides"
            fields={[
              { key: "eyebrow", label: "Eyebrow", type: "text" },
              { key: "title", label: "Title", type: "text" },
              { key: "subtitle", label: "Subtitle", type: "text" },
              { key: "image", label: "Image", type: "image", preset: "hero" },
            ]}
          />
        )}
        {tab === "services" && (
          <ResourceManager
            resource="services"
            title="Services"
            fields={[
              { key: "title", label: "Title", type: "text" },
              { key: "desc", label: "Description", type: "textarea" },
              {
                key: "image",
                label: "Image",
                type: "image",
                preset: "service",
              },
            ]}
          />
        )}
        {tab === "portfolio" && (
          <>
            <ResourceManager
              resource="portfolio"
              title="Portfolio Items"
              fields={[
                {
                  key: "category",
                  label: "Category",
                  type: "select",
                  options: [
                    "Weddings",
                    "Events",
                    "Portraits",
                    "Commercial",
                    "Products",
                  ],
                },
                {
                  key: "h",
                  label: "Tile size",
                  type: "select",
                  options: ["tall", "medium", "short"],
                },
                {
                  key: "image",
                  label: "Image",
                  type: "image",
                  preset: "portrait",
                },
              ]}
            />
            <p className="mt-3 text-xs text-muted-foreground">
              "tall" → 3:4 · "medium" → 1:1 · "short" → 4:3
            </p>
          </>
        )}
        {tab === "categories" && (
          <ResourceManager
            resource="categories"
            title="Category Showcase"
            fields={[
              { key: "name", label: "Name", type: "text" },
              {
                key: "image",
                label: "Image",
                type: "image",
                preset: "category",
              },
            ]}
          />
        )}
        {tab === "featured" && (
          <ResourceManager
            resource="featured-projects"
            title="Featured Projects"
            fields={[
              { key: "name", label: "Project Name", type: "text" },
              { key: "location", label: "Location", type: "text" },
              { key: "story", label: "Story", type: "textarea" },
              {
                key: "image",
                label: "Image",
                type: "image",
                preset: "featured",
              },
            ]}
          />
        )}
        {tab === "testimonials" && (
          <ResourceManager
            resource="testimonials"
            title="Testimonials"
            imageKey="photo"
            fields={[
              { key: "name", label: "Name", type: "text" },
              { key: "event", label: "Event / Caption", type: "text" },
              { key: "quote", label: "Quote", type: "textarea" },
              { key: "rating", label: "Rating (1-5)", type: "number" },
              { key: "photo", label: "Photo", type: "image", preset: "square" },
            ]}
          />
        )}
        {tab === "why" && (
          <ResourceManager
            resource="why-choose"
            title="Why Choose Us"
            fields={[
              { key: "title", label: "Title", type: "text" },
              { key: "desc", label: "Description", type: "textarea" },
            ]}
          />
        )}
        {tab === "stats" && (
          <ResourceManager
            resource="stats"
            title="Stats"
            fields={[
              { key: "value", label: "Value", type: "number" },
              { key: "label", label: "Label", type: "text" },
            ]}
          />
        )}
        {tab === "instagram" && (
          <ResourceManager
            resource="instagram"
            title="Instagram Grid"
            fields={[
              { key: "image", label: "Image", type: "image", preset: "square" },
            ]}
          />
        )}
        {tab === "about" && (
          <SingletonEditor
            settingKey="photographer"
            title="Photographer / About"
            fields={[
              { key: "name", label: "Name", type: "text" },
              { key: "tagline", label: "Tagline", type: "text" },
              { key: "intro", label: "Intro", type: "textarea" },
              {
                key: "portrait",
                label: "Portrait",
                type: "image",
                preset: "about",
              },
            ]}
          />
        )}
        {tab === "contact" && (
          <SingletonEditor
            settingKey="contact"
            title="Contact Info"
            fields={[
              { key: "phone", label: "Phone", type: "text" },
              { key: "email", label: "Email", type: "text" },
              { key: "address", label: "Address", type: "text" },
            ]}
          />
        )}
      </div>
    </div>
  );
}
