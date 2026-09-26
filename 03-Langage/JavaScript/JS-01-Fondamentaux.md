---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/javascript/fondamentaux
aliases:
  - "Fondamentaux JavaScript"
parent: "[[JavaScript]]"
related_theory:
  - "[[TG-01-Comment-fonctionne-un-programme|Comment fonctionne un programme]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide"
---

# Fondamentaux JavaScript

> [!abstract] En bref
> JavaScript est le seul langage que le navigateur comprend : il rend les pages interactives. TypeScript, Angular, Vue et NestJS reposent tous dessus. Ici : ce qu'il faut savoir pour écrire tes premières lignes sans pièges.

## Ce qu'est JavaScript

- **HTML** = le squelette de la page, **CSS** = ses vêtements, **JavaScript** = son système nerveux : il réagit aux clics et modifie la page.
- Il tourne **dans le navigateur**, et aussi **sur un serveur** grâce à Node.js. Un seul langage pour le front et le back.
- Il s'exécute **ligne par ligne, sur un seul fil** (un seul « thread ») : une seule chose à la fois. Les attentes (appel réseau, minuteur) sont gérées par l'[[JS-06-Event-Loop|Event Loop]].
- Sa norme s'appelle **ECMAScript**. Une nouvelle version sort chaque année (ES2015 a tout modernisé, puis ES2016, ES2017…).

## Déclarer une variable

```js
const titre = 'Inception';  // ne changera pas
let note = 8;               // va changer
note = 9;
console.log(`${titre} : ${note}/10`);  // Inception : 9/10
```

| Mot-clé | Quand | Réassignable |
|---|---|---|
| `const` | **par défaut** | non |
| `let` | la valeur va changer (compteur, boucle) | oui |
| `var` | **jamais** : ancienne syntaxe pleine de pièges | oui |

> [!warning] `const` ne rend pas un objet figé
> ```js
> const film = { titre: 'Inception' };
> film.titre = 'Dune';   // ✅ autorisé : on modifie le contenu
> film = {};             // ❌ interdit : on remplace la variable
> ```
> `const` interdit de **remplacer** la variable, pas de **modifier** ce qu'il y a dedans.

## Les briques de base

```js
// Condition
if (note >= 8) {
  console.log('Excellent');
} else {
  console.log('Moyen');
}

// Boucle sur une liste
const films = ['Inception', 'Dune', 'Heat'];
for (const film of films) {
  console.log(film);
}

// Fonction
function direBonjour(prenom) {
  return `Bonjour ${prenom}`;
}
direBonjour('Awa');  // 'Bonjour Awa'
```

Les **template strings** (entre accents graves `` ` ``) permettent d'insérer des variables avec `${…}`.

## Où écrire du JavaScript pour tester

- **La console du navigateur** : F12 → onglet Console. Parfait pour essayer une ligne.
- **Un fichier avec Node** : `node test.js` dans le terminal.
- Dans tes projets, tu écriras du **TypeScript**, qui est transformé en JavaScript avant d'être exécuté.

## Pièges

- **`var`** : sa portée fuit hors des blocs `{ }`. Utilise `let` et `const`.
- **Java ≠ JavaScript** : aucun rapport, à part le nom.
- **Un calcul très long bloque la page** : comme il n'y a qu'un fil, rien d'autre ne peut s'exécuter pendant ce temps.
