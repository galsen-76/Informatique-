---
type: concept
module: "[[Module 01 - Fondamentaux informatiques]]"
related:
  - "[[Client-serveur]]"
  - "[[HTTP]]"
tags:
  - concept
  - reseau
---
# Internet

> [!info] En une phrase
> Un immense réseau de réseaux qui permet à des machines du monde entier d'échanger des données.

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

## 3 · Relier
- **Mène à** : [[Client-serveur]], puis [[HTTP]]
- **Cours** : [[Cours - Comment fonctionne le web]]
