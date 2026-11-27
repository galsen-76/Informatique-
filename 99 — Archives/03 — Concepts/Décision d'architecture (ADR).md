---
type: concept
module: "[[Module 23 - Gestion de projet]]"
related:
  - "[[Preuve de concept (POC)]]"
  - "[[Dette technique]]"
  - "[[Monolithe et microservices]]"
  - "[[Changelog]]"
tags:
  - concept
  - projet
---
# Décision d'architecture (ADR)

> [!info] En une phrase
> Un ADR (*Architecture Decision Record*, compte rendu de décision d'architecture) est une **courte note qui garde la trace d'une décision technique importante** : le contexte, la décision prise, les options écartées et les conséquences.

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

## 3 · Relier
- **Prérequis** : [[Spécification technique]]
- **Complémentaires** : [[Preuve de concept (POC)]] · [[Dette technique]] · [[Monolithe et microservices]] · [[Changelog]]
