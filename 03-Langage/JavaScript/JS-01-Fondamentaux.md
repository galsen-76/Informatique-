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

## Pourquoi ça marche

JavaScript a été conçu pour **réagir** à ce qui se passe dans la page, sans jamais la bloquer. D'où ses choix :
- **un seul fil d'exécution** : pas de conflit entre deux morceaux de code qui modifieraient la page en même temps ;
- **`const` par défaut** : moins une valeur change, moins il y a d'endroits où un bug peut apparaître. Quand tu lis `const`, tu sais que la variable désignera toujours la même chose ;
- **`let` plutôt que `var`** : `let` n'existe que dans son bloc `{ }`, donc une variable ne « fuit » pas là où on ne l'attend pas.

## Contre-exemple

**Intuition fausse : « `const` veut dire que la valeur ne change jamais. »**

```js
const favoris = [];
favoris.push('Dune');   // ✅ aucune erreur
console.log(favoris);   // ['Dune']
```

`const` empêche de **remplacer** la variable (`favoris = [...]`), pas de **modifier** l'objet ou le tableau qu'elle contient.

## Pièges

- **`var`** : sa portée fuit hors des blocs `{ }`. Utilise `let` et `const`.
- **Java ≠ JavaScript** : aucun rapport, à part le nom.
- **Un calcul très long bloque la page** : comme il n'y a qu'un fil, rien d'autre ne peut s'exécuter pendant ce temps.

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Quand utiliser `const`, `let` et `var` ?**

> [!check]- Réponse
> `const` par défaut ; `let` si la variable doit être réassignée (compteur, boucle) ; `var` jamais.

**2. Pourquoi un calcul très long fige-t-il la page ?**

> [!check]- Réponse
> JavaScript n'a qu'un seul fil d'exécution : tant que le calcul tourne, il ne peut ni afficher ni réagir aux clics.

**3. Quelle est la différence entre JavaScript et ECMAScript ?**

> [!check]- Réponse
> ECMAScript est la norme (les règles du langage), JavaScript est le langage qui la suit. Une nouvelle version de la norme sort chaque année.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Prédire le résultat

Sans lancer le code, que se passe-t-il à chaque ligne ?

```js
const title = 'Dune';
title = 'Alien';

let year = 2021;
year = year + 3;
console.log(year);
```

> [!tip]- Indice 1
> Relis la ligne 2 : peut-on donner une nouvelle valeur à une variable déclarée avec `const` ?

> [!tip]- Indice 2
> Une erreur arrête le programme. Imagine que la ligne 2 n'existe pas pour trouver ce que vaut `year` à la fin.

> [!success]- Solution
> - `title = 'Alien'` provoque une erreur **TypeError: Assignment to constant variable** : une `const` ne peut pas être réaffectée.
> - Sans cette ligne, `console.log(year)` affiche **2024** : une `let` peut changer de valeur.
>
> Règle : `const` par défaut, `let` seulement si la valeur doit changer.

### Exercice 2 · Écrire une petite fonction

Écris une fonction `label(title, year)` qui renvoie `"Dune (2021)"`. Si l'année est avant 2000, elle ajoute ` · classique` : `"Alien (1979) · classique"`.

> [!tip]- Indice 1
> Un template string s'écrit entre accents graves et insère une variable avec `${…}`.

> [!tip]- Indice 2
> Construis d'abord le texte de base, puis décide avec une condition (`if` ou `? :`) si tu ajoutes « · classique ».

> [!success]- Solution
> ```js
> function label(title, year) {
>   const base = `${title} (${year})`;
>   return year < 2000 ? `${base} · classique` : base;
> }
>
> label('Dune', 2021);   // "Dune (2021)"
> label('Alien', 1979);  // "Alien (1979) · classique"
> ```

### Transfert · Le ticket de cinéma

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Écris une fonction `ticketPrice(age)` qui renvoie le prix d'une place : 5 € pour les moins de 12 ans, 7 € pour les 65 ans et plus, 10 € sinon. Puis affiche dans la console `Prix : 7 €` pour une personne de 70 ans, avec un template string.

> [!tip]- Indice 1
> Il y a trois cas : commence par les deux cas particuliers, le cas général vient en dernier.

> [!tip]- Indice 2
> Un `if` qui fait `return` arrête la fonction : pas besoin de `else` après.

> [!success]- Solution
> ```js
> function ticketPrice(age) {
>   if (age < 12) return 5;
>   if (age >= 65) return 7;
>   return 10;
> }
>
> console.log(`Prix : ${ticketPrice(70)} €`);   // Prix : 7 €
> ```

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer pourquoi JavaScript n'a qu'un seul fil d'exécution et ce que ça change
- [ ] **Rappeler** : Dire de mémoire quand utiliser `const`, `let` et pourquoi jamais `var`
- [ ] **Utiliser** : Écrire une fonction avec une condition et un template string sans modèle sous les yeux
- [ ] **Résoudre un problème nouveau** : Prédire si une modification d'une variable `const` déclenche une erreur ou non
- [ ] **Repérer les erreurs** : Repérer dans un code existant un `var` ou un calcul qui bloque la page
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand JavaScript seul ne suffit pas : dans tes projets, tu écris du TypeScript
