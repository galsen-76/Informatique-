---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🟡 In Progress"
level: Fondamental
month: M04
aliases:
  - "Fondamentaux Angular"
tags:
  - frameworks/angular/fondamentaux
parent: "[[Angular]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev"
---

# Fondamentaux Angular

> [!abstract] En bref
> Angular est un framework **complet** : il fournit tout d'origine (composants, routes, appels HTTP, formulaires, tests) avec des conventions fortes. Le principe de base est le même qu'en Vue : tu décris l'écran en fonction de tes données, Angular le met à jour quand elles changent. C'est le framework de CinéTrack, et le principal de ton entreprise.

## Si tu viens de Vue

Les idées sont les mêmes, l'écriture change : `ref` → `signal`, `v-if` → `@if`, `defineProps` → `input()`. Garde la table [[Angular-vs-Vue|Angular vs Vue]] ouverte.

La grande différence : Angular s'appuie sur des **classes**, des **décorateurs** (`@Component`) et l'**injection de dépendances** (les services te sont fournis automatiquement).

## Ton premier composant

```ts
// counter.component.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',                 // la balise pour l'utiliser : <app-counter />
  template: `
    <button type="button" (click)="increment()">
      Clics : {{ count() }}
    </button>
  `,
  styles: `button { padding: 8px 16px; }`,
})
export class CounterComponent {
  count = signal(0);                       // donnée réactive
  increment() { this.count.update(v => v + 1); }
}
```

- `@Component({…})` : dit à Angular que cette classe est un composant (voir [[TS-14-Decorators|décorateurs]]).
- `signal(0)` : une donnée qui met l'écran à jour. On la **lit** avec `count()`.
- `(click)` : réagir à un événement. `{{ }}` : afficher une valeur.

## Créer un projet

```bash
npm i -g @angular/cli
ng new cinetrack          # choisis SCSS ou CSS, et le SSR (non pour commencer)
cd cinetrack
ng serve                  # http://localhost:4200
ng generate component features/movies/components/movie-card   # génère un composant
```

| Fichier | Rôle |
|---|---|
| `src/main.ts` | démarre l'application |
| `src/app/app.config.ts` | les fournisseurs globaux (routes, HTTP…) |
| `src/app/app.routes.ts` | les routes |
| `src/app/app.component.ts` | le composant racine |
| `angular.json` | la configuration du projet (build, styles) |

## Les notions, dans l'ordre où CinéTrack en aura besoin

1. [[ANG-02-Composants|Composants]] et [[ANG-03-Templates-Data-Binding|templates]] : afficher.
2. [[ANG-10-Signals|Signals]] : les données réactives.
3. [[ANG-19-Communication-Composants|Inputs / outputs]] : découper en composants.
4. [[ANG-05-Services-DI|Services]] : partager la logique.
5. [[ANG-09-HTTP-Communication-Serveur|HTTP]] et [[ANG-08-RxJS|RxJS]] : appeler TMDB.
6. [[ANG-06-Routing|Routes]] : la liste et la fiche d'un film.
7. [[ANG-07-Formulaires|Formulaires]] : la critique.

Structure du projet : [[ANG-30-Template-Architecture-Angular|Template d'architecture Angular]].

## Pièges

- **Oublier les `()`** pour lire un signal : `{{ count }}` affiche la fonction, pas la valeur.
- **Suivre un tutoriel ancien** (NgModules, `@Input()`, `*ngIf`) : Angular a beaucoup changé. Vérifie que la doc est récente (angular.dev, pas angular.io).
- **Installer Angular DevTools** (extension navigateur) dès le début.
