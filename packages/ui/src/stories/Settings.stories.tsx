import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../ui/button";
import { AppCard, SettingRow } from "../components/AppCard";
import { Tabs } from "../components/Tabs";
import { TextField } from "../components/TextField";
import { Switch } from "../components/Choice";
import { Badge } from "../components/Badge";
import { ConfirmDialog } from "../components/Modal";
import { toastSaved } from "../components/Toast";
import { PageHeader } from "../components/PageHeader";
import { Breadcrumb } from "../components/Breadcrumb";

const meta: Meta = { title: "Pagine/Impostazioni" };
export default meta;

export const Archetipo: StoryObj = {
  render: () => {
    const [del, setDel] = useState(false); const [tab, setTab] = useState("org");
    return (
      <div>
        <PageHeader title="Impostazioni" back={<Breadcrumb items={[{ label: "Studio", href: "#" }, { label: "Impostazioni" }]} />} />
        <Tabs orientation="vertical" selected={tab} onChange={setTab} items={[{ key: "profile", label: "Profilo" }, { key: "org", label: "Organizzazione" }, { key: "members", label: "Membri", count: 12 }, { key: "int", label: "Integrazioni" }, { key: "notif", label: "Notifiche" }].map((t) => ({
          ...t, content: t.key !== "org" ? <p className="text-sm text-ink-muted">Sezione "{t.label}"</p> : (
            <div className="flex flex-col gap-6">
              <AppCard title="Organizzazione" padded={false}>
                <div className="px-6">
                  <SettingRow label="Nome"><div className="flex max-w-md items-end gap-2"><TextField label="Nome" hideLabel defaultValue="PROAI S.r.l." className="flex-1" /><Button variant="outline" onClick={toastSaved}>Salva</Button></div></SettingRow>
                  <SettingRow label="Sede legale" description="Usata nelle fatture">Bari <Button size="sm" variant="ghost">Cambia</Button></SettingRow>
                </div>
              </AppCard>
              <AppCard title="Integrazioni" padded={false}>
                <div className="px-6">
                  <SettingRow label="Qonto"><div className="flex items-center justify-between"><Badge status="success" dot>Connesso</Badge><Button size="sm" variant="ghost">Disconnetti</Button></div></SettingRow>
                  <SettingRow label="ActiveCampaign"><div className="flex items-center justify-between"><Badge status="neutral">Non connesso</Badge><Button size="sm" variant="outline">Connetti</Button></div></SettingRow>
                </div>
              </AppCard>
              <AppCard title="Notifiche" padded={false}><div className="px-6"><Switch label="Riepilogo settimanale" description="Ogni lunedì alle 8:00" onCheckedChange={toastSaved} /></div></AppCard>
              <AppCard title="Zona pericolosa" danger description="Queste azioni non si possono annullare.">
                <div className="flex items-center justify-between text-sm"><span>Elimina l'organizzazione e tutti i suoi dati</span><Button variant="outline" className="text-danger" onClick={() => setDel(true)}>Elimina organizzazione</Button></div>
              </AppCard>
            </div>
          ),
        }))} />
        <ConfirmDialog open={del} onClose={() => setDel(false)} onConfirm={() => setDel(false)} objectName="PROAI S.r.l." consequence="Tutti i membri perderanno l'accesso e i dati saranno cancellati definitivamente." confirmText />
      </div>
    );
  },
};
