---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frontend/css/scss
aliases:
  - "SCSS Sass"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[CSS-07-Variables-Themes|Variables CSS et Thèmes]]"
related_snippets:
  - "[[04_Snippets/css-08-scss-sass]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://sass-lang.com/documentation/"
---

# SCSS Sass

> [!abstract] Introduction
> SCSS est un préprocesseur CSS (utilisé par défaut dans beaucoup de projets Angular) qui ajoute imbrication, variables, mixins, fonctions et modules, compilés en CSS standard.

> [!warning]- Prérequis
> [[CSS-07-Variables-Themes|Variables CSS et Thèmes]]

---

## Théorie

> [!question]- C'est quoi ?
> ```scss
> @use 'sass:math';
> $breakpoint-md: 768px;
> @mixin md { @media (min-width: $breakpoint-md) { @content; } }
> .film-card {
>   padding: 1rem;
>   &__titre { font-weight: 600; }
>   &:hover { box-shadow: 0 2px 8px rgba(0,0,0,.1); }
>   @include md { padding: 2rem; }
> }
> ```

> [!example]- Analogie
> SCSS est un traitement de texte avec des macros : tu écris plus court, il génère le document long à ta place.

> [!question]- Pourquoi l'utiliser ?
> Organiser de gros projets (partials, modules), éviter la répétition (mixins), générer des classes (boucles).

> [!question]- Comment ça marche ?
> - `&` : référence au sélecteur parent
> - `@use` / `@forward` : système de modules (remplace `@import`, déprécié)
> - `@mixin` / `@include` : blocs réutilisables
> - `%placeholder` + `@extend` : héritage (à utiliser avec parcimonie)
> - Fichiers partiels `_variables.scss`

> [!question]- Quand l'utiliser ?
> Projets Angular existants (souvent en SCSS), design systems. En Vue : `<style lang="scss" scoped>`.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Le CSS natif a rattrapé une partie de SCSS (variables, imbrication native, `@layer`). Imbriquer trop profondément génère des sélecteurs trop spécifiques.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Préprocesseur | Outil qui compile un langage vers du CSS |
| Mixin | Bloc de styles paramétrable réutilisable |
| Partial | Fichier SCSS importé, préfixé par `_` |

---

## Points clés

- `@use` au lieu de `@import`
- Max 3 niveaux d'imbrication
- Variables SCSS pour le build, variables CSS pour l'exécution

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `@import` déprécié (Dart Sass 3 le supprime)
> - `@extend` qui génère des sélecteurs énormes

---

## Exemple minimal

```scss
// _tokens.scss
$espaces: (xs: .25rem, sm: .5rem, md: 1rem, lg: 2rem);
@each $nom, $valeur in $espaces {
  .p-#{$nom} { padding: $valeur; }
}
```

> [!note] Ce que j'en retiens
> Une boucle SCSS génère toute une famille de classes utilitaires.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Configurer `stylePreprocessorOptions.includePaths` dans `angular.json`
> - Exposer les tokens SCSS en variables CSS pour le thème dynamique

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[CSS-09-Architecture-BEM-Tailwind|Architecture CSS BEM et Tailwind]]

**Pratique :**
- Extrait de code → [[04_Snippets/css-08-scss-sass]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `@use` remplace-t-il `@import` ?

---

## Tâches

- [ ] #task Convertir le CSS du portfolio en SCSS avec partials
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
