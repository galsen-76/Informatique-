---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M12
tags:
  - ia/fondamentaux
aliases:
  - "Fondamentaux IA et Machine Learning"
parent: "[[Intelligence Artificielle]]"
children:
  - "[[IA-02-LLM-Fondamentaux|Fondamentaux des LLM]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/ia-01-fondamentaux-ia-ml]]"
related_projects: []
source: "https://developers.google.com/machine-learning/crash-course?hl=fr"
---

# Fondamentaux IA et Machine Learning

> [!abstract] Introduction
> L'intelligence artificielle regroupe les techniques qui permettent à une machine d'accomplir des tâches « intelligentes » ; le machine learning apprend à partir de données plutôt que de règles écrites à la main, et le deep learning utilise des réseaux de neurones profonds.

---

## Théorie

> [!question]- C'est quoi ?
> ```mermaid
> flowchart TB
>   IA["IA : tâches intelligentes"] --> ML["Machine Learning : apprendre des données"]
>   ML --> DL["Deep Learning : réseaux de neurones profonds"]
>   DL --> GEN["IA générative : LLM, images"]
> ```
> Types d'apprentissage :
> - **Supervisé** : données étiquetées (spam / pas spam) → classification, régression
> - **Non supervisé** : trouver des structures (regroupement de clients)
> - **Par renforcement** : essais / récompenses (jeux, robotique, alignement des LLM)

> [!example]- Analogie
> Programmation classique : tu écris la recette. Machine learning : tu montres 10 000 gâteaux réussis et ratés, et la machine déduit elle-même la recette.

> [!question]- Pourquoi l'utiliser ?
> Un développeur full stack intègre de plus en plus des fonctionnalités d'IA (recherche sémantique, assistants, classification) ; comprendre les bases évite les attentes irréalistes.

> [!question]- Comment ça marche ?
> Cycle : collecter des données → les nettoyer → entraîner un modèle → l'évaluer sur des données jamais vues → le déployer → surveiller sa qualité.
> Notions : jeu d'entraînement / de test, **surapprentissage** (apprend par cœur au lieu de généraliser), métriques (précision, rappel).

> [!question]- Quand l'utiliser ?
> Problèmes où les règles sont trop nombreuses ou floues (langage, images, recommandations).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un modèle reproduit les biais de ses données, se trompe avec assurance et coûte à entraîner/faire tourner ; une règle simple (`if`) reste parfois la meilleure solution.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Modèle | Fonction apprise à partir de données |
| Entraînement | Ajustement des paramètres du modèle |
| Inférence | Utilisation du modèle pour prédire |
| Surapprentissage | Apprentissage par cœur, mauvaise généralisation |
| Jeu de test | Données réservées à l'évaluation |

---

## Points clés

- IA ⊃ ML ⊃ Deep Learning ⊃ IA générative
- Les données font la qualité du modèle
- Évaluer sur des données jamais vues
- En tant que dev, on UTILISE surtout des modèles via des API

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Croire qu'un modèle est « intelligent » au sens humain

---

## Exemple minimal

```text
Tâche : classer des critiques de films en positives / négatives
Supervisé : 10 000 critiques étiquetées → modèle → nouvelle critique → « positive (0,93) »
Aujourd'hui : un LLM via API fait ce travail sans entraînement spécifique (zero-shot)
```

> [!note] Ce que j'en retiens
> Les LLM ont rendu accessibles des tâches qui demandaient avant un projet ML complet.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir quand une solution ML classique (plus petite, moins chère) bat un LLM

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Intelligence Artificielle]]
- Sous-sujets → [[IA-02-LLM-Fondamentaux|Fondamentaux des LLM]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/ia-01-fondamentaux-ia-ml]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Qu'est-ce que le surapprentissage ?

---

## Tâches

- [ ] #task Suivre le « Machine Learning Crash Course » de Google (modules 1 à 3)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
