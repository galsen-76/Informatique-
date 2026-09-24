---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M06
tags:
  - frameworks/comparatif
aliases:
  - "Angular vs Vue Correspondances"
parent: "[[Frameworks]]"
children: []
related_theory:
  - "[[ANG-01-Fondamentaux|Fondamentaux Angular]]"
  - "[[VUE-01-Fondamentaux|Fondamentaux Vue.js]]"
related_snippets:
  - "[[04_Snippets/angular-vs-vue]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vuejs.org/guide/introduction.html"
---

# Angular vs Vue Correspondances

> [!abstract] Introduction
> Table de correspondance complète entre Angular et Vue : ton entreprise utilise les deux, raisonner par équivalences permet de passer de l'un à l'autre sans réapprendre les concepts.

> [!warning]- Prérequis
> [[ANG-01-Fondamentaux|Fondamentaux Angular]], [[VUE-01-Fondamentaux|Fondamentaux Vue.js]]

---

## Théorie

> [!question]- C'est quoi ?
> | Concept | Angular | Vue 3 |
> |---|---|---|
> | Création projet | `ng new` | `npm create vue@latest` |
> | Build | Angular CLI (esbuild/Vite) | Vite |
> | Composant | Classe `@Component` + template | SFC `.vue` + `<script setup>` |
> | État local | `signal()` | `ref()` / `reactive()` |
> | Dérivé | `computed()` | `computed()` |
> | Effet | `effect()` | `watch()` / `watchEffect()` |
> | Entrée | `input()` / `@Input` | `defineProps` |
> | Sortie | `output()` / `@Output` | `defineEmits` |
> | Two-way composant | `model()` + `[( )]` | `defineModel()` + `v-model` |
> | Condition | `@if` | `v-if` / `v-show` |
> | Boucle | `@for (x of l; track x.id)` | `v-for="x in l" :key="x.id"` |
> | Binding attribut | `[src]="url"` | `:src="url"` |
> | Événement | `(click)="f()"` | `@click="f"` |
> | Projection | `<ng-content>` | `<slot>` |
> | Logique réutilisable | Service / fonction `inject` | Composable `useXxx()` |
> | DI | Injecteurs hiérarchiques, `inject()` | `provide` / `inject` |
> | État global | Service + signals, NgRx | Pinia |
> | Routing | `@angular/router` (intégré) | Vue Router (officiel, séparé) |
> | Lien | `routerLink` | `<router-link>` |
> | Zone de rendu | `<router-outlet>` | `<router-view>` |
> | Protection route | Guards (`CanActivateFn`) | `beforeEach` / `beforeEnter` |
> | HTTP | `HttpClient` + intercepteurs | fetch/axios + intercepteurs |
> | Asynchrone | RxJS (+ signals) | Promises + watch (+ VueUse) |
> | Formulaires | Reactive Forms (intégré) | `v-model` + VeeValidate |
> | Pipes | `{{ x \| date }}` | fonctions / computed |
> | Cycle de vie | `ngOnInit`, `ngOnDestroy` | `onMounted`, `onUnmounted` |
> | Styles isolés | ViewEncapsulation | `<style scoped>` |
> | Lazy loading | `loadComponent`, `@defer` | `() => import()`, `defineAsyncComponent` |
> | Tests | Vitest/Karma + TestBed | Vitest + Vue Test Utils |
> | SSR | `@angular/ssr` | Nuxt |
> | DevTools | Angular DevTools | Vue DevTools |

> [!example]- Analogie
> Deux langues romanes : le vocabulaire diffère (`@if` / `v-if`), la grammaire (composants, réactivité, flux de données descendant) est la même.

> [!question]- Pourquoi l'utiliser ?
> Éviter de mélanger les réflexes (chercher 3 fichiers en Vue, oublier `.value`, oublier `()` sur un signal) et être productif sur les deux bases de code.

> [!question]- Comment ça marche ?
> Différences de philosophie :
> - Angular : framework complet et opiniâtre, DI hiérarchique, RxJS natif, conventions imposées → homogénéité dans les grandes équipes
> - Vue : progressif, minimaliste, liberté d'organisation, courbe d'apprentissage douce → conventions à définir soi-même
> - Réactivité : Angular lit un signal par appel `x()`, Vue via `.value` (déballé dans le template)

> [!question]- Quand l'utiliser ?
> À relire à chaque passage d'un projet à l'autre.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les correspondances ne sont pas parfaites : un composable n'est pas un singleton (contrairement à un service `providedIn: 'root'`), un pipe pur n'a pas d'équivalent exact.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Opiniâtre | Qui impose une façon de faire |
| Progressif | Adoptable par morceaux |

---

## Points clés

- Mêmes concepts, syntaxes différentes
- Service root = singleton ; composable = nouvelle instance par appel ; store Pinia = singleton
- `x()` en Angular, `x.value` en Vue (sauf template)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `.value` en passant d'Angular à Vue
> - Oublier les parenthèses d'un signal en passant de Vue à Angular
> - Chercher un équivalent Vue à RxJS partout (souvent un simple watch suffit)

---

## Exemple minimal

```typescript
// Angular
compteur = signal(0);
double = computed(() => this.compteur() * 2);
incrementer() { this.compteur.update(v => v + 1); }
```
```typescript
// Vue
const compteur = ref(0);
const double = computed(() => compteur.value * 2);
const incrementer = () => compteur.value++;
```

> [!note] Ce que j'en retiens
> Même logique, seule la façon de lire/écrire la valeur change.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir argumenter le choix Angular ou Vue pour un nouveau projet (taille d'équipe, SEO, existant, recrutement)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Frameworks]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/angular-vs-vue]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Réécrire de tête un composant « liste de films filtrée » dans les deux frameworks.

> [!faq]- Questions d'entretien
> - Quelles différences principales entre Angular et Vue ?

---

## Tâches

- [ ] #task Coder la même fonctionnalité (favoris) dans CinéTrack Angular et CinéTrack Vue
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
