---
type: concept
module: "[[Module 20 - Angular]]"
related:
  - "[[Observable et RxJS]]"
  - "[[Pinia]]"
tags:
  - concept
  - frontend
---
# Service et injection de dépendances

> [!info] En une phrase
> Un service Angular est une classe qui contient la logique partagée (appels d'API, état) ; l'injection de dépendances le fournit automatiquement aux composants qui le demandent.

## 1 · Comprendre
### Définition
```ts
@Injectable({ providedIn: "root" })      // une seule instance pour toute l'application
export class TachesService {
  private http = inject(HttpClient);     // le service reçoit lui-même ses dépendances
  liste() { return this.http.get<Tache[]>("/api/taches"); }
  creer(t: Partial<Tache>) { return this.http.post<Tache>("/api/taches", t); }
}

export class ListeComponent {
  private service = inject(TachesService);   // ou via le constructeur
  taches$ = this.service.liste();
}
```
**Injection de dépendances** (*DI*) : une classe ne crée pas elle-même ce dont elle a besoin, elle le **demande** ; un injecteur le lui fournit. On peut alors remplacer un service par un faux dans les tests.
Le principe dépasse Angular : NestJS, Spring (Java), ASP.NET l'utilisent aussi.

### Pourquoi ça existe
Les composants ne doivent pas contenir les appels d'API ni la logique métier, et plusieurs composants partagent les mêmes données.

### Le problème résolu
Séparer affichage et logique, partager un état, et tester facilement en injectant des faux services.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
I[Injecteur] --> S[TachesService]
  S --> H[HttpClient]
  S --> C1[Composant liste]
  S --> C2[Composant détail]
```

### Exemple concret
```ts
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([jetonInterceptor]))],
};
// un intercepteur ajoute le jeton à chaque requête
export const jetonInterceptor: HttpInterceptorFn = (req, next) =>
  next(req.clone({ setHeaders: { Authorization: `Bearer ${inject(AuthService).jeton()}` } }));
```
```bash
ng generate service taches
```

> [!abstract]- Comment ça s'écrit (référence à chercher, pas à apprendre par cœur)
> L'idée est la même partout ; seule l'écriture change. Les exemples plus haut sont en Python ou en JavaScript.
>
> **C# (.NET)**
> ```csharp
> // Program.cs : j'enregistre le service
> builder.Services.AddScoped<IStockage, StockageSql>();
>
> // le framework le fournit à la route qui le demande
> app.MapGet("/depenses", (IStockage stockage) => stockage.Lister());
> ```
> ASP.NET Core a l'injection intégrée. Trois durées de vie : `AddSingleton` (un seul pour toute l'application), `AddScoped` (un par requête HTTP), `AddTransient` (un nouveau à chaque demande).

### Cas d'utilisation
- Appels d'API
- État partagé (utilisateur connecté)
- Tests avec des services simulés

> [!warning] À ne pas confondre
> Fournir un service dans `providers` d'un composant crée une **nouvelle instance** pour ce composant : l'état n'est plus partagé. `providedIn: "root"` pour un service unique.

## 3 · Relier
- **Prérequis** : [[Composant d'interface]] · [[Appeler une API HTTP]]
- **Complémentaires** : [[Observable et RxJS]] · [[Pinia]]
