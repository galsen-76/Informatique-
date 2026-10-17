---
type: notion
statut: a apprendre
resume: "Angular est un framework complet : il fournit tout d'origine (composants, routes, appels HTTP, formulaires, tests) avec des conventions fortes."
revu:
sources:
  - "https://angular.dev"
---
# Fondamentaux Angular

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Angular est un framework **complet** : il fournit tout d'origine (composants, routes, appels HTTP, formulaires, tests) avec des conventions fortes.

## Le problème

**Pourquoi c'est utile ?**
Pour construire une application front complète avec un framework qui fournit tout et impose des conventions.

**Qu'est-ce qui se passait sans ça ?**
On assemblait soi-même des dizaines de librairies (routes, HTTP, formulaires), chaque projet était organisé différemment.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Le principe de base est le même qu'en Vue : tu décris l'écran en fonction de tes données, Angular le met à jour quand elles changent. C'est le framework de CinéTrack, et le principal de ton entreprise.

### Si tu viens de Vue

Les idées sont les mêmes, l'écriture change : `ref` → `signal`, `v-if` → `@if`, `defineProps` → `input()`. Garde la table [[03 Angular vs Vue correspondances|Angular vs Vue]] ouverte.

La grande différence : Angular s'appuie sur des **classes**, des **décorateurs** (`@Component`) et l'**injection de dépendances** (les services te sont fournis automatiquement).

### Créer un projet

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

### Les notions, dans l'ordre où CinéTrack en aura besoin

1. [[02 Composants Angular|Composants]] et [[03 Templates et data binding Angular|templates]] : afficher.
2. [[12 Signals Angular|Signals]] : les données réactives.
3. [[04 Communication parent-enfant Angular|Inputs / outputs]] : découper en composants.
4. [[08 Services et injection de dépendances Angular|Services]] : partager la logique.
5. [[11 HTTP et communication serveur Angular|HTTP]] et [[13 RxJS Observables et opérateurs|RxJS]] : appeler TMDB.
6. [[09 Routing Angular|Routes]] : la liste et la fiche d'un film.
7. [[10 Formulaires Angular|Formulaires]] : la critique.

Structure du projet : [[30 Template d'architecture Angular|Template d'architecture Angular]].

## 🧪 Exemple

### Ton premier composant

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

- `@Component({…})` : dit à Angular que cette classe est un composant (voir [[16 Decorators|décorateurs]]).
- `signal(0)` : une donnée qui met l'écran à jour. On la **lit** avec `count()`.
- `(click)` : réagir à un événement. `{{ }}` : afficher une valeur.

## ⚠️ Limites et pièges

- **Oublier les `()`** pour lire un signal : `{{ count }}` affiche la fonction, pas la valeur.
- **Suivre un tutoriel ancien** (NgModules, `@Input()`, `*ngIf`) : Angular a beaucoup changé. Vérifie que la doc est récente (angular.dev, pas angular.io).
- **Installer Angular DevTools** (extension navigateur) dès le début.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Créer et lancer le projet

Écris les commandes pour installer le CLI Angular, créer le projet `cinetrack` et le lancer. À quelle adresse s'ouvre l'application ?

> [!success]- Solution
> ```bash
> npm install -g @angular/cli
> ng new cinetrack
> cd cinetrack
> ng serve
> ```
>
> L'application s'ouvre sur **http://localhost:4200**. `ng serve` recharge la page à chaque enregistrement.

#### Exercice 2 · Ton premier composant

Crée un composant `Hello` qui affiche « Bonjour Alice ! », où le prénom vient d'un signal. Affiche-le dans `App`.

> [!success]- Solution
> ```ts
> // hello.ts
> import { Component, signal } from '@angular/core';
>
> @Component({
>   selector: 'app-hello',
>   template: `<p>Bonjour {{ name() }} !</p>`,
> })
> export class Hello {
>   name = signal('Alice');
> }
> ```
>
> ```ts
> // app.ts
> @Component({
>   selector: 'app-root',
>   imports: [Hello],
>   template: `<app-hello />`,
> })
> export class App {}
> ```
>
> On lit un signal en l'**appelant** : `name()`.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://angular.dev
