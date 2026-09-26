---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - backend/nestjs/swagger
aliases:
  - "OpenAPI et Swagger NestJS"
parent: "[[NestJS]]"
related_theory:
  - "[[ARCH-04-API-REST-Design|API REST Design]]"
  - "[[METH-04-Documentation-Technique|Documentation Technique]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/openapi/introduction"
---

# OpenAPI et Swagger NestJS

> [!abstract] En bref
> **OpenAPI** est un format standard qui décrit toutes les routes d'une API : URL, paramètres, corps attendu, réponses. NestJS peut le **générer depuis ton code**, avec une page **Swagger UI** pour explorer et tester l'API dans le navigateur. Bonus : on peut générer automatiquement un client typé pour Angular ou Vue.

## Mettre en place

```bash
npm i @nestjs/swagger
```

```ts
// main.ts
const config = new DocumentBuilder()
  .setTitle('CinéTrack API')
  .setDescription('Films, critiques et favoris')
  .setVersion('1.0')
  .addBearerAuth()                      // bouton « Authorize » pour coller un jeton
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);    // http://localhost:3000/docs
```

Le fichier OpenAPI brut est disponible sur `/docs-json`.

## Documenter automatiquement les DTO

Dans `nest-cli.json`, le plugin lit tes DTO et leurs types sans que tu aies à tout annoter :

```json
{ "compilerOptions": { "plugins": ["@nestjs/swagger"] } }
```

Pour préciser :

```ts
export class CreateReviewDto {
  @ApiProperty({ example: 8, minimum: 1, maximum: 10 })
  @IsInt() @Min(1) @Max(10)
  rating!: number;
}

@ApiTags('reviews')
@ApiBearerAuth()
@Controller('reviews')
export class ReviewsController {
  @Post()
  @ApiCreatedResponse({ type: ReviewResponseDto })
  @ApiConflictResponse({ description: 'Critique déjà écrite pour ce film' })
  create(@Body() dto: CreateReviewDto) {}
}
```

## Ce que ça t'apporte

| Pour | Avantage |
|---|---|
| toi | tester les routes sans Postman |
| le front | savoir exactement quoi envoyer et quoi recevoir |
| l'équipe | une documentation toujours à jour (elle vient du code) |
| le recruteur | ton projet CinéTrack-API a une vraie doc en ligne |

## Générer un client typé pour le front

```bash
npx openapi-typescript http://localhost:3000/docs-json -o src/app/core/api/schema.d.ts
```

Les types des DTO sont alors disponibles côté Angular / Vue : si le back change un champ, le front ne compile plus → tu le vois tout de suite.

## Pièges

- **Swagger ouvert en production** sur une API privée : réserve `/docs` au développement, ou protège-le.
- **Documenter à la main** ce que le plugin déduit déjà : du travail en double.
