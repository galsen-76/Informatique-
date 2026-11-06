---
type: course
order: 2
module: "[[Module 11 - React]]"
concepts:
  - "[[État React (useState)]]"
  - "[[Effet React (useEffect)]]"
  - "[[Hook React]]"
tags:
  - cours
---
# Cours - État, effets et hooks

> [!abstract] Objectifs
> - Gérer l'état sans le modifier en place
> - Charger des données avec un effet correctement nettoyé
> - Respecter les règles des hooks et écrire un hook personnalisé

**Prérequis :** [[Cours - Penser en composants]] · [[Cours - L'asynchrone avec Promesses, async, await et fetch]]

## 1. Ce qui change
[[État React (useState)]] : une valeur et sa fonction de mise à jour. Toujours une **nouvelle** valeur.

## 2. Schéma
```mermaid
flowchart TD
  M[Montage] --> E[Effet fetch]
  E --> S[setDonnees]
  S --> R[Rendu]
  R --> U[Clic]
  U --> S
```

## 3. Parler à l'extérieur
[[Effet React (useEffect)]] : après le rendu, avec des dépendances et un nettoyage.

## 4. Réutiliser
[[Hook React]] : `useContext`, `useRef`, `useMemo`, et tes propres `useQuelqueChose`.

## Mise en pratique
- Fais l'[[Exercice - Charger et filtrer des données dans React]].

> [!warning] Erreurs fréquentes
> - Modifier l'état en place
> - Effet sans dépendances (boucle infinie)
> - Hook dans un `if`

## Résumé
En 3 phrases, avec mes mots.

## Concepts du cours
[[État React (useState)]] · [[Effet React (useEffect)]] · [[Hook React]]
