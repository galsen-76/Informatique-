---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Service et injection de dépendances]]"
  - "[[Observable et RxJS]]"
  - "[[Angular Router]]"
tags:
  - exercice
---
# Exercice — Une application Angular avec service, RxJS et routeur

> [!info] Objectif
> Construire une application Angular organisée comme en entreprise : services, flux, pages et garde.
> Notions : [[Service et injection de dépendances]] · [[Observable et RxJS]] · [[Angular Router]]

## Consignes
- [ ] Active `provideHttpClient()` dans `app.config.ts`
- [ ] Génère un service `TodosService` avec `liste()` et `detail(id)` sur jsonplaceholder, typés
- [ ] Page `/todos` : affiche la liste avec le pipe `async` et un message d'erreur grâce à `catchError`
- [ ] Ajoute une recherche pendant la frappe : `FormControl`, `debounceTime(300)`, `distinctUntilChanged`, `switchMap`
- [ ] Page `/todos/:id` qui lit le paramètre et charge le détail
- [ ] Un `AuthService` avec un signal `connecte`, une page `/connexion` et une garde `canActivate`
- [ ] Un intercepteur qui ajoute un en-tête `Authorization` factice ; vérifie-le dans l'onglet Réseau
- [ ] Écris un test de `TodosService` avec `provideHttpClientTesting()` et `HttpTestingController`

> [!question]- Indice
> jsonplaceholder accepte `?q=` pour chercher : `/todos?q=${q}&_limit=20`.

> [!question]- Solution
> ```ts
> @Injectable({ providedIn: "root" })
> export class TodosService {
>   private http = inject(HttpClient);
>   private base = "https://jsonplaceholder.typicode.com/todos";
>   liste(q = "") { return this.http.get<Todo[]>(`${this.base}?_limit=20&q=${encodeURIComponent(q)}`); }
>   detail(id: string) { return this.http.get<Todo>(`${this.base}/${id}`); }
> }
> export class ListeTodosComponent {
>   private service = inject(TodosService);
>   erreur = signal("");
>   recherche = new FormControl("", { nonNullable: true });
>   todos$ = this.recherche.valueChanges.pipe(
>     startWith(""), debounceTime(300), distinctUntilChanged(),
>     switchMap((q) => this.service.liste(q).pipe(catchError(() => { this.erreur.set("Chargement impossible"); return of([]); }))),
>   );
> }
> export const authGuard: CanActivateFn = () => inject(AuthService).connecte() || inject(Router).parseUrl("/connexion");
> export const jetonInterceptor: HttpInterceptorFn = (req, next) => next(req.clone({ setHeaders: { Authorization: "Bearer test" } }));
> // test
> it("appelle la bonne adresse", () => {
>   TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
>   const s = TestBed.inject(TodosService), ctrl = TestBed.inject(HttpTestingController);
>   s.detail("3").subscribe((t) => expect(t.id).toBe(3));
>   ctrl.expectOne("https://jsonplaceholder.typicode.com/todos/3").flush({ id: 3, title: "x", completed: false });
> });
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
