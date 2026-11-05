---
type: engineering
kind: bug
project: "[[Application SaaS]]"
status: investigating
created: 2026-11-03
tags:
  - tech
  - demo
---
# Bug — Timeout export PDF

> [!bug] Symptôme
> Les exports de plus de 50 pages renvoient `504` après 30 s.

## Reproduction
1. Ouvrir un projet avec plus de 200 tâches
2. Exporter en PDF

## Hypothèses
- [x] Génération synchrone trop lente (42 s mesurées)
- [x] Timeout du reverse proxy à 30 s

> [!success] Correctif envisagé
> Génération asynchrone + lien de téléchargement.
