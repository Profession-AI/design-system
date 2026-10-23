import { useId, type ComponentProps, type ReactNode } from "react";
import { Checkbox as UICheckbox } from "../ui/checkbox";
import { RadioGroup as UIRadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch as UISwitch } from "../ui/switch";
import { Label } from "../ui/label";
import { FieldSet, FieldLegend, FieldDescription, FieldError } from "../ui/field";
import { cn } from "../lib/cn";
import type { Option } from "./Select";
import type { FieldProps } from "./Field";

/** Legenda + aiuto/errore per i gruppi di scelta. */
function Group({ id, label, help, error, optional, children }: FieldProps & { id: string; children: ReactNode }) {
  return (
    <FieldSet data-invalid={error ? true : undefined} className="gap-2" aria-describedby={error ? `${id}-error` : help ? `${id}-help` : undefined}>
      <FieldLegend variant="label" className="mb-1">{label}{optional && <span className="font-normal text-ink-muted"> (opzionale)</span>}</FieldLegend>
      {children}
      {error ? <FieldError id={`${id}-error`} className="text-xs">{error}</FieldError>
        : help ? <FieldDescription id={`${id}-help`} className="text-xs">{help}</FieldDescription> : null}
    </FieldSet>
  );
}

const OptionLabel = ({ htmlFor, option }: { htmlFor: string; option: Option }) => (
  <Label htmlFor={htmlFor} className={cn("flex-col items-start gap-0.5 font-normal leading-snug", option.disabled && "opacity-50")}>
    <span>{option.label}</span>
    {option.description && <span className="text-xs text-ink-muted">{option.description}</span>}
  </Label>
);

/** 2–4 opzioni mutuamente esclusive. */
export function RadioGroup({ options, orientation = "vertical", value, defaultValue, onValueChange, ...field }: FieldProps & {
  options: Option[]; orientation?: "vertical" | "horizontal"; value?: string; defaultValue?: string; onValueChange?: (v: string) => void;
}) {
  const id = useId();
  return (
    <Group id={id} {...field}>
      <UIRadioGroup value={value} defaultValue={defaultValue} onValueChange={onValueChange} aria-invalid={field.error ? true : undefined}
        className={cn(orientation === "horizontal" ? "flex flex-wrap gap-6" : "gap-2.5")}>
        {options.map((o) => (
          <div key={o.key} className="flex items-start gap-2">
            <RadioGroupItem id={`${id}-${o.key}`} value={o.key} disabled={o.disabled} className="mt-px" />
            <OptionLabel htmlFor={`${id}-${o.key}`} option={o} />
          </div>
        ))}
      </UIRadioGroup>
    </Group>
  );
}

/** Scelta multipla non immediata. */
export function CheckboxGroupField({ options, value = [], onValueChange, ...field }: FieldProps & { options: Option[]; value?: string[]; onValueChange?: (v: string[]) => void }) {
  const id = useId();
  const toggle = (k: string, on: boolean) => onValueChange?.(on ? [...value, k] : value.filter((v) => v !== k));
  return (
    <Group id={id} {...field}>
      <div className="flex flex-col gap-2.5" role="group">
        {options.map((o) => (
          <div key={o.key} className="flex items-start gap-2">
            <UICheckbox id={`${id}-${o.key}`} checked={value.includes(o.key)} disabled={o.disabled} onCheckedChange={(c) => toggle(o.key, c === true)} className="mt-px" />
            <OptionLabel htmlFor={`${id}-${o.key}`} option={o} />
          </div>
        ))}
      </div>
    </Group>
  );
}

/** Checkbox singola con etichetta. `checked` / `onCheckedChange` come la primitiva Radix. */
export function Checkbox({ children, id: idProp, className, ...p }: Omit<ComponentProps<typeof UICheckbox>, "id"> & { id?: string; children?: ReactNode }) {
  const auto = useId(); const id = idProp ?? auto;
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <UICheckbox id={id} {...p} />
      {children && <Label htmlFor={id} className="font-normal">{children}</Label>}
    </div>
  );
}

/** Solo per scelte a effetto immediato (salva subito + toast). Altrimenti Checkbox. */
export function Switch({ label, description, id: idProp, className, ...p }: Omit<ComponentProps<typeof UISwitch>, "id" | "size"> & { label: string; description?: string; id?: string }) {
  const auto = useId(); const id = idProp ?? auto;
  return (
    <div className={cn("flex items-center justify-between gap-6 py-2", className)}>
      <Label htmlFor={id} className="flex-col items-start gap-0.5 font-normal leading-snug">
        <span className="text-sm">{label}</span>
        {description && <span className="text-xs text-ink-muted">{description}</span>}
      </Label>
      <UISwitch id={id} {...p} />
    </div>
  );
}
