# Riferimento copy — italiano, registro operativo

Estende i "Content fundamentals" v1 (che restano validi) con le regole dei tool.

## Verbi dei bottoni
| Azione | Bottone | Toast di conferma |
|---|---|---|
| creare | Crea [oggetto] | Creato |
| salvare | Salva | Salvato |
| pubblicare | Pubblica | Pubblicato |
| inviare | Invia | Inviato |
| importare | Importa | Importati n [oggetti] |
| esportare | Esporta CSV | Esportato |
| archiviare | Archivia | Archiviato · Annulla |
| eliminare | Elimina [oggetto] (in ConfirmDialog) | Eliminato |
| annullare un flusso | Annulla | — |
| uscire da un form | Esci | — |
| tornare indietro nello stepper | Indietro | — |
| avanzare | Continua | — |

Mai: Conferma, OK, Submit, Invia richiesta, Procedi.

## Formati
- Date: `19 set 2026`; relative sotto 7 giorni (`2 giorni fa`, `ieri`, `adesso`); intervalli `1 lug – 19 set 2026`.
- Orari: `14:30`.
- Numeri: `1.250` · decimali `18,40` · percentuali `42 %` (spazio) · valute `1.250,00 €`.
- Conteggi nei titoli: `Lead (312)`; nelle barre filtro: `48 risultati`; singolare/plurale sempre gestito.

## Messaggi
- **Errore di validazione:** "Serve almeno una lettera maiuscola e un numero." — sotto il campo, sostituisce l'aiuto.
- **Errore di sistema:** titolo con cosa è successo + azione. "Importazione fallita — Il file ha 3 righe senza email. Correggile e ricarica. [Riprova]"
- **Vuoto:** "Nessun lead ancora. Importa un CSV o creane uno." + bottone.
- **Filtro senza risultati:** "Nessun risultato per questi filtri. Prova ad allargare il periodo. [Azzera filtri]"
- **Conferma distruttiva:** "Elimina il corso Deep Learning? Gli studenti iscritti perderanno l'accesso." → bottone "Elimina il corso".
- **Abbandono form:** "Esci senza salvare? Le modifiche a questo step andranno perse." → "Esci comunque".
- **Bozza:** "Bozza salvata alle 14:32" nel footer.

## Etichette
- Label sopra il campo; "(opzionale)" per gli opzionali; nessun asterisco.
- Aiuto sotto il campo, una frase, indica il vincolo prima dell'errore: "PDF fino a 20 MB."
- Placeholder solo come esempio di formato ("es. PROMPTENG_ADV"), mai come label.

## Cosa non scrivere
"Ops", "Qualcosa è andato storto", "Siamo spiacenti", "Attenzione!", punti esclamativi nei toast, emoji, MAIUSCOLE, "utente" riferito a chi legge.
