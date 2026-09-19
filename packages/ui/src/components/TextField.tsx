import { Input, Textarea as HTextarea, type InputProps, type TextAreaProps } from "@heroui/react";
import { fieldProps, type FieldProps } from "./Field";

export function TextField({ label, help, error, optional, ...rest }: FieldProps & Omit<InputProps, "label" | "description" | "errorMessage">) {
  return <Input radius="sm" variant="bordered" {...fieldProps({ label, help, error, optional })} {...rest} />;
}
export function Textarea({ label, help, error, optional, ...rest }: FieldProps & Omit<TextAreaProps, "label" | "description" | "errorMessage">) {
  return <HTextarea radius="sm" variant="bordered" minRows={3} {...fieldProps({ label, help, error, optional })} {...rest} />;
}
