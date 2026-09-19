# Registro operativo

Il terzo registro del sistema (decisione 16). Vale per gli strumenti in cui una persona **lavora** per ore, non per quelli in cui **impara** o **si informa**: Studio, AI Opportunity Radar, CoursAI, la piattaforma finanziaria, i pannelli admin di learn.profession.ai.

| | Marketing | Learner | **Operational** |
|---|---|---|---|
| Chi | visitatore | studente | operatore, cliente B2B, admin |
| Job | convincere | orientare e motivare | far fare in fretta e senza errori |
| Font | General Sans | Figtree 16 | **Figtree 14** (13 compact) |
| Canvas | `#091314` + glow | shell teal + pannello bianco 24px | **shell teal appena visibile + pannello bianco 16px, oppure nessuna shell** |
| Densità | — | comfortable | **comfortable, tabelle compact** |
| Ombre | nessuna | `sm`, `xl` | `sm`, `xl` |
| Colore | espressivo | accento + banner | **accento solo su azione primaria e stato** |
| Motion | reveal, glow | 225/195ms | **150ms, solo feedback ad azione** |

## Regole

**1. La shell è un contesto, non un protagonista.** Nel learner la shell teal radiale comunica appartenenza alla community. In un tool operativo va ridotta: sidebar scura `neutral-950` con la sola traccia del gradiente (`shell-start` al 20% di opacità sull'angolo in alto), contenuto su `surface-panel` bianco a filo. Le app senza sidebar (Radar) usano una topbar da 56px e nessuna shell.

**2. Tipografia: quattro livelli, non di più.** Titolo pagina `xl` 24/600, titolo sezione `md` 16/600, corpo `base` 14/400, meta `xs` 12/400 `ink-muted`. Il tracking negativo dei titoli si applica solo dal livello `lg` in su. Numeri in tabella: `tabular-nums` sempre, allineati a destra.

**3. Colore = significato.** Il teal appare al massimo in tre posti per schermo: il bottone primario, l'elemento attivo della navigazione, un indicatore di progresso. Tutto il resto è neutro. I quattro stati (`success / warning / danger / info`) si usano solo per badge, alert, testo di validazione e bordi — mai come sfondo di card o intestazioni. Il rosso non è mai la prima cosa che si vede in uno schermo che non contiene un errore.

**4. Densità dichiarata alla radice.** `<div class="pai-operational pai-density-comfortable">`; le tabelle di lavoro sovrascrivono localmente con `pai-density-compact`. L'utente può cambiare densità nelle impostazioni: il valore è una preferenza per app, salvata, non un toggle per pagina.

**5. Gerarchia di superficie senza ombre sovrapposte.** Panel (bianco) → Card (bianco, bordo `line`, nessuna ombra) → Sunken (`neutral-50`, per aree di input, filtri, codice). Le ombre esistono solo sui bottoni (`sm`) e sugli overlay (`xl`). Due card non si annidano; dentro una card si usano divider.

**6. Layout.** Griglia 12 colonne, gutter 16px, margini 24px. Contenuto max 1280px; le tabelle possono superarlo con scroll orizzontale nel proprio contenitore. Pagina: `PageHeader` (titolo + azioni a destra) → barra filtri/tab → contenuto. Le azioni primarie stanno in alto a destra, mai in fondo alla pagina; nei form multi-step stanno in un footer sticky.

**7. Testo.** Tu informale, sentence case, verbi in prima posizione. Nei tool operativi si aggiungono tre regole:
- Le date in formato `19 set 2026`, orari `14:30`, numeri con separatore italiano (`1.250,00 €`, il simbolo dopo lo spazio).
- Ogni azione distruttiva chiede conferma nominando l'oggetto e la conseguenza: "Elimina il corso *Deep Learning*? Gli studenti iscritti perderanno l'accesso."
- Le conferme sono toast di 4 secondi, mai modali. Gli errori di sistema sono alert inline persistenti con un'azione di ripetizione.

**8. Stati obbligatori per ogni schermo.** Loading (skeleton, mai spinner a pagina intera), vuoto (`EmptyState` con un'azione), errore (alert + riprova), parziale (dati caricati ma filtro senza risultati: messaggio diverso dal vuoto). Un componente senza i quattro stati non è finito.

**9. Tastiera.** Ogni azione raggiungibile con Tab; Esc chiude overlay; Enter conferma nei form; frecce nelle tabelle e nei menu. Focus ring `teal-400` sempre visibile.

**10. Cosa non fare.** Icone 3D del sito, orb sfumate, glass, wireframe geometrici: sono lessico marketing. Nessun gradiente sui bottoni tranne il `ProfAIFab`. Nessuna emoji. Nessun ALL-CAPS. Nessun colore fuori dalle famiglie.

## Dark mode

Il registro operativo ha una dark mode di prima classe (gli operatori la chiedono). Si attiva con `.dark` sulla stessa radice; la mappa è nel CSS generato. Gli stati semantici salgono al 400 della propria scala; il rosso resta il colore meno luminoso dei quattro.
