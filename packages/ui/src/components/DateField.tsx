import { useId, useState } from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormField, describedBy, type FieldProps } from "./Field";
import { cn } from "../lib/cn";

const fmt = (d: Date) => format(d, "d MMM yyyy", { locale: it });
const bounds = (min?: Date, max?: Date) => [min && { before: min }, max && { after: max }].filter(Boolean) as { before: Date }[] | { after: Date }[];

type Common = FieldProps & { id?: string; className?: string; disabled?: boolean; min?: Date; max?: Date; placeholder?: string };

/** Data singola, locale it-IT: "19 set 2026", settimana da lunedì. Controllato: `value` + `onChange`. */
export function DateField({ label, help, error, optional, hideLabel, id: idProp, className, disabled, min, max, placeholder = "Scegli una data", value, onChange }: Common & {
  value?: Date; onChange?: (d: Date | undefined) => void;
}) {
  const auto = useId(); const id = idProp ?? auto; const [open, setOpen] = useState(false);
  return (
    <FormField id={id} label={label} help={help} error={error} optional={optional} hideLabel={hideLabel} className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button id={id} type="button" variant="outline" disabled={disabled} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, { help, error })}
            className={cn("w-full justify-between font-normal", !value && "text-ink-muted")}>
            {value ? fmt(value) : placeholder}<CalendarIcon className="text-ink-muted" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={value} onSelect={(d) => { onChange?.(d); setOpen(false); }} locale={it} weekStartsOn={1} captionLayout="dropdown"
            defaultMonth={value} disabled={bounds(min, max)} autoFocus />
        </PopoverContent>
      </Popover>
    </FormField>
  );
}

/** Intervallo di date, due mesi affiancati. Si chiude quando l'intervallo è completo. */
export function DateRangeField({ label, help, error, optional, hideLabel, id: idProp, className, disabled, min, max, placeholder = "Scegli un periodo", value, onChange }: Common & {
  value?: DateRange; onChange?: (r: DateRange | undefined) => void;
}) {
  const auto = useId(); const id = idProp ?? auto; const [open, setOpen] = useState(false);
  const text = value?.from ? (value.to ? `${fmt(value.from)} – ${fmt(value.to)}` : fmt(value.from)) : placeholder;
  return (
    <FormField id={id} label={label} help={help} error={error} optional={optional} hideLabel={hideLabel} className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button id={id} type="button" variant="outline" disabled={disabled} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, { help, error })}
            className={cn("w-full justify-between font-normal", !value?.from && "text-ink-muted")}>
            {text}<CalendarIcon className="text-ink-muted" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="range" selected={value} onSelect={(r) => { onChange?.(r); if (r?.from && r?.to) setOpen(false); }} locale={it} weekStartsOn={1}
            numberOfMonths={2} defaultMonth={value?.from} disabled={bounds(min, max)} autoFocus />
        </PopoverContent>
      </Popover>
    </FormField>
  );
}
