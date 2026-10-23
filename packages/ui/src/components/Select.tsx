import { useId } from "react";
import { Select as UISelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FormField, describedBy, type FieldProps } from "./Field";
import { isDev } from "../lib/dev";
import { cn } from "../lib/cn";

export interface Option { key: string; label: string; description?: string; disabled?: boolean }

/** Usare solo con 4+ opzioni; sotto, RadioGroup (archetipo C). La descrizione delle opzioni è mostrata solo da RadioGroup. */
export function Select({ label, help, error, optional, hideLabel, options, value, defaultValue, onValueChange, placeholder = "Scegli", disabled, id: idProp, className }: FieldProps & {
  options: Option[]; value?: string; defaultValue?: string; onValueChange?: (v: string) => void; placeholder?: string; disabled?: boolean; id?: string; className?: string;
}) {
  const auto = useId(); const id = idProp ?? auto;
  if (isDev && options.length < 4) console.warn(`[pai] Select "${label}": con ${options.length} opzioni usa RadioGroup.`);
  return (
    <FormField id={id} label={label} help={help} error={error} optional={optional} hideLabel={hideLabel} className={className}>
      <UISelect value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger id={id} className={cn("w-full")} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, { help, error })}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => <SelectItem key={o.key} value={o.key} disabled={o.disabled}>{o.label}</SelectItem>)}
        </SelectContent>
      </UISelect>
    </FormField>
  );
}
