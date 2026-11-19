---
type: course
order: 2
module: "[[Module 15 - Architecture logicielle]]"
concepts:
  - "[[Architecture en couches]]"
  - "[[MVC]]"
  - "[[Monolithe et microservices]]"
tags:
  - cours
niveau: 5
---
# Cours - Architecture d'une application

> [!abstract] Objectifs
> - Organiser une API en couches
> - Reconnaître MVC dans un framework
> - Choisir entre monolithe et services séparés

**Prérequis :** [[Cours - Organiser son code]] · [[Cours - Construire une API REST avec Express]]

## 1. Les étages d'une API
[[Architecture en couches]] : routes, services, dépôts. Les dépendances vont vers le bas.

## 2. Le classique des frameworks
[[MVC]] : modèle, vue, contrôleur. Django en est une variante.

## 3. Schéma d'une appli web typique
```mermaid
flowchart TD
  N[Navigateur] --> T[Reverse proxy]
  T --> UI[Front]
  T --> S[API]
  S --> DB[(PostgreSQL)]
  S --> R[(Redis)]
  S --> F[Fonctions]
```

## 4. Un seul bloc ou plusieurs services
[[Monolithe et microservices]] : commencer simple, découper seulement quand une partie doit vraiment vivre à part (comme une fonction serverless).

## Mise en pratique
- Pour chaque notion du cours : les **exercices visuels** de sa fiche (section 3), puis le fil rouge de son niveau ([[Niveaux]]).

> [!warning] Erreurs fréquentes
> - Découper en microservices dès le départ
> - Couches vides qui ne font que transmettre

## Résumé
Pas de résumé à écrire : si tu veux, fais un dessin Excalidraw qui relie les notions ci-dessous.

## Concepts du cours
[[Architecture en couches]] · [[MVC]] · [[Monolithe et microservices]]
