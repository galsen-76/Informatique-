---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Modules TypeScript"
tags:
  - frontend/typescript/modules
parent: "[[TypeScript]]"
children: []
related_theory:
  - "[[TS-01-Fondamentaux|Fondamentaux TypeScript]]"
related_snippets:
  - "[[04_Snippets/ts-modules]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/modules.html"
---

# Modules TypeScript

> [!abstract] Introduction
> Un module, c'est un fichier de code qui peut partager certaines de ses parties (fonctions, classes, types) avec d'autres fichiers, via des mots-clés `export` et `import`, pour organiser un projet en plusieurs fichiers séparés plutôt qu'un seul immense fichier.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] Pourquoi découper en plusieurs fichiers ?
> > Un seul gros fichier contenant tout le code d'un projet serait impossible à maintenir. Découper en modules permet de séparer les responsabilités (un fichier pour les types, un pour un service, un pour un composant...) et de les réutiliser où besoin.
>
> Chaque fichier TypeScript (`.ts`) est, par défaut, un module indépendant. Pour qu'un autre fichier puisse utiliser quelque chose défini dans ce fichier, il faut explicitement l'**exporter**, puis l'**importer** ailleurs.

> [!question]- Pourquoi l'utiliser ?
> Sans modules, tout le code devrait être écrit dans un seul fichier (ou toutes les variables seraient globales, avec un risque de conflits de noms entre différentes parties du projet). Les modules isolent chaque fichier : rien n'est visible de l'extérieur sauf ce qui est explicitement exporté.

> [!question]- Comment ça marche ?
> **Export nommé :**
> ```typescript
> // film.model.ts
> export interface Film {
>   titre: string;
>   annee: number;
> }
>
> export function creerFilm(titre: string, annee: number): Film {
>   return { titre, annee };
> }
> ```
>
> **Import de ces éléments ailleurs :**
> ```typescript
> // liste-films.ts
> import { Film, creerFilm } from './film.model';
>
> const film: Film = creerFilm("Inception", 2010);
> ```
>
> > [!note] Le chemin `./film.model`
> > Le `./` indique "dans le même dossier". TypeScript retrouve automatiquement le fichier `film.model.ts` correspondant.
>
> **Export par défaut** (un seul par fichier, pas de nom obligatoire à l'import) :
> ```typescript
> // film.model.ts
> export default class Film { /* ... */ }
> ```
> ```typescript
> import UnNomQuelconque from './film.model'; // le nom choisi à l'import est libre
> ```
>
> > [!note] Nommé vs par défaut
> > Un export nommé oblige à utiliser EXACTEMENT le même nom à l'import (sauf renommage explicite avec `as`). Un export par défaut permet de choisir librement le nom à l'import — mais dans la pratique, la plupart des projets (dont Angular) privilégient les exports nommés pour plus de clarté.

> [!question]- Quand l'utiliser ?
> - Systématiquement, dès qu'un projet dépasse un seul fichier (donc quasiment toujours)
> - Export nommé : la convention la plus courante, surtout en Angular
> - Export par défaut : plus rare, parfois utilisé pour un composant principal unique d'un fichier

---

## Points clés

- `export` rend un élément (fonction, classe, interface, variable) accessible depuis d'autres fichiers
- `import { X } from './chemin'` récupère un export nommé
- `import X from './chemin'` récupère l'export par défaut (un seul possible par fichier)
- Un fichier peut avoir plusieurs exports nommés, mais un seul export par défaut
- Renommer un import : `import { Film as FilmType } from './film.model'`

---

## Paramètres / Configuration

| Syntaxe | Description | Notes |
|-----------|-------------|-------|
| `export const x = ...` | Export nommé | Plusieurs possibles par fichier |
| `export default class X {}` | Export par défaut | Un seul possible par fichier |
| `import { x } from './fichier'` | Import nommé | Nom exact requis (sauf `as`) |
| `import x from './fichier'` | Import par défaut | Nom libre à l'import |
| `import { x as y }` | Renommage à l'import | Utile en cas de conflit de nom |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Imports circulaires entre fichiers de modèles/services
> - Barrel files (`index.ts`) géants qui ralentissent build et tests
> - `import type` oublié pour des imports uniquement de types (avec `verbatimModuleSyntax`)

---

## Exemple minimal

```typescript
// film.model.ts
export interface Film {
  titre: string;
  annee: number;
}

// film.service.ts
import { Film } from './film.model';

export class FilmService {
  obtenirFilms(): Film[] {
    return [{ titre: "Inception", annee: 2010 }];
  }
}

// app.component.ts
import { FilmService } from './film.service';

const service = new FilmService();
console.log(service.obtenirFilms());
```

> [!note] Ce que j'en retiens
> Chaque fichier a une responsabilité claire (le modèle de données, le service, le composant), et ils communiquent uniquement via des `import`/`export` explicites — jamais de variable globale flottante entre les fichiers.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Alias de chemins (`paths` dans tsconfig : `@app/*`) et règles d'import ESLint

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → (aucun sous-thème identifié pour l'instant)
- À comparer avec → [[ANG-13-Modules-NgModules|Composants standalone Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-modules]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre export nommé et export par défaut ?

---

## Tâches

- [ ] #task Organiser CinéTrack en fichiers séparés clairs (modèles, services, composants) avec des exports/imports propres
- [ ] #task Repérer dans le projet où un export par défaut pourrait être remplacé par un export nommé pour plus de cohérence
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Pourquoi Angular impose (via ses conventions de style) presque exclusivement des exports nommés plutôt que par défaut ?
