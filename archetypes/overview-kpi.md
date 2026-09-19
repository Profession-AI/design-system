# Archetipo B — Overview con KPI

**Quando:** la pagina risponde a "come sta andando?" — la home di un tool, un report, il cruscotto di un master. Non è una pagina di lavoro: si guarda e si decide dove andare.

```
┌──────────────────────────────────────────────────────────────┐
│ PageHeader   Panoramica                     [Periodo ▾][Esporta] │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│ KpiCard      │ KpiCard      │ KpiCard      │ KpiCard          │
│ 1.250 €  ▲8% │ 312     ▼3%  │ 42 %         │ 18 giorni        │
├──────────────┴──────────────┴──────┬───────┴─────────────────┤
│ Chart principale (8 col)            │ Lista "da fare" (4 col) │
│ andamento nel periodo               │ 5 righe max → link      │
├─────────────────────────────────────┴─────────────────────────┤
│ DataTable riassuntiva (top 10) → "Vedi tutti"                  │
└──────────────────────────────────────────────────────────────┘
```

**Componenti:** `PageHeader`, `KpiCard` ×3–5, `ChartFrame` con palette `chart.categorical`, `AppCard`, `DataTable` (compact, senza paginazione), `Tabs` opzionali per cambiare vista.

**Regole**
1. Da 3 a 5 KPI, mai 6+. Ogni KPI: numero grande `2xl` tabular, etichetta sotto in `ink-muted`, delta con freccia e colore semantico (`success`/`danger`) **solo se il confronto è definito** (vs periodo precedente). Nessun delta = nessun colore.
2. Il periodo è unico per tutta la pagina e sta nell'header; ogni card lo eredita.
3. Un solo grafico grande. Serie 1 sempre teal; massimo 4 serie; legenda sopra a destra; griglia solo orizzontale in `chart.grid`; asse in `chart.axis`. Tooltip con valore formattato in italiano.
4. La lista "da fare" è la ragione per cui l'utente torna: ha priorità visiva sulle tabelle riassuntive.
5. Ogni blocco ha un link "Vedi tutti" verso l'archetipo A corrispondente: la overview non permette editing.
6. Stati: ogni card carica indipendentemente (skeleton per card); una card in errore mostra il messaggio dentro la card, non blocca la pagina.

**Anti-pattern:** il "big number + gradiente" su tutte le card; KPI senza unità; torte con più di 4 fette (usa barre); rosso per "in calo" quando il calo è positivo (costi): il colore segue il giudizio, non il segno.
