---
type: notion
statut: a apprendre
resume: "Les bases sont dans RxJS."
revu:
sources:
  - "https://rxjs.dev/guide/overview"
---
# RxJS avancé

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Les bases sont dans [[RxJS Observables et opérateurs|RxJS]].

## Le problème

**Pourquoi c'est utile ?**
Pour choisir le bon opérateur quand un événement déclenche un appel API.

**Qu'est-ce qui se passait sans ça ?**
Des requêtes en double, des réponses dans le désordre ou des clics multiples qui envoyaient plusieurs fois le formulaire.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Ici : les opérateurs qui font la différence dans une vraie application. Surtout **choisir le bon opérateur quand un événement déclenche un appel API** (`switchMap`, `concatMap`, `mergeMap`, `exhaustMap`) et **combiner plusieurs flux**. C'est une question classique d'entretien Angular.

### Le choix le plus important : quel « …Map » ?

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

### Partager un résultat : `shareReplay`

Sans lui, chaque abonné relance la requête :

```ts
readonly genres$ = this.http.get<Genre[]>('/genre/movie/list').pipe(
  shareReplay({ bufferSize: 1, refCount: true }),   // une seule requête, résultat réutilisé
);
```

### Les Subjects : un flux qu'on alimente soi-même

| Type | Particularité |
|---|---|
| `Subject` | transmet les nouvelles valeurs, rien pour les retardataires |
| `BehaviorSubject(valeurDeDépart)` | garde la **dernière** valeur et la donne à chaque nouvel abonné |
| `ReplaySubject(n)` | garde les `n` dernières |

Dans du code Angular récent, un **signal** remplace souvent le `BehaviorSubject`. Tu en verras beaucoup dans le code existant.

### Gérer les erreurs sans casser le flux

```ts
search$.pipe(
  switchMap(q => this.api.search(q).pipe(
    catchError(() => of([])),      // l'erreur est gérée DANS le switchMap…
  )),
);                                  // …donc la recherche continue de marcher ensuite
```

Si le `catchError` est à l'extérieur, la première erreur **arrête définitivement** la recherche.

`retry({ count: 2, delay: 1000 })` : réessaie deux fois avec une seconde d'attente.

## 🧪 Exemple

### Combiner des flux

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

## ⚠️ Limites et pièges

- **`mergeMap` pour une recherche** : les réponses peuvent arriver dans le désordre.
- **`catchError` au mauvais niveau** : le flux s'arrête à la première erreur.
- **`combineLatest` qui n'émet rien** : il attend que **chaque** flux ait émis au moins une fois (`startWith` pour donner une valeur de départ).

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Quel « …Map » ?

Choisis `switchMap`, `mergeMap`, `concatMap` ou `exhaustMap` :
1. recherche pendant la frappe ;
2. bouton « Se connecter » cliqué plusieurs fois ;
3. enregistrer plusieurs notes dans l'ordre ;
4. charger les détails de 10 films en parallèle.

> [!success]- Solution
> 1. **`switchMap`** : annule la recherche précédente.
> 2. **`exhaustMap`** : ignore les clics tant que la connexion est en cours.
> 3. **`concatMap`** : une requête après l'autre, dans l'ordre.
> 4. **`mergeMap`** : toutes en parallèle.

#### Exercice 2 · Combiner deux flux

Tu as `genres$` (liste des genres) et `movies$` (films avec `genre_ids`). Produis un flux de films avec les **noms** de genres.

> [!success]- Solution
> ```ts
> moviesWithGenres$ = combineLatest([this.movies$, this.genres$]).pipe(
>   map(([movies, genres]) => {
>     const names = new Map(genres.map((g) => [g.id, g.name]));
>     return movies.map((m) => ({ ...m, genreNames: m.genre_ids.map((id) => names.get(id) ?? '') }));
>   }),
> );
> ```
>
> `combineLatest` émet dès que l'un des deux flux change, avec la dernière valeur de chacun.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Angular]]
- **Voir aussi :** [[RxJS Observables et opérateurs]], [[Signals avancés Angular]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://rxjs.dev/guide/overview
