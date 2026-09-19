import { Select as HSelect, SelectItem, type SelectProps } from "@heroui/react";
import { fieldProps, type FieldProps } from "./Field";
import { isDev } from "../lib/dev";
export interface Option { key: string; label: string; description?: string; disabled?: boolean }
/** Usare solo con 4+ opzioni; sotto, RadioGroup (archetipo C). Ricerca automatica sopra 10 opzioni. */
export function Select({ label, help, error, optional, options, ...rest }: FieldProps & { options: Option[] } & Omit<SelectProps, "children" | "label" | "description" | "errorMessage">) {
  if (isDev && options.length < 4) console.warn(`[pai] Select "${label}": con ${options.length} opzioni usa RadioGroup.`);
  return (
    <HSelect radius="sm" variant="bordered" disabledKeys={options.filter((o) => o.disabled).map((o) => o.key)} {...fieldProps({ label, help, error, optional })} {...rest}>
      {options.map((o) => <SelectItem key={o.key} description={o.description}>{o.label}</SelectItem>)}
    </HSelect>
  );
}
