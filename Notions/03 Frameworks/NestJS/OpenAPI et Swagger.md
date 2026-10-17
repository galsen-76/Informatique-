---
type: notion
statut: a apprendre
resume: "OpenAPI est un format standard qui décrit toutes les routes d'une API : URL, paramètres, corps attendu, réponses."
revu:
sources:
  - "https://docs.nestjs.com/openapi/introduction"
---
# OpenAPI et Swagger

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : **OpenAPI** est un format standard qui décrit toutes les routes d'une API : URL, paramètres, corps attendu, réponses.

## Le problème

**Pourquoi c'est utile ?**
Pour décrire automatiquement toutes les routes de l'API et les tester dans le navigateur.

**Qu'est-ce qui se passait sans ça ?**
La documentation de l'API était écrite à la main, jamais à jour, et le front devinait les formats.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

NestJS peut le **générer depuis ton code**, avec une page **Swagger UI** pour explorer et tester l'API dans le navigateur. Bonus : on peut générer automatiquement un client typé pour Angular ou Vue.

### Mettre en place

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

### Ce que ça t'apporte

| Pour | Avantage |
|---|---|
| toi | tester les routes sans Postman |
| le front | savoir exactement quoi envoyer et quoi recevoir |
| l'équipe | une documentation toujours à jour (elle vient du code) |
| le recruteur | ton projet CinéTrack-API a une vraie doc en ligne |

### Générer un client typé pour le front

```bash
npx openapi-typescript http://localhost:3000/docs-json -o src/app/core/api/schema.d.ts
```

Les types des DTO sont alors disponibles côté Angular / Vue : si le back change un champ, le front ne compile plus → tu le vois tout de suite.

## 🧪 Exemple

### Documenter automatiquement les DTO

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

## ⚠️ Limites et pièges

- **Swagger ouvert en production** sur une API privée : réserve `/docs` au développement, ou protège-le.
- **Documenter à la main** ce que le plugin déduit déjà : du travail en double.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux NestJS]]
- **Voir aussi :** [[API REST]], [[Documentation technique]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.nestjs.com/openapi/introduction
