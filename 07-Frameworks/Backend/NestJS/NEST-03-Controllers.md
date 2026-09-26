---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M08
tags:
  - backend/nestjs/controllers
aliases:
  - "Controllers NestJS"
parent: "[[NestJS]]"
related_theory:
  - "[[ARCH-04-API-REST-Design|API REST Design]]"
  - "[[NET-05-HTTP-Approfondi|HTTP Approfondi]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/controllers"
---

# Controllers NestJS

> [!abstract] En bref
> Un **controller** relie une route HTTP (`GET /movies/42`) à une méthode de ta classe. Il récupère ce qu'il faut dans la requête (paramètre d'URL, corps, utilisateur connecté), appelle le service, et renvoie le résultat. Il ne contient **pas** de logique métier.

## Les routes de CinéTrack-API

```ts
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviews: ReviewsService) {}

  @Get()                                               // GET /reviews?movieId=42&page=1
  findAll(@Query() query: ListReviewsQuery) {
    return this.reviews.findAll(query);
  }

  @Get(':id')                                          // GET /reviews/7
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviews.findOne(id);
  }

  @Post()                                              // POST /reviews
  @HttpCode(201)
  create(@Body() dto: CreateReviewDto, @CurrentUser() user: AuthUser) {
    return this.reviews.create(dto, user.id);
  }

  @Patch(':id')                                        // PATCH /reviews/7
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateReviewDto, @CurrentUser() user: AuthUser) {
    return this.reviews.update(id, dto, user.id);
  }

  @Delete(':id')                                       // DELETE /reviews/7
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthUser) {
    return this.reviews.remove(id, user.id);
  }
}
```

## Aide-mémoire

| Décorateur | Récupère | Exemple |
|---|---|---|
| `@Get()`, `@Post()`, `@Put()`, `@Patch()`, `@Delete()` | la méthode HTTP | `@Get(':id')` |
| `@Param('id')` | une partie de l'URL | `/reviews/7` → `'7'` |
| `@Query()` | les paramètres après `?` | `?page=2` |
| `@Body()` | le corps JSON | le formulaire envoyé |
| `@Headers('x')` | un en-tête | |
| `@HttpCode(201)` | le code de réponse | |
| `@CurrentUser()` | l'utilisateur connecté (décorateur maison, voir [[NEST-10-Authentification-JWT\|JWT]]) | |

`ParseIntPipe` convertit `'7'` en `7` et répond 400 si ce n'est pas un nombre.

## Les bons codes de réponse

| Action | Code |
|---|---|
| lire | 200 |
| créer | 201 (+ l'objet créé) |
| supprimer | 204 (sans contenu) |
| données invalides | 400 |
| pas connecté / pas le droit | 401 / 403 |
| introuvable | 404 |

Conception des routes (noms, pluriels, pagination) : [[ARCH-04-API-REST-Design|Design d'API REST]].

## Un controller « fin »

```ts
// ❌ logique métier dans le controller
@Post()
async create(@Body() dto: CreateReviewDto) {
  const movie = await this.prisma.movie.findUnique({ where: { id: dto.movieId } });
  if (!movie) throw new NotFoundException();
  const existing = await this.prisma.review.findFirst({ … });
  if (existing) throw new ConflictException();
  return this.prisma.review.create({ data: dto });
}

// ✅ le controller délègue
@Post()
create(@Body() dto: CreateReviewDto, @CurrentUser() user: AuthUser) {
  return this.reviews.create(dto, user.id);
}
```

## Pièges

- **Oublier `ParseIntPipe`** : `id` est un texte, et `findUnique({ where: { id } })` échoue.
- **Accepter `@Body() body: any`** : aucune validation. Toujours un DTO (voir [[NEST-05-DTO-Validation-Pipes|DTO]]).
- **Prendre l'`userId` dans le corps de la requête** : un utilisateur pourrait se faire passer pour un autre. Il vient toujours du jeton.
