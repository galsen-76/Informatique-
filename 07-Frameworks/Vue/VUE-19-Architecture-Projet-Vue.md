---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M06
tags:
  - frameworks/vue/architecture
aliases:
  - "Architecture d'un Projet Vue.js"
parent: "[[Vue]]"
children: []
related_theory:
  - "[[ARCH-14-Architecture-Frontend|Architecture Frontend]]"
  - "[[VUE-09-Pinia-State-Management|Pinia (State Management Vue.js)]]"
related_snippets:
  - "[[04_Snippets/vue-19-architecture-projet-vue]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vuejs.org/style-guide/"
---

# Architecture d'un Projet Vue.js

> [!abstract] Introduction
> Vue laisse beaucoup de liberté : une structure par fonctionnalités, des conventions de nommage et une séparation claire vues / composants / composables / services / stores rendent un projet maintenable.

> [!warning]- Prérequis
> [[VUE-07-Composition-API|Composition API & Composables Vue.js]], [[VUE-09-Pinia-State-Management|Pinia (State Management Vue.js)]]

---

## Théorie

> [!question]- C'est quoi ?
> ```text
> src/
> ├── app/                 # main.ts, router, plugins, layouts
> ├── shared/              # ui/ (BaseButton, BaseInput), composables/, utils/
> ├── features/
> │   ├── films/
> │   │   ├── api/         # filmsApi.ts
> │   │   ├── stores/      # useFilmsStore.ts
> │   │   ├── composables/ # useRechercheFilms.ts
> │   │   ├── components/  # FilmCard.vue, FilmListe.vue
> │   │   └── views/       # FilmsView.vue, FilmDetailView.vue
> │   └── auth/
> └── assets/
> ```

> [!example]- Analogie
> Comme en Angular : des départements (features) avec leurs propres bureaux, et des services communs — Vue ne l'impose pas, c'est à l'équipe de le décider.

> [!question]- Pourquoi l'utiliser ?
> La flexibilité de Vue est un piège en équipe : sans conventions écrites, chaque développeur organise différemment.

> [!question]- Comment ça marche ?
> Conventions du style guide Vue :
> - Noms de composants multi-mots en PascalCase (`FilmCard.vue`)
> - Composants de base préfixés (`BaseButton`, `AppHeader`)
> - Composables `useXxx`, stores `useXxxStore`
> - Vues (routées) = conteneurs ; composants = présentation (props/emits)
> - ESLint `eslint-plugin-vue` + Prettier, `vue-tsc` en CI

> [!question]- Quand l'utiliser ?
> Dès le premier jour d'un projet d'équipe ; documenter les choix (README, ADR).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Adapter la profondeur au projet : pas besoin de 5 sous-dossiers pour une feature d'un seul écran.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| View | Composant associé à une route |
| Composant de base | Brique UI générique sans logique métier |
| Feature | Domaine fonctionnel |

---

## Points clés

- Structure par feature
- Vues = orchestration, composants = affichage
- API → store/composable → vue → composants
- Conventions écrites + lint

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Tout mettre dans `components/` à plat
> - Stores Pinia qui appellent directement des composants/DOM

---

## Exemple minimal

```typescript
// features/films/views/FilmsView.vue
const store = useFilmsStore();
onMounted(() => store.charger());
// template : <FilmListe :films="store.filmsFiltres" @favori="store.basculerFavori" />
```

> [!note] Ce que j'en retiens
> La vue branche le store sur des composants de présentation, exactement comme une page conteneur Angular.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Monorepo (pnpm workspaces / Nx) avec un design system partagé entre apps Vue

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-28-Architecture-Projet-Angular|Architecture d'un Projet Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-19-architecture-projet-vue]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi Vue nécessite-t-il plus de conventions d'équipe qu'Angular ?

---

## Tâches

- [ ] #task Lire la structure du projet Vue au travail et la comparer à ce modèle
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
