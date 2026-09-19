import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@heroui/react";
import { Stepper, StepFooter } from "../components/Stepper";
import { TextField, Textarea } from "../components/TextField";
import { Select } from "../components/Select";
import { RadioGroup, Switch, Checkbox } from "../components/Choice";
import { DateField } from "../components/DateField";
import { FileUpload } from "../components/FileUpload";
import { Modal } from "../components/Modal";

const meta: Meta = { title: "Form/Multi-step" };
export default meta;

export const Archetipo: StoryObj = {
  render: () => {
    const [step, setStep] = useState(1); const [files, setFiles] = useState<File[]>([]); const [leave, setLeave] = useState(false);
    return (
      <div className="flex flex-col gap-8">
        <Stepper current={step} onStepClick={setStep} steps={[{ key: "a", label: "Informazioni", hasError: true }, { key: "b", label: "Programma" }, { key: "c", label: "Prezzo" }, { key: "d", label: "Revisione" }]} />
        <div className="max-w-reading flex flex-col gap-6">
          <div><h2 className="text-md font-semibold">Programma</h2><p className="text-sm text-ink-muted">Struttura del master: moduli, durata e materiali.</p></div>
          <TextField label="Titolo del master" help="Compare nel certificato: usa il nome ufficiale." />
          <TextField label="Codice interno" error="Serve almeno una lettera maiuscola e un numero." defaultValue="promptng" />
          <Textarea label="Descrizione" optional />
          <Select label="Livello" options={[{ key: "0", label: "Per chi parte da zero" }, { key: "1", label: "Base" }, { key: "2", label: "Intermedio" }, { key: "3", label: "Avanzato" }]} placeholder="Scegli" />
          <RadioGroup label="Modalità" options={[{ key: "live", label: "Live", description: "Sessioni in diretta con docente" }, { key: "async", label: "On demand" }]} />
          <DateField label="Data di inizio" />
          <FileUpload label="Programma dettagliato" optional accept=".pdf" maxSizeMb={20} files={files} onChange={setFiles} help="PDF fino a 20 MB." />
          <Checkbox>Pubblica anche nel catalogo aziende</Checkbox>
          <Switch label="Iscrizioni aperte" description="Salva subito" />
        </div>
        <StepFooter status="Bozza salvata alle 14:32">
          <Button variant="light" onPress={() => setLeave(true)}>Esci</Button>
          <Button variant="bordered" onPress={() => setStep(Math.max(0, step - 1))}>Indietro</Button>
          <Button color="primary" onPress={() => setStep(Math.min(3, step + 1))}>Continua</Button>
        </StepFooter>
        <Modal isOpen={leave} onClose={() => setLeave(false)} title="Esci senza salvare?" primary={{ label: "Esci comunque", onPress: () => setLeave(false), danger: true }}>
          Le modifiche a questo step andranno perse.
        </Modal>
      </div>
    );
  },
};
