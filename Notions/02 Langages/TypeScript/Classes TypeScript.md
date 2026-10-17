---
type: notion
statut: a apprendre
resume: "TypeScript ajoute aux classes JavaScript des types et des niveaux de visibilité (public, private, protected)."
revu:
sources:
  - "https://www.typescriptlang.org/docs/handbook/2/classes.html"
---
# Classes TypeScript

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : TypeScript ajoute aux classes JavaScript des types et des **niveaux de visibilité** (`public`, `private`, `protected`).

## Le problème

**Pourquoi c'est utile ?**
Pour écrire des classes typées avec des niveaux de visibilité (public, private).

**Qu'est-ce qui se passait sans ça ?**
N'importe quel code pouvait modifier l'intérieur d'un objet, et les classes n'avaient aucun contrat clair.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Tu écriras surtout des classes sous forme de **composants et services Angular** et de **controllers / services NestJS**.

### Une classe typée

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

### Les niveaux de visibilité

| Mot-clé | Accessible depuis |
|---|---|
| `public` (par défaut) | partout |
| `private` | seulement l'intérieur de la classe |
| `protected` | la classe et ses classes enfants |
| `readonly` | lisible partout, modifiable nulle part après la création |

**Principe :** cache les détails internes (`private`), expose seulement ce qui sert (`public`). Comme une télécommande : tu vois les boutons, pas les circuits.

### Garantir une forme avec `implements`

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

## 🧪 Exemple

### Dans tes projets

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

## ⚠️ Limites et pièges

- **`private` TypeScript n'existe qu'à la compilation** : dans le JavaScript final, la propriété reste lisible. Le vrai privé à l'exécution s'écrit `#note`.
- **Héritage en cascade** (`A extends B extends C…`) : difficile à suivre. Préfère assembler de petits objets (composition).
- **Utiliser `this` avant `super()`** dans le constructeur d'une classe enfant : interdit.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Classe avec visibilité

Écris une classe `FavoritesStore` avec une liste privée d'ids, une méthode `toggle(id)` qui ajoute ou retire l'id, et une méthode `has(id)`. Personne ne doit pouvoir modifier la liste de l'extérieur.

> [!success]- Solution
> ```ts
> class FavoritesStore {
>   private ids = new Set<number>();
>
>   toggle(id: number): void {
>     if (this.ids.has(id)) this.ids.delete(id);
>     else this.ids.add(id);
>   }
>
>   has(id: number): boolean {
>     return this.ids.has(id);
>   }
> }
>
> const store = new FavoritesStore();
> store.toggle(438631);
> store.ids;   // ❌ erreur : 'ids' est privé
> ```

#### Exercice 2 · Constructeur raccourci

Réécris cette classe avec la syntaxe raccourcie du constructeur :

```ts
class ApiClient {
  private baseUrl: string;
  private token: string;
  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }
}
```

> [!success]- Solution
> ```ts
> class ApiClient {
>   constructor(
>     private readonly baseUrl: string,
>     private readonly token: string,
>   ) {}
> }
> ```
>
> Le mot-clé de visibilité dans les paramètres déclare **et** remplit l'attribut. `readonly` empêche de le modifier ensuite.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux TypeScript]]
- **Voir aussi :** [[Interfaces et types TypeScript]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.typescriptlang.org/docs/handbook/2/classes.html
