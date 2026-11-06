<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const sujet = safeName((await tp.system.prompt("Sujet (ex. Python, Docker, API REST)")) || tp.file.title);
await tp.file.move("05 — Fiches pratiques/Bonnes pratiques/Bonnes pratiques - " + sujet);
-%>
---
type: bonnes-pratiques
sujet: "<% sujet %>"
concepts: []
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - <% sujet %>

> [!info] À quoi sert cette fiche
>
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire
### 1.
Pourquoi :

## À éviter
### 1.
**Pourquoi c'est un problème :**
**À la place :**

## Avant de valider mon travail
- [ ]

## Notions liées
