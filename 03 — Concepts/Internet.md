---
type: concept
domain: reseau
module: "[[Module 01 - Fondamentaux informatiques]]"
status: compris
level: debutant
prerequisites: []
parents: []
related:
  - "[[Client-serveur]]"
  - "[[HTTP]]"
next_review: 2026-11-14
method:
  - Comprendre
  - Explorer
  - Expliquer
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
- _Pas encore d’exercice : en créer un avec le template **Exercice**._

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
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
