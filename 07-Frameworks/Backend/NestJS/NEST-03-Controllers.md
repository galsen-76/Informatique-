---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M08
tags:
  - backend/nestjs/controllers
aliases:
  - "Controllers NestJS"
parent: "[[NestJS]]"
children: []
related_theory:
  - "[[ARCH-04-API-REST-Design|API REST Design]]"
  - "[[NET-05-HTTP-Approfondi|HTTP Approfondi]]"
related_snippets:
  - "[[04_Snippets/nest-03-controllers]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/controllers"
---

# Controllers NestJS

> [!abstract] Introduction
> Un controller associe des routes HTTP (méthode + chemin) à des méthodes de classe, extrait les données de la requête (params, query, body) et délègue au service.

> [!warning]- Prérequis
> [[NEST-02-Modules|Modules NestJS]], [[ARCH-04-API-REST-Design|API REST Design]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> @Controller('films')
> export class FilmsController {
>   constructor(private readonly films: FilmsService) {}
>
>   @Get()
>   lister(@Query() filtres: FiltresFilmsDto) { return this.films.lister(filtres); }
>
>   @Get(':id')
>   obtenir(@Param('id', ParseIntPipe) id: number) { return this.films.obtenir(id); }
>
>   @Post()
>   creer(@Body() dto: CreateFilmDto) { return this.films.creer(dto); }        // 201 par défaut
>
>   @Patch(':id')
>   modifier(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFilmDto) { return this.films.modifier(id, dto); }
>
>   @Delete(':id') @HttpCode(204)
>   supprimer(@Param('id', ParseIntPipe) id: number) { return this.films.supprimer(id); }
> }
> ```

> [!example]- Analogie
> Le controller est le réceptionniste d'un hôtel : il reçoit la demande, vérifie qu'elle est lisible, la transmet au bon service, et rend la réponse — il ne fait pas le ménage lui-même.

> [!question]- Pourquoi l'utiliser ?
> Séparer la couche HTTP (routes, statuts, format) de la logique métier réutilisable et testable.

> [!question]- Comment ça marche ?
> Décorateurs : `@Get @Post @Put @Patch @Delete`, `@Param`, `@Query`, `@Body`, `@Headers`, `@Req` (à éviter), `@HttpCode`, `@Header`. La valeur retournée est sérialisée en JSON automatiquement ; une Promise/Observable est attendue.
> Erreurs : lever `NotFoundException`, `BadRequestException`, `ConflictException`… → réponse HTTP adaptée.

> [!question]- Quand l'utiliser ?
> Un controller par ressource REST.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Utiliser `@Res()` désactive la gestion automatique des réponses par Nest (intercepteurs, sérialisation) : à éviter sauf streaming/fichiers.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Route | Couple méthode HTTP + chemin |
| Handler | Méthode qui traite une route |
| Paramètre de route | Partie variable de l'URL (`:id`) |
| Query string | Paramètres après `?` |

---

## Points clés

- Controllers fins, services épais
- Pipes de conversion (`ParseIntPipe`, `ParseUUIDPipe`)
- Exceptions HTTP intégrées
- Retourner des données, pas manipuler `res`

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Logique métier ou accès BDD dans le controller
> - Oublier `ParseIntPipe` → `id` est une string
> - Renvoyer l'entité complète avec le hash du mot de passe

---

## Exemple minimal

```typescript
async obtenir(id: number) {
  const film = await this.prisma.film.findUnique({ where: { id } });
  if (!film) throw new NotFoundException(`Film ${id} introuvable`);
  return film;
}
```

> [!note] Ce que j'en retiens
> Le service lève une exception métier ; Nest la transforme en réponse 404 JSON propre.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Versionner l'API (`/v1`), documenter chaque route avec Swagger
> - Pagination, tri et filtres standardisés

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[NestJS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[NODE-02-Express-Middleware|Express et Middleware]]

**Pratique :**
- Extrait de code → [[04_Snippets/nest-03-controllers]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi le controller ne doit-il pas contenir de requêtes Prisma ?

---

## Tâches

- [ ] #task Écrire le CRUD complet `/api/films`
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
