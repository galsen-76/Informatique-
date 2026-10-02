---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - frontend/javascript/debug
aliases:
  - "Gestion des Erreurs et DevTools"
parent: "[[JavaScript]]"
related_theory:
  - "[[METH-05-Resolution-Problemes-Debug|Résolution de Problèmes et Débogage]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.chrome.com/docs/devtools"
---

# Gestion des Erreurs et DevTools

> [!abstract] En bref
> Deux compétences qui font gagner des heures : **gérer les erreurs** proprement dans ton code, et **enquêter** avec les outils du navigateur (F12) au lieu de deviner.

## Lever et attraper une erreur

```ts
function trouverFilm(id: number) {
  const film = films.find(f => f.id === id);
  if (!film) throw new Error(`Film ${id} introuvable`);   // on signale le problème
  return film;
}

try {
  const film = trouverFilm(99);
} catch (erreur) {
  console.error(erreur);          // on le traite
} finally {
  chargement = false;             // exécuté dans tous les cas
}
```

**Règle :** n'attrape que ce que tu sais traiter. Le reste, laisse-le remonter : une erreur cachée est pire qu'une erreur visible.

### Tes propres erreurs

```ts
class ErreurApi extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'ErreurApi';
  }
}

try {
  await chargerProfil();
} catch (e) {
  if (e instanceof ErreurApi && e.status === 401) redirigerVersConnexion();
  else throw e;   // pas pour moi → je relance
}
```

## Lire un message d'erreur

```
TypeError: Cannot read properties of undefined (reading 'titre')
    at FilmCardComponent.afficher (film-card.component.ts:14:22)
    at …
```

1. **Le type** (`TypeError`) et **le message** : ici, tu as lu `.titre` sur quelque chose de vide.
2. **La pile d'appels** (stack trace) : descends jusqu'à la première ligne qui vient de **ton** fichier (`film-card.component.ts:14`). C'est là qu'il faut regarder.

| Erreur | Veut souvent dire |
|---|---|
| `TypeError: … of undefined` | la donnée n'est pas encore arrivée, ou le nom du champ est faux |
| `ReferenceError: x is not defined` | faute de frappe, ou oubli d'import |
| `SyntaxError` | parenthèse ou accolade manquante, JSON mal formé |

## Les DevTools (F12)

