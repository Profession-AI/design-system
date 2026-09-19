import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@heroui/react";
import { AppCard, SettingRow } from "../components/AppCard";
import { Tabs } from "../components/Tabs";
import { TextField } from "../components/TextField";
import { Switch } from "../components/Choice";
import { Badge } from "../components/Badge";
import { ConfirmDialog } from "../components/Modal";
import { toastSaved } from "../components/Toast";
import { PageHeader } from "../components/PageHeader";

const meta: Meta = { title: "Pagine/Impostazioni" };
export default meta;

export const Archetipo: StoryObj = {
  render: () => {
    const [del, setDel] = useState(false);
    return (
      <div>
        <PageHeader title="Impostazioni" />
        <div className="flex gap-8">
          <Tabs orientation="vertical" selected="org" items={[{ key: "profile", label: "Profilo" }, { key: "org", label: "Organizzazione" }, { key: "members", label: "Membri", count: 12 }, { key: "int", label: "Integrazioni" }, { key: "notif", label: "Notifiche" }]} />
          <div className="flex-1 flex flex-col gap-6">
            <AppCard title="Organizzazione" padded={false}>
              <div className="px-6">
                <SettingRow label="Nome"><div className="flex gap-2 max-w-md"><TextField label="Nome" aria-label="Nome" classNames={{ label: "sr-only" }} defaultValue="PROAI S.r.l." /><Button className="self-end" variant="bordered" onPress={toastSaved}>Salva</Button></div></SettingRow>
                <SettingRow label="Sede legale" description="Usata nelle fatture">Bari <Button size="sm" variant="light">Cambia</Button></SettingRow>
              </div>
            </AppCard>
            <AppCard title="Integrazioni" padded={false}>
              <div className="px-6">
                <SettingRow label="Qonto"><div className="flex items-center justify-between"><Badge status="success" dot>Connesso</Badge><Button size="sm" variant="light">Disconnetti</Button></div></SettingRow>
                <SettingRow label="ActiveCampaign"><div className="flex items-center justify-between"><Badge status="neutral">Non connesso</Badge><Button size="sm" variant="bordered">Connetti</Button></div></SettingRow>
              </div>
            </AppCard>
            <AppCard title="Notifiche" padded={false}><div className="px-6"><Switch label="Riepilogo settimanale" description="Ogni lunedì alle 8:00" onValueChange={toastSaved} /></div></AppCard>
            <AppCard title="Zona pericolosa" danger description="Queste azioni non si possono annullare.">
              <div className="flex items-center justify-between text-sm"><span>Elimina l'organizzazione e tutti i suoi dati</span><Button color="danger" variant="bordered" onPress={() => setDel(true)}>Elimina organizzazione</Button></div>
            </AppCard>
          </div>
        </div>
        <ConfirmDialog isOpen={del} onClose={() => setDel(false)} onConfirm={() => setDel(false)} objectName="PROAI S.r.l." consequence="Tutti i membri perderanno l'accesso e i dati saranno cancellati definitivamente." confirmText />
      </div>
    );
  },
};
