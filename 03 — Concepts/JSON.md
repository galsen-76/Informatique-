---
type: concept
module: "[[Module 05 - JavaScript]]"
related:
  - "[[HTTP]]"
  - "[[API REST]]"
tags:
  - concept
  - web
---
# JSON

> [!info] En une phrase
> Un format texte simple pour représenter des données structurées, compris par presque tous les langages.

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

## 3 · Relier
- **Complémentaires** : [[HTTP]] (le transport), [[API REST]] (l'usage principal)
- **Utilisé par** : [[Express]] (`res.json()`), [[Gestionnaire de paquets]] (`package.json`), [[JWT]] (contenu du jeton)
