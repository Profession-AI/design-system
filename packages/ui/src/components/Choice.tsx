import { Checkbox as HCheckbox, CheckboxGroup, RadioGroup as HRadioGroup, Radio, Switch as HSwitch, type CheckboxProps, type SwitchProps } from "@heroui/react";
import type { Option } from "./Select";
import type { FieldProps } from "./Field";

const groupProps = ({ label, help, error, optional }: FieldProps) => ({
  label: optional ? `${label} (opzionale)` : label, description: error ? undefined : help, errorMessage: error, isInvalid: !!error,
});

/** 2–4 opzioni mutuamente esclusive. */
export function RadioGroup({ options, orientation = "vertical", ...f }: FieldProps & { options: Option[]; orientation?: "vertical" | "horizontal"; value?: string; onValueChange?: (v: string) => void }) {
  const { options: _o, ...field } = { options, ...f };
  return (
    <HRadioGroup orientation={orientation} {...groupProps(field)} value={f.value} onValueChange={f.onValueChange}>
      {options.map((o) => <Radio key={o.key} value={o.key} description={o.description} isDisabled={o.disabled}>{o.label}</Radio>)}
    </HRadioGroup>
  );
}

/** Scelta multipla non immediata. */
export function CheckboxGroupField({ options, ...f }: FieldProps & { options: Option[]; value?: string[]; onValueChange?: (v: string[]) => void }) {
  return (
    <CheckboxGroup {...groupProps(f)} value={f.value} onValueChange={f.onValueChange}>
      {options.map((o) => <HCheckbox key={o.key} value={o.key} isDisabled={o.disabled}>{o.label}</HCheckbox>)}
    </CheckboxGroup>
  );
}

export const Checkbox = (p: CheckboxProps) => <HCheckbox radius="sm" {...p} />;

/** Solo per scelte a effetto immediato (salva subito + toast). Altrimenti Checkbox. */
export function Switch({ label, description, ...p }: SwitchProps & { label: string; description?: string }) {
  return (
    <div className="flex items-center justify-between gap-6 py-2">
      <div><div className="text-sm">{label}</div>{description && <div className="text-xs text-ink-muted">{description}</div>}</div>
      <HSwitch size="sm" color="primary" aria-label={label} {...p} />
    </div>
  );
}
