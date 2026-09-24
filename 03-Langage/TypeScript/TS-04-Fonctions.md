---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M03
aliases:
  - "Fonctions Typées"
tags:
  - frontend/typescript/fonctions
parent: "[[TypeScript]]"
children: []
related_theory:
  - "[[TS-01-Fondamentaux|Fondamentaux TypeScript]]"
related_snippets:
  - "[[04_Snippets/ts-fonctions]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/functions.html"
---

# Fonctions Typées

> [!abstract] Introduction
> En TypeScript, on précise le type attendu de chaque paramètre d'une fonction ET le type de ce qu'elle retourne, pour détecter immédiatement un mauvais usage de cette fonction.

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> function additionner(a: number, b: number): number {
>   return a + b;
> }
> ```
> > [!note] Comment lire cette syntaxe
> > - `a: number, b: number` = les paramètres attendus et leurs types
> > - `: number` juste après les parenthèses = le type de la valeur RETOURNÉE par la fonction

> [!question]- Pourquoi l'utiliser ?
> Sans typage, une fonction pourrait être appelée avec n'importe quoi (texte au lieu d'un nombre) et produire un résultat inattendu sans avertissement. Le typage des fonctions garantit qu'elle est utilisée correctement partout dans le code, et documente automatiquement son usage (l'éditeur affiche les types attendus).

> [!question]- Comment ça marche ?
> **Paramètres optionnels :**
> ```typescript
> function saluer(prenom: string, titre?: string) {
>   console.log(titre ? `${titre} ${prenom}` : prenom);
> }
> saluer("Marie");           // ✅ valide, titre est optionnel
> saluer("Marie", "Docteur"); // ✅ valide aussi
> ```
>
> **Valeurs par défaut :**
> ```typescript
> function saluer(prenom: string, langue: string = "fr") {
>   console.log(langue === "fr" ? `Bonjour ${prenom}` : `Hello ${prenom}`);
> }
> saluer("Marie"); // utilise "fr" automatiquement
> ```
>
> **Fonction fléchée typée :**
> ```typescript
> const multiplier = (a: number, b: number): number => a * b;
> ```
>
> **Surcharge de fonction (overloads) :**
>
> > [!note] C'est quoi une "surcharge" ?
> > Une surcharge permet de définir PLUSIEURS façons d'appeler la même fonction, selon les types de paramètres fournis, avec un comportement ou un type de retour différent pour chaque cas.
>
> ```typescript
> function formater(valeur: number): string;
> function formater(valeur: string): number;
> function formater(valeur: number | string): number | string {
>   if (typeof valeur === "number") return valeur.toString();
>   return parseInt(valeur);
> }
> ```

> [!question]- Quand l'utiliser ?
> - Toujours typer les paramètres et le retour d'une fonction, même si TypeScript peut parfois déduire le retour tout seul
> - Paramètres optionnels : quand une info n'est pas toujours nécessaire
> - Valeurs par défaut : quand on veut un comportement standard sans forcer l'appelant à toujours tout préciser
> - Surcharges : rare, utile seulement quand le comportement change vraiment selon le type d'entrée

---

## Points clés

- `fonction(param: type): typeDeRetour` est la structure de base
- `param?: type` = paramètre optionnel (doit être placé après les paramètres obligatoires)
- `param: type = valeur` = valeur par défaut si non fournie
- TypeScript peut souvent déduire le type de retour automatiquement, mais l'écrire explicitement rend le code plus clair et sert de documentation
- Une fonction qui ne retourne rien a pour type de retour `void`

---

## Paramètres / Configuration

| Syntaxe | Description | Notes |
|-----------|-------------|-------|
| `param: type` | Paramètre obligatoire typé | — |
| `param?: type` | Paramètre optionnel | Doit venir après les obligatoires |
| `param: type = valeur` | Valeur par défaut | — |
| `: void` | La fonction ne retourne rien | — |
| `...params: type[]` | Nombre variable de paramètres (rest) | Tous doivent être du même type |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Paramètre optionnel placé avant un paramètre obligatoire
> - Oublier le type de retour d'une fonction publique : un changement interne modifie silencieusement son contrat
> - Surcharges alors qu'une union ou un générique suffit

---

## Exemple minimal

```typescript
interface Film {
  titre: string;
  annee: number;
}

function creerFilm(titre: string, annee: number, favori: boolean = false): Film {
  return { titre, annee };
}

function afficherTousLesFilms(...films: Film[]): void {
  films.forEach(film => console.log(film.titre));
}

const f1 = creerFilm("Inception", 2010);
afficherTousLesFilms(f1, creerFilm("Interstellar", 2014));
```

> [!note] Ce que j'en retiens
> `...films: Film[]` (paramètre "rest") permet d'appeler `afficherTousLesFilms` avec autant de films qu'on veut, tous regroupés automatiquement dans un tableau `films` à l'intérieur de la fonction.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Typer des fonctions d'ordre supérieur : `type Comparateur<T> = (a: T, b: T) => number`
> - Utiliser `Parameters<F>` et `ReturnType<F>` pour dériver des types de fonctions existantes

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → (aucun sous-thème identifié pour l'instant)
- À comparer avec → [[TS-03-Interfaces-Types|Interfaces et Types]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-fonctions]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Comment typer un paramètre « rest » ?
> - Que signifie un retour `void` ?

---

## Tâches

- [ ] #task Typer correctement toutes les fonctions du service `FilmService` de CinéTrack
- [ ] #task Tester un paramètre rest sur une fonction utilitaire du projet
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Dans quels cas réels les surcharges de fonction (overloads) sont-elles vraiment nécessaires plutôt qu'un simple type union en paramètre ?
