# Archetipo A — Lista + dettaglio

**Quando:** l'utente gestisce una collezione di oggetti dello stesso tipo (studenti, lead, corsi, fatture, richieste) e ogni oggetto ha una scheda. È l'archetipo più comune: se non sai quale usare, è questo.

```
┌──────────────────────────────────────────────────────────────┐
│ PageHeader   Titolo (n)                      [Secondaria][+ Primaria] │
├──────────────────────────────────────────────────────────────┤
│ FilterBar    [cerca]  [Stato ▾][Periodo ▾]      n risultati · Reset │
├──────────────────────────────────────────────────────────────┤
│ DataTable (compact)                                            │
│  □ Nome ↕      Stato      Aggiornato ↕     Valore →    ⋯       │
│  □ …                                                            │
├──────────────────────────────────────────────────────────────┤
│ Pagination   1–25 di 312          [25 ▾]        ‹ 1 2 3 … 13 › │
└──────────────────────────────────────────────────────────────┘
        click riga →  Drawer (destra, 480px) con la scheda
        oppure     →  pagina /oggetti/[id] se la scheda ha più di 3 sezioni
```

**Componenti:** `PageHeader`, `FilterBar`, `DataTable`, `Badge`, `Pagination`, `Drawer` o pagina di dettaglio, `EmptyState`, `Skeleton`, `ContextMenu` (colonna ⋯).

**Regole**
1. Il titolo porta il conteggio totale tra parentesi. La FilterBar porta il conteggio filtrato.
2. Una sola azione primaria, sempre "crea" o "importa". Le azioni bulk appaiono nella FilterBar solo quando c'è una selezione, e sostituiscono i filtri.
3. Colonne: max 7 visibili di default; la prima è l'identità (nome + sottotesto grigio), l'ultima il menu ⋯. Stato come `Badge`, numeri a destra `tabular-nums`, date relative sotto 7 giorni ("2 giorni fa") poi assolute.
4. Ordinamento su massimo 3 colonne; default: `aggiornato desc`.
5. Drawer se la scheda si legge in una schermata; pagina se ha tab o sezioni. Mai entrambi.
6. Stati: skeleton di 8 righe; vuoto ("Nessun lead ancora. Importa un CSV o creane uno."); filtro senza risultati ("Nessun risultato per questi filtri. [Azzera filtri]"); errore (alert danger sopra la tabella con "Riprova").
7. URL: filtri, ordinamento e pagina vivono nella query string.

**Anti-pattern:** card grid al posto della tabella quando gli oggetti hanno più di 3 attributi confrontabili; azione "Elimina" visibile in riga (va nel ⋯ con conferma).
