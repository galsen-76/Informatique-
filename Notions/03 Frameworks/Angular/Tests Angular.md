---
type: notion
statut: a apprendre
resume: "Les tests vérifient automatiquement que ton code fonctionne, à chaque modification."
revu:
sources:
  - "https://angular.dev/guide/testing"
---
# Tests Angular

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Les tests vérifient automatiquement que ton code fonctionne, à chaque modification.

## Le problème

**Pourquoi c'est utile ?**
Pour vérifier automatiquement les services et composants Angular à chaque modification.

**Qu'est-ce qui se passait sans ça ?**
On testait à la main en cliquant partout, et les régressions passaient.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

En Angular, on teste d'abord ce qui contient de la **logique** (mappers, stores, services), puis les composants importants avec **`TestBed`** (l'outil d'Angular pour créer un composant en test). Le lanceur de tests est Vitest dans les projets récents (Jasmine / Karma dans les anciens).

### Lancer les tests

```bash
ng test                 # lance les tests (en surveillance)
ng test --no-watch      # une fois (CI)
```

Les fichiers `*.spec.ts` sont à côté du fichier testé.

### 1. Une fonction pure : le mapper

```ts
describe('toMovie', () => {
  it('construit l\'URL de l\'affiche et extrait l\'année', () => {
    const dto = { id: 1, title: 'Dune', poster_path: '/d.jpg', release_date: '2021-09-15', vote_average: 7.8 };
    expect(toMovie(dto, 'https://img/')).toEqual({
      id: 1, title: 'Dune', poster: 'https://img//d.jpg', year: 2021, rating: 7.8,
    });
  });

  it('gère une affiche absente', () => {
    expect(toMovie({ ...dto, poster_path: null }, 'x').poster).toBeNull();
  });
});
```

Le plus simple et le plus rentable : pas besoin de `TestBed`.

### 2. Un store, avec une fausse API

```ts
describe('MoviesStore', () => {
  it('passe en succès avec les films reçus', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: MoviesApi, useValue: { popular: () => of([dune]) } }],   // faux service
    });
    const store = TestBed.inject(MoviesStore);

    store.load();

    expect(store.movies()).toEqual([dune]);
    expect(store.loading()).toBe(false);
  });
});
```

Remplacer un service par un faux, c'est tout l'intérêt de l'[[Services et injection de dépendances Angular|injection de dépendances]].

### 3. Un composant

```ts
describe('MovieCardComponent', () => {
  it('affiche le titre et émet favorite au clic', async () => {
    const fixture = TestBed.createComponent(MovieCardComponent);
    fixture.componentRef.setInput('movie', dune);   // donner une valeur à un input
    await fixture.whenStable();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Dune');

    const spy = vi.fn();
    fixture.componentInstance.favorite.subscribe(spy);
    el.querySelector('button')!.click();
    expect(spy).toHaveBeenCalledWith(dune.id);
  });
});
```

### 4. Un service HTTP

```ts
TestBed.configureTestingModule({
  providers: [provideHttpClient(), provideHttpClientTesting(), { provide: APP_CONFIG, useValue: config }],
});
const api = TestBed.inject(MoviesApi);
const http = TestBed.inject(HttpTestingController);

api.popular().subscribe(movies => expect(movies[0].title).toBe('Dune'));
http.expectOne(r => r.url.endsWith('/movie/popular')).flush({ results: [duneDto] });
```

### Quoi tester en priorité

| Priorité | Quoi |
|---|---|
| ⭐⭐⭐ | mappers, fonctions de calcul, stores |
| ⭐⭐ | composants avec logique (formulaire, filtre), guards |
| ⭐ | composants qui ne font qu'afficher |
| E2E | le parcours principal avec Playwright |

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Tester les détails internes** (une propriété privée) : le test casse au moindre changement. Teste ce qui est visible et ce qui est renvoyé.
- **Oublier `await fixture.whenStable()`** après un changement : l'affichage n'est pas encore à jour.
- **Appeler la vraie API** dans un test : lent et instable. Toujours un faux service ou `HttpTestingController`.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Tester une fonction pure

Écris les tests du mapper `toMovie(dto)` : il convertit `release_date: '2021-09-15'` en `year: 2021` et donne `posterUrl: null` quand `poster_path` vaut `null`.

> [!success]- Solution
> ```ts
> describe('toMovie', () => {
>   it('extrait l’année', () => {
>     const movie = toMovie({ id: 1, title: 'Dune', release_date: '2021-09-15', poster_path: '/a.jpg', vote_average: 7.8 });
>     expect(movie.year).toBe(2021);
>   });
>
>   it('gère une affiche absente', () => {
>     const movie = toMovie({ id: 1, title: 'Dune', release_date: '2021-09-15', poster_path: null, vote_average: 7.8 });
>     expect(movie.posterUrl).toBeNull();
>   });
> });
> ```
>
> Une fonction pure se teste sans rien configurer.

#### Exercice 2 · Tester un composant avec un input

Teste que `MovieCard` affiche le titre du film reçu en input.

> [!success]- Solution
> ```ts
> it('affiche le titre', async () => {
>   const fixture = TestBed.createComponent(MovieCard);
>   fixture.componentRef.setInput('movie', { id: 1, title: 'Dune', year: 2021 });
>   await fixture.whenStable();
>
>   const title = fixture.nativeElement.querySelector('h3');
>   expect(title.textContent).toContain('Dune');
> });
> ```

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Angular]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://angular.dev/guide/testing
