import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ImageUploadField } from "./ImageUploadField";
import { toast } from "sonner";

type Field =
  | { key: string; label: string; type: "text" | "textarea" }
  | { key: string; label: string; type: "image"; preset: string };

export function SingletonEditor({
  settingKey,
  title,
  fields,
}: {
  settingKey: string;
  title: string;
  fields: Field[];
}) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<any>({
    queryKey: ["admin", "settings", settingKey],
    queryFn: () => api.get(`/settings/${settingKey}`),
  });
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const save = useMutation({
    mutationFn: (payload: any) => api.put(`/settings/${settingKey}`, payload),
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
              preset={f.preset as any}
              value={form[f.key]}
              onChange={(v) => setForm({ ...form, [f.key]: v.url })}
            />
          );
        }
        if (f.type === "textarea") {
          return (
            <div key={f.key}>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{f.label}</label>
              <Textarea value={form[f.key] || ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} rows={3} />
            </div>
          );
        }
        return (
          <div key={f.key}>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{f.label}</label>
            <Input value={form[f.key] || ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          </div>
        );
      })}
      <Button onClick={() => save.mutate(form)} disabled={save.isPending}>
        {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Save
      </Button>
    </div>
  );
}
