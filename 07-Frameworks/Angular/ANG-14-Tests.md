---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
aliases:
  - "Tests Angular"
tags:
  - frameworks/angular/tests
parent: "[[Angular]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/testing"
---

# Tests Angular

> [!abstract] En bref
> Les tests vérifient automatiquement que ton code fonctionne, à chaque modification. En Angular, on teste d'abord ce qui contient de la **logique** (mappers, stores, services), puis les composants importants avec **`TestBed`** (l'outil d'Angular pour créer un composant en test). Le lanceur de tests est Vitest dans les projets récents (Jasmine / Karma dans les anciens).

## Lancer les tests

```bash
ng test                 # lance les tests (en surveillance)
ng test --no-watch      # une fois (CI)
```

Les fichiers `*.spec.ts` sont à côté du fichier testé.

## 1. Une fonction pure : le mapper

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

## 2. Un store, avec une fausse API

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

Remplacer un service par un faux, c'est tout l'intérêt de l'[[ANG-05-Services-DI|injection de dépendances]].

## 3. Un composant

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

## 4. Un service HTTP

```ts
TestBed.configureTestingModule({
  providers: [provideHttpClient(), provideHttpClientTesting(), { provide: APP_CONFIG, useValue: config }],
});
const api = TestBed.inject(MoviesApi);
const http = TestBed.inject(HttpTestingController);

api.popular().subscribe(movies => expect(movies[0].title).toBe('Dune'));
http.expectOne(r => r.url.endsWith('/movie/popular')).flush({ results: [duneDto] });
```

## Quoi tester en priorité

| Priorité | Quoi |
|---|---|
| ⭐⭐⭐ | mappers, fonctions de calcul, stores |
| ⭐⭐ | composants avec logique (formulaire, filtre), guards |
| ⭐ | composants qui ne font qu'afficher |
| E2E | le parcours principal avec [[TEST-05-Tests-E2E-Playwright\|Playwright]] |

## Pièges

- **Tester les détails internes** (une propriété privée) : le test casse au moindre changement. Teste ce qui est visible et ce qui est renvoyé.
- **Oublier `await fixture.whenStable()`** après un changement : l'affichage n'est pas encore à jour.
- **Appeler la vraie API** dans un test : lent et instable. Toujours un faux service ou `HttpTestingController`.
