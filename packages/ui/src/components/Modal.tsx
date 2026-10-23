import { useId, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";
import { cn } from "../lib/cn";

const widths = { sm: "sm:max-w-sm", md: "sm:max-w-lg", lg: "sm:max-w-2xl", xl: "sm:max-w-4xl" };

/** Modale generico. Un titolo, un'azione primaria, "Annulla" a sinistra della primaria. Esc e click fuori chiudono. */
export function Modal({ open, onClose, title, description, children, primary, size = "md" }: {
  open: boolean; onClose: () => void; title: string; description?: string; children: ReactNode;
  primary?: { label: string; onClick: () => void | Promise<void>; loading?: boolean; danger?: boolean; disabled?: boolean }; size?: keyof typeof widths;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className={cn("rounded-lg shadow-xl", widths[size])}>
        <DialogHeader>
          <DialogTitle className="text-md font-semibold leading-heading">{title}</DialogTitle>
          <DialogDescription className={cn(!description && "sr-only")}>{description ?? title}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-sm">{children}</div>
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={onClose}>Annulla</Button>
          {primary && (
            <Button type="button" variant={primary.danger ? "destructive" : "default"} disabled={primary.disabled || primary.loading} onClick={primary.onClick}>
              {primary.loading && <Spinner aria-label="In corso" />}{primary.label}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Conferma distruttiva (registro, regola 7): nomina l'oggetto e la conseguenza. Con `confirmText`
 * chiede di digitare il nome per le azioni irreversibili (archetipo D, regola 3).
 */
export function ConfirmDialog({ open, onClose, onConfirm, objectName, verb = "Elimina", consequence, confirmText, loading }: {
  open: boolean; onClose: () => void; onConfirm: () => void | Promise<void>; objectName: string; verb?: string; consequence: string; confirmText?: boolean; loading?: boolean;
}) {
  const [typed, setTyped] = useState(""); const id = useId();
  const ok = !confirmText || typed.trim() === objectName;
  return (
    <Modal open={open} onClose={onClose} title={`${verb} ${objectName}?`} size="sm"
      primary={{ label: `${verb} ${objectName}`, onClick: onConfirm, danger: true, disabled: !ok, loading }}>
      <p>{consequence}</p>
      {confirmText && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={id}>Scrivi "{objectName}" per confermare</Label>
          <Input id={id} value={typed} onChange={(e) => setTyped(e.target.value)} autoFocus autoComplete="off" />
        </div>
      )}
    </Modal>
  );
}
