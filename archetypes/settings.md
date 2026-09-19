# Archetipo D — Impostazioni

**Quando:** configurazione di account, organizzazione, integrazioni, notifiche, membri. Pagine visitate raramente, dove l'utente deve trovare una cosa precisa.

```
┌──────────────────────────────────────────────────────────────┐
│ PageHeader   Impostazioni                                      │
├───────────────┬──────────────────────────────────────────────┤
│ nav verticale │ Sezione: Profilo                               │
│ ● Profilo     │ ┌─ AppCard ────────────────────────────────┐  │
│ ○ Organizz.   │ │ Nome            [TextField]        Salva  │  │
│ ○ Membri      │ │ ─────────────────────────────────────────│  │
│ ○ Integrazioni│ │ Email           giuseppe@…   Cambia       │  │
│ ○ Notifiche   │ └───────────────────────────────────────────┘  │
│ ○ Fatturazione│ ┌─ AppCard: Notifiche ─────────────────────┐  │
│               │ │ Riepilogo settimanale         [Switch]    │  │
│               │ └───────────────────────────────────────────┘  │
│               │ ┌─ AppCard danger: Zona pericolosa ────────┐  │
│               │ │ Elimina organizzazione   [Elimina…]       │  │
│               │ └───────────────────────────────────────────┘  │
└───────────────┴──────────────────────────────────────────────┘
```

**Componenti:** `PageHeader`, nav verticale (`Tabs` orientation="vertical" sotto 1024px diventa `Select`), `AppCard` + `AppDivider`, `TextField`, `Switch`, `Select`, `Modal` di conferma, `Toast`.

**Regole**
1. Ogni sezione è una card con titolo e, se serve, una riga di spiegazione. Righe interne: etichetta a sinistra (200px), controllo a destra, divider tra le righe.
2. Salvataggio per riga o per card, mai un "Salva tutto" in fondo alla pagina. Gli switch salvano subito con toast "Salvato".
3. La zona pericolosa esiste in una sola card, in fondo, con bordo `danger` e bottone `danger` variant="bordered". La conferma è un `Modal` che chiede di digitare il nome dell'oggetto per azioni irreversibili.
4. Integrazioni: una riga per servizio con logo, stato (`Badge` success "Connesso" / neutral "Non connesso") e un'unica azione.
5. Membri: è l'archetipo A dentro una sezione — riusa `DataTable` compact senza FilterBar se sotto 20 righe.
6. Stati: le card caricano indipendenti; un errore di salvataggio è un `Alert` danger dentro la card con il valore precedente ripristinato.

**Anti-pattern:** accordion per le sezioni; password in chiaro nei campi "cambia"; card di impostazioni che aprono altri modali a cascata.
