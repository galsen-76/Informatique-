---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Union & Intersection Types"
tags:
  - frontend/typescript/union-intersection
parent: "[[TypeScript]]"
children:
  - "[[TS-09-Type-Narrowing|Type Narrowing]]"
related_theory:
  - "[[TS-02-Types-Primitifs-Litteraux|Types Primitifs et Littéraux]]"
related_snippets:
  - "[[04_Snippets/ts-union-intersection]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types"
---

# Union & Intersection Types

> [!abstract] Introduction
> Un type "union" dit qu'une valeur peut être de PLUSIEURS types possibles (l'un OU l'autre), tandis qu'un type "intersection" combine PLUSIEURS types en un seul qui doit respecter TOUTES leurs conditions à la fois.

---

## Théorie

> [!question]- C'est quoi ?
> **Union (`|`)** : "ceci OU cela"
> ```typescript
> let identifiant: string | number;
> identifiant = "abc123"; // ✅ valide
> identifiant = 123;      // ✅ valide aussi
> identifiant = true;     // ❌ Erreur : ni string ni number
> ```
>
> **Intersection (`&`)** : "ceci ET cela en même temps"
> ```typescript
> type Personne = { nom: string };
> type Employe = { salaire: number };
>
> type PersonneEmployee = Personne & Employe;
>
> const p: PersonneEmployee = { nom: "Ali", salaire: 3000 }; // doit avoir TOUTES les propriétés
> ```
>
> > [!note] Comment se souvenir de la différence
> > `|` (pipe) ressemble à un choix entre deux chemins → "l'un OU l'autre". `&` (esperluette) veut dire "et" en langage courant → combine tout ensemble.

> [!question]- Pourquoi l'utiliser ?
> - Union : utile quand une donnée peut légitimement prendre plusieurs formes différentes (un identifiant peut être un texte OU un nombre selon la source de données)
> - Intersection : utile pour combiner plusieurs "briques" de type réutilisables en un seul type complet, sans tout réécrire

> [!question]- Comment ça marche ?
> **Union avec des objets différents :**
> ```typescript
> interface FilmLocal {
>   titre: string;
>   cheminFichier: string;
> }
>
> interface FilmStreaming {
>   titre: string;
>   urlStreaming: string;
> }
>
> type Film = FilmLocal | FilmStreaming;
>
> function lire(film: Film) {
>   console.log(film.titre); // ✅ accessible, présent dans les 2 cas
>
>   if ("cheminFichier" in film) {
>     console.log(film.cheminFichier); // ✅ TypeScript sait qu'on est dans le cas FilmLocal
>   }
> }
> ```
> > [!note] Pourquoi le `if ("cheminFichier" in film)` ?
> > Comme `film` peut être l'un OU l'autre type, TypeScript ne sait pas à l'avance lequel des deux c'est réellement. Ce test (voir [[TS-09-Type-Narrowing|Type Narrowing]]) permet de "prouver" à TypeScript qu'on est dans un cas précis, avant d'accéder à une propriété spécifique à ce cas.

> [!question]- Quand l'utiliser ?
> - Union : une variable qui peut légitimement représenter plusieurs formes de données différentes selon le contexte
> - Intersection : combiner des types réutilisables (mixins, propriétés communes) en un type complet

---

## Points clés

- `A | B` = union, la valeur doit correspondre à AU MOINS l'un des deux types
- `A & B` = intersection, la valeur doit respecter TOUTES les conditions des deux types combinés
- Avec une union, on ne peut accéder qu'aux propriétés COMMUNES aux deux types, sauf après une vérification (voir [[TS-09-Type-Narrowing|Type Narrowing]])
- Avec une intersection, l'objet doit posséder TOUTES les propriétés des types combinés

---

## Paramètres / Configuration

| Syntaxe | Description | Notes |
|-----------|-------------|-------|
| `A \| B` | Union — l'un ou l'autre type | Accès limité aux propriétés communes sans vérification |
| `A & B` | Intersection — combinaison des deux types | L'objet doit tout avoir |
| `"x" in objet` | Vérifie la présence d'une propriété | Utilisé pour distinguer les cas d'une union |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Accéder à une propriété qui n'existe que dans un membre de l'union sans narrowing
> - Intersection de types incompatibles (`string & number`) → `never`

---

## Exemple minimal

```typescript
interface Chat { type: "chat"; ronronne: boolean; }
interface Chien { type: "chien"; aboie: boolean; }

type Animal = Chat | Chien;

function decrire(animal: Animal) {
  if (animal.type === "chat") {
    console.log("Ronronne :", animal.ronronne); // TypeScript sait que c'est un Chat ici
  } else {
    console.log("Aboie :", animal.aboie); // et un Chien ici
  }
}
```

> [!note] Ce que j'en retiens
> La propriété commune `type` (appelée "discriminant") permet à TypeScript de savoir EXACTEMENT quel type on manipule dans chaque branche du `if`, sans risque d'erreur. C'est un pattern très courant appelé "union discriminée".

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Modéliser les états d'UI par unions discriminées (voir [[TS-18-Patterns-TypeScript-Pro|Patterns TypeScript Professionnels]])

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → [[TS-09-Type-Narrowing|Type Narrowing]]
- À comparer avec → [[TS-03-Interfaces-Types|Interfaces et Types]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-union-intersection]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi ne peut-on accéder qu'aux propriétés communes d'une union ?

---

## Tâches

- [ ] #task Créer une union discriminée pour représenter différentes sources de films dans CinéTrack (local vs API)
- [ ] #task Trouver un cas concret où une intersection de types simplifie le code du projet
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Une union discriminée est-elle toujours préférable à une simple interface avec des propriétés optionnelles ?
