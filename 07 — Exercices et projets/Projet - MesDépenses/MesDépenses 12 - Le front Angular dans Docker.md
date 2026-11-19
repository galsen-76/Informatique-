---
type: exercise
status: a-faire
niveau: 4
difficulty: moyen
concepts:
  - "[[Dockerfile]]"
  - "[[Image Docker]]"
  - "[[Application monopage et routage]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 12 - Le front Angular dans Docker

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Étape précédente :** [[MesDépenses 11 - Angular, ajouter et supprimer]]
> **Déjà fait une fois :** [[MesDépenses 06 - Le front Vue dans Docker]] · essaie d'abord **sans** le relire
> **Notions :** [[Dockerfile]] · [[Image Docker]] · [[Application monopage et routage]] · [[Nexus]]

## Le but
Le front Angular dans une image nginx légère, sur http://localhost:8081.

## Ce que tu fais
- [ ] Écris `front-angular/Dockerfile` en deux étapes, sans regarder celui de Vue
- [ ] Le build Angular ne sort pas les fichiers au même endroit que Vite : trouve où, et adapte la copie
- [ ] Lance l'image, vérifie la liste, l'ajout et la suppression
- [ ] Compare ensuite avec le Dockerfile de Vue : note ce qui diffère et pourquoi

> [!warning] Le piège
> Si nginx affiche sa page d'accueil « Welcome to nginx », ton build a bien tourné mais les fichiers ne sont pas copiés au bon endroit.

> [!success] Ça marche si…
> http://localhost:8081 marche, et tu as écrit le Dockerfile sans copier celui de Vue.

> [!quote] Mes notes
> _Ce que j'ai retrouvé seul, ce que j'ai dû rechercher._

> [!question]- Indice
> Lance `ng build` en local et regarde l'arborescence de `dist/`.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mon Dockerfile
