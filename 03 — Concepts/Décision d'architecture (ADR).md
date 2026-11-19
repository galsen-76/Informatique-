---
type: concept
domain: projet
module: "[[Module 23 - Gestion de projet]]"
status: a-decouvrir
level: intermediaire
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Spécification technique]]"
parents: []
related:
  - "[[Preuve de concept (POC)]]"
  - "[[Dette technique]]"
  - "[[Monolithe et microservices]]"
  - "[[Changelog]]"
next_review: 
tags:
  - concept
  - projet
---
# Décision d'architecture (ADR)

> [!info] En une phrase
> Un ADR (*Architecture Decision Record*, compte rendu de décision d'architecture) est une **courte note qui garde la trace d'une décision technique importante** : le contexte, la décision prise, les options écartées et les conséquences.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Une décision par fichier**, numérotée : `0001-export-pdf-dans-un-service-a-part.md`.

**Structure simple** :
- *Contexte* : le problème et les contraintes ;
- *Décision* : ce qu'on a choisi ;
- *Alternatives* : ce qu'on n'a pas choisi, et pourquoi ;
- *Conséquences* : ce que ça implique (positif et négatif) ;
- *Statut* : proposée, acceptée, remplacée par l'ADR n°…

**On ne modifie pas un ADR accepté** : si on change d'avis, on en écrit un nouveau qui remplace l'ancien. L'historique des raisonnements reste lisible.

**On les range dans le dépôt** (`docs/adr/`), à côté du code, donc versionnés avec Git.

**La conclusion d'un POC** donne souvent un ADR : « on a testé, on choisit cette approche, voici pourquoi ».

### Pourquoi ça existe
Six mois plus tard, personne ne se souvient pourquoi on a choisi telle technologie, et on refait le débat (ou on casse une contrainte qu'on avait oubliée).

### Le problème résolu
Garder la mémoire des choix et de leurs raisons, en quelques lignes, sans gros document.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  C[Contexte] --> O[Options]
  O --> D[Décision]
  D --> CQ[Conséquences]
```

### Exemple concret
```markdown
# 0001 - Faire l'export PDF dans un service à part
Statut : acceptée (2026-11-20)
## Contexte
L'appli doit produire un PDF mensuel des dépenses. Le POC a montré qu'un
petit service peut appeler l'API et renvoyer le PDF en 2 s pour 500 dépenses.
## Décision
L'export est un service séparé appelé par un bouton du front.
## Alternatives écartées
- Ajouter l'export dans l'API : plus simple, mais l'API grossit et dépend d'une bibliothèque PDF lourde.
- Export dans le navigateur : trop lent sur les grosses tâches.
## Conséquences
+ L'API reste simple, le service se déploie à part.
- Il faut gérer un jeton de service et un déploiement de plus.
```

### Cas d'utilisation
- Conclure un POC
- Choisir entre deux bibliothèques ou deux architectures
- Expliquer à un nouveau collègue pourquoi le projet est fait ainsi

> [!warning] À ne pas confondre
> Un ADR n'est pas une spec technique complète : il ne raconte **qu'une seule décision**. Et il ne sert à rien pour les petits choix faciles à changer.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine la fiche d'un ADR (contexte, options, décision, conséquences) pour un choix comme « SQLite ou PostgreSQL ».

> [!example] 🔄 Change de contexte
> Fais le même dessin pour un choix de ton application (SQLite par défaut, PostgreSQL possible).

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Décision d'architecture (ADR) » et je l'intègre ici avec `![[Schéma - Décision d'architecture (ADR).excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Spécification technique]]
- **Complémentaires** : [[Preuve de concept (POC)]] · [[Dette technique]] · [[Monolithe et microservices]] · [[Changelog]]

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
