---
type: concept
domain: web
module: "[[Module 05 - JavaScript]]"
status: a-decouvrir
level: debutant
niveau: 2
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites: []
parents: []
related:
  - "[[HTTP]]"
  - "[[API REST]]"
next_review: 
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

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine une dépense en JSON comme une boîte avec ses clés et ses valeurs, puis une liste de deux dépenses.

> [!example] 🛣️ Suis le trajet
> Suis une dépense de l'objet Python dans l'API jusqu'à l'objet JavaScript dans Vue : où est-elle du texte, où est-elle un objet ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - JSON » et je l'intègre ici avec `![[Schéma - JSON.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Complémentaires** : [[HTTP]] (le transport), [[API REST]] (l'usage principal)
- **Utilisé par** : [[Express]] (`res.json()`), [[Gestionnaire de paquets]] (`package.json`), [[JWT]] (contenu du jeton)

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
