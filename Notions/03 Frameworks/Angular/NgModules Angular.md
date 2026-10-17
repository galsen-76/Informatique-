---
type: notion
statut: a apprendre
resume: "Avant Angular 17, chaque composant devait être déclaré dans un NgModule (un fichier xxx.module.ts qui regroupait composants, services et imports)."
revu:
sources:
  - "https://angular.dev/guide/ngmodules"
---
# NgModules Angular

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Avant Angular 17, chaque composant devait être déclaré dans un **NgModule** (un fichier `xxx.module.ts` qui regroupait composants, services et imports).

## Le problème

**Pourquoi c'est utile ?**
Pour lire et migrer le code Angular d'avant les composants standalone.

**Qu'est-ce qui se passait sans ça ?**
Sans le comprendre, on se perdait dans les anciens projets où tout passait par des fichiers xxx.module.ts.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Aujourd'hui, les composants sont **standalone** : ils déclarent eux-mêmes leurs imports. Tu n'écriras plus de NgModules, mais tu en **croiseras** dans le code existant de l'entreprise.

### Reconnaître l'ancien et le nouveau

```ts
// ANCIEN : un module déclare tout
@NgModule({
  declarations: [MovieCardComponent, MovieListComponent],   // composants du module
  imports: [CommonModule, RouterModule, HttpClientModule],   // modules utilisés
  exports: [MovieCardComponent],                            // visibles de l'extérieur
  providers: [MoviesService],
})
export class MoviesModule {}
```

```ts
// NOUVEAU : chaque composant déclare ses imports
@Component({
  selector: 'app-movie-list',
  imports: [MovieCardComponent, RouterLink],
  template: `…`,
})
export class MovieListComponent {}
```

### Tableau de traduction

| Ancien (NgModule) | Nouveau (standalone) |
|---|---|
| `AppModule` + `bootstrapModule` | `bootstrapApplication(AppComponent, appConfig)` |
| `declarations: [...]` | rien : le composant est autonome |
| `imports: [CommonModule]` | rien (`@if`, `@for` sont intégrés) |
| `RouterModule.forRoot(routes)` | `provideRouter(routes)` |
| `HttpClientModule` | `provideHttpClient()` |
| `loadChildren: () => import('./x.module')` | `loadComponent` / `loadChildren` vers des routes |
| `*ngIf`, `*ngFor` | `@if`, `@for` |

### Si tu dois travailler dans un projet avec des NgModules

- Un composant ancien est déclaré dans un module : cherche le `…module.ts` qui le contient pour savoir ce qu'il peut utiliser.
- Erreur « is not a known element » : le composant n'est pas dans les `declarations` / `imports` du module.
- On peut **mélanger** : un composant standalone peut être importé dans un NgModule, et inversement.
- Angular fournit une migration automatique : `ng generate @angular/core:standalone`.

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Déclarer un composant standalone** dans `declarations` : erreur. Il va dans `imports`.
- **Suivre un tutoriel qui commence par `AppModule`** : il date d'avant Angular 17.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Traduire l'ancien code

Traduis ce code ancien en Angular moderne.

```ts
@NgModule({
  declarations: [MovieCardComponent],
  imports: [CommonModule],
  exports: [MovieCardComponent],
})
export class SharedModule {}
```

```html
<div *ngIf="movie">
  <p *ngFor="let g of movie.genres">{{ g }}</p>
</div>
```

> [!success]- Solution
> Plus de module : le composant est autonome (standalone par défaut) et on l'importe là où on l'utilise.
>
> ```ts
> @Component({ selector: 'app-movie-card', template: '…' })
> export class MovieCard {}
> ```
>
> ```html
> @if (movie) {
>   <div>
>     @for (g of movie.genres; track g) {
>       <p>{{ g }}</p>
>     }
>   </div>
> }
> ```

#### Exercice 2 · Reconnaître l'époque

Pour chaque écriture, dis si elle est ancienne ou moderne, et donne l'équivalent moderne si besoin : `@Input()`, `inject(HttpClient)`, `*ngFor`, `input.required<Movie>()`, `HttpClientModule`, `@switch`.

> [!success]- Solution
> | Écriture | Époque | Moderne |
> |---|---|---|
> | `@Input()` | ancienne | `input()` |
> | `inject(HttpClient)` | moderne | — |
> | `*ngFor` | ancienne | `@for` |
> | `input.required<Movie>()` | moderne | — |
> | `HttpClientModule` | ancienne | `provideHttpClient()` |
> | `@switch` | moderne | — |

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Angular]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://angular.dev/guide/ngmodules
