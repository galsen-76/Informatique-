---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
aliases:
  - "Modules (NgModules) Angular"
tags:
  - frameworks/angular/ngmodules
parent: "[[Angular]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/ngmodules"
---

# Modules (NgModules) Angular

> [!abstract] En bref
> Avant Angular 17, chaque composant devait être déclaré dans un **NgModule** (un fichier `xxx.module.ts` qui regroupait composants, services et imports). Aujourd'hui, les composants sont **standalone** : ils déclarent eux-mêmes leurs imports. Tu n'écriras plus de NgModules, mais tu en **croiseras** dans le code existant de l'entreprise.

## Reconnaître l'ancien et le nouveau

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

## Tableau de traduction

| Ancien (NgModule) | Nouveau (standalone) |
|---|---|
| `AppModule` + `bootstrapModule` | `bootstrapApplication(AppComponent, appConfig)` |
| `declarations: [...]` | rien : le composant est autonome |
| `imports: [CommonModule]` | rien (`@if`, `@for` sont intégrés) |
| `RouterModule.forRoot(routes)` | `provideRouter(routes)` |
| `HttpClientModule` | `provideHttpClient()` |
| `loadChildren: () => import('./x.module')` | `loadComponent` / `loadChildren` vers des routes |
| `*ngIf`, `*ngFor` | `@if`, `@for` |

## Si tu dois travailler dans un projet avec des NgModules

- Un composant ancien est déclaré dans un module : cherche le `…module.ts` qui le contient pour savoir ce qu'il peut utiliser.
- Erreur « is not a known element » : le composant n'est pas dans les `declarations` / `imports` du module.
- On peut **mélanger** : un composant standalone peut être importé dans un NgModule, et inversement.
- Angular fournit une migration automatique : `ng generate @angular/core:standalone`.

## Pièges

- **Déclarer un composant standalone** dans `declarations` : erreur. Il va dans `imports`.
- **Suivre un tutoriel qui commence par `AppModule`** : il date d'avant Angular 17.
