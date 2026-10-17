---
type: notion
statut: a apprendre
resume: "Certaines choses doivent se faire pour beaucoup de routes : noter chaque requête dans les logs, vérifier que l'utilisateur est connecté, mesurer le temps de réponse."
revu:
sources:
  - "https://docs.nestjs.com/guards"
---
# Middleware guards et interceptors NestJS

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Certaines choses doivent se faire pour **beaucoup de routes** : noter chaque requête dans les logs, vérifier que l'utilisateur est connecté, mesurer le temps de réponse.

## Le problème

**Pourquoi c'est utile ?**
Pour appliquer à beaucoup de routes la même chose : logs, contrôle d'accès, mesure du temps.

**Qu'est-ce qui se passait sans ça ?**
Le même code de vérification était recopié dans chaque route, et un oubli ouvrait une faille.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

NestJS propose des briques spécialisées pour ça, qui s'exécutent **autour** de tes controllers, dans un ordre précis.

### L'ordre de passage

```mermaid
flowchart LR
  R["Requête"] --> M["Middleware<br/>logs bruts"]
  M --> G["Guard<br/>a-t-il le droit ?"]
  G --> I1["Interceptor (avant)<br/>chrono"]
  I1 --> P["Pipe<br/>valide / convertit"]
  P --> C["Controller"]
  C --> I2["Interceptor (après)<br/>transforme la réponse"]
  I2 --> Rep["Réponse"]
  G -- "non" --> E["403"]
```

| Brique | Question | Usage typique |
|---|---|---|
| **Middleware** | — | log de chaque requête, en-têtes de sécurité (helmet), CORS |
| **Guard** | « a-t-il le droit de passer ? » | connecté ? admin ? |
| **Interceptor** | « que faire avant / après ? » | mesurer le temps, mettre en cache, reformater la réponse |
| **Pipe** | « les données sont-elles valides ? » | validation des DTO (voir DTO) |
| **Exception filter** | « comment présenter l'erreur ? » | format d'erreur uniforme (voir Exceptions) |

### Interceptor : avant et après

```ts
@Injectable()
export class TimingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(ctx: ExecutionContext, next: CallHandler) {
    const req = ctx.switchToHttp().getRequest();
    const start = Date.now();
    return next.handle().pipe(                                  // next.handle() = le controller
      tap(() => this.logger.log(`${req.method} ${req.url} ${Date.now() - start} ms`)),
    );
  }
}
```

### Middleware

```ts
// main.ts
app.use(helmet());                        // en-têtes de sécurité
app.enableCors({ origin: ['http://localhost:4200', 'https://cinetrack.fr'] });
```

### Où les brancher

| Portée | Comment |
|---|---|
| toute l'API | `app.useGlobalGuards(…)` dans `main.ts`, ou `{ provide: APP_GUARD, useClass: … }` dans un module (permet l'injection) |
| un controller | `@UseGuards(RolesGuard)` sur la classe |
| une route | `@UseGuards(…)` / `@UseInterceptors(…)` sur la méthode |

## 🧪 Exemple

### Guard : autoriser ou refuser

```ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());
    if (!roles) return true;                                   // route sans rôle exigé
    const user = ctx.switchToHttp().getRequest().user;         // ajouté par le guard JWT
    return roles.includes(user?.role);
  }
}

// un décorateur pour marquer les routes
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Delete(':id')
@Roles('admin')
remove(@Param('id', ParseIntPipe) id: number) {}
```

Le guard d'authentification JWT : [[10 Authentification JWT NestJS|Authentification JWT]]. Les rôles et permissions : [[03 Authentification vs autorisation|Autorisation]].

## ⚠️ Limites et pièges

- **Mettre la vérification des droits dans un middleware** : il ne sait pas quelle route va être appelée. Utilise un guard.
- **L'ordre d'exécution** : un guard passe **avant** les pipes, donc les données ne sont pas encore validées dans un guard.
- **Oublier une route** : protège **tout par défaut** (guard global) et marque les exceptions comme publiques.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux NestJS|Fondamentaux NestJS]]
- **Voir aussi :** [[14 Guards resolvers et intercepteurs Angular|Guards resolvers et intercepteurs Angular]], [[03 Authentification vs autorisation|Authentification vs autorisation]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.nestjs.com/guards