| Onglet | Tu t'en sers pour |
|---|---|
| **Console** | voir les erreurs, tester une ligne de code |
| **Elements** | voir le HTML réel et modifier le CSS en direct |
| **Network** (Réseau) | voir chaque appel API : URL, statut, données envoyées et reçues |
| **Sources** | mettre le code **en pause** sur une ligne (point d'arrêt) et avancer pas à pas |
| **Application** | voir le localStorage et les cookies |
| **Lighthouse** | mesurer performance et accessibilité |

Ajoute les extensions **Angular DevTools** et **Vue DevTools** : elles montrent tes composants et leur état.

### Le point d'arrêt

Au lieu de mettre des `console.log` partout : dans **Sources**, clique sur un numéro de ligne (ou écris `debugger;` dans ton code). L'exécution s'arrête là, et tu vois la valeur de toutes les variables à cet instant.

## La méthode d'enquête

1. **Lire** le message et la pile d'appels.
2. **Reproduire** le bug à coup sûr.
3. Problème de **données** ? → onglet Network.
4. Problème de **logique** ? → point d'arrêt.
5. Une hypothèse à la fois, vérifiée avant de passer à la suivante.

Voir aussi [[METH-05-Resolution-Problemes-Debug|Résolution de problèmes]].

## Pourquoi ça marche

`throw` **interrompt** l'exécution et remonte la pile d'appels jusqu'au premier `try / catch` rencontré. Une erreur non attrapée remonte jusqu'en haut, et le navigateur l'affiche dans la console : c'est un **signal**, pas une catastrophe.

Une erreur attrapée puis ignorée supprime ce signal : le programme continue avec des données fausses, et le bug apparaît plus loin, loin de sa cause. D'où la règle : n'attrape que ce que tu sais traiter.

Le point d'arrêt fonctionne parce que le navigateur peut **figer** l'exécution sur une ligne : tu vois toutes les variables à cet instant, au lieu de deviner.

## Contre-exemple

**Intuition fausse : « un `try / catch` autour de tout rend le code plus robuste ».**

```js
try {
  const movie = movies.find((m) => m.id === id);
  render(movie.title);
} catch {}
```

Le code ne plante plus… mais n'affiche rien, et personne ne sait pourquoi. L'erreur était utile : elle disait « film introuvable ». Mieux vaut vérifier (`if (!movie)`) ou laisser l'erreur remonter.

## Pièges

- **`catch (e) {}` vide** : l'erreur disparaît, le bug devient introuvable.
- **`throw 'erreur'`** (un texte) : pas de pile d'appels. Lance toujours `new Error(…)`.
- **Des `console.log` oubliés** en production.

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Dans une pile d'appels (stack trace), quelle ligne regarder en premier ?**

> [!check]- Réponse
> La première qui vient de ton propre fichier, pas d'une librairie.

**2. Que signifie `TypeError: Cannot read properties of undefined` ?**

> [!check]- Réponse
> On lit une propriété sur quelque chose qui vaut `undefined` : donnée pas encore arrivée, ou mauvais nom de champ.

**3. Quel onglet des DevTools pour un problème de données ? pour un problème de logique ?**

> [!check]- Réponse
> Network pour les données ; Sources (point d'arrêt) pour la logique.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Lire l'erreur

Que signifie ce message, et quelle est la cause la plus probable ?

```text
TypeError: Cannot read properties of undefined (reading 'title')
    at renderMovie (app.js:14:22)
```

> [!tip]- Indice 1
> Lis le message : on lit `.title` sur quoi ? Puis lis la ligne et la colonne indiquées.

> [!tip]- Indice 2
> Pourquoi une donnée pourrait-elle valoir `undefined` à cet endroit ?

> [!success]- Solution
> À la **ligne 14, colonne 22** de `app.js`, dans la fonction `renderMovie`, le code fait `quelqueChose.title`, mais `quelqueChose` vaut `undefined`.
>
> Causes probables : le film n'est pas encore chargé (asynchrone), l'index du tableau n'existe pas, ou l'API a renvoyé une autre structure. On vérifie avec un point d'arrêt ligne 14 ou l'onglet Network.

### Exercice 2 · Lever une erreur utile

Écris une fonction `parseRating(value)` qui convertit un texte en nombre et lève une erreur claire si ce n'est pas un nombre entre 1 et 5. Puis appelle-la dans un `try / catch` qui affiche le message.

> [!tip]- Indice 1
> Convertis avec `Number(...)`, puis vérifie avec `Number.isInteger` et les bornes.

> [!tip]- Indice 2
> Lance une `new Error(...)` avec un message qui dit ce qui était attendu.

> [!success]- Solution
> ```js
> function parseRating(value) {
>   const rating = Number(value);
>   if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
>     throw new Error(`Note invalide : "${value}" (attendu : 1 à 5)`);
>   }
>   return rating;
> }
>
> try {
>   parseRating('7');
> } catch (err) {
>   console.error(err.message);   // Note invalide : "7" (attendu : 1 à 5)
> }
> ```

### Transfert · L'erreur d'API typée

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Crée une classe `NotFoundError` (qui hérite de `Error`). Écris `getMovie(id)` qui la lève si le film n'existe pas dans une liste. Puis, dans le code appelant, affiche « Film introuvable » pour cette erreur précise, et laisse remonter toutes les autres.

> [!tip]- Indice 1
> Une classe d'erreur hérite de `Error` et appelle `super(message)` dans son constructeur.

> [!tip]- Indice 2
> Dans le `catch`, teste `err instanceof NotFoundError` ; sinon, `throw err`.

> [!success]- Solution
> ```js
> class NotFoundError extends Error {
>   constructor(message) {
>     super(message);
>     this.name = 'NotFoundError';
>   }
> }
>
> function getMovie(id) {
>   const movie = movies.find((m) => m.id === id);
>   if (!movie) throw new NotFoundError(`Film ${id} introuvable`);
>   return movie;
> }
>
> try {
>   getMovie(99);
> } catch (err) {
>   if (err instanceof NotFoundError) console.log('Film introuvable');
>   else throw err;
> }
> ```

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer pourquoi une erreur visible vaut mieux qu'une erreur cachée
- [ ] **Rappeler** : Dire de mémoire comment lire un message d'erreur et sa pile d'appels
- [ ] **Utiliser** : Lever et attraper une erreur personnalisée sans modèle
- [ ] **Résoudre un problème nouveau** : Prédire où une erreur va être attrapée en suivant la pile d'appels
- [ ] **Repérer les erreurs** : Enquêter sur un bug avec Network et un point d'arrêt au lieu de deviner
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand ne pas mettre de `try / catch` : quand tu ne sais pas traiter l'erreur
