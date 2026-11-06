---
type: concept
domain: reseau
module: "[[Module 01 - Fondamentaux informatiques]]"
status: a-decouvrir
level: debutant
prerequisites: []
parents: []
related:
  - "[[Client-serveur]]"
  - "[[HTTP]]"
next_review: 
method: []
tags:
  - concept
  - reseau
---
# Internet

> [!info] En une phrase
> Un immense réseau de réseaux qui permet à des machines du monde entier d'échanger des données.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Internet est l'interconnexion de millions de réseaux informatiques. Chaque machine connectée a une **adresse IP** ; les données voyagent découpées en **paquets** qui passent de routeur en routeur jusqu'à leur destination.

### Pourquoi ça existe
Permettre à des ordinateurs éloignés, de constructeurs différents, de communiquer avec des règles communes (les protocoles, comme TCP/IP).

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart LR
  A[Mon PC] --> B[Box]
  B --> C[FAI]
  C --> D[Réseaux]
  D --> E[Serveur]
```
- **IP** : adresse d'une machine.
- **DNS** : traduit un nom (`github.com`) en adresse IP.
- **TCP** : garantit que les paquets arrivent complets et dans l'ordre.

> [!warning] À ne pas confondre
> **Internet** (le réseau) et **le Web** (un service qui fonctionne *sur* Internet, avec HTTP et des pages). L'e-mail ou les jeux en ligne utilisent Internet sans être « le Web ».

## 3 · Pratiquer
- Les exercices de cette notion sont listés en haut de la fiche et dans *Validation de la maîtrise*.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Mène à** : [[Client-serveur]], puis [[HTTP]]
- **Cours** : [[Cours - Comment fonctionne le web]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
