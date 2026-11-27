---
type: concept
module: "[[Module 04 - HTML et CSS]]"
related:
  - "[[Grid CSS]]"
tags:
  - concept
  - web
---
# Flexbox

> [!info] En une phrase
> Le mode de mise en page CSS pour aligner des éléments sur une ligne ou une colonne, les espacer et les répartir.

## 1 · Comprendre
### Définition
`display: flex` sur un **conteneur** range ses enfants le long d'un **axe principal** (`flex-direction: row` ou `column`). On règle :
- `justify-content` : répartition **le long** de l'axe (`flex-start`, `center`, `space-between`) ;
- `align-items` : alignement **en travers** (`center`, `stretch`) ;
- `gap` : l'espace entre les éléments ;
- `flex-wrap: wrap` : passer à la ligne ;
- sur un enfant, `flex: 1` : prendre la place restante.

### Pourquoi ça existe
Aligner et centrer était un casse-tête avant Flexbox (flottants, tableaux).

### Le problème résolu
Centrer verticalement, répartir des boutons, faire une barre de navigation.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  C[Conteneur flex] --> A[Élément]
  C --> B[Élément]
  C --> D[Élément]
```

### Exemple concret
```css
.barre {
  display: flex;
  justify-content: space-between;   /* logo à gauche, menu à droite */
  align-items: center;
  gap: 1rem;
}
.centre {                            /* centrer dans les deux sens */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.ligne > .principal { flex: 1; }     /* prend toute la place restante */
```

### Cas d'utilisation
- Barres de navigation, rangées de boutons, cartes alignées
- Centrer quelque chose

> [!warning] À ne pas confondre
> **Flexbox** (une dimension : ligne **ou** colonne) et [[Grid CSS]] (deux dimensions : lignes **et** colonnes). Les propriétés `justify-*` et `align-*` changent de sens quand `flex-direction` passe à `column`.

## 3 · Relier
- **Prérequis** : [[Modèle de boîte]]
- **Complémentaires** : [[Grid CSS]] · [[Responsive design]]
