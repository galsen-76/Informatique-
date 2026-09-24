---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M05
tags:
  - frameworks/angular/ngrx
aliases:
  - "NgRx et Signal Store"
parent: "[[Angular]]"
children: []
related_theory:
  - "[[ANG-12-State-Management|State Management Angular]]"
  - "[[ANG-23-Signals-Avances|Signals Avancés Angular]]"
related_snippets:
  - "[[04_Snippets/ang-25-ngrx-signal-store]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://ngrx.io/guide/signals"
---

# NgRx et Signal Store

> [!abstract] Introduction
> NgRx fournit des solutions de state management structurées : le Store classique (actions / reducers / effects, inspiré de Redux) et le Signal Store, plus léger et basé sur les signals.

> [!warning]- Prérequis
> [[ANG-12-State-Management|State Management Angular]], [[ANG-24-RxJS-Avance|RxJS Avancé]]

---

## Théorie

> [!question]- C'est quoi ?
> **Signal Store** :
> ```typescript
> export const FavorisStore = signalStore(
>   { providedIn: 'root' },
>   withState({ ids: [] as number[], chargement: false }),
>   withComputed(({ ids }) => ({ total: computed(() => ids().length) })),
>   withMethods((store, api = inject(FavorisApi)) => ({
>     ajouter(id: number) { patchState(store, s => ({ ids: [...s.ids, id] })); },
>     async charger() {
>       patchState(store, { chargement: true });
>       patchState(store, { ids: await api.liste(), chargement: false });
>     },
>   })),
> );
> ```
> **Store classique** : `Action` (ce qui s'est passé) → `Reducer` (fonction pure : nouvel état) → `Selector` (lecture dérivée) ; `Effect` pour les appels API.

> [!example]- Analogie
> Le Store classique est un registre officiel : toute modification doit passer par un formulaire normalisé (action) traité par un bureau unique (reducer), ce qui laisse une trace complète. Le Signal Store est un classeur partagé bien organisé, avec des règles mais moins de paperasse.

> [!question]- Pourquoi l'utiliser ?
> Sur une grosse application, un flux unidirectionnel et prévisible, un état traçable (Redux DevTools, time-travel) et des conventions communes à toute l'équipe.

> [!question]- Comment ça marche ?
> ```mermaid
> flowchart LR
>   C["Composant"] -->|"dispatch(action)"| R["Reducer (pur)"]
>   R --> S["Store (état)"]
>   S -->|"select"| C
>   C -.-> E["Effect"]
>   E -->|"API"| API[(Backend)]
>   E -->|"action succès/échec"| R
> ```

> [!question]- Quand l'utiliser ?
> Store classique : gros projets multi-équipes, besoin d'audit/traçabilité de l'état. Signal Store : la plupart des besoins de store partagé moderne. Service + signals : petits et moyens projets.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Beaucoup de code répétitif (boilerplate) avec le store classique ; surdimensionné pour de l'état local ou simple.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Action | Événement décrivant ce qui s'est passé |
| Reducer | Fonction pure (état, action) → nouvel état |
| Selector | Fonction de lecture mémoïsée |
| Effect | Gestion des effets de bord (API) |
| `patchState` | Mise à jour partielle d'un Signal Store |

---

## Points clés

- Flux unidirectionnel : action → reducer → état → vue
- Reducers purs et immuables
- Signal Store = moins de code, API composable (`withState`, `withMethods`, `withHooks`)
- Choisir selon la taille du projet et les conventions de l'équipe

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Mettre TOUT l'état (formulaires, état UI local) dans le store global
> - Muter l'état dans un reducer
> - Dupliquer dans le store des données qui pourraient être dérivées

---

## Exemple minimal

```typescript
@Component({ template: `<p>{{ store.total() }} favoris</p>` })
export class CompteurFavorisComponent {
  store = inject(FavorisStore);
}
```

> [!note] Ce que j'en retiens
> Le composant ne fait que lire des signals et appeler des méthodes : il ignore comment l'état est géré.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir argumenter : service+signals vs Signal Store vs Store classique
> - Normaliser l'état (entités par id) avec `withEntities`

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[VUE-09-Pinia-State-Management|Pinia (State Management Vue.js)]]

**Pratique :**
- Extrait de code → [[04_Snippets/ang-25-ngrx-signal-store]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un reducer doit-il être pur ?

> [!faq]- Questions d'entretien
> - Quand introduiriez-vous NgRx dans un projet ?

---

## Tâches

- [ ] #task Demander au travail quelle solution d'état est utilisée et lire le code d'un store existant
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
