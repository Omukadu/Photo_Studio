import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { ImageUploadField } from "./ImageUploadField";
import toast from "react-hot-toast";

const inputCls = "mt-2 h-9 w-full rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

export function SingletonEditor({ settingKey, title, fields }) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "settings", settingKey],
    queryFn: () => api.get(`/settings/${settingKey}`),
  });
  const [form, setForm] = useState({});

  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = useMutation({
    mutationFn: (payload) => api.put(`/settings/${settingKey}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site-all"] });
      qc.invalidateQueries({ queryKey: ["admin", "settings", settingKey] });
      toast.success("Saved");
    },
  });

  if (isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {fields.map((f) => {
        if (f.type === "image") {
          return (
            <ImageUploadField
              key={f.key}
              label={f.label}
              preset={f.preset}
              value={form[f.key]}
              onChange={(v) => setForm({ ...form, [f.key]: v.url })}
            />
          );
        }
        if (f.type === "textarea") {
          return (
            <div key={f.key}>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{f.label}</label>
              <textarea
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={form[f.key] || ""}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                rows={3}
              />
            </div>
          );
        }
        return (
          <div key={f.key}>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{f.label}</label>
            <input className={inputCls} value={form[f.key] || ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          </div>
        );
      })}
      <button
        onClick={() => save.mutate(form)}
        disabled={save.isPending}
        className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-50"
      >
        {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Save
      </button>
    </div>
  );
}
