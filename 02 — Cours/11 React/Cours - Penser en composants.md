---
type: course
order: 1
module: "[[Module 11 - React]]"
concepts:
  - "[[React]]"
  - "[[Composant d'interface]]"
  - "[[Props React]]"
  - "[[Liste et clé en React]]"
  - "[[Outil de build front (Vite)]]"
tags:
  - cours
niveau: 6
---
# Cours - Penser en composants

> [!abstract] Objectifs
> - Créer et lancer un projet React avec Vite
> - Découper une interface en composants
> - Passer des données par les props et remonter des événements
> - Afficher des listes avec des clés

**Prérequis :** [[Cours - JavaScript dans la page, DOM et événements]] · [[Cours - TypeScript, du JavaScript typé]]

## 1. Pourquoi React
Tu as fait une liste de tâches avec le [[DOM]] à la main : chaque modification demandait du code. [[React]] inverse la logique : tu décris l'écran selon les données.

## 2. Démarrer
[[Outil de build front (Vite)]] : `npm create vite@latest`, `npm run dev`, `npm run build`.

## 3. Schéma
```mermaid
flowchart TD
  A[App] --> H[EnTete]
  A --> L[ListeTaches]
  L --> C[CarteTache]
  C --> B[Badge]
```

## 4. Les composants
[[Composant d'interface]] : une fonction, du JSX, une majuscule, un fichier.

## 5. Les props
[[Props React]] : les données descendent, les événements remontent par des fonctions.

## 6. Les listes
[[Liste et clé en React]] : `map` et une `key` stable.

## Mise en pratique
- Pour chaque notion du cours : les **exercices visuels** de sa fiche (section 3), puis le fil rouge de son niveau ([[Niveaux]]).

> [!warning] Erreurs fréquentes
> - `class` au lieu de `className`
> - Modifier une prop
> - `key={index}` dans une liste qui change

## Résumé
Pas de résumé à écrire : si tu veux, fais un dessin Excalidraw qui relie les notions ci-dessous.

## Concepts du cours
[[React]] · [[Composant d'interface]] · [[Props React]] · [[Liste et clé en React]] · [[Outil de build front (Vite)]]
