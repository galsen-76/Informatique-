---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/css/responsive
aliases:
  - "Responsive Design"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[CSS-03-Flexbox|Flexbox CSS]]"
  - "[[CSS-04-Grid|Grid CSS]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://web.dev/learn/design"
---

# Responsive Design

> [!abstract] En bref
> Un site **responsive** s'adapte à toutes les tailles d'écran : téléphone, tablette, ordinateur. La méthode : des mises en page qui s'étirent toutes seules (Flex, Grid, pourcentages), et des **media queries** pour les quelques changements nécessaires. Plus de la moitié des visites se font sur mobile.

## La base obligatoire

Dans le `<head>`, sinon le téléphone affiche une version miniature du site :

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## Les media queries

« Si l'écran fait moins de 900 px, applique ces règles » :

```css
.projets { grid-template-columns: repeat(3, 1fr); }

@media (max-width: 900px) {
  .projets { grid-template-columns: 1fr; }   /* une colonne sur petit écran */
  nav ul { display: none; }                  /* on cache le menu, on affiche le bouton ☰ */
}
```

Les points de rupture du Portfolio : **900 px** (tablette → une colonne) et **520 px** (petit téléphone).

## Penser mobile d'abord (mobile first)

Écrire d'abord le style pour mobile (le plus simple), puis **ajouter** pour les grands écrans :

```css
.projets { display: grid; gap: 16px; }                 /* mobile : 1 colonne */

@media (min-width: 900px) {
  .projets { grid-template-columns: repeat(3, 1fr); }  /* grand écran : 3 colonnes */
}
```

C'est l'approche de Tailwind (`md:grid-cols-3`).

## Des tailles qui s'adaptent toutes seules

| Outil | Exemple | Effet |
|---|---|---|
| `%` | `width: 100%` | relatif au parent |
| `max-width` | `max-width: 1100px; margin: 0 auto;` | contenu centré, jamais trop large |
| `rem` | `font-size: 1.15rem` | relatif à la taille de texte de l'utilisateur (1 rem ≈ 16 px) |
| `vw` / `vh` | `height: 100vh` | % de la largeur / hauteur de l'écran |
| `clamp()` | `font-size: clamp(2.2rem, 5vw, 3.4rem)` | grandit avec l'écran, entre un minimum et un maximum |
| `minmax()` + `auto-fill` | voir [[CSS-04-Grid\|Grid]] | colonnes automatiques |

Le titre du Portfolio utilise `clamp()` : 35 px sur mobile, 54 px sur grand écran, sans media query.

## Container queries : s'adapter à son conteneur

Une carte qui change de disposition selon **la place qu'elle a**, pas selon la taille de l'écran :

```css
.zone-cartes { container-type: inline-size; }

@container (min-width: 400px) {
  .carte { display: flex; }   /* image à côté du texte s'il y a de la place */
}
```

## Tester

F12 → icône téléphone/tablette (**mode appareil**) → choisis un modèle ou redimensionne. Teste aussi sur un vrai téléphone.

## Pièges

- **Largeurs fixes en px** (`width: 1200px`) : scroll horizontal sur mobile.
- **Cibles trop petites** : un bouton doit faire au moins 44 × 44 px pour un doigt.
- **Texte trop petit** : 16 px minimum pour le texte courant.
