# Registro learner (learn.profession.ai)

Invariato rispetto alla v1 nella forma: shell teal radiale, pannello bianco 24px, Figtree 16, banner e `ProfAIFab`.
Cambia la sorgente: l'app passa a Tailwind 4 con `@import "@professionai/ui/styles.css"` (non più `tailwind.config.ts` a mano né il plugin HeroUI) e i componenti si prendono da `@professionai/ui` con `<RegisterRoot register="learner">`. I componenti HeroUI 2.7 esistenti vanno sostituiti progressivamente con gli equivalenti del pacchetto (decisione 18): la mappa `Button color="primary"` → `<Button>`, `variant="bordered"` → `outline`, `variant="light"` → `ghost`, `isOpen/onClose` → `open/onClose`, `onPress` → `onClick`, `onValueChange` → `onCheckedChange`/`onChange`.
Le lacune dell'app studente (tabelle, form, overlay) si colmano con gli stessi componenti del registro operativo: la densità resta `comfortable` ovunque, tabelle incluse.
