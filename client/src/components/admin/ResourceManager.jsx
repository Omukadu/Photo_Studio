import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Pencil, Trash2, Plus, Loader2, X } from "lucide-react";
import { ImageUploadField } from "./ImageUploadField";
import toast from "react-hot-toast";

const inputCls = "mt-2 h-9 w-full rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
const btnCls = "inline-flex items-center gap-2 rounded border border-border bg-background px-3 py-1.5 text-sm hover:bg-secondary";
const btnPrimary = "inline-flex items-center gap-2 rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-50";

export function ResourceManager({ resource, title, fields, imageKey = "image" }) {
  const qc = useQueryClient();
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin", resource],
    queryFn: () => api.get(`/${resource}`),
  });

  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const save = useMutation({
    mutationFn: async (payload) => {
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
    onError: (e) => toast.error(e.message || "Save failed"),
  });

  const remove = useMutation({
    mutationFn: (id) => api.del(`/${resource}/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", resource] });
      qc.invalidateQueries({ queryKey: ["site-all"] });
      toast.success("Deleted");
    },
  });

  const startCreate = () => {
    const blank = { order: items.length };
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
        <button onClick={startCreate} className={btnPrimary}>
          <Plus className="h-4 w-4" /> New
        </button>
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
              <button className="rounded p-2 hover:bg-secondary" onClick={() => { setEditing(item); setOpen(true); }}>
                <Pencil className="h-4 w-4" />
              </button>
              <button
                className="rounded p-2 hover:bg-secondary"
                onClick={() => confirm("Delete this item?") && remove.mutate(item._id)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {open && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-background p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{editing?._id ? "Edit" : "New"} {title}</h3>
              <button className="rounded p-1 hover:bg-secondary" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </button>
            </div>
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
                <input
                  type="number"
                  className={inputCls}
                  value={editing.order ?? 0}
                  onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button className={btnCls} onClick={() => setOpen(false)}>Cancel</button>
              <button className={btnPrimary} onClick={() => save.mutate(editing)} disabled={save.isPending}>
                {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldInput({ field, value, onChange }) {
  if (field.type === "image") {
    return <ImageUploadField label={field.label} preset={field.preset} value={value} onChange={onChange} />;
  }
  if (field.type === "textarea") {
    return (
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{field.label}</label>
        <textarea
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
        />
      </div>
    );
  }
  if (field.type === "select") {
    return (
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{field.label}</label>
        <select value={value || ""} onChange={(e) => onChange(e.target.value)} className={inputCls}>
          <option value="">—</option>
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{field.label}</label>
      <input
        type={field.type === "number" ? "number" : "text"}
        className={inputCls}
        value={value ?? ""}
        onChange={(e) => onChange(field.type === "number" ? Number(e.target.value) : e.target.value)}
      />
    </div>
  );
}
