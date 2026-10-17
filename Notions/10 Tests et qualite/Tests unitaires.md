---
type: notion
statut: a apprendre
resume: "Un test unitaire vérifie un petit morceau de code isolé : « quand je donne ceci à cette fonction, elle doit renvoyer cela ». Vitest est l'outil moderne (utilisé par Vue, par les projets Angular récents, et possible avec NestJS) ; Jest est l'ancien standard, avec presque la même écriture."
revu:
sources:
  - "https://vitest.dev/guide/"
---
# Tests unitaires

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un **test unitaire** vérifie un petit morceau de code isolé : « quand je donne ceci à cette fonction, elle doit renvoyer cela ». **Vitest** est l'outil moderne (utilisé par Vue, par les projets Angular récents, et possible avec NestJS) ; **Jest** est l'ancien standard, avec presque la même écriture.

## Le problème

**Pourquoi c'est utile ?**
Pour vérifier en quelques millisecondes qu'une fonction isolée fait ce qu'elle doit.

**Qu'est-ce qui se passait sans ça ?**
On découvrait les erreurs de logique en testant toute l'application à la main.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

### La structure d'un fichier de test

```ts
// rating.utils.spec.ts
import { describe, it, expect } from 'vitest';
import { averageRating } from './rating.utils';

describe('averageRating', () => {                      // le sujet testé
  it('calcule la moyenne arrondie à 1 décimale', () => {  // un comportement
    // Arrange
    const ratings = [8, 9, 7];
    // Act
    const result = averageRating(ratings);
    // Assert
    expect(result).toBe(8);
  });

  it('renvoie null pour une liste vide', () => {
    expect(averageRating([])).toBeNull();
  });
});
```

```bash
npx vitest          # mode surveillance (relance à chaque sauvegarde)
npx vitest run      # une fois (CI)
npx vitest run --coverage
```

### Les vérifications (`expect`)

| Vérification | Pour |
|---|---|
| `toBe(3)` | valeur exacte (nombres, textes, booléens) |
| `toEqual({ a: 1 })` | objets et tableaux (compare le contenu) |
| `toBeNull()`, `toBeUndefined()`, `toBeTruthy()` | valeurs spéciales |
| `toContain('Dune')` | contient |
| `toHaveLength(3)` | taille |
| `toThrow(NotFoundException)` | lance une erreur |
| `await expect(promesse).rejects.toThrow()` | une Promise échoue |
| `toHaveBeenCalledWith(42)` | un espion a été appelé avec (voir Mocks) |
| `.not.` | l'inverse : `expect(x).not.toBe(0)` |

### Préparer et nettoyer

```ts
beforeEach(() => { store = new FavoritesStore(); });   // avant chaque test
afterEach(() => { vi.restoreAllMocks(); });            // après chaque test
```

### Les cas à toujours penser

- le cas **normal** ;
- les **limites** : liste vide, 0, 1, valeur maximale ;
- les **valeurs absentes** : `null`, `undefined` ;
- les **erreurs** : données invalides, exception attendue.

### Jest vs Vitest

| | Jest | Vitest |
|---|---|---|
| Écriture | `describe`, `it`, `expect`, `jest.fn()` | identique, `vi.fn()` |
| Vitesse | correcte | très rapide |
| Configuration TypeScript / ESM | plus laborieuse | naturelle (même config que Vite) |

Si tu sais écrire l'un, tu sais écrire l'autre.

Spécifique aux frameworks : [[Tests Vue avec Vitest|Vue]] · [[Tests Angular|Angular]] · [[Tests NestJS|NestJS]].

## 🧪 Exemple

### Tester plusieurs cas d'un coup

```ts
it.each([
  [1, true],
  [10, true],
  [0, false],
  [11, false],
])('isValidRating(%i) → %s', (value, expected) => {
  expect(isValidRating(value)).toBe(expected);
});
```

## ⚠️ Limites et pièges

- **Un test qui ne vérifie rien** (pas d'`expect`) : il passe toujours.
- **Oublier `await`** sur une Promise : le test se termine avant la vérification.
- **Des tests qui dépendent les uns des autres** : un seul qui échoue fait tomber les suivants.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Pyramide des tests]], [[Tests Angular]], [[Tests Vue avec Vitest]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://vitest.dev/guide/
