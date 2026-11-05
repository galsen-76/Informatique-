---
type: engineering
kind: technical-note
project: "[[Application SaaS]]"
domain: backend
created: 2026-11-03
tags:
  - tech
  - demo
---
# Authentification JWT

> [!info] Contexte
> Authentifier sans état serveur, avec des tokens courts et un refresh token.

## Solution
- Access token 15 min, refresh token 7 jours en cookie `httpOnly`
- Guard NestJS global + décorateur `@Public()`

```ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) { super(); }
  canActivate(ctx: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', ctx.getHandler());
    return isPublic ? true : super.canActivate(ctx);
  }
}
```

## Points d'attention
- Rotation des clés de signature
- Révocation des refresh tokens à la déconnexion
