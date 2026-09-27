---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M05
aliases:
  - "Détection de Changement (Change Detection) Angular"
tags:
  - frameworks/angular/change-detection
parent: "[[Angular]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/change-detection"
---

# Détection de Changement (Change Detection) Angular

> [!abstract] En bref
> La **détection de changement**, c'est le moment où Angular revérifie tes composants pour mettre l'écran à jour. Historiquement, il revérifiait **tout** après chaque clic ou réponse réseau. Aujourd'hui, avec les **signals** et **`OnPush`**, il ne revérifie que ce qui a vraiment changé. Ce qu'il faut retenir : `OnPush` partout, et des signals.

## Les deux façons de fonctionner

| | Ancienne (Zone.js, par défaut) | Moderne (OnPush + signals, zoneless) |
|---|---|---|
| Quand Angular vérifie | après **chaque** événement (clic, minuteur, requête) | quand un **signal** lu par le composant change, ou une entrée |
| Quoi | **tous** les composants | seulement les composants concernés |
| Performance | correcte, mais gaspille | excellente |

Image : l'ancienne méthode, c'est un gardien qui **fait le tour de tout l'immeuble** à chaque bruit. La moderne, ce sont des **détecteurs dans chaque pièce** qui ne sonnent que là où il se passe quelque chose.

**Zone.js** est une librairie qui détectait tous les événements du navigateur pour déclencher la vérification. Les versions récentes d'Angular peuvent s'en passer (mode *zoneless*), et c'est la direction prise par le framework.

## Ce que tu fais concrètement

1. **`OnPush` sur chaque composant**

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  …
})
```

Un composant `OnPush` n'est revérifié que si :
- un de ses **inputs** reçoit une nouvelle valeur ;
- un **signal** lu dans son template change ;
- un événement se produit **dans** ce composant ;
- un Observable affiché avec `| async` émet.

2. **Des signals pour l'état** : ils préviennent Angular tout seuls.

3. **Remplacer les objets au lieu de les modifier**

```ts
// ❌ OnPush ne voit rien : c'est le même tableau
this.movies().push(movie);

// ✅ nouveau tableau → changement détecté
this.movies.update(list => [...list, movie]);
```

## Mode zoneless

```ts
// app.config.ts
providers: [provideZonelessChangeDetection()]
```

Selon ta version d'Angular, c'est déjà le mode par défaut des nouveaux projets. Condition pour que ça marche : ton état passe par des **signals** (ou `async`), pas par des variables modifiées « en douce ».

## Symptôme typique

> « Ma donnée a changé (je la vois dans la console), mais l'écran ne se met pas à jour. »

Causes probables :
- tu as modifié un tableau ou un objet **sans le remplacer** ;
- tu as modifié une **variable simple** (pas un signal) dans un `setTimeout` ou un `subscribe` d'un composant `OnPush` / zoneless.

Solution : utilise un signal et `set` / `update`.

## Pour voir ce qui se passe

**Angular DevTools** → onglet Profiler : montre chaque cycle de vérification et les composants concernés.

## Exercices

### Exercice 1 · Pourquoi l'écran ne bouge pas ?

Composant en `OnPush` : au clic, la note change dans l'objet mais l'affichage reste le même. Explique et corrige.

```ts
movie = { title: 'Dune', rating: 3 };
rate() { this.movie.rating = 5; }
```

> [!success]- Solution
> Avec `OnPush`, Angular ne redessine le composant que si un **input** change de **référence**, si un événement a lieu dans le composant, ou si un **signal** lu dans le template change. Modifier une propriété d'un objet simple ne suffit pas toujours à le prévenir.
>
> Avec un signal :
>
> ```ts
> movie = signal({ title: 'Dune', rating: 3 });
> rate() {
>   this.movie.update((m) => ({ ...m, rating: 5 }));
> }
> ```

### Exercice 2 · Vrai ou faux ?

1. Avec `OnPush`, un signal lu dans le template qui change met bien l'écran à jour.
2. En mode zoneless, un `setTimeout` qui modifie une variable simple met l'écran à jour.
3. `OnPush` rend l'application plus rapide.

> [!success]- Solution
> 1. **Vrai** : les signals préviennent Angular directement.
> 2. **Faux** : sans Zone.js, Angular n'est pas averti. Il faut modifier un **signal**.
> 3. **Vrai** : Angular vérifie beaucoup moins de composants à chaque événement.
