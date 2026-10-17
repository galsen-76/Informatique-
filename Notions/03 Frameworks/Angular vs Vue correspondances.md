---
type: notion
statut: a apprendre
resume: "Ton entreprise utilise les deux."
revu:
sources:
  - "https://vuejs.org/guide/introduction.html"
---
# Angular vs Vue correspondances

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Ton entreprise utilise les deux.

## Le problème

**Pourquoi c'est utile ?**
Pour passer d'Angular à Vue (et inversement) en reconnaissant les mêmes idées.

**Qu'est-ce qui se passait sans ça ?**
Changer de framework donnait l'impression de tout réapprendre, alors que les concepts sont les mêmes.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Bonne nouvelle : **les idées sont les mêmes**, seule l'écriture change. Cette table te permet de passer de l'un à l'autre en pensant « c'est comme… ». Relis-la à chaque changement de projet.

### La même chose, deux écritures

```ts
// Angular
count = signal(0);
double = computed(() => this.count() * 2);
increment() { this.count.update(v => v + 1); }
```

```ts
// Vue
const count = ref(0);
const double = computed(() => count.value * 2);
const increment = () => count.value++;
```

La différence principale : on **lit** une valeur avec `count()` en Angular, et `count.value` en Vue (sauf dans le template).

### La table de correspondance

| Concept | Angular | Vue |
|---|---|---|
| Créer un projet | `ng new` | `npm create vue@latest` |
| Composant | classe `@Component` + template | fichier `.vue` + `<script setup>` |
| Donnée réactive | `signal()` | `ref()` |
| Valeur calculée | `computed()` | `computed()` |
| Réagir à un changement | `effect()` | `watch()` |
| Entrée d'un composant | `input()` | `defineProps` |
| Sortie (événement) | `output()` | `defineEmits` |
| Liaison dans les deux sens | `model()` + `[(x)]` | `defineModel()` + `v-model` |
| Condition | `@if` | `v-if` |
| Boucle | `@for (x of list; track x.id)` | `v-for="x in list" :key="x.id"` |
| Attribut dynamique | `[src]="url"` | `:src="url"` |
| Événement | `(click)="f()"` | `@click="f"` |
| Contenu injecté | `<ng-content>` | `<slot>` |
| Logique réutilisable | service injectable | composable `useXxx()` |
| Injection | `inject()` | `provide` / `inject` |
| État partagé | service + signals (ou NgRx Signal Store) | Pinia |
| Routes | `@angular/router` (intégré) | Vue Router |
| Lien | `routerLink` | `<RouterLink>` |
| Zone d'affichage de la page | `<router-outlet>` | `<RouterView>` |
| Protéger une route | guard `CanActivateFn` | `router.beforeEach` |
| Appels HTTP | `HttpClient` (intégré) | `fetch` |
| Asynchrone | RxJS (Observables) | Promises + `async/await` |
| Formulaires | Reactive Forms (intégré) | `v-model` + VeeValidate |
| Formater dans le template | pipes `{{ x \| date }}` | fonctions / `computed` |
| Au montage / démontage | `ngOnInit` / `ngOnDestroy` | `onMounted` / `onUnmounted` |
| CSS limité au composant | par défaut | `<style scoped>` |
| Charger à la demande | `loadComponent`, `@defer` | `() => import()` |
| Composants UI | PrimeNG | PrimeVue |
| Rendu serveur | `@angular/ssr` | Nuxt |

### Les différences de philosophie

| | Angular | Vue |
|---|---|---|
| Style | **tout est fourni** et imposé (routes, HTTP, formulaires, tests) | **minimal**, tu choisis tes outils |
| Organisation | conventions fortes, projets homogènes | libre : c'est à toi de fixer des règles |
| Courbe d'apprentissage | plus raide (injection, RxJS, décorateurs) | plus douce |
| Idéal pour | grosses équipes, applications métier | projets de toutes tailles, adoption progressive |

### Les réflexes qui se mélangent

- Passer d'Angular à Vue : **oublier `.value`** dans le script.
- Passer de Vue à Angular : **oublier les `()`** pour lire un signal.
- **Un service Angular `providedIn: 'root'` existe en un seul exemplaire.** Un composable Vue crée un nouvel état **à chaque appel** ; l'équivalent d'un service unique, c'est un store Pinia.

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- 

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Fondamentaux Angular]], [[Fondamentaux Vue]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://vuejs.org/guide/introduction.html
