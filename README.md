# PRG08-Angry-Captain

Toevoegen van het Singleton Pattern zodat alle piratenschepen en kapiteinen makkelijk een berichtje op het Messageboard kunnen plaatsen

## Game play

- [Demo van Angry Captain](https://hr-cmgt.github.io/PRG08-Angry-Captain-completed/)
- Wanneer een schip **voor de eerste keer** tegen een ander schip botst
    - moet er een bericht van deze gebeurtenis op het `Messageboard` komen te staan
    - wordt de `Captain` *wakker* en dit wordt op het `Messageboard` gezet
- **Elke volgende keer** dat een schip tegen een ander schip botst
    - moet er een bericht van deze gebeurtenis op het `Messageboard` komen te staan
- Is een schip **voor de zevende keer** tegen een ander schip gebotst
    - dan wordt de `Captain` *boos* en dit wordt op het `Messageboard` gezet

## Opdracht
- Teken het klassendiagram waarbij je er rekening mee houdt dat het `Messageboard` een *Singleton* is.
- Maak het `Messageboard` in code en pas het *Singleton Pattern* toe.
- Plaats de berichten op het `Messageboard` zoals hierboven beschreven.
