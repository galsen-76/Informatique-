---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M05
tags:
  - frameworks/angular/rxjs-avance
aliases:
  - "RxJS Avancé"
parent: "[[Angular]]"
related_theory:
  - "[[ANG-08-RxJS|Programmation Réactive RxJS Angular]]"
  - "[[ANG-23-Signals-Avances|Signals Avancés Angular]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://rxjs.dev/guide/overview"
---

# RxJS Avancé

> [!abstract] En bref
> Les bases sont dans [[ANG-08-RxJS|RxJS]]. Ici : les opérateurs qui font la différence dans une vraie application. Surtout **choisir le bon opérateur quand un événement déclenche un appel API** (`switchMap`, `concatMap`, `mergeMap`, `exhaustMap`) et **combiner plusieurs flux**. C'est une question classique d'entretien Angular.

## Le choix le plus important : quel « …Map » ?

Quand chaque valeur déclenche un appel (une frappe → une recherche, un clic → une sauvegarde), que faire si un nouvel événement arrive **avant la fin** de l'appel précédent ?

| Opérateur | Nouvel événement pendant un appel | Image | Usage |
|---|---|---|---|
| `switchMap` | **annule** l'ancien, lance le nouveau | changer de chaîne TV | recherche, navigation |
| `concatMap` | **attend** la fin, puis lance | file d'attente au guichet | sauvegardes dans l'ordre |
| `mergeMap` | lance **en parallèle** | plusieurs caisses ouvertes | télécharger plusieurs fichiers |
| `exhaustMap` | **ignore** tant que l'appel n'est pas fini | bouton grisé | bouton « Payer », connexion |

```ts
// Recherche : seule la dernière frappe compte
search$.pipe(debounceTime(300), switchMap(q => this.api.search(q)));

// Bouton « Enregistrer » : pas de double envoi
saveClick$.pipe(exhaustMap(() => this.api.save(this.form.getRawValue())));

// Notes données une par une : toutes enregistrées, dans l'ordre
ratings$.pipe(concatMap(r => this.api.rate(r)));
```

## Combiner des flux

| Opérateur | Émet… | Usage |
|---|---|---|
| `forkJoin([a$, b$])` | **une fois**, quand **tous** sont terminés | charger film + casting + vidéos en parallèle |
| `combineLatest([a$, b$])` | à **chaque** changement de l'un, avec la dernière valeur des autres | filtres (genre + année + tri) |
| `withLatestFrom(b$)` | quand `a$` émet, avec la dernière valeur de `b$` | clic + état actuel |

```ts
// Fiche complète en un seul chargement
forkJoin({
  movie: this.api.details(id),
  credits: this.api.credits(id),
  videos: this.api.videos(id),
}).subscribe(({ movie, credits, videos }) => …);
```

## Partager un résultat : `shareReplay`

Sans lui, chaque abonné relance la requête :

```ts
readonly genres$ = this.http.get<Genre[]>('/genre/movie/list').pipe(
  shareReplay({ bufferSize: 1, refCount: true }),   // une seule requête, résultat réutilisé
);
```

## Les Subjects : un flux qu'on alimente soi-même

| Type | Particularité |
|---|---|
| `Subject` | transmet les nouvelles valeurs, rien pour les retardataires |
| `BehaviorSubject(valeurDeDépart)` | garde la **dernière** valeur et la donne à chaque nouvel abonné |
| `ReplaySubject(n)` | garde les `n` dernières |

Dans du code Angular récent, un **signal** remplace souvent le `BehaviorSubject`. Tu en verras beaucoup dans le code existant.

## Gérer les erreurs sans casser le flux

```ts
search$.pipe(
  switchMap(q => this.api.search(q).pipe(
    catchError(() => of([])),      // l'erreur est gérée DANS le switchMap…
  )),
);                                  // …donc la recherche continue de marcher ensuite
```

Si le `catchError` est à l'extérieur, la première erreur **arrête définitivement** la recherche.

`retry({ count: 2, delay: 1000 })` : réessaie deux fois avec une seconde d'attente.

## Pièges

- **`mergeMap` pour une recherche** : les réponses peuvent arriver dans le désordre.
- **`catchError` au mauvais niveau** : le flux s'arrête à la première erreur.
- **`combineLatest` qui n'émet rien** : il attend que **chaque** flux ait émis au moins une fois (`startWith` pour donner une valeur de départ).
