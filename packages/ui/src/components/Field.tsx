import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Field, FieldLabel, FieldDescription, FieldError } from "../ui/field";

/**
 * Prop comuni a tutti i controlli di form (archetipo C, regole 3–4):
 * label sopra, aiuto sotto, errore che sostituisce l'aiuto, "(opzionale)" invece dell'asterisco.
 */
export interface FieldProps {
  label: string;
  help?: string;
  error?: string;
  optional?: boolean;
  /** Label solo per screen reader (es. campo dentro una SettingRow che ha già l'etichetta). */
  hideLabel?: boolean;
}

/** id dell'elemento che descrive il controllo, da passare come aria-describedby. */
export const describedBy = (id: string, { help, error }: Pick<FieldProps, "help" | "error">) =>
  error ? `${id}-error` : help ? `${id}-help` : undefined;

/**
 * Wrapper visivo per un controllo custom. I componenti del DS (TextField, Select, DateField…) lo usano già;
 * serve quando componi un controllo nuovo a partire dalle primitive in `ui/`.
 */
export function FormField({ id, label, help, error, optional, hideLabel, className, children }: FieldProps & { id: string; className?: string; children: ReactNode }) {
  return (
    <Field data-invalid={error ? true : undefined} className={cn("gap-1.5", className)}>
      <FieldLabel htmlFor={id} className={cn(hideLabel && "sr-only")}>
        {label}{optional && <span className="font-normal text-ink-muted">(opzionale)</span>}
      </FieldLabel>
      {children}
      {error ? <FieldError id={`${id}-error`} className="text-xs">{error}</FieldError>
        : help ? <FieldDescription id={`${id}-help`} className="text-xs">{help}</FieldDescription> : null}
    </Field>
  );
}
