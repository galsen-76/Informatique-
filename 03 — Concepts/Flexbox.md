---
type: concept
domain: web
module: "[[Module 04 - HTML et CSS]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Modèle de boîte]]"
parents: []
related:
  - "[[Grid CSS]]"
next_review: 
method: []
tags:
  - concept
  - web
---
# Flexbox

> [!info] En une phrase
> Le mode de mise en page CSS pour aligner des éléments sur une ligne ou une colonne, les espacer et les répartir.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

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

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine un conteneur flex avec trois cartes de dépenses. Trace l'axe principal et l'axe secondaire, et montre ce que font `justify-content` et `align-items`.

> [!example] 🔄 Change de contexte
> Redessine-le en colonne (`flex-direction: column`). Que deviennent les deux axes ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Flexbox » et je l'intègre ici avec `![[Schéma - Flexbox.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Modèle de boîte]]
- **Complémentaires** : [[Grid CSS]] · [[Responsive design]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
