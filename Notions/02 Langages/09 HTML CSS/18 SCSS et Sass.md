---
type: notion
statut: a apprendre
resume: "SCSS est du CSS avec quelques super-pouvoirs (imbrication, variables, mixins), transformé en CSS normal au moment du build."
revu:
sources:
  - "https://sass-lang.com/documentation/"
---
# SCSS et Sass

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : **SCSS** est du CSS avec quelques super-pouvoirs (imbrication, variables, mixins), transformé en CSS normal au moment du build.

## Le problème

**Pourquoi c'est utile ?**
Pour écrire du CSS plus court et mieux organisé (imbrication, mixins), transformé en CSS normal au build.

**Qu'est-ce qui se passait sans ça ?**
Le CSS pur répétait les mêmes sélecteurs et valeurs partout, et les gros fichiers devenaient difficiles à maintenir.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Beaucoup de projets **Angular** l'utilisent par défaut (fichiers `.scss`). Tu dois savoir le lire et en écrire un peu ; inutile d'aller loin.

### Les 4 fonctionnalités utiles

#### 1. L'imbrication

```scss
.carte {
  padding: 20px;

  h3 { margin: 0; }              // = .carte h3

  &:hover { border-color: $primaire; }   // & = le sélecteur parent → .carte:hover

  &__titre { font-weight: 700; }  // = .carte__titre (pratique avec BEM)
}
```

#### 2. Les variables

```scss
$primaire: #10b981;
$rayon: 14px;

.btn { background: $primaire; border-radius: $rayon; }
```

Pour les couleurs de thème, préfère les **variables CSS** (`--primaire`), modifiables en direct pour le mode sombre (voir [[16 Variables CSS et thèmes|Variables CSS]]). Les variables SCSS servent aux constantes fixes, comme les points de rupture.

#### 3. Les mixins (des morceaux de CSS réutilisables)

```scss
@mixin mobile {
  @media (max-width: 900px) { @content; }
}

.projets {
  grid-template-columns: repeat(3, 1fr);
  @include mobile { grid-template-columns: 1fr; }
}
```

#### 4. Les modules

```scss
// styles/_breakpoints.scss
$mobile: 900px;

// dans un composant
@use 'styles/breakpoints' as bp;
@media (max-width: bp.$mobile) { … }
```

Utilise `@use`. L'ancien `@import` est abandonné.

### Où tu le rencontres

- **Angular** : `ng new` propose SCSS ; chaque composant a son `.scss`.
- **Vue** : `<style lang="scss" scoped>` après `npm i -D sass`.

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Imbriquer sur 5 niveaux** : le CSS généré devient trop spécifique et difficile à surcharger. 2 ou 3 niveaux maximum.
- **`@import`** au lieu de `@use` : obsolète.
- **Tout mettre en SCSS** alors que le CSS moderne sait déjà faire les variables (`--x`) et même l'imbrication (dans les navigateurs récents).

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Imbriquer

Réécris ce CSS en SCSS avec l'imbrication et `&`.

```css
.movie-card { padding: 1rem; }
.movie-card:hover { transform: scale(1.02); }
.movie-card .title { font-weight: 600; }
.movie-card--featured { border: 2px solid gold; }
```

> [!success]- Solution
> ```scss
> .movie-card {
>   padding: 1rem;
>
>   &:hover { transform: scale(1.02); }
>   .title { font-weight: 600; }
>   &--featured { border: 2px solid gold; }
> }
> ```

#### Exercice 2 · Un mixin pour les écrans

Écris un mixin `tablet-up` qui entoure son contenu d'une media query `min-width: 768px`, puis utilise-le.

> [!success]- Solution
> ```scss
> @mixin tablet-up {
>   @media (min-width: 768px) {
>     @content;
>   }
> }
>
> .layout {
>   display: grid;
>
>   @include tablet-up {
>     grid-template-columns: 250px 1fr;
>   }
> }
> ```

## 🔗 Liens

- **Prérequis :** [[09 Sélecteurs cascade et spécificité CSS|Sélecteurs cascade et spécificité CSS]]
- **Voir aussi :** [[16 Variables CSS et thèmes|Variables CSS et thèmes]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://sass-lang.com/documentation/
