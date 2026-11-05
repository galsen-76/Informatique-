---
type: concept
domain: reseau
module: "[[Module 01 - Fondamentaux informatiques]]"
status: compris
level: debutant
prerequisites:
  - "[[Internet]]"
parents: []
related:
  - "[[HTTP]]"
  - "[[API]]"
next_review: 2026-11-14
method:
  - Comprendre
  - Explorer
  - Expliquer
  - Relier
tags:
  - concept
  - reseau
---
# Client-serveur

> [!info] En une phrase
> Un modèle où un programme (le client) demande quelque chose et un autre (le serveur) répond.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Le **client** envoie une requête (navigateur, application mobile, `curl`) ; le **serveur** l'attend en permanence, la traite et renvoie une réponse. Un même programme peut être client d'un service et serveur pour un autre.

### Pourquoi ça existe
Centraliser les données et la logique à un endroit (le serveur) tout en laissant de nombreux clients y accéder.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
sequenceDiagram
  participant C as Client
  participant S as Serveur
  C->>S: Requête
  S-->>C: Réponse
```

> [!warning] À ne pas confondre
> **Client** ≠ « l'utilisateur ». Le client est un *programme*. Et un **serveur** n'est pas forcément une grosse machine : `node server.js` sur ton PC est un serveur.

## 3 · Pratiquer
- _Pas encore d’exercice : en créer un avec le template **Exercice**._

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Internet]]
- **Mène à** : [[HTTP]] (le langage du dialogue), [[API]]
- **En pratique** : [[Express]] sert à écrire le côté serveur

## 6 · Réviser
> [!question]- Ton navigateur est-il client ou serveur ?
> Client : il envoie des requêtes et affiche les réponses.

> [!question]- Un serveur peut-il être client ?
> Oui : une API qui interroge une base de données est cliente de cette base.

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
