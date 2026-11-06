---
type: concept
domain: javascript
module: "[[Module 05 - JavaScript]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Fonction fléchée et callback]]"
parents:
  - "[[JavaScript]]"
related:
  - "[[Module JavaScript (import et export)]]"
next_review: 
method: []
tags:
  - concept
  - javascript
---
# Portée et closure

> [!info] En une phrase
> Une variable n'existe que dans le bloc où elle est déclarée (portée) ; une fonction se souvient des variables de l'endroit où elle a été créée (closure).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
- **Portée de bloc** : une variable `let`/`const` déclarée entre `{ }` n'existe que dans ce bloc.
- **Portée de fonction** : les variables d'une fonction sont invisibles à l'extérieur.
- **Closure** (fermeture) : une fonction créée à l'intérieur d'une autre garde l'accès aux variables de celle-ci, même après la fin de la fonction extérieure.
```js
function compteur() {
  let n = 0;                 // privé
  return () => { n += 1; return n; };
}
const suivant = compteur();
suivant(); // 1
suivant(); // 2   ← n a survécu
```

### Pourquoi ça existe
Isoler les variables pour qu'un morceau de code n'écrase pas celles d'un autre, et garder un état privé.

### Le problème résolu
Éviter les variables globales partagées par tout le programme, source de bugs difficiles.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
G[Global] --> F[Fonction]
  F --> B[Bloc]
  B -.voit.-> F
  F -.voit.-> G
```

### Exemple concret
```js
const tarif = 2;                 // global
function prix(qte) {
  const total = qte * tarif;     // voit tarif
  if (total > 10) {
    const remise = 1;            // n'existe que dans ce if
    return total - remise;
  }
  return total;
}
// console.log(total);  ← ReferenceError : total n'existe pas ici
```

### Cas d'utilisation
- Les gestionnaires d'événements qui utilisent des variables de leur composant
- Les hooks React (`useState` repose sur des closures)
- Fabriquer des fonctions configurées (`creerLogger("zip")`)

> [!warning] À ne pas confondre
> Une closure ne copie pas la valeur : elle garde **la variable**. Si la variable change ensuite, la fonction voit la nouvelle valeur.

## 3 · Pratiquer
- Écris `creerCompteur(depart)` qui renvoie une fonction ; crée deux compteurs indépendants
- Explique pourquoi une variable déclarée dans un `if` n'est pas visible après

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Fonction fléchée et callback]]
- **Complémentaires** : [[Module JavaScript (import et export)]]
- **Utilisé par** : [[React]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
