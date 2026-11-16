---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Annotations dans l'API CVAT]]"
tags:
  - exercice
  - mini-projet
---
# Réannoter 05 - Remplacer au lieu d'ajouter

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Étape précédente :** [[Réannoter 04 - Tous les tuyaux et les cotes]]
> **Cours à avoir lu :** [[Cours - Du graphe JSON aux annotations CVAT par l'API]] (parties 2 et 7)
> **Notions validées par cette étape :** [[Annotations dans l'API CVAT]]

## Le but
Lancer le script deux fois de suite ne doit **pas** doubler les formes : avant d'ajouter, il enlève les anciennes formes de ce folio, pour ces 3 labels seulement.

## Ce que tu fais
- [ ] Lance le script deux fois : combien de tuyaux dans CVAT ?
- [ ] `GET /api/jobs/{id}/annotations`, puis garde les formes du bon `frame` **et** dont le `label_id` est celui de `tuyau`, `ligne de cote` ou `etiquette de cote`
- [ ] Envoie-les en `PATCH ?action=delete`, puis fais ton `create`
- [ ] Ajoute à la main dans CVAT une forme d'un **autre** label sur ce folio, et une forme sur un **autre** folio. Relance : sont-elles toujours là ?
- [ ] Un tuyau avait `axe` = `Y` avant : que vaut-il après ? Explique pourquoi (et note-le pour en parler avec ton tuteur)

> [!warning] Le piège de cette étape
> Filtrer seulement par `frame` effacerait aussi les autres labels de ce folio. Filtrer seulement par label effacerait les autres folios.

> [!success] Ça marche si…
> Après deux exécutions, le folio a toujours 10 formes du graphe, et les autres formes sont intactes.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> Un ensemble d'ids à remplacer : `ids = {labels[n]["id"] for n in ("tuyau", "ligne de cote", "etiquette de cote")}`, puis `s["frame"] == frame and s["label_id"] in ids`.
