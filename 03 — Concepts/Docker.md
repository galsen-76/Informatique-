---
type: concept
domain: devops
module: "[[Module 13 - Docker]]"
status: en-cours
level: intermediaire
niveau: 1
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Terminal]]"
  - "[[Node.js]]"
parents: []
related:
  - "[[Conteneur]]"
  - "[[Image Docker]]"
next_review: 
tags:
  - concept
  - devops
---
# Docker

> [!info] En une phrase
> Un outil qui emballe une application avec tout ce dont elle a besoin pour qu'elle tourne pareil partout.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Docker** construit des [[Image Docker|images]] (le modèle : système minimal + dépendances + ton code) et lance des [[Conteneur|conteneurs]] (des instances isolées de ces images).

### Pourquoi ça existe
Supprimer le « ça marche sur ma machine » : la même image tourne à l'identique sur ton PC, chez un collègue et sur le serveur.

### Le problème résolu
Installer à la main la bonne version de Node, de PostgreSQL et des bibliothèques sur chaque machine est long et source d'écarts.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart LR
  D[Dockerfile] -- docker build --> I[Image]
  I -- docker run --> C1[Conteneur 1]
  I -- docker run --> C2[Conteneur 2]
```
- Un conteneur **partage le noyau** de la machine : il démarre en secondes, contrairement à une machine virtuelle.
- Un conteneur est **jetable** : les données à garder vont dans un **volume**.

### Exemple concret
```dockerfile
# Dockerfile d'une API Node
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```
```bash
docker build -t api-notes .
docker run -p 3000:3000 api-notes
```

### Cas d'utilisation
- Lancer une base de données sans l'installer ([[Fiche - Lancer PostgreSQL avec Docker]])
- Livrer une application identique en dev et en production
- Base du déploiement et de la CI/CD

> [!warning] À ne pas confondre
> **Image** (le modèle, en lecture seule) et **conteneur** (une instance qui tourne). Et **Docker** ≠ **machine virtuelle** : pas de système d'exploitation complet par conteneur.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] ⚖️ Avant / après
> Avant / après : ton application sans Docker (Python, Node, versions à installer sur chaque PC), puis avec Docker. Dessine ce que la notion change.

> [!example] 🧠 Dessine de mémoire
> Dessine le cycle complet : Dockerfile, build, image, run, conteneur, et où intervient le registre.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Docker » et je l'intègre ici avec `![[Schéma - Docker.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Fil rouge 01 - Lancer l'application dans un conteneur]]

Pour m'aider :
- [[Projet - API Notes]] (étape bonus : conteneuriser l'API)

## 4 · Relier
- **Prérequis** : [[Terminal]], [[Node.js]] (pour conteneuriser une app que tu sais déjà lancer)
- **Notions clés** : [[Image Docker]], [[Conteneur]]
- **Commandes** : [[docker build]] · [[docker run]] · [[docker ps]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
