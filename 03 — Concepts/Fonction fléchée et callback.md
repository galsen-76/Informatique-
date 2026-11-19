---
type: concept
domain: javascript
module: "[[Module 05 - JavaScript]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Fonction]]"
  - "[[Variables et types en JavaScript]]"
parents:
  - "[[JavaScript]]"
related:
  - "[[Portée et closure]]"
  - "[[Méthodes de tableau (map, filter, reduce)]]"
next_review: 
method: []
tags:
  - concept
  - javascript
---
# Fonction fléchée et callback

> [!info] En une phrase
> En JavaScript une fonction est une valeur : on l'écrit souvent en flèche (x => x * 2) et on la passe à une autre fonction qui l'appellera plus tard (callback).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
```js
function doubler(x) { return x * 2; }   // déclaration classique
const doubler2 = (x) => x * 2;           // fonction fléchée, retour implicite
const saluer = (nom = "toi") => {        // paramètre par défaut, corps en bloc
  return `Bonjour ${nom}`;
};
```
Un **callback** est une fonction passée en argument, que l'autre fonction appelle au bon moment :
```js
setTimeout(() => console.log("2 secondes plus tard"), 2000);
bouton.addEventListener("click", () => console.log("clic"));
```

### Pourquoi ça existe
Le navigateur est piloté par des événements (clic, réponse réseau, minuterie) : il faut pouvoir dire « quand ça arrive, appelle ceci ».

### Le problème résolu
Réutiliser un comportement et brancher son propre code sur celui d'une bibliothèque.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
A[Mon code] -->|donne f| B[addEventListener]
  E[Clic] --> B
  B -->|appelle| F[f]
```

### Exemple concret
```js
const nombres = [1, 2, 3];
const doubles = nombres.map((n) => n * 2);   // map appelle le callback pour chaque élément
console.log(doubles); // [2, 4, 6]
```

### Cas d'utilisation
- Gestion d'événements
- Méthodes de tableau
- Composants React (fonctions qui renvoient de l'affichage)

> [!warning] À ne pas confondre
> Passer `f()` au lieu de `f` : `addEventListener("click", envoyer())` **appelle** `envoyer` tout de suite et passe son résultat. Il faut passer la fonction elle-même : `envoyer` ou `() => envoyer()`.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🛣️ Suis le trajet
> Dessine `depenses.forEach(d => console.log(d.montant))` : qui appelle la fonction fléchée, combien de fois, avec quoi.

> [!example] 🔄 Change de contexte
> Redessine la même idée pour un écouteur de clic `bouton.addEventListener("click", () => …)`. Quand le callback est-il appelé ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Fonction fléchée et callback » et je l'intègre ici avec `![[Schéma - Fonction fléchée et callback.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Fonction]] · [[Variables et types en JavaScript]]
- **Complémentaires** : [[Portée et closure]] · [[Méthodes de tableau (map, filter, reduce)]]
- **Utilisé par** : [[Événement JavaScript]]

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
