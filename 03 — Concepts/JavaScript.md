---
type: concept
domain: javascript
module: "[[Module 05 - JavaScript]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[HTML]]"
  - "[[Fonction]]"
parents: []
related:
  - "[[Node.js]]"
  - "[[DOM]]"
next_review: 
method: []
tags:
  - concept
  - javascript
---
# JavaScript

> [!info] En une phrase
> Le langage de programmation du navigateur, qui tourne aussi côté serveur avec Node.js : il rend les pages interactives.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**JavaScript** (JS) est un langage de programmation **interprété**, à typage **dynamique**. Le navigateur l'exécute dans la page ; [[Node.js]] l'exécute en dehors du navigateur (serveurs, outils). Il n'a rien à voir avec Java malgré le nom.

Dans une page : le [[HTML]] donne la structure, le [[CSS]] l'apparence, et JavaScript le **comportement** (réagir à un clic, appeler une API, modifier la page).

### Pourquoi ça existe
Les premières pages web étaient figées. JavaScript a été créé pour qu'une page puisse réagir sans recharger.

### Le problème résolu
Faire des interfaces vivantes (formulaires qui se valident, listes qui se filtrent, données chargées à la demande) et, avec Node.js, utiliser un seul langage côté client et serveur.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
N[Navigateur] --> J[Moteur JS]
  J --> D[Modifie la page]
  S[Node.js] --> J2[Moteur JS]
  J2 --> F[Fichiers, réseau]
```

### Exemple concret
```html
<button id="btn">Compter</button>
<p id="sortie">0</p>
<script>
  let n = 0;
  document.querySelector("#btn").addEventListener("click", () => {
    n = n + 1;
    document.querySelector("#sortie").textContent = n;
  });
</script>
```
Pour tester sans page : ouvre la **console** du navigateur (F12, onglet Console) et tape `2 + 3`, ou lance `node` dans le terminal.

### Cas d'utilisation
- Le bouton à ajouter dans CVAT (React est du JavaScript)
- Les scripts `npm` et les outils de build
- Les API avec Express sur Node.js

> [!warning] À ne pas confondre
> **JavaScript** et **Java** (deux langages sans rapport). Et **JavaScript** et [[TypeScript]] : TypeScript est du JavaScript avec des types, compilé en JavaScript.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine où tourne JavaScript : dans le navigateur (avec le DOM) et dans Node (avec les fichiers). Place ce que chacun peut et ne peut pas faire.

> [!example] 🔄 Change de contexte
> Redessine ce schéma pour le plugin CVAT `nuclio-job` : où tourne son code, et à quoi a-t-il accès ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - JavaScript » et je l'intègre ici avec `![[Schéma - JavaScript.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[HTML]] · [[Fonction]]
- **Complémentaires** : [[Node.js]] · [[DOM]]
- **Utilisé par** : [[TypeScript]] · [[React]]

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
