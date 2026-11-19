---
type: concept
domain: projet
module: "[[Module 23 - Gestion de projet]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Spécification technique]]"
parents: []
related:
  - "[[Preuve de concept (POC)]]"
  - "[[Dette technique]]"
  - "[[Monolithe et microservices]]"
  - "[[Changelog]]"
next_review: 
method: []
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
**Une décision par fichier**, numérotée : `0001-utiliser-nuclio-pour-l-export.md`.

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
# 0001 - Faire l'export PNG dans une fonction Nuclio
Statut : acceptée (2026-11-20)
## Contexte
CVAT doit produire une image de ses annotations. Le POC a montré que
Nuclio peut appeler l'API CVAT et renvoyer un PNG en 4 s pour 50 images.
## Décision
L'export est une fonction Nuclio appelée par un bouton du front React.
## Alternatives écartées
- Modifier le backend Django de CVAT : plus difficile à maintenir lors des mises à jour.
- Export dans le navigateur : trop lent sur les grosses tâches.
## Conséquences
+ CVAT reste presque inchangé, la fonction se déploie à part.
- Il faut gérer un jeton de service et la limite de temps de Nuclio.
```

### Cas d'utilisation
- Conclure un POC
- Choisir entre deux bibliothèques ou deux architectures
- Expliquer à un nouveau collègue pourquoi le projet est fait ainsi

> [!warning] À ne pas confondre
> Un ADR n'est pas une spec technique complète : il ne raconte **qu'une seule décision**. Et il ne sert à rien pour les petits choix faciles à changer.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine la fiche d'un ADR (contexte, options, décision, conséquences) pour le choix « API JSON plutôt que XML » de la réannotation CVAT.

> [!example] 🔄 Change de contexte
> Fais le même dessin pour un choix de MesDépenses (SQLite par défaut, PostgreSQL possible).

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Décision d'architecture (ADR) » et je l'intègre ici avec `![[Schéma - Décision d'architecture (ADR).excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Spécification technique]]
- **Complémentaires** : [[Preuve de concept (POC)]] · [[Dette technique]] · [[Monolithe et microservices]] · [[Changelog]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
