---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Utility Types"
tags:
  - frontend/typescript/utility-types
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-03-Interfaces-Types|Interfaces et Types]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/utility-types.html"
---

# Utility Types

> [!abstract] En bref
> Des **outils fournis par TypeScript** pour fabriquer un nouveau type à partir d'un type existant, sans le réécrire : le même objet mais avec tous les champs optionnels, ou seulement deux champs, ou sans l'`id`. Très utiles pour les formulaires et les appels API.

## Partons d'un type

```ts
interface Film {
  id: number;
  titre: string;
  annee: number;
  note: number;
}
```

## Les 6 à connaître

| Outil | Donne | Exemple d'usage |
|---|---|---|
| `Partial<Film>` | tous les champs **optionnels** | mise à jour partielle (PATCH) |
| `Required<Film>` | tous les champs **obligatoires** | après avoir rempli les valeurs par défaut |
| `Pick<Film, 'id' \| 'titre'>` | **seulement** ces champs | une carte qui n'affiche que le titre |
| `Omit<Film, 'id'>` | tout **sauf** ces champs | créer un film (l'id est donné par la base) |
| `Readonly<Film>` | tous les champs en lecture seule | données qu'on ne doit pas modifier |
| `Record<K, V>` | un objet clé → valeur | `Record<Tech, string>` pour les couleurs par techno |

```ts
type NouveauFilm = Omit<Film, 'id'>;              // { titre; annee; note }
type MiseAJourFilm = Partial<Omit<Film, 'id'>>;    // tout optionnel sauf l'id, qui disparaît
type ApercuFilm = Pick<Film, 'id' | 'titre'>;

const couleurs: Record<'vue' | 'angular', string> = {
  vue: '#42b883',
  angular: '#dd0031',
};

function modifierFilm(id: number, changements: MiseAJourFilm) { /* … */ }
modifierFilm(1, { note: 9 });   // ✅ un seul champ suffit
```

**L'avantage :** si tu ajoutes un champ à `Film`, tous ces types se mettent à jour tout seuls.

## Pour les fonctions

| Outil | Donne |
|---|---|
| `ReturnType<typeof f>` | le type de ce que renvoie `f` |
| `Parameters<typeof f>` | le type des paramètres de `f` (un tableau) |
| `Awaited<Promise<Film>>` | `Film` : ce que donne la Promise |
| `NonNullable<Film \| null>` | `Film` : sans `null` ni `undefined` |

```ts
const useProjets = () => ({ projets: ref<Project[]>([]), charger: async () => {} });
type ProjetsApi = ReturnType<typeof useProjets>;
```

## Pièges

- **`Partial` partout** « pour être tranquille » : tu perds la garantie que les champs obligatoires sont là.
- **`Readonly` n'agit qu'au premier niveau** : les objets imbriqués restent modifiables.
