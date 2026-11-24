---
type: exercise
status: a-faire
niveau: 6
difficulty: moyen
concepts:
  - "[[Dockerfile]]"
  - "[[Outil de build front (Vite)]]"
  - "[[Variable de build Docker (ARG)]]"
  - "[[Application monopage et routage]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 06 - Le front Vue dans Docker

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Étape précédente :** [[MesDépenses Front 03 - Vue, ajouter et supprimer]]
> **Cours :** [[Cours - Docker, les bases solides]]
> **Notions :** [[Dockerfile]] · [[Image Docker]] · [[Outil de build front (Vite)]] · [[Variable de build Docker (ARG)]] · [[Application monopage et routage]] · [[Nexus]]
> **Fiches :** [[Fiche - Images Docker au travail via le Nexus]] · [[Bonnes pratiques - Docker]]
> **À créer :** nginx comme serveur de fichiers statiques

## Le but
Le front Vue tourne dans un conteneur nginx léger, sur http://localhost:8080, et parle à l'API.

## Ce que tu fais
- [ ] Construis le front en local (`npm run build`) et regarde ce qui sort dans `dist/` : quels fichiers ? Y a-t-il encore du Vue ou du TypeScript ?
- [ ] Écris `front-vue/Dockerfile` en **deux étapes** : une image Node (du Nexus) qui construit, une image nginx (du Nexus) qui sert le résultat
- [ ] Compare la taille de ton image finale avec celle de l'image Node seule
- [ ] Lance le conteneur sur le port 8080. La liste s'affiche-t-elle ? Si non, console du navigateur d'abord (pense à l'étape 04)
- [ ] Change l'adresse de l'API **sans** toucher au code. Lancer le conteneur avec une variable d'environnement suffit-il ? Pourquoi ?
- [ ] Ajoute un `.dockerignore` : `node_modules/` ne doit pas partir dans le contexte

> [!warning] Le piège
> Avec Vite, les variables `VITE_...` sont écrites **dans les fichiers au moment du build**. Une fois l'image construite, il est trop tard pour les changer.

> [!success] Ça marche si…
> http://localhost:8080 affiche et modifie les dépenses, l'image finale ne contient ni Node ni `node_modules`, et l'adresse de l'API se choisit au `docker build`.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> Un Dockerfile peut avoir plusieurs `FROM` : `FROM ... AS build`, puis `COPY --from=build`. nginx sert par défaut le dossier `/usr/share/nginx/html`. Pour `npm install` derrière le proxy, même réflexe que pour `pip` : registre du Nexus.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mon Dockerfile
