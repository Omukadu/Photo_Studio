import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, logout, tokenStore } from "@/lib/api";
import { Toaster } from "@/components/ui/sonner";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { SingletonEditor } from "@/components/admin/SingletonEditor";
import { Loader2, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Omkar Chavan Studio" }, { name: "robots", content: "noindex" }] }),
  component: AdminRoute,
});

function AdminRoute() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  useEffect(() => setAuthed(!!tokenStore.get()), []);
  if (authed === null) return null;
  return (
    <div className="min-h-screen bg-secondary/30">
      <Toaster />
      {authed ? <Dashboard onLogout={() => setAuthed(false)} /> : <LoginForm onSuccess={() => setAuthed(true)} />}
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(email, password);
      onSuccess();
    } catch (e: any) {
      setErr(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 border border-border bg-background p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Studio</p>
          <h1 className="mt-1 font-serif text-3xl">Admin Sign In</h1>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</label>
          <Input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Password</label>
          <Input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
        </Button>
        <p className="text-xs text-muted-foreground">
          Default (from server seed): admin@studio.com / admin123
        </p>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  function handleLogout() {
    logout();
    onLogout();
  }
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Omkar Chavan Studio</p>
          <h1 className="font-serif text-3xl">Admin Panel</h1>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </header>

      <Tabs defaultValue="hero">
        <TabsList className="flex h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="why">Why Choose</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <div className="mt-8 rounded border border-border bg-background p-6">
          <TabsContent value="hero">
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
          </TabsContent>
          <TabsContent value="services">
            <ResourceManager
              resource="services"
              title="Services"
              fields={[
                { key: "title", label: "Title", type: "text" },
                { key: "desc", label: "Description", type: "textarea" },
                { key: "image", label: "Image", type: "image", preset: "service" },
              ]}
            />
          </TabsContent>
          <TabsContent value="portfolio">
            <ResourceManager
              resource="portfolio"
              title="Portfolio Items"
              fields={[
                { key: "category", label: "Category", type: "select", options: ["Weddings","Events","Portraits","Commercial","Products"] },
                { key: "h", label: "Tile size", type: "select", options: ["tall","medium","short"] },
                { key: "image", label: "Image", type: "image", preset: "portrait" },
              ]}
            />
            <p className="mt-3 text-xs text-muted-foreground">
              Choose "tall" → 3:4 · "medium" → 1:1 · "short" → 4:3 (uploader uses portrait 3:4; pick the matching ratio for best results)
            </p>
          </TabsContent>
          <TabsContent value="categories">
            <ResourceManager
              resource="categories"
              title="Category Showcase"
              fields={[
                { key: "name", label: "Name", type: "text" },
                { key: "image", label: "Image", type: "image", preset: "category" },
              ]}
            />
          </TabsContent>
          <TabsContent value="featured">
            <ResourceManager
              resource="featured-projects"
              title="Featured Projects"
              fields={[
                { key: "name", label: "Project Name", type: "text" },
                { key: "location", label: "Location", type: "text" },
                { key: "story", label: "Story", type: "textarea" },
                { key: "image", label: "Image", type: "image", preset: "featured" },
              ]}
            />
          </TabsContent>
          <TabsContent value="testimonials">
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
          </TabsContent>
          <TabsContent value="why">
            <ResourceManager
              resource="why-choose"
              title="Why Choose Us"
              fields={[
                { key: "title", label: "Title", type: "text" },
                { key: "desc", label: "Description", type: "textarea" },
              ]}
            />
          </TabsContent>
          <TabsContent value="stats">
            <ResourceManager
              resource="stats"
              title="Stats"
              fields={[
                { key: "value", label: "Value", type: "number" },
                { key: "label", label: "Label", type: "text" },
              ]}
            />
          </TabsContent>
          <TabsContent value="instagram">
            <ResourceManager
              resource="instagram"
              title="Instagram Grid"
              fields={[{ key: "image", label: "Image", type: "image", preset: "square" }]}
            />
          </TabsContent>
          <TabsContent value="about">
            <SingletonEditor
              settingKey="photographer"
              title="Photographer / About"
              fields={[
                { key: "name", label: "Name", type: "text" },
                { key: "tagline", label: "Tagline", type: "text" },
                { key: "intro", label: "Intro", type: "textarea" },
                { key: "portrait", label: "Portrait", type: "image", preset: "about" },
              ]}
            />
          </TabsContent>
          <TabsContent value="contact">
            <SingletonEditor
              settingKey="contact"
              title="Contact Info"
              fields={[
                { key: "phone", label: "Phone", type: "text" },
                { key: "email", label: "Email", type: "text" },
                { key: "address", label: "Address", type: "text" },
              ]}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
