---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M09
tags:
  - backend/nestjs/auth
aliases:
  - "Authentification JWT NestJS"
parent: "[[NestJS]]"
children: []
related_theory:
  - "[[SEC-03-Authentification-Sessions-JWT|Authentification Sessions vs JWT]]"
  - "[[SEC-05-Hachage-Mots-de-Passe|Hachage des Mots de Passe]]"
  - "[[SEC-04-OAuth2-OpenID-Connect|OAuth2 et OpenID Connect]]"
related_snippets:
  - "[[04_Snippets/nest-10-authentification-jwt]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/security/authentication"
---

# Authentification JWT NestJS

> [!abstract] Introduction
> Mettre en place l'inscription, la connexion et la protection des routes : mots de passe hachés (argon2/bcrypt), tokens JWT signés (access court + refresh), guard global et décorateur `@Public()`.

> [!warning]- Prérequis
> [[SEC-03-Authentification-Sessions-JWT|Authentification Sessions vs JWT]], [[SEC-05-Hachage-Mots-de-Passe|Hachage des Mots de Passe]], [[NEST-06-Middleware-Guards-Interceptors|Middleware Guards et Interceptors NestJS]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> @Injectable()
> export class AuthService {
>   constructor(private users: UsersService, private jwt: JwtService) {}
>   async connexion(email: string, mdp: string) {
>     const user = await this.users.parEmail(email);
>     if (!user || !(await argon2.verify(user.hash, mdp))) throw new UnauthorizedException('Identifiants invalides');
>     const payload = { sub: user.id, role: user.role };
>     return { accessToken: await this.jwt.signAsync(payload, { expiresIn: '15m' }) };
>   }
> }
> @Injectable()
> export class JwtAuthGuard implements CanActivate {
>   constructor(private jwt: JwtService, private reflector: Reflector) {}
>   async canActivate(ctx: ExecutionContext) {
>     if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [ctx.getHandler(), ctx.getClass()])) return true;
>     const req = ctx.switchToHttp().getRequest();
>     const token = req.headers.authorization?.replace('Bearer ', '');
>     if (!token) throw new UnauthorizedException();
>     try { req.user = await this.jwt.verifyAsync(token); return true; }
>     catch { throw new UnauthorizedException(); }
>   }
> }
> ```

> [!example]- Analogie
> Le JWT est un bracelet de festival : délivré à l'entrée après contrôle d'identité, il est vérifiable par n'importe quel agent (signature) sans rappeler la billetterie, mais il expire et ne peut pas être « désactivé » facilement.

> [!question]- Pourquoi l'utiliser ?
> Protéger les routes, identifier l'utilisateur, autoriser selon son rôle ; les fronts Angular/Vue envoient le token via un intercepteur.

> [!question]- Comment ça marche ?
> ```mermaid
> sequenceDiagram
>   participant F as Front (Angular/Vue)
>   participant A as API Nest
>   F->>A: POST /auth/login {email, mdp}
>   A->>A: argon2.verify + signer JWT (15 min)
>   A-->>F: accessToken (+ refresh en cookie HttpOnly)
>   F->>A: GET /favoris  Authorization: Bearer <token>
>   A->>A: guard vérifie signature + expiration
>   A-->>F: 200 données
>   F->>A: POST /auth/refresh (cookie)
>   A-->>F: nouvel accessToken
> ```
> - Access token court (5-15 min) ; refresh token long, stocké en cookie `HttpOnly; Secure; SameSite`, rotaté et révocable (stocké haché en BDD)
> - Passport (`@nestjs/passport`) est une alternative classique aux guards écrits à la main

> [!question]- Quand l'utiliser ?
> API consommée par une SPA ou une app mobile. Pour une app d'entreprise avec SSO : OAuth2/OIDC (Keycloak, Entra ID) — le back valide alors des tokens émis par le fournisseur d'identité.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un JWT émis reste valide jusqu'à expiration (révocation difficile) → durée courte + refresh. Ne jamais mettre de données sensibles dans le payload (il est lisible, seulement signé).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| JWT | Jeton signé contenant des « claims » |
| Claim | Information du payload (`sub`, `exp`, `role`) |
| Access / refresh token | Jeton court d'accès / jeton long de renouvellement |
| argon2 / bcrypt | Algorithmes de hachage de mots de passe |

---

## Points clés

- Hacher les mots de passe (argon2id ou bcrypt), jamais chiffrer ni stocker en clair
- Access token court, refresh token rotaté en cookie HttpOnly
- Message d'erreur identique pour email inconnu / mauvais mot de passe
- Limiter les tentatives de connexion (rate limiting)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Secret JWT faible ou commité
> - Accepter l'algorithme `none` ou ne pas vérifier l'expiration
> - Stocker le refresh token dans localStorage
> - Renvoyer le hash du mot de passe dans `/me`

---

## Exemple minimal

```typescript
@Public() @Post('login') @Throttle({ default: { limit: 5, ttl: 60_000 } })
login(@Body() dto: LoginDto) { return this.auth.connexion(dto.email, dto.motDePasse); }

@Get('me') moi(@Req() req) { return this.users.profilPublic(req.user.sub); }
```

> [!note] Ce que j'en retiens
> Route publique limitée en débit ; toutes les autres sont protégées par défaut par le guard global.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Rotation des refresh tokens avec détection de réutilisation
> - Intégrer un IdP OIDC (Keycloak) plutôt que gérer soi-même les mots de passe

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[NestJS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-21-Guards-Resolvers-Intercepteurs|Guards Resolvers et Intercepteurs Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/nest-10-authentification-jwt]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un JWT est-il difficile à révoquer ?

> [!faq]- Questions d'entretien
> - Décrivez un flux d'authentification sécurisé pour une SPA.

---

## Tâches

- [ ] #task Implémenter register/login/me + intercepteur Angular et Vue côté front
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
