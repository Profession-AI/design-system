import { DatePicker, DateRangePicker, type DatePickerProps, type DateRangePickerProps } from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
import { fieldProps, type FieldProps } from "./Field";
/** Locale it-IT forzata: formato "19/09/2026", settimana da lunedì. */
export function DateField({ label, help, error, optional, ...rest }: FieldProps & Omit<DatePickerProps, "label" | "description" | "errorMessage">) {
  return <I18nProvider locale="it-IT"><DatePicker radius="sm" variant="bordered" showMonthAndYearPickers {...fieldProps({ label, help, error, optional })} {...rest} /></I18nProvider>;
}
export function DateRangeField({ label, help, error, optional, ...rest }: FieldProps & Omit<DateRangePickerProps, "label" | "description" | "errorMessage">) {
  return <I18nProvider locale="it-IT"><DateRangePicker radius="sm" variant="bordered" {...fieldProps({ label, help, error, optional })} {...rest} /></I18nProvider>;
}
