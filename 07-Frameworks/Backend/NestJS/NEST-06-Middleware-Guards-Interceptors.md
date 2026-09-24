---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - backend/nestjs/pipeline
aliases:
  - "Middleware Guards et Interceptors NestJS"
parent: "[[NestJS]]"
children: []
related_theory:
  - "[[ANG-21-Guards-Resolvers-Intercepteurs|Guards Resolvers et Intercepteurs Angular]]"
  - "[[SEC-11-Autorisation-RBAC|Autorisation RBAC]]"
related_snippets:
  - "[[04_Snippets/nest-06-middleware-guards-interceptors]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/guards"
---

# Middleware Guards et Interceptors NestJS

> [!abstract] Introduction
> Nest découpe le traitement transverse d'une requête en briques spécialisées : middleware (bas niveau), guards (autoriser ?), interceptors (avant/après : logs, cache, transformation).

> [!warning]- Prérequis
> [[NEST-03-Controllers|Controllers NestJS]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> @Injectable()
> export class RolesGuard implements CanActivate {
>   constructor(private reflector: Reflector) {}
>   canActivate(ctx: ExecutionContext): boolean {
>     const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [ctx.getHandler(), ctx.getClass()]);
>     if (!roles) return true;
>     const { user } = ctx.switchToHttp().getRequest();
>     return roles.includes(user?.role);
>   }
> }
> export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
> // @Roles('admin') @Delete(':id') supprimer() {}
> ```

> [!example]- Analogie
> Middleware = portique de sécurité à l'entrée du bâtiment ; guard = badge qui ouvre (ou non) une porte précise ; interceptor = secrétaire qui note l'heure d'arrivée et de départ et met en forme le courrier sortant.

> [!question]- Pourquoi l'utiliser ?
> Ne pas répéter dans chaque handler : vérification des droits, logs, mesure de temps, format de réponse, cache, timeouts.

> [!question]- Comment ça marche ?
> | Brique | Rôle | Accès au handler ? |
> |---|---|---|
> | Middleware | Bas niveau (logs bruts, cookies, CORS) | Non |
> | Guard | Autoriser ou refuser (`true`/`false` → 403) | Oui (métadonnées) |
> | Interceptor | Avant/après (RxJS), transformer la réponse | Oui |
> | Pipe | Valider/transformer les arguments | Oui |
> | Exception filter | Formater les erreurs | Oui |
> Portée : globale (`app.useGlobal…` ou `APP_GUARD`), controller (`@UseGuards` sur la classe), route.

> [!question]- Quand l'utiliser ?
> Guards : authentification/autorisation. Interceptors : logging, cache, timeout, enveloppe de réponse, sérialisation.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Trop de magie transverse rend le flux difficile à suivre ; documenter les briques globales.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `ExecutionContext` | Contexte d'exécution (requête, handler, classe) |
| `Reflector` | Lit les métadonnées posées par décorateur |
| `SetMetadata` | Attache une métadonnée à une route |

---

## Points clés

- Guard = décision oui/non
- Interceptor = avant/après, basé sur RxJS
- Décorateurs custom + Reflector pour des règles déclaratives
- Enregistrer les guards globaux via `APP_GUARD` (DI disponible)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Faire de l'autorisation dans un middleware (pas d'accès aux métadonnées de la route)
> - Guard global d'auth qui bloque aussi `/login` → prévoir un décorateur `@Public()`

---

## Exemple minimal

```typescript
@Injectable()
export class DureeInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const req = ctx.switchToHttp().getRequest();
    const debut = Date.now();
    return next.handle().pipe(tap(() => this.logger.log(`${req.method} ${req.url} ${Date.now() - debut}ms`)));
  }
}
```

> [!note] Ce que j'en retiens
> `next.handle()` renvoie un Observable : on agit après la réponse avec des opérateurs RxJS, comme en Angular.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Composer auth globale + `@Public()` + `@Roles()` + politiques par ressource (propriétaire)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[NestJS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[NODE-02-Express-Middleware|Express et Middleware]]

**Pratique :**
- Extrait de code → [[04_Snippets/nest-06-middleware-guards-interceptors]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi l'autorisation se fait-elle dans un guard et pas un middleware ?

---

## Tâches

- [ ] #task Créer `@Public()`, un guard JWT global et un guard de rôles
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
