import { useId, type ComponentProps } from "react";
import { Input } from "../ui/input";
import { Textarea as UITextarea } from "../ui/textarea";
import { FormField, describedBy, type FieldProps } from "./Field";

type Common = FieldProps & { id?: string; className?: string };

/** Campo di testo. Validazione al blur, mai durante la digitazione (regola 3): gestiscila nell'app e passa `error`. */
export function TextField({ label, help, error, optional, hideLabel, id: idProp, className, ...rest }: Common & Omit<ComponentProps<"input">, "id" | "className">) {
  const auto = useId(); const id = idProp ?? auto;
  return (
    <FormField id={id} label={label} help={help} error={error} optional={optional} hideLabel={hideLabel} className={className}>
      <Input id={id} aria-invalid={error ? true : undefined} aria-required={!optional || undefined} aria-describedby={describedBy(id, { help, error })} {...rest} />
    </FormField>
  );
}

export function Textarea({ label, help, error, optional, hideLabel, id: idProp, className, rows = 3, ...rest }: Common & Omit<ComponentProps<"textarea">, "id" | "className">) {
  const auto = useId(); const id = idProp ?? auto;
  return (
    <FormField id={id} label={label} help={help} error={error} optional={optional} hideLabel={hideLabel} className={className}>
      <UITextarea id={id} rows={rows} aria-invalid={error ? true : undefined} aria-required={!optional || undefined} aria-describedby={describedBy(id, { help, error })} {...rest} />
    </FormField>
  );
}
