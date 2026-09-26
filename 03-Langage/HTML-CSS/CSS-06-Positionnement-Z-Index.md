---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/css/position
aliases:
  - "Positionnement et Z-Index CSS"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[CSS-02-Box-Model|Box Model CSS]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/CSS/position"
---

# Positionnement et Z-Index CSS

> [!abstract] En bref
> `position` permet de sortir un élément du flux normal de la page : un en-tête qui reste collé en haut, un badge dans le coin d'une carte, une fenêtre modale par-dessus tout. `z-index` règle **qui passe devant qui**.

## Les 5 valeurs de `position`

| Valeur | Comportement | Usage typique |
|---|---|---|
| `static` | normal (défaut) | |
| `relative` | reste à sa place, mais sert de **repère** à ses enfants `absolute` | le parent d'un badge |
| `absolute` | placé par rapport au parent `relative` le plus proche ; ne prend plus de place | badge, icône dans un coin |
| `fixed` | placé par rapport à l'écran ; ne bouge pas au défilement | bouton « retour en haut », bandeau |
| `sticky` | normal, puis **se colle** quand on fait défiler | en-tête de page, sommaire latéral |

## Les recettes

```css
/* En-tête collé en haut (Portfolio) */
header {
  position: sticky;
  top: 0;
  z-index: 10;
}

/* Badge dans le coin d'une carte */
.carte { position: relative; }
.carte .badge {
  position: absolute;
  top: 12px;
  right: 12px;
}

/* Fond sombre de modale sur tout l'écran */
.fond-modale {
  position: fixed;
  inset: 0;              /* = top: 0; right: 0; bottom: 0; left: 0 */
  background: rgb(0 0 0 / 0.6);
  z-index: 100;
}
```

## `z-index` : l'ordre d'empilement

Plus le nombre est grand, plus l'élément passe **devant**. Il ne fonctionne que sur un élément positionné (autre que `static`) ou dans un conteneur Flex / Grid.

Garde une petite échelle cohérente dans le projet :

| Couche | z-index |
|---|---|
| contenu normal | 0 |
| en-tête collé | 10 |
| menu déroulant | 50 |
| modale | 100 |
| notification (toast) | 200 |

## Le piège classique : `z-index: 9999` qui ne marche pas

Certaines propriétés (`transform`, `opacity` < 1, `filter`, `position` + `z-index`) créent une **boîte fermée** (un « contexte d'empilement »). Un enfant avec `z-index: 9999` ne peut pas sortir de la boîte de son parent : si le parent est derrière, l'enfant aussi.

**Solution :** afficher la modale ou le menu **en dehors** du composant, directement dans `<body>`. C'est ce que font les librairies : `Teleport` en Vue, l'Overlay du CDK en Angular, PrimeVue et PrimeNG automatiquement.

## Pièges

- **`absolute` sans parent `relative`** : l'élément se place par rapport à la page entière.
- **`sticky` qui ne colle pas** : il faut un `top`, et aucun parent avec `overflow: hidden`.
- **Monter les `z-index` à l'infini** : tiens-toi à l'échelle ci-dessus.
