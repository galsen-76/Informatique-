---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M04
aliases:
  - "Routing Angular"
tags:
  - frameworks/angular/routing
parent: "[[Angular]]"
children:
  - "[[ANG-21-Guards-Resolvers-Intercepteurs|Guards Angular]]"
  - "[[ANG-15-Performance-Bonnes-Pratiques|Lazy Loading Angular]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-routing-basique]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/routing"
---

# Routing Angular

> [!abstract] Introduction
> Le routing change ce qui s'affiche selon l'URL, sans jamais recharger réellement la page.

> [!warning]- Prérequis
> [[ANG-02-Composants|Composants Angular]], [[ANG-01-Fondamentaux|notion de SPA]].

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> export const routes: Routes = [
>   { path: 'films', component: ListeFilmsComponent },
>   { path: 'films/:id', component: DetailFilmComponent }
> ];
> ```

> [!example]- Analogie
> Le `<router-outlet>` est un cadre photo fixe accroché au mur : selon l'URL, on change simplement la photo (le composant) qu'il affiche, sans jamais déplacer le cadre lui-même.

> [!question]- Pourquoi l'utiliser ?
> Structurer la navigation avec des URLs propres et partageables, plutôt que de gérer l'affichage à coups de `@if`.

> [!question]- Comment ça marche ?
> ```html
> <a routerLink="/films">Voir les films</a>
> <router-outlet></router-outlet>
> ```
> ```typescript
> private route = inject(ActivatedRoute);
> idFilm = this.route.snapshot.paramMap.get('id');
> ```

> [!question]- Quand l'utiliser ?
> Dès qu'une application a plusieurs écrans logiquement séparés.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Utiliser `<a href="">` classique au lieu de `routerLink` recharge toute la page — perd l'intérêt même de la SPA.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `router-outlet` | Emplacement où s'affiche le composant de la route active |
| `routerLink` | Équivalent de `href` sans rechargement de page |
| Guard | Fonction qui autorise ou bloque l'accès à une route |

---

## Points clés

- `routerLink` remplace `href` pour éviter le rechargement
- `<router-outlet>` = emplacement du composant actif
- Paramètre d'URL (`:id`) récupéré via `ActivatedRoute`
- Le lazy loading charge une route seulement quand nécessaire

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Utiliser `href` au lieu de `routerLink`, provoquant un rechargement complet
> - Oublier `<router-outlet>` dans le template parent, rien ne s'affiche alors
> - Récupérer un paramètre d'URL avant que la route ne soit pleinement résolue

---

## Paramètres / Configuration

| Concept | Description | Notes |
|-----------|-------------|-------|
| `path` | Segment d'URL | `''` = route par défaut |
| `:param` | Paramètre dynamique | Via `ActivatedRoute` |
| `loadComponent` | Lazy loading | Meilleure performance |
| `canActivate` | Guard | Bloque/autorise l'accès |

---

## Exemple minimal

```typescript
export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'films/:id', component: DetailFilmComponent }
];
```

> [!note] Ce que j'en retiens
> Cliquer sur un lien change l'URL SANS recharger la page — seul le contenu du `router-outlet` change.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - `withComponentInputBinding()` : paramètres de route reçus directement dans des `input()`
> - Routes enfants, `loadChildren` par feature, titres de page (`title`) et stratégies de préchargement

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → [[ANG-21-Guards-Resolvers-Intercepteurs|Guards Angular]], [[ANG-15-Performance-Bonnes-Pratiques|Lazy Loading Angular]]
- À comparer avec → [[VUE-08-Vue-Router|Vue Router]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-routing-basique]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer comment Angular change l'URL sans recharger la page ?

> [!faq]- Questions d'entretien
> - Comment protéger une route et charger une section à la demande ?

---

## Tâches

- [ ] #task Mettre en place le routing de CinéTrack (accueil, liste, détail)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Mécanisme technique précis derrière le changement d'URL sans rechargement ?
