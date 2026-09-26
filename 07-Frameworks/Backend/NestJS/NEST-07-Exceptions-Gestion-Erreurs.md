---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - backend/nestjs/erreurs
aliases:
  - "Exceptions et Gestion des Erreurs NestJS"
parent: "[[NestJS]]"
related_theory:
  - "[[JS-12-Erreurs-Debug-DevTools|Gestion des Erreurs et DevTools]]"
  - "[[MON-01-Logs|Logs]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/exception-filters"
---

# Exceptions et Gestion des Erreurs NestJS

> [!abstract] En bref
> Dans NestJS, pour renvoyer une erreur au client, tu **lances une exception** : `throw new NotFoundException('Film introuvable')` devient automatiquement une réponse 404 en JSON. Un **filtre d'exception** permet de donner le même format à toutes les erreurs et de traduire les erreurs techniques (base de données) en messages compréhensibles.

## Les exceptions prêtes à l'emploi

| Exception | Code | Quand |
|---|---|---|
| `BadRequestException` | 400 | données incohérentes |
| `UnauthorizedException` | 401 | pas connecté, jeton invalide |
| `ForbiddenException` | 403 | connecté mais pas le droit |
| `NotFoundException` | 404 | ressource introuvable |
| `ConflictException` | 409 | déjà existant (e-mail déjà utilisé, critique déjà écrite) |
| `UnprocessableEntityException` | 422 | règle métier non respectée |
| `InternalServerErrorException` | 500 | erreur inattendue |

```ts
async update(id: number, dto: UpdateReviewDto, userId: number) {
  const review = await this.prisma.review.findUnique({ where: { id } });
  if (!review) throw new NotFoundException(`Critique ${id} introuvable`);
  if (review.userId !== userId) throw new ForbiddenException('Ce n\'est pas ta critique');
  return this.prisma.review.update({ where: { id }, data: dto });
}
```

Réponse reçue par le front :

```json
{ "statusCode": 403, "message": "Ce n'est pas ta critique", "error": "Forbidden" }
```

## Traduire les erreurs de la base

Sans rien faire, une contrainte d'unicité violée dans PostgreSQL donne une **erreur 500** incompréhensible. Un filtre la transforme :

```ts
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(e: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    const map: Record<string, [number, string]> = {
      P2002: [409, 'Cette ressource existe déjà'],          // unicité
      P2025: [404, 'Ressource introuvable'],                // enregistrement absent
      P2003: [400, 'Référence invalide'],                   // clé étrangère
    };
    const [status, message] = map[e.code] ?? [500, 'Erreur interne'];
    res.status(status).json({ statusCode: status, message });
  }
}

// main.ts
app.useGlobalFilters(new PrismaExceptionFilter());
```

## Les règles d'or

1. **Ne jamais renvoyer le détail technique au client** (message SQL, pile d'appels) : ça aide les attaquants. Écris-le dans les **logs**, pas dans la réponse.
2. **Un format d'erreur identique partout**, pour que le front puisse les afficher simplement.
3. **Les erreurs 500 doivent être rares** : chacune est un bug à corriger. Envoie-les dans un outil de suivi (voir [[MON-03-Tracing-Sentry-OpenTelemetry|Sentry]]).

## Côté front

L'intercepteur d'erreurs d'Angular (voir [[ANG-21-Guards-Resolvers-Intercepteurs|Intercepteurs]]) ou le client HTTP de Vue lit `statusCode` et `message` pour afficher le bon message.

## Pièges

- **Renvoyer un objet d'erreur** (`return { error: '…' }`) au lieu de lancer une exception : le code HTTP reste 200.
- **Attraper une erreur et l'ignorer** : le client croit que tout s'est bien passé.
- **401 et 403 confondus** : 401 = « je ne sais pas qui tu es », 403 = « je sais qui tu es, mais tu n'as pas le droit ».
