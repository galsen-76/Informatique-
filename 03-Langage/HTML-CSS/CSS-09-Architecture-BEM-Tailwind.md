---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frontend/css/architecture
aliases:
  - "Architecture CSS BEM et Tailwind"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[CSS-08-SCSS-Sass|SCSS Sass]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://tailwindcss.com/docs"
---

# Architecture CSS BEM et Tailwind

> [!abstract] En bref
> Sur un gros projet, le CSS devient vite ingérable : on ne sait plus quelle règle agit où, et modifier un style en casse un autre. Trois stratégies existent : une convention de nommage (**BEM**), le **CSS limité au composant** (Angular / Vue), et le **CSS utilitaire** (**Tailwind**). Dans tes projets, tu combineras surtout les deux dernières.

## Le problème

```css
.titre { color: red; }   /* écrit pour la page Contact… */
```

… et tous les `.titre` du site deviennent rouges. Le CSS est **global** par défaut.

## Solution 1 : BEM, une convention de nommage

**B**loc, **E**lément, **M**odificateur :

```html
<article class="carte carte--favori">
  <h3 class="carte__titre">Dune</h3>
  <button class="carte__bouton">Voir</button>
</article>
```

| Partie | Écriture | Sens |
|---|---|---|
| Bloc | `carte` | le composant |
| Élément | `carte__titre` | une partie du bloc |
| Modificateur | `carte--favori` | une variante |

Chaque classe est unique et plate : pas de conflit, pas de sélecteurs imbriqués.

## Solution 2 : le CSS du composant (ce que tu fais déjà)

Angular et Vue **limitent** le CSS d'un composant à ce composant :

```vue
<style scoped>
.titre { color: red; }   /* ne touche QUE les .titre de ce composant */
</style>
```

En Angular, c'est automatique pour le CSS de chaque composant. Plus besoin de noms à rallonge : `.titre` suffit à l'intérieur d'un composant.

## Solution 3 : Tailwind, des classes utilitaires

Chaque classe fait **une seule chose**, et on les combine directement dans le HTML :

```html
<article class="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-emerald-500">
  <h3 class="text-lg font-bold">Dune</h3>
  <p class="text-sm text-slate-400">2021 · SF</p>
</article>
```

| Avantages | Inconvénients |
|---|---|
| on ne quitte pas le HTML | HTML chargé |
| aucun conflit, aucun CSS mort | il faut apprendre les noms de classes |
| cohérent (espacements et couleurs d'une échelle fixe) | |
| responsive facile : `md:grid-cols-3` | |

## Ce que tu utilises dans tes projets

| Besoin | Outil |
|---|---|
| Les composants tout faits (boutons, tableaux, menus) | PrimeVue / PrimeNG |
| La mise en page et les ajustements | Tailwind ou CSS du composant |
| Les couleurs, rayons, ombres | variables CSS de la charte |

Voir [[UI-Librairies-Interfaces-Rapides|Librairies UI]].

**Au travail**, suis la convention déjà en place dans le projet.
