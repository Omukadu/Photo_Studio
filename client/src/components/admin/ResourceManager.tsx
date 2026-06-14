import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import { ImageUploadField } from "./ImageUploadField";
import { toast } from "sonner";

export type FieldDef =
  | { key: string; label: string; type: "text" | "textarea" | "number" }
  | { key: string; label: string; type: "select"; options: string[] }
  | { key: string; label: string; type: "image"; preset: string };

export function ResourceManager({
  resource,
  title,
  fields,
  imageKey = "image",
}: {
  resource: string;
  title: string;
  fields: FieldDef[];
  imageKey?: string;
}) {
  const qc = useQueryClient();
  const { data: items = [], isLoading } = useQuery<any[]>({
    queryKey: ["admin", resource],
    queryFn: () => api.get(`/${resource}`),
  });

  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const save = useMutation({
    mutationFn: async (payload: any) => {
      if (payload._id) {
        const { _id, ...rest } = payload;
        return api.put(`/${resource}/${_id}`, rest);
      }
      return api.post(`/${resource}`, payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", resource] });
      qc.invalidateQueries({ queryKey: ["site-all"] });
      setOpen(false);
      setEditing(null);
      toast.success("Saved");
    },
    onError: (e: any) => toast.error(e.message || "Save failed"),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.del(`/${resource}/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", resource] });
      qc.invalidateQueries({ queryKey: ["site-all"] });
      toast.success("Deleted");
    },
  });

  const startCreate = () => {
    const blank: any = { order: items.length };
    fields.forEach((f) => {
      if (f.type === "number") blank[f.key] = 0;
      else if (f.type === "image") blank[f.key] = { url: "", publicId: "" };
      else blank[f.key] = "";
    });
    setEditing(blank);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button onClick={startCreate} size="sm">
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>

      {isLoading ? (
        <div className="mt-8 flex justify-center"><Loader2 className="h-5 w-5 animate-spin" /></div>
      ) : items.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">No items yet. Click "New" to add one.</p>
      ) : (
        <div className="mt-6 divide-y divide-border rounded border border-border">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-4 p-4">
              {item[imageKey]?.url && (
                <img src={item[imageKey].url} alt="" className="h-14 w-14 rounded object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                  {item.title || item.name || item.label || item.category || "(untitled)"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {item.desc || item.quote || item.story || item.subtitle || ""}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => { setEditing(item); setOpen(true); }}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => confirm("Delete this item?") && remove.mutate(item._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setEditing(null); }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing?._id ? "Edit" : "New"} {title}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              {fields.map((f) => (
                <FieldInput
                  key={f.key}
                  field={f}
                  value={editing[f.key]}
                  onChange={(v) => setEditing({ ...editing, [f.key]: v })}
                />
              ))}
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Order</label>
                <Input
                  type="number"
                  value={editing.order ?? 0}
                  onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => save.mutate(editing)} disabled={save.isPending}>
              {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FieldInput({ field, value, onChange }: { field: FieldDef; value: any; onChange: (v: any) => void }) {
  if (field.type === "image") {
    return (
      <ImageUploadField
        label={field.label}
        preset={field.preset as any}
        value={value}
        onChange={onChange}
      />
    );
  }
  if (field.type === "textarea") {
    return (
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{field.label}</label>
        <Textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={4} />
      </div>
    );
  }
  if (field.type === "select") {
    return (
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{field.label}</label>
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
        >
          <option value="">—</option>
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{field.label}</label>
      <Input
        type={field.type === "number" ? "number" : "text"}
        value={value ?? ""}
        onChange={(e) => onChange(field.type === "number" ? Number(e.target.value) : e.target.value)}
      />
    </div>
  );
}
