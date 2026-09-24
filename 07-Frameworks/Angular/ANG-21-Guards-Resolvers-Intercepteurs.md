---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
tags:
  - frameworks/angular/guards-interceptors
aliases:
  - "Guards Resolvers et Intercepteurs Angular"
parent: "[[Angular]]"
children: []
related_theory:
  - "[[ANG-06-Routing|Routing Angular]]"
  - "[[ANG-09-HTTP-Communication-Serveur|HTTP & Communication Serveur Angular]]"
  - "[[SEC-03-Authentification-Sessions-JWT|Authentification Sessions vs JWT]]"
related_snippets:
  - "[[04_Snippets/ang-21-guards-resolvers-intercepteurs]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/routing/route-guards"
---

# Guards Resolvers et Intercepteurs Angular

> [!abstract] Introduction
> Les guards décident si une navigation est autorisée, les resolvers préchargent des données avant d'afficher une route, et les intercepteurs HTTP modifient toutes les requêtes (token, erreurs, loader).

> [!warning]- Prérequis
> [[ANG-06-Routing|Routing Angular]], [[ANG-09-HTTP-Communication-Serveur|HTTP & Communication Serveur Angular]]

---

## Théorie

> [!question]- C'est quoi ?
> Formes fonctionnelles modernes :
> ```typescript
> export const authGuard: CanActivateFn = () => {
>   const auth = inject(AuthService);
>   return auth.estConnecte() ? true : inject(Router).createUrlTree(['/login']);
> };
> export const filmResolver: ResolveFn<Film> = (route) =>
>   inject(FilmService).obtenir(Number(route.paramMap.get('id')));
> export const authInterceptor: HttpInterceptorFn = (req, next) => {
>   const token = inject(AuthService).token();
>   return next(token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req);
> };
> ```

> [!example]- Analogie
> Le guard est le vigile à l'entrée d'une salle, le resolver le serveur qui dresse la table avant que tu entres, l'intercepteur le service courrier qui tamponne automatiquement chaque lettre sortante.

> [!question]- Pourquoi l'utiliser ?
> Centraliser des règles transverses au lieu de les répéter dans chaque composant : sécurité de navigation, ajout du token, gestion globale des 401/500.

> [!question]- Comment ça marche ?
> ```typescript
> export const routes: Routes = [
>   { path: 'films/:id', component: FilmDetailComponent, resolve: { film: filmResolver } },
>   { path: 'admin', canActivate: [authGuard], loadChildren: () => import('./admin/admin.routes') },
> ];
> // app.config.ts
> provideHttpClient(withInterceptors([authInterceptor, erreurInterceptor]))
> ```
> Types de guards : `canActivate`, `canActivateChild`, `canDeactivate` (quitter un formulaire non sauvegardé), `canMatch` (choisir une route / éviter le chargement lazy).
> Avec `withComponentInputBinding()`, la donnée résolue arrive directement dans un `input()` du composant.

> [!question]- Quand l'utiliser ?
> Guards : authentification/autorisation côté UI. Resolvers : données indispensables à l'affichage. Intercepteurs : token, en-têtes, logs, retry, erreurs globales.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un guard front n'est PAS une sécurité : l'API doit TOUJOURS vérifier les droits. Un resolver lent bloque la navigation sans feedback → préférer souvent un affichage avec état de chargement.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Guard | Fonction qui autorise ou bloque une navigation |
| Resolver | Précharge les données d'une route |
| Intercepteur | Middleware appliqué à chaque requête HTTP |
| `UrlTree` | Redirection renvoyée par un guard |

---

## Points clés

- Formes fonctionnelles + `inject()` (les guards en classe sont dépréciés)
- Guard renvoie `boolean | UrlTree | Observable | Promise`
- L'ordre des intercepteurs compte
- Sécurité réelle = côté serveur

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Rediriger avec `router.navigate()` dans un guard au lieu de renvoyer un `UrlTree`
> - Intercepteur qui ajoute le token aussi aux appels vers des domaines tiers
> - Boucle infinie de refresh token dans un intercepteur 401

---

## Exemple minimal

```typescript
export const erreurInterceptor: HttpInterceptorFn = (req, next) => {
  const notif = inject(NotificationService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) router.navigate(['/login']);
      else if (err.status >= 500) notif.erreur('Le serveur ne répond pas, réessayez.');
      return throwError(() => err);
    }),
  );
};
```

> [!note] Ce que j'en retiens
> Un seul endroit pour gérer les 401 et 500 de toute l'application.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Implémenter un refresh token concurrent-safe (une seule requête de refresh partagée)
> - Utiliser `HttpContext` pour désactiver un intercepteur sur certaines requêtes

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[VUE-08-Vue-Router|Vue Router]]

**Pratique :**
- Extrait de code → [[04_Snippets/ang-21-guards-resolvers-intercepteurs]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un guard ne suffit-il pas à sécuriser des données ?

> [!faq]- Questions d'entretien
> - Comment ajouter un token JWT à toutes les requêtes ?

---

## Tâches

- [ ] #task Protéger la page « Mes favoris » avec un guard et ajouter l'intercepteur d'auth
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
