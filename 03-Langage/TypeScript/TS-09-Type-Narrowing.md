---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Type Narrowing (Réduction de Type)"
tags:
  - frontend/typescript/type-narrowing
parent: "[[TypeScript]]"
children: []
related_theory:
  - "[[TS-07-Union-Intersection|Union et Intersection Types]]"
related_snippets:
  - "[[04_Snippets/ts-type-narrowing]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
---

# Type Narrowing (Réduction de Type)

> [!abstract] Introduction
> Le "narrowing" est le mécanisme par lequel TypeScript réduit progressivement les types possibles d'une variable, au fil de vérifications dans le code (comme un `if`), pour savoir précisément à quel type il a affaire à un moment donné.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] Le mot "narrowing"
> > "Narrow" veut dire "étroit, réduit" en anglais. Le narrowing "rétrécit" les possibilités : on part d'un type large (ex : `string | number`) et on le réduit progressivement au fil du code jusqu'à un type précis.
>
> ```typescript
> function afficher(valeur: string | number) {
>   if (typeof valeur === "string") {
>     // Ici, TypeScript SAIT que valeur est un string
>     console.log(valeur.toUpperCase());
>   } else {
>     // Ici, TypeScript SAIT que valeur est un number
>     console.log(valeur.toFixed(2));
>   }
> }
> ```

> [!question]- Pourquoi l'utiliser ?
> Avec un type union (`string | number`), TypeScript ne permet PAS d'utiliser directement une méthode propre à un seul des deux types (`.toUpperCase()` n'existe pas sur un `number`). Le narrowing permet de "prouver" à TypeScript, à un endroit précis du code, quel type exact on manipule réellement, pour débloquer l'accès aux méthodes propres à ce type.

> [!question]- Comment ça marche ?
> **Avec `typeof` (pour les types primitifs) :**
> ```typescript
> function traiter(valeur: string | number) {
>   if (typeof valeur === "string") { /* valeur est un string ici */ }
> }
> ```
>
> **Avec `instanceof` (pour les classes) :**
> ```typescript
> class Chat {}
> class Chien {}
>
> function decrire(animal: Chat | Chien) {
>   if (animal instanceof Chat) { /* animal est un Chat ici */ }
> }
> ```
>
> **Avec `in` (pour vérifier une propriété d'objet) :**
> ```typescript
> interface Chat { ronronne: boolean; }
> interface Chien { aboie: boolean; }
>
> function decrire(animal: Chat | Chien) {
>   if ("ronronne" in animal) { /* animal est un Chat ici */ }
> }
> ```
>
> **Avec une propriété "discriminante" (le pattern le plus courant) :**
> ```typescript
> interface Chat { type: "chat"; ronronne: boolean; }
> interface Chien { type: "chien"; aboie: boolean; }
>
> function decrire(animal: Chat | Chien) {
>   if (animal.type === "chat") { /* animal est un Chat ici */ }
> }
> ```
>
> **Avec un "type guard" personnalisé :**
>
> > [!note] C'est quoi un "type guard" ?
> > Un type guard est une fonction spéciale qui, en plus de retourner `true` ou `false`, dit à TypeScript "si je retourne `true`, alors sois certain que cette variable est de tel type précis".
>
> ```typescript
> function estChat(animal: Chat | Chien): animal is Chat {
>   return (animal as Chat).ronronne !== undefined;
> }
>
> function decrire(animal: Chat | Chien) {
>   if (estChat(animal)) { /* animal est un Chat ici, grâce au type guard */ }
> }
> ```

> [!question]- Quand l'utiliser ?
> Systématiquement dès qu'on manipule un type union et qu'on a besoin d'accéder à une propriété ou méthode spécifique à l'un des types possibles.

---

## Points clés

- `typeof` : pour distinguer les types primitifs (`string`, `number`, `boolean`)
- `instanceof` : pour distinguer des instances de classes
- `in` : pour vérifier la présence d'une propriété précise
- Une propriété "discriminante" commune (`type: "chat" | "chien"`) est le pattern le plus propre et le plus utilisé en pratique
- Un type guard personnalisé (`x is Type`) permet de créer sa propre logique de vérification réutilisable

---

## Paramètres / Configuration

| Technique | Description | Notes |
|-----------|-------------|-------|
| `typeof valeur === "string"` | Vérifie un type primitif | — |
| `valeur instanceof Classe` | Vérifie une instance de classe | — |
| `"propriete" in objet` | Vérifie la présence d'une propriété | — |
| `fonction(x): x is Type` | Type guard personnalisé | Retourne un booléen, mais informe aussi TypeScript |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Type guard personnalisé qui ment (`return true`) → TypeScript lui fait confiance aveuglément
> - `typeof null === 'object'` : un test `typeof x === 'object'` n'exclut pas `null`
> - Utiliser `as` au lieu d'un vrai narrowing

---

## Exemple minimal

```typescript
interface FilmLocal { type: "local"; cheminFichier: string; }
interface FilmStreaming { type: "streaming"; urlStreaming: string; }
type Film = FilmLocal | FilmStreaming;

function obtenirSource(film: Film): string {
  if (film.type === "local") {
    return film.cheminFichier; // narrowing : TypeScript sait que c'est un FilmLocal
  }
  return film.urlStreaming; // ici, forcément un FilmStreaming
}
```

> [!note] Ce que j'en retiens
> Grâce à la propriété discriminante `type`, TypeScript sait exactement, à chaque ligne, quelle version du type `Film` on manipule — sans jamais avoir besoin d'un `as` (forçage de type) risqué.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Vérification d'exhaustivité avec `never` dans le `default` d'un switch
> - Fonctions d'assertion : `function assertDefini<T>(x: T): asserts x is NonNullable<T>`

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → (aucun sous-thème identifié pour l'instant)
- À comparer avec → [[TS-07-Union-Intersection|Union et Intersection Types]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-type-narrowing]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Citez 4 techniques de narrowing.
> - Qu'est-ce qu'un type guard personnalisé ?

> [!faq]- Questions d'entretien
> - Qu'est-ce que le type narrowing ?

---

## Tâches

- [ ] #task Reprendre l'union `FilmLocal | FilmStreaming` de CinéTrack et appliquer le narrowing par propriété discriminante
- [ ] #task Écrire un type guard personnalisé sur un cas concret du projet
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Y a-t-il un risque à utiliser `as` (forçage de type) plutôt qu'un vrai narrowing — dans quels cas c'est acceptable ?
