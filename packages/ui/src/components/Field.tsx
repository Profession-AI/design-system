/**
 * Wrapper unico per tutti i controlli di form (archetipo C, regole 3–4):
 * label sopra, aiuto sotto, errore che sostituisce l'aiuto, "(opzionale)" invece dell'asterisco.
 * Le prop comuni sono normalizzate in `fieldProps()` e passate ai componenti HeroUI.
 */
export interface FieldProps {
  label: string;
  help?: string;
  error?: string;
  optional?: boolean;
}
export function fieldProps({ label, help, error, optional }: FieldProps) {
  return {
    label: optional ? `${label} (opzionale)` : label,
    labelPlacement: "outside" as const,
    isRequired: !optional,
    description: error ? undefined : help,
    errorMessage: error,
    isInvalid: !!error,
    // validazione al blur, mai durante la digitazione (regola 3)
    validationBehavior: "aria" as const,
  };
}
