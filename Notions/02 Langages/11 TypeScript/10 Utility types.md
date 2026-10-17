---
type: notion
statut: a apprendre
resume: "Des outils fournis par TypeScript pour fabriquer un nouveau type à partir d'un type existant, sans le réécrire : le même objet mais avec tous les champs optionnels, ou seulement deux champs, ou sans l'id."
revu:
sources:
  - "https://www.typescriptlang.org/docs/handbook/utility-types.html"
---
# Utility types

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Des **outils fournis par TypeScript** pour fabriquer un nouveau type à partir d'un type existant, sans le réécrire : le même objet mais avec tous les champs optionnels, ou seulement deux champs, ou sans l'`id`.

## Le problème

**Pourquoi c'est utile ?**
Pour fabriquer un type à partir d'un autre (tout optionnel, quelques champs, sans l'id) sans le réécrire.

**Qu'est-ce qui se passait sans ça ?**
On recopiait la même interface en plusieurs versions, qui finissaient par ne plus correspondre.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Très utiles pour les formulaires et les appels API.

### Partons d'un type

```ts
interface Film {
  id: number;
  titre: string;
  annee: number;
  note: number;
}
```

### Pour les fonctions

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

## 🧪 Exemple

### Les 6 à connaître

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

## ⚠️ Limites et pièges

- **`Partial` partout** « pour être tranquille » : tu perds la garantie que les champs obligatoires sont là.
- **`Readonly` n'agit qu'au premier niveau** : les objets imbriqués restent modifiables.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Choisir le bon utilitaire

Pour chaque besoin, quel utility type utilises-tu à partir de `Movie` ?
1. les données d'un formulaire de modification où tout est facultatif ;
2. une carte qui n'affiche que `id`, `title` et `poster_path` ;
3. un film sans `genre_ids` ;
4. un film qu'on ne doit pas modifier.

> [!success]- Solution
> ```ts
> type MovieUpdate = Partial<Movie>;
> type MovieCard = Pick<Movie, 'id' | 'title' | 'poster_path'>;
> type MovieWithoutGenres = Omit<Movie, 'genre_ids'>;
> type FrozenMovie = Readonly<Movie>;
> ```

#### Exercice 2 · Un dictionnaire typé

Crée le type d'un objet qui associe un id de genre (nombre) à son nom (texte), puis un exemple de valeur.

> [!success]- Solution
> ```ts
> type GenreNames = Record<number, string>;
>
> const genres: GenreNames = {
>   28: 'Action',
>   878: 'Science-fiction',
> };
> ```

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux TypeScript|Fondamentaux TypeScript]]
- **Voir aussi :** [[03 Interfaces et types TypeScript|Interfaces et types TypeScript]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.typescriptlang.org/docs/handbook/utility-types.html
