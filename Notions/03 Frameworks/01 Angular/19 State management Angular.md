---
type: notion
statut: a apprendre
resume: "L'état, ce sont les données qui vivent dans l'application : les films chargés, les favoris, l'utilisateur connecté, les filtres."
revu:
sources:
  - "https://angular.dev"
---
# State management Angular

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : L'**état**, ce sont les données qui vivent dans l'application : les films chargés, les favoris, l'utilisateur connecté, les filtres.

## Le problème

**Pourquoi c'est utile ?**
Pour décider où ranger chaque donnée de l'application et qui peut la modifier.

**Qu'est-ce qui se passait sans ça ?**
Les mêmes données copiées dans plusieurs composants, qui finissaient par afficher des valeurs différentes.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Le **state management**, c'est décider **où** ranger chaque donnée et **qui** a le droit de la modifier. En Angular moderne, un **service avec des signals** suffit pour la grande majorité des cas.

### Où ranger chaque donnée ?

| La donnée sert à… | Où la mettre | Exemple CinéTrack |
|---|---|---|
| un seul composant | un signal dans le composant | le menu mobile ouvert / fermé |
| un composant et ses enfants | le parent, transmis par inputs | le film affiché dans la fiche |
| plusieurs écrans | un **store** (service `providedIn: 'root'` + signals) | les favoris, l'utilisateur |
| être partagée par lien | l'**URL** | la page, le genre filtré (`?genre=action`) |
| rester après fermeture | `localStorage` (via le store) | les favoris d'un visiteur |

### Et NgRx ?

**NgRx** est une librairie de state management plus structurée, utilisée dans beaucoup d'entreprises. Le **Signal Store** de NgRx reprend exactement les idées ci-dessus avec moins de code à écrire. Voir [[20 NgRx et Signal Store|NgRx et Signal Store]].

| | Service + signals | NgRx Signal Store | NgRx Store (Redux) |
|---|---|---|---|
| Code à écrire | peu | peu | beaucoup |
| Structure imposée | à toi de la fixer | oui | très forte |
| Pour | la plupart des apps, CinéTrack | équipes qui veulent un cadre commun | grosses apps existantes |

**Au travail, utilise ce que l'équipe utilise déjà.**

## 🧪 Exemple

### Le store « maison » : service + signals

```ts
@Injectable({ providedIn: 'root' })
export class MoviesStore {
  private api = inject(MoviesApi);

  // état privé
  private readonly state = signal<LoadState<Movie[]>>({ status: 'idle' });

  // lecture publique
  readonly movies = computed(() => { const s = this.state(); return s.status === 'success' ? s.data : []; });
  readonly loading = computed(() => this.state().status === 'loading');
  readonly error = computed(() => { const s = this.state(); return s.status === 'error' ? s.message : null; });

  // actions
  load(page = 1) {
    this.state.set({ status: 'loading' });
    this.api.popular(page).subscribe({
      next: data => this.state.set({ status: 'success', data }),
      error: () => this.state.set({ status: 'error', message: 'Impossible de charger les films' }),
    });
  }
}
```

Les **trois règles** qui rendent un store fiable :
1. l'état est **privé** ;
2. les composants **lisent** via des signals en lecture seule ;
3. les composants **modifient** uniquement via des méthodes (actions).

Ainsi, quand un bug touche les films, tu sais qu'il vient de ces quelques méthodes. Le type `LoadState` est expliqué dans [[19 Patterns TypeScript professionnels|Patterns TypeScript]].

```mermaid
flowchart LR
  C["Composant"] -->|"action : store.load()"| S["Store<br/>(état privé)"]
  S -->|"signals en lecture"| C
  S --> A["MoviesApi"]
```

## ⚠️ Limites et pièges

- **Tout mettre dans un store global** : un état local reste dans son composant.
- **Exposer un `signal` modifiable** publiquement : n'importe quel composant peut tout changer. Utilise `asReadonly()` ou `computed`.
- **Copier les données du store** dans des variables du composant : elles ne seront plus à jour. Lis directement les signals du store.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Un store maison

Écris un `FavoritesStore` : état privé (signal), lecture seule exposée, un `computed` `count`, et une méthode `toggle(movie)`.

> [!success]- Solution
> ```ts
> @Injectable({ providedIn: 'root' })
> export class FavoritesStore {
>   private readonly _items = signal<Movie[]>([]);
>
>   readonly items = this._items.asReadonly();
>   readonly count = computed(() => this._items().length);
>
>   toggle(movie: Movie) {
>     this._items.update((list) =>
>       list.some((m) => m.id === movie.id) ? list.filter((m) => m.id !== movie.id) : [...list, movie],
>     );
>   }
> }
> ```
>
> Les composants lisent `items()` et `count()`, mais seul le store peut modifier l'état.

#### Exercice 2 · Où ranger la donnée ?

Pour chaque donnée, où la ranges-tu : dans le composant, dans un store (service), ou dans l'URL ?
1. le texte de la recherche, pour pouvoir partager le lien ;
2. l'ouverture d'un menu déroulant ;
3. le compte connecté ;
4. la page de résultats actuelle.

> [!success]- Solution
> 1. **URL** (`?query=dune`) : on peut partager le lien et revenir en arrière.
> 2. **Composant** : personne d'autre n'en a besoin.
> 3. **Store** (service) : utilisé par l'en-tête, les guards, plusieurs pages.
> 4. **URL** (`?page=3`) : comme la recherche.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Angular|Fondamentaux Angular]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://angular.dev
