import { Modal as HModal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { useState, type ReactNode } from "react";

/** Modale generico. Un titolo, un'azione primaria, "Annulla" a sinistra della primaria. Esc chiude. */
export function Modal({ isOpen, onClose, title, children, primary, size = "md" }: {
  isOpen: boolean; onClose: () => void; title: string; children: ReactNode;
  primary?: { label: string; onPress: () => void | Promise<void>; loading?: boolean; danger?: boolean; disabled?: boolean }; size?: "sm" | "md" | "lg" | "xl";
}) {
  return (
    <HModal isOpen={isOpen} onClose={onClose} size={size} radius="lg" classNames={{ base: "shadow-xl", header: "text-md font-semibold", footer: "gap-2" }}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody className="text-sm">{children}</ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>Annulla</Button>
          {primary && <Button color={primary.danger ? "danger" : "primary"} isLoading={primary.loading} isDisabled={primary.disabled} onPress={primary.onPress}>{primary.label}</Button>}
        </ModalFooter>
      </ModalContent>
    </HModal>
  );
}

/**
 * Conferma distruttiva (registro, regola 7): nomina l'oggetto e la conseguenza. Con `confirmText`
 * chiede di digitare il nome per le azioni irreversibili (archetipo D, regola 3).
 */
export function ConfirmDialog({ isOpen, onClose, onConfirm, objectName, verb = "Elimina", consequence, confirmText, loading }: {
  isOpen: boolean; onClose: () => void; onConfirm: () => void | Promise<void>; objectName: string; verb?: string; consequence: string; confirmText?: boolean; loading?: boolean;
}) {
  const [typed, setTyped] = useState("");
  const ok = !confirmText || typed.trim() === objectName;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${verb} ${objectName}?`} size="sm"
      primary={{ label: `${verb} ${objectName}`, onPress: onConfirm, danger: true, disabled: !ok, loading }}>
      <p>{consequence}</p>
      {confirmText && (
        <Input size="sm" variant="bordered" radius="sm" label={`Scrivi "${objectName}" per confermare`} labelPlacement="outside" value={typed} onValueChange={setTyped} autoFocus />
      )}
    </Modal>
  );
}
