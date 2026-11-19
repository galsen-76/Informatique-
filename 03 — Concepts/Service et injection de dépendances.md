---
type: concept
domain: frontend
module: "[[Module 20 - Angular]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Composant Angular]]"
  - "[[Appeler une API avec fetch]]"
parents:
  - "[[Angular]]"
related:
  - "[[Observable et RxJS]]"
  - "[[Pinia]]"
next_review: 
method: []
tags:
  - concept
  - frontend
---
# Service et injection de dépendances

> [!info] En une phrase
> Un service Angular est une classe qui contient la logique partagée (appels d'API, état) ; l'injection de dépendances le fournit automatiquement aux composants qui le demandent.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

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

### Cas d'utilisation
- Appels d'API
- État partagé (utilisateur connecté)
- Tests avec des services simulés

> [!warning] À ne pas confondre
> Fournir un service dans `providers` d'un composant crée une **nouvelle instance** pour ce composant : l'état n'est plus partagé. `providedIn: "root"` pour un service unique.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine `DepensesService` et deux composants qui le reçoivent par injection. Montre qui crée le service et combien d'exemplaires existent.

> [!example] ⚖️ Avant / après
> Avant / après : un composant qui fait `new DepensesService()` lui-même, puis par injection. Dessine ce qui devient plus simple à tester.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Service et injection de dépendances » et je l'intègre ici avec `![[Schéma - Service et injection de dépendances.excalidraw]]`._

### Appliquer dans le fil rouge
- [[MesDépenses 10 - Angular, afficher la liste]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Composant Angular]] · [[Appeler une API avec fetch]]
- **Complémentaires** : [[Observable et RxJS]] · [[Pinia]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
