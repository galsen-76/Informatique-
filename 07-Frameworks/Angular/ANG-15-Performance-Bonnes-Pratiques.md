---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M05
aliases:
  - "Performance & Bonnes Pratiques Angular"
tags:
  - frameworks/angular/performance
parent: "[[Angular]]"
children:
  - "[[ANG-15-Performance-Bonnes-Pratiques|Lazy Loading Angular]]"
  - "[[ANG-11-Detection-de-changement|OnPush]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-performance]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/performance"
---

# Performance & Bonnes Pratiques Angular

> [!abstract] Introduction
> Techniques pour qu'une application Angular reste rapide et fluide même en grossissant.

> [!warning]- Prérequis
> [[ANG-06-Routing|Routing Angular]], [[ANG-11-Detection-de-changement|Détection de Changement Angular]].

---

## Théorie

> [!question]- C'est quoi ?
> Lazy loading (chargement par morceaux), `track` dans `@for`, `OnPush`, preloading, tree-shaking.

> [!example]- Analogie
> Le lazy loading est comme un buffet où les plats n'arrivent en cuisine QUE lorsqu'un client les commande, plutôt que de tout préparer d'avance au risque de gâcher.

> [!question]- Pourquoi l'utiliser ?
> Une application chargeant tout son code d'un coup met plus de temps à s'afficher, surtout sur mobile ou connexion lente.

> [!question]- Comment ça marche ?
> ```typescript
> {
>   path: 'films',
>   loadComponent: () => import('./films/liste-films.component').then(m => m.ListeFilmsComponent)
> }
> ```
> ```html
> @for (film of films; track film.id) { <app-film-card [film]="film"/> }
> ```

> [!question]- Quand l'utiliser ?
> Lazy loading dès plusieurs sections importantes ; `track` systématiquement dans chaque `@for`.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Optimiser à l'aveugle sans mesurer (Lighthouse, DevTools) risque d'ajouter de la complexité pour un gain nul — toujours mesurer avant d'optimiser.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Lazy loading | Charger du code seulement quand nécessaire |
| Tree-shaking | Retrait automatique du code inutilisé au build |
| Preloading | Précharger discrètement en arrière-plan |

---

## Points clés

- Le lazy loading découpe le code en morceaux chargés à la demande
- `track` obligatoire et essentiel pour la performance des listes
- Le tree-shaking retire le code mort automatiquement
- Toujours mesurer avant d'optimiser (Lighthouse, DevTools)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Optimiser sans avoir mesuré le vrai goulot d'étranglement
> - Oublier `track`, dégradant la performance des listes qui changent
> - Importer des `NgModule` entiers au lieu de composants standalone, nuisant au tree-shaking

---

## Paramètres / Configuration

| Technique | Description |
|-----------|-------------|
| `loadComponent`/`loadChildren` | Charge à la demande |
| `track` | Identifie chaque élément de liste |
| `OnPush` | Limite les vérifications inutiles |
| `PreloadAllModules` | Précharge tout en arrière-plan |

---

## Exemple minimal

```typescript
{
  path: 'films',
  loadComponent: () => import('./films/liste-films.component')
    .then(m => m.ListeFilmsComponent)
}
```

> [!note] Ce que j'en retiens
> Le code de la liste de films n'est téléchargé que quand l'utilisateur navigue vers `/films`.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - `NgOptimizedImage` (`ngSrc`) pour les images, `@defer` pour les blocs lourds (voir [[ANG-27-Defer-Vues-Differees|Vues différées @defer Angular]])
> - Budgets de taille dans `angular.json` pour faire échouer la CI si le bundle grossit trop

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → [[ANG-15-Performance-Bonnes-Pratiques|Lazy Loading Angular]], [[ANG-11-Detection-de-changement|OnPush]]
- À comparer avec → [[ANG-11-Detection-de-changement|Détection de Changement Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-performance]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Saurais-je lire un rapport Lighthouse pour identifier une priorité d'optimisation ?

> [!faq]- Questions d'entretien
> - Quelles techniques utilisez-vous pour optimiser une application Angular ?

---

## Tâches

- [ ] #task Mettre en lazy loading les sections principales de CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment lire concrètement un rapport Lighthouse pour prioriser ?
