---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M03
aliases:
  - "Classes TypeScript"
tags:
  - frontend/typescript/classes
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-03-Interfaces-Types|Interfaces et Types]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/classes.html"
---

# Classes TypeScript

> [!abstract] En bref
> TypeScript ajoute aux classes JavaScript des types et des **niveaux de visibilité** (`public`, `private`, `protected`). Tu écriras surtout des classes sous forme de **composants et services Angular** et de **controllers / services NestJS**.

## Une classe typée

```ts
class Film {
  constructor(
    public readonly id: number,   // crée ET remplit this.id
    public titre: string,
    private note: number,         // invisible depuis l'extérieur
  ) {}

  noteSur10(): string {
    return `${this.note}/10`;
  }
}

const f = new Film(1, 'Inception', 9);
f.titre;         // ✅
f.noteSur10();   // ✅ '9/10'
f.note;          // ❌ private
f.id = 2;        // ❌ readonly
```

Le raccourci `constructor(public titre: string)` évite d'écrire `this.titre = titre`. Tu le verras partout en NestJS.

## Les niveaux de visibilité

| Mot-clé | Accessible depuis |
|---|---|
| `public` (par défaut) | partout |
| `private` | seulement l'intérieur de la classe |
| `protected` | la classe et ses classes enfants |
| `readonly` | lisible partout, modifiable nulle part après la création |

**Principe :** cache les détails internes (`private`), expose seulement ce qui sert (`public`). Comme une télécommande : tu vois les boutons, pas les circuits.

## Garantir une forme avec `implements`

```ts
interface Stockage {
  lire(cle: string): string | null;
  ecrire(cle: string, valeur: string): void;
}

class StockageLocal implements Stockage {
  lire(cle: string) { return localStorage.getItem(cle); }
  ecrire(cle: string, valeur: string) { localStorage.setItem(cle, valeur); }
}
```

Si la classe oublie une méthode de l'interface, TypeScript le signale.

## Dans tes projets

```ts
// Angular : un service
@Injectable({ providedIn: 'root' })
export class MoviesStore {
  private api = inject(MoviesApi);          // détail interne
  readonly movies = signal<Movie[]>([]);    // exposé en lecture
}

// NestJS : un controller
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
}
```

## Pièges

- **`private` TypeScript n'existe qu'à la compilation** : dans le JavaScript final, la propriété reste lisible. Le vrai privé à l'exécution s'écrit `#note`.
- **Héritage en cascade** (`A extends B extends C…`) : difficile à suivre. Préfère assembler de petits objets (composition).
- **Utiliser `this` avant `super()`** dans le constructeur d'une classe enfant : interdit.
