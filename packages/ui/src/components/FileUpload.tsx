import { useId, useRef, useState, type DragEvent } from "react";
import { Button } from "../ui/button";
import { cn } from "../lib/cn";
import type { FieldProps } from "./Field";
import { fmtNumber } from "../lib/format";

const fmtSize = (b: number) => (b > 1e6 ? `${fmtNumber(b / 1e6, 1)} MB` : `${fmtNumber(b / 1e3)} KB`);

/** Drop zone + lista file. Il vincolo (tipi, dimensione) è scritto nell'aiuto, non scoperto all'errore. */
export function FileUpload({ label, help, error, optional, accept, multiple, maxSizeMb = 10, files, onChange }: FieldProps & {
  accept?: string; multiple?: boolean; maxSizeMb?: number; files: File[]; onChange: (f: File[]) => void;
}) {
  const id = useId(); const input = useRef<HTMLInputElement>(null); const [over, setOver] = useState(false);
  const add = (list: FileList | null) => {
    if (!list) return;
    const ok = Array.from(list).filter((f) => f.size <= maxSizeMb * 1e6);
    onChange(multiple ? [...files, ...ok] : ok.slice(0, 1));
  };
  const onDrop = (e: DragEvent) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); };
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">{label}{optional && <span className="font-normal text-ink-muted"> (opzionale)</span>}</label>
      <div onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={onDrop}
        className={cn("rounded-md border border-dashed bg-surface-sunken p-6 text-center text-sm transition-colors duration-fast",
          over ? "border-brand bg-brand-soft" : error ? "border-danger" : "border-line-strong")}>
        <input ref={input} id={id} type="file" className="sr-only" accept={accept} multiple={multiple} onChange={(e) => add(e.target.files)} />
        <p>Trascina qui i file o <Button type="button" size="sm" variant="link" className="px-0" onClick={() => input.current?.click()}>scegli dal computer</Button></p>
        <p className="mt-1 text-xs text-ink-muted">{accept ? `${accept.replace(/\./g, "").toUpperCase()} · ` : ""}max {maxSizeMb} MB{multiple ? " per file" : ""}</p>
      </div>
      {files.length > 0 && (
        <ul className="divide-y divide-line rounded-md border border-line">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex h-control items-center justify-between px-3 text-sm">
              <span className="truncate">{f.name} <span className="tabular-nums text-ink-faint">· {fmtSize(f.size)}</span></span>
              <Button type="button" size="sm" variant="ghost" onClick={() => onChange(files.filter((_, j) => j !== i))}>Rimuovi</Button>
            </li>
          ))}
        </ul>
      )}
      {error ? <p className="text-xs text-danger">{error}</p> : help ? <p className="text-xs text-ink-muted">{help}</p> : null}
    </div>
  );
}
