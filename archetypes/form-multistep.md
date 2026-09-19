# Archetipo C — Form multi-step

**Quando:** creare o configurare un oggetto richiede più di ~8 campi o decisioni dipendenti (nuovo master in Studio, onboarding azienda, generazione corso in CoursAI, configurazione campagna).

```
┌──────────────────────────────────────────────────────────────┐
│ ← Torna       Nuovo master                                     │
│ Stepper   ● Informazioni ── ○ Programma ── ○ Prezzo ── ○ Revisione │
├──────────────────────────────────────────────────────────────┤
│           ┌────────────── 680px ──────────────┐               │
│           │ Titolo step                        │               │
│           │ Una riga che spiega cosa serve     │               │
│           │                                    │               │
│           │ TextField  (label sopra, help sotto)│               │
│           │ Select                             │               │
│           │ RadioGroup                         │               │
│           └────────────────────────────────────┘               │
├──────────────────────────────────────────────────────────────┤
│ footer sticky   Bozza salvata 14:32     [Indietro] [Continua]  │
└──────────────────────────────────────────────────────────────┘
```

**Componenti:** `Stepper`, `TextField`, `Textarea`, `Select`, `RadioGroup`, `Checkbox`, `Switch`, `DateField`, `FileUpload`, `Alert`, `Modal` (conferma abbandono).

**Regole**
1. Da 3 a 5 step. L'ultimo è sempre "Revisione": riepilogo con link "Modifica" per step. Il bottone finale dice cosa fa: "Pubblica il master", non "Conferma".
2. Larghezza campo 680px max (`reading-max`); un campo per riga tranne coppie logiche (nome/cognome, da/a).
3. Label sopra il campo, aiuto sotto in `ink-muted`, errore sotto in `danger` che sostituisce l'aiuto. Validazione al blur; al submit dello step si fa scroll al primo errore. Mai validare mentre si digita, tranne per lunghezza massima.
4. Obbligatorio è il default: si marcano gli **opzionali** con "(opzionale)" nella label.
5. Salvataggio automatico della bozza ad ogni step; il footer mostra l'ora. Uscire con modifiche non salvate apre un `Modal`: "Esci senza salvare? Le modifiche a questo step andranno perse."
6. Gli step completati sono cliccabili; quelli futuri no. Lo stepper mostra un'icona `danger` sullo step con errori bloccanti.
7. Stati: il footer disabilita "Continua" solo durante il salvataggio (con spinner nel bottone), mai per validazione preventiva — l'utente deve poter provare e vedere gli errori.

**Anti-pattern:** placeholder come label; asterischi rossi; step "Benvenuto" senza campi; select con meno di 4 opzioni (usa radio); switch per scelte non immediate (usa checkbox).
