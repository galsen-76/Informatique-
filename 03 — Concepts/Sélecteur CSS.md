---
type: concept
domain: web
module: "[[Module 04 - HTML et CSS]]"
status: a-decouvrir
level: debutant
niveau: 2
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[CSS]]"
  - "[[Élément et attribut HTML]]"
parents:
  - "[[CSS]]"
related:
  - "[[DOM]]"
next_review: 
tags:
  - concept
  - web
---
# Sélecteur CSS

> [!info] En une phrase
> La partie d'une règle CSS qui dit à quels éléments elle s'applique : par balise, classe, identifiant, position ou état.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
| Sélecteur | Vise |
| --- | --- |
| `p` | toutes les balises `p` |
| `.carte` | les éléments de classe `carte` |
| `#exporter` | l'élément d'id `exporter` |
| `.carte p` | les `p` **à l'intérieur** d'une `.carte` |
| `.carte > p` | les `p` **enfants directs** |
| `a:hover` | un lien survolé (pseudo-classe) |
| `li:first-child`, `li:nth-child(2n)` | par position |
| `input[type="email"]` | par attribut |
| `.btn::before` | un pseudo-élément |

**Spécificité** : `#id` > `.classe` / `:pseudo` / `[attr]` > `balise`. À égalité, la dernière règle gagne. `!important` écrase tout (à éviter).

### Pourquoi ça existe
Appliquer un style précisément là où on le veut sans toucher au HTML.

### Le problème résolu
Mettre des attributs `style` sur chaque élément.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  ID["#id"] --> W[Gagne]
  CL[.classe] --> W2[Puis]
  B[balise] --> W3[Puis]
```

### Exemple concret
```css
.menu a { text-decoration: none; }
.menu a:hover, .menu a:focus { text-decoration: underline; }
.liste li:nth-child(odd) { background: #222; }
```
Les mêmes sélecteurs servent en JavaScript : `document.querySelectorAll(".menu a")`.

### Cas d'utilisation
- Styliser un composant sans affecter le reste
- Retrouver des éléments en JavaScript ou dans un test de bout en bout

> [!warning] À ne pas confondre
> `.a .b` (b **dans** a, avec espace) et `.a.b` (un élément qui a **les deux** classes, sans espace).

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine un petit arbre HTML (une liste de dépenses) et entoure de couleurs différentes ce que choisissent `li`, `.cher`, `#total` et `li:hover`.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   S[.depense p] --> A[Tous les p]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Sélecteur CSS » et je l'intègre ici avec `![[Schéma - Sélecteur CSS.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[CSS]] · [[Élément et attribut HTML]]
- **Utilisé par** : [[DOM]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
