---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frontend/css/scss
aliases:
  - "SCSS Sass"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[CSS-07-Variables-Themes|Variables CSS et Thèmes]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://sass-lang.com/documentation/"
---

# SCSS Sass

> [!abstract] En bref
> **SCSS** est du CSS avec quelques super-pouvoirs (imbrication, variables, mixins), transformé en CSS normal au moment du build. Beaucoup de projets **Angular** l'utilisent par défaut (fichiers `.scss`). Tu dois savoir le lire et en écrire un peu ; inutile d'aller loin.

## Les 4 fonctionnalités utiles

### 1. L'imbrication

```scss
.carte {
  padding: 20px;

  h3 { margin: 0; }              // = .carte h3

  &:hover { border-color: $primaire; }   // & = le sélecteur parent → .carte:hover

  &__titre { font-weight: 700; }  // = .carte__titre (pratique avec BEM)
}
```

### 2. Les variables

```scss
$primaire: #10b981;
$rayon: 14px;

.btn { background: $primaire; border-radius: $rayon; }
```

Pour les couleurs de thème, préfère les **variables CSS** (`--primaire`), modifiables en direct pour le mode sombre (voir [[CSS-07-Variables-Themes|Variables CSS]]). Les variables SCSS servent aux constantes fixes, comme les points de rupture.

### 3. Les mixins (des morceaux de CSS réutilisables)

```scss
@mixin mobile {
  @media (max-width: 900px) { @content; }
}

.projets {
  grid-template-columns: repeat(3, 1fr);
  @include mobile { grid-template-columns: 1fr; }
}
```

### 4. Les modules

```scss
// styles/_breakpoints.scss
$mobile: 900px;

// dans un composant
@use 'styles/breakpoints' as bp;
@media (max-width: bp.$mobile) { … }
```

Utilise `@use`. L'ancien `@import` est abandonné.

## Où tu le rencontres

- **Angular** : `ng new` propose SCSS ; chaque composant a son `.scss`.
- **Vue** : `<style lang="scss" scoped>` après `npm i -D sass`.

## Pièges

- **Imbriquer sur 5 niveaux** : le CSS généré devient trop spécifique et difficile à surcharger. 2 ou 3 niveaux maximum.
- **`@import`** au lieu de `@use` : obsolète.
- **Tout mettre en SCSS** alors que le CSS moderne sait déjà faire les variables (`--x`) et même l'imbrication (dans les navigateurs récents).
