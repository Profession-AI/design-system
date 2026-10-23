import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import { Stepper, StepFooter } from "../components/Stepper";
import { TextField, Textarea } from "../components/TextField";
import { Select } from "../components/Select";
import { RadioGroup, CheckboxGroupField, Switch, Checkbox } from "../components/Choice";
import { DateField, DateRangeField } from "../components/DateField";
import { FileUpload } from "../components/FileUpload";
import { Modal } from "../components/Modal";
import { Drawer } from "../components/Drawer";

const meta: Meta = { title: "Form/Multi-step" };
export default meta;

export const Archetipo: StoryObj = {
  render: () => {
    const [step, setStep] = useState(1); const [files, setFiles] = useState<File[]>([]); const [leave, setLeave] = useState(false); const [drawer, setDrawer] = useState(false);
    const [start, setStart] = useState<Date | undefined>(); const [period, setPeriod] = useState<DateRange | undefined>(); const [tags, setTags] = useState<string[]>(["cert"]);
    return (
      <div className="flex flex-col gap-8">
        <Stepper current={step} onStepClick={setStep} steps={[{ key: "a", label: "Informazioni", hasError: true }, { key: "b", label: "Programma" }, { key: "c", label: "Prezzo" }, { key: "d", label: "Revisione" }]} />
        <div className="flex max-w-reading flex-col gap-6">
          <div><h2 className="text-md font-semibold">Programma</h2><p className="text-sm text-ink-muted">Struttura del master: moduli, durata e materiali.</p></div>
          <TextField label="Titolo del master" help="Compare nel certificato: usa il nome ufficiale." />
          <TextField label="Codice interno" error="Serve almeno una lettera maiuscola e un numero." defaultValue="promptng" />
          <Textarea label="Descrizione" optional />
          <Select label="Livello" options={[{ key: "0", label: "Per chi parte da zero" }, { key: "1", label: "Base" }, { key: "2", label: "Intermedio" }, { key: "3", label: "Avanzato" }]} />
          <RadioGroup label="Modalità" defaultValue="live" options={[{ key: "live", label: "Live", description: "Sessioni in diretta con docente" }, { key: "async", label: "On demand" }]} />
          <CheckboxGroupField label="Include" value={tags} onValueChange={setTags} options={[{ key: "cert", label: "Certificato finale" }, { key: "career", label: "Career Advisor" }, { key: "live", label: "Live session settimanali", disabled: true }]} />
          <DateField label="Data di inizio" value={start} onChange={setStart} min={new Date()} />
          <DateRangeField label="Periodo iscrizioni" optional value={period} onChange={setPeriod} />
          <FileUpload label="Programma dettagliato" optional accept=".pdf" maxSizeMb={20} files={files} onChange={setFiles} help="PDF fino a 20 MB." />
          <Checkbox>Pubblica anche nel catalogo aziende</Checkbox>
          <Switch label="Iscrizioni aperte" description="Salva subito" />
          <Button variant="outline" className="self-start" onClick={() => setDrawer(true)}>Apri scheda laterale</Button>
        </div>
        <StepFooter status="Bozza salvata alle 14:32">
          <Button variant="ghost" onClick={() => setLeave(true)}>Esci</Button>
          <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))}>Indietro</Button>
          <Button onClick={() => setStep(Math.min(3, step + 1))}>Continua</Button>
        </StepFooter>
        <Modal open={leave} onClose={() => setLeave(false)} title="Esci senza salvare?" primary={{ label: "Esci comunque", onClick: () => setLeave(false), danger: true }}>
          Le modifiche a questo step andranno perse.
        </Modal>
        <Drawer open={drawer} onClose={() => setDrawer(false)} title="Deep Learning" subtitle="Master · 12 moduli" footer={<Button onClick={() => setDrawer(false)}>Chiudi</Button>}>
          <p>Scheda laterale da 480px: anteprima dell'oggetto selezionato nella lista (archetipo A).</p>
        </Drawer>
      </div>
    );
  },
};
