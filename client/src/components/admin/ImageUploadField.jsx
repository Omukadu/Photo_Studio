import { useRef, useState } from "react";
import { api } from "@/lib/api";
import { Loader2, Upload, X } from "lucide-react";

const RATIO_LABEL = {
  hero: "16:9 (2400×1350)",
  featured: "16:9 (2000×1125)",
  service: "4:5 (1200×1500)",
  about: "3:4 (1200×1600)",
  portrait: "3:4 (1200×1600)",
  square: "1:1 (1200×1200)",
  landscape: "4:3 (1600×1200)",
  category: "3:4 (1200×1600)",
};

export function ImageUploadField({ preset, value, onChange, label = "Image" }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const url = typeof value === "string" ? value : value?.url;

  async function handleFile(file) {
    setError(null);
    setUploading(true);
    try {
      const res = await api.upload(preset, file);
      onChange(res);
    } catch (e) {
      setError(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label} <span className="opacity-60">· {RATIO_LABEL[preset]}</span>
      </label>
      <div className="mt-2 flex items-center gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded border border-border bg-muted">
          {url ? (
            <img src={url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">No image</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded border border-border bg-background px-3 py-1.5 text-sm hover:bg-secondary disabled:opacity-50"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {url ? "Replace" : "Upload"}
          </button>
          {url && (
            <button
              type="button"
              onClick={() => onChange({ url: "", publicId: "" })}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
            >
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
