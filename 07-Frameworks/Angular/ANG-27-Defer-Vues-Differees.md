---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
tags:
  - frameworks/angular/defer
aliases:
  - "Vues différées @defer Angular"
parent: "[[Angular]]"
related_theory:
  - "[[ANG-15-Performance-Bonnes-Pratiques|Performance & Bonnes Pratiques Angular]]"
  - "[[ANG-26-SSR-Hydratation|SSR et Hydratation Angular]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/templates/defer"
---

# Vues différées @defer Angular

> [!abstract] En bref
> `@defer` charge une partie de la page **seulement quand c'est utile** : quand elle apparaît à l'écran, au survol, au clic, ou quand le navigateur n'a rien d'autre à faire. Le code des composants à l'intérieur n'est même pas téléchargé avant. Idéal pour la section « Films similaires » en bas d'une fiche.

## Exemple : la fiche d'un film

```html
<h1>{{ movie().title }}</h1>
<p>{{ movie().overview }}</p>

@defer (on viewport) {
  <app-similar-movies [movieId]="movie().id" />      <!-- chargé quand on fait défiler jusqu'ici -->
} @placeholder {
  <div class="skeleton" style="height: 280px"></div> <!-- affiché avant -->
} @loading (minimum 300ms) {
  <app-loader />                                     <!-- pendant le téléchargement -->
} @error {
  <p>Impossible de charger les suggestions.</p>
}
```

| Bloc | Affiché |
|---|---|
| `@placeholder` | avant que le déclencheur ait lieu |
| `@loading` | pendant le téléchargement du code |
| `@error` | si le téléchargement échoue |

## Les déclencheurs

| Déclencheur | Charge quand… | Usage |
|---|---|---|
| `on viewport` | la zone devient visible | bas de page, sections longues |
| `on interaction` | l'utilisateur clique ou tape dessus | lecteur de bande-annonce |
| `on hover` | survol | aperçu |
| `on idle` (défaut) | le navigateur est inoccupé | contenu secondaire |
| `on timer(2s)` | après un délai | |
| `when condition()` | une condition devient vraie | `when showComments()` |

On peut ajouter `prefetch on idle` : télécharger le code en avance, mais ne l'afficher qu'au déclenchement.

## Quand l'utiliser ?

- Composants **lourds** (graphiques, lecteur vidéo, éditeur de texte riche).
- Contenu **sous la ligne de flottaison** (qu'on ne voit pas sans faire défiler).
- Contenu **rarement utilisé** (onglet secondaire, commentaires).

**Pas** pour ce qui est visible immédiatement en haut de page : l'utilisateur verrait un « trou » qui se remplit.

## Pièges

- **Un composant utilisé aussi ailleurs sans `@defer`** : son code est de toute façon dans le paquet principal, le gain disparaît.
- **Oublier `@placeholder`** avec `on viewport` : sans élément à observer, rien ne se déclenche.
- **Réserver la hauteur** dans le placeholder, sinon la page « saute » au chargement.
