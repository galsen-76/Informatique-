---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/css/grid
aliases:
  - "Grid CSS"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[CSS-02-Box-Model|Box Model CSS]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://css-tricks.com/snippets/css/complete-guide-grid/"
---

# Grid CSS

> [!abstract] En bref
> Grid organise des éléments en **lignes et colonnes à la fois**, comme un tableau invisible. C'est l'outil pour une grille de cartes (tes projets, les affiches de films) ou la mise en page générale d'un écran.

## Une grille de cartes

```css
.projets {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* 3 colonnes de même largeur */
  gap: 18px;
}
```

`1fr` = « une part de l'espace disponible ». `repeat(3, 1fr)` = trois parts égales.

## LA recette responsive (sans media query)

```css
.affiches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}
```

Se lit : « mets autant de colonnes que possible, chacune d'au moins 160 px, et partage le reste ». Sur mobile : 2 colonnes. Sur grand écran : 7. **Aucune media query.** Parfait pour la grille d'affiches de CinéTrack.

## Mise en page avec contenu + barre latérale

```css
.page-detail {
  display: grid;
  grid-template-columns: 1fr 300px;   /* contenu flexible + colonne fixe */
  gap: 40px;
}

@media (max-width: 900px) {
  .page-detail { grid-template-columns: 1fr; }   /* une seule colonne sur mobile */
}
```

## Aide-mémoire

| Propriété (parent) | Exemple | Effet |
|---|---|---|
| `grid-template-columns` | `200px 1fr` | colonnes : 200 px fixe + le reste |
| `grid-template-rows` | `auto 1fr auto` | lignes : en-tête, contenu, pied |
| `gap` | `16px` | espace entre les cases |
| `place-items` | `center` | centre le contenu de chaque case |

| Propriété (enfant) | Exemple | Effet |
|---|---|---|
| `grid-column` | `1 / -1` | s'étend sur toute la largeur |
| `grid-column` | `span 2` | occupe 2 colonnes |

## Nommer les zones (lisible pour une mise en page)

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "menu   main"
    "footer footer";
  grid-template-columns: 240px 1fr;
}
header { grid-area: header; }
nav    { grid-area: menu; }
main   { grid-area: main; }
footer { grid-area: footer; }
```

## Flexbox ou Grid ?

| Besoin | Outil |
|---|---|
| Une rangée de boutons, une barre de menu | Flexbox |
| Une grille de cartes | Grid |
| La mise en page d'un écran | Grid |
| Centrer un élément | les deux (`place-items: center` en Grid) |

On les combine souvent : une grille de cartes (Grid), et dans chaque carte, un pied avec des boutons (Flexbox).

Jeu pour s'entraîner : [Grid Garden](https://cssgridgarden.com/#fr).

## Pièges

- **`auto-fill` vs `auto-fit`** : avec peu d'éléments, `auto-fit` les étire pour remplir la ligne, `auto-fill` garde des cases vides. Pour une grille de cartes, `auto-fill` donne des cartes de taille régulière.
- **Un contenu très large** (code, URL longue) casse la grille : `min-width: 0` sur l'enfant.
