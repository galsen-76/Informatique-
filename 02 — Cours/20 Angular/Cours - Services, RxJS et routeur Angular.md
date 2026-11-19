---
type: course
order: 2
module: "[[Module 20 - Angular]]"
concepts:
  - "[[Service et injection de dépendances]]"
  - "[[Observable et RxJS]]"
  - "[[Application monopage et routage]]"
tags:
  - cours
niveau: 4
---
# Cours - Services, RxJS et routeur Angular

> [!abstract] Objectifs
> - Mettre la logique et les appels d'API dans des services injectés
> - Lire et écrire des flux RxJS simples
> - Organiser l'application avec le routeur et des gardes

**Prérequis :** [[Cours - Angular, composants et templates]] · [[Cours - L'asynchrone avec Promesses, async, await et fetch]]

## 1. La logique hors des composants
[[Service et injection de dépendances]] : `@Injectable`, `inject()`, `HttpClient`, intercepteurs.

## 2. Schéma
```mermaid
flowchart TD
  C[Composant] --> S[Service]
  S --> H[HttpClient]
  H --> O[Observable]
  O -->|async| C
```

## 3. Les flux
[[Observable et RxJS]] : rien ne part sans abonnement ; `pipe`, `map`, `catchError`, `switchMap` ; le pipe `async`.

## 4. Les pages
[[Application monopage et routage]] : routes, paramètres, `loadComponent`, `canActivate`.

## 5. En production
`ng build`, puis `dist/` servi par Nginx avec repli vers `index.html`, comme toute SPA.

## Mise en pratique
- Pour chaque notion du cours : les **exercices visuels** de sa fiche (section 3), puis le fil rouge de son niveau ([[Niveaux]]).

> [!warning] Erreurs fréquentes
> - Appeler `http.get` sans s'abonner
> - Fournir un service par composant sans le vouloir
> - S'abonner à la main sans se désabonner

## Résumé
Pas de résumé à écrire : si tu veux, fais un dessin Excalidraw qui relie les notions ci-dessous.

## Concepts du cours
[[Service et injection de dépendances]] · [[Observable et RxJS]] · [[Application monopage et routage]]
