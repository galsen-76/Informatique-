---
type: concept
domain: web
module: "[[Module 05 - JavaScript]]"
status: a-decouvrir
level: debutant
prerequisites: []
parents: []
related:
  - "[[HTTP]]"
  - "[[API REST]]"
next_review: 
method: []
tags:
  - concept
  - web
---
# JSON

> [!info] En une phrase
> Un format texte simple pour représenter des données structurées, compris par presque tous les langages.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**JSON** (JavaScript Object Notation) représente des **objets** `{ }`, des **tableaux** `[ ]`, des chaînes, des nombres, des booléens et `null`. C'est le format d'échange le plus utilisé par les [[API REST]].

### Pourquoi ça existe
Échanger des données entre programmes écrits dans des langages différents, avec un format lisible par un humain et facile à analyser par une machine.

### Le problème résolu
Avant JSON, on utilisait surtout XML, plus verbeux et plus lourd à lire et à parser.

## 2 · Explorer
### Comment ça fonctionne
Règles strictes (une seule erreur et le JSON est invalide) :
- clés **toujours** entre guillemets doubles : `"title"`
- pas de virgule après le dernier élément
- pas de commentaires, pas de `undefined`, pas de fonctions

En JavaScript :
```js
const texte = JSON.stringify({ id: 1, done: false }); // objet → texte
const objet = JSON.parse('{"id":1,"done":false}');   // texte → objet
```

### Exemple concret
```json
{
  "id": 42,
  "title": "Courses",
  "tags": ["perso", "urgent"],
  "done": false,
  "author": { "name": "Oumar" }
}
```

### Cas d'utilisation
- Corps des requêtes et réponses d'API
- Fichiers de configuration (`package.json`, `tsconfig.json`)
- Stockage simple

> [!warning] À ne pas confondre
> **JSON** et **objet JavaScript** : JSON est du *texte* avec des règles plus strictes. `{ title: 'a' }` est un objet JS valide mais du JSON invalide.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine une dépense en JSON comme une boîte avec ses clés et ses valeurs, puis une liste de deux dépenses.

> [!example] 🛣️ Suis le trajet
> Suis une dépense de l'objet Python dans l'API jusqu'à l'objet JavaScript dans Vue : où est-elle du texte, où est-elle un objet ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - JSON » et je l'intègre ici avec `![[Schéma - JSON.excalidraw]]`._

### Appliquer dans le fil rouge
- [[Réannoter 01 - Lire le JSON dans ton script]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Complémentaires** : [[HTTP]] (le transport), [[API REST]] (l'usage principal)
- **Utilisé par** : [[Express]] (`res.json()`), [[npm]] (`package.json`), [[JWT]] (contenu du jeton)

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
