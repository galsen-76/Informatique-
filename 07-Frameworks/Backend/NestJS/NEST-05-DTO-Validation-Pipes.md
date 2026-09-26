---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M08
tags:
  - backend/nestjs/validation
aliases:
  - "DTO et Validation NestJS"
parent: "[[NestJS]]"
related_theory:
  - "[[TS-19-Validation-Runtime-Zod|Validation runtime avec Zod]]"
  - "[[SEC-08-Injection-SQL-Validation|Injection SQL et Validation des Entrées]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/techniques/validation"
---

# DTO Validation et Pipes NestJS

> [!abstract] En bref
> Un **DTO** (*Data Transfer Object*) décrit la forme des données que l'API accepte : « une critique a une note entre 1 et 10 et un commentaire d'au moins 10 caractères ». Avec `ValidationPipe`, NestJS **rejette automatiquement** toute requête qui ne respecte pas ces règles, avant même qu'elle n'atteigne ton code.

## Règle n°1 du back-end

> **Ne jamais faire confiance à ce qu'envoie le client.** Le front valide pour aider l'utilisateur ; le back valide pour **se protéger**.

N'importe qui peut envoyer une requête à ton API avec Postman ou `curl`, sans passer par ton formulaire.

## Écrire un DTO

```bash
npm i class-validator class-transformer
```

```ts
// reviews/dto/create-review.dto.ts
import { IsInt, Min, Max, IsString, MinLength, MaxLength, IsBoolean, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  movieId!: number;

  @IsInt() @Min(1) @Max(10)
  rating!: number;

  @IsString() @MinLength(10) @MaxLength(2000)
  comment!: string;

  @IsOptional() @IsBoolean()
  spoiler?: boolean;
}
```

```ts
// update-review.dto.ts : tous les champs deviennent optionnels
export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
```

## Activer la validation pour toute l'API

```ts
// main.ts
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,              // supprime les champs non déclarés dans le DTO
  forbidNonWhitelisted: true,   // …ou refuse la requête s'il y en a
  transform: true,              // convertit en instance du DTO et les types ('5' → 5)
}));
```

Si la requête est invalide, le client reçoit automatiquement :

```json
{
  "statusCode": 400,
  "message": ["rating must not be greater than 10", "comment must be longer than or equal to 10 characters"],
  "error": "Bad Request"
}
```

**`whitelist: true` est une protection importante** : sans lui, un utilisateur pourrait envoyer `{ "role": "admin" }` et, si ton code recopie le corps en base, devenir administrateur.

## Les validateurs courants

| Décorateur | Règle |
|---|---|
| `@IsString()`, `@IsInt()`, `@IsNumber()`, `@IsBoolean()` | type |
| `@IsEmail()`, `@IsUrl()`, `@IsUUID()` | format |
| `@MinLength(n)`, `@MaxLength(n)` | longueur |
| `@Min(n)`, `@Max(n)` | valeur |
| `@IsIn(['a-voir', 'vu'])` / `@IsEnum(Status)` | valeur dans une liste |
| `@IsOptional()` | peut être absent |
| `@IsArray()`, `@ValidateNested()` + `@Type(() => X)` | liste, objet imbriqué |

## Les pipes : transformer et valider un paramètre

| Pipe | Effet |
|---|---|
| `ParseIntPipe` | `'42'` → `42`, sinon 400 |
| `ParseUUIDPipe` | vérifie un UUID |
| `ParseBoolPipe` | `'true'` → `true` |
| `DefaultValuePipe(1)` | valeur par défaut |

```ts
@Get()
findAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number) {}
```

## DTO de réponse

Contrôle aussi ce que tu **renvoies** : ne renvoie jamais le mot de passe haché, les champs internes, etc. Soit tu choisis les champs dans la requête Prisma (`select`), soit tu construis un objet de réponse.

## Pièges

- **Oublier `ValidationPipe` global** : les décorateurs ne servent à rien.
- **Oublier `!` ou `?`** sur les propriétés : erreur TypeScript en mode strict.
- **Un DTO copié-collé du modèle Prisma** : le DTO décrit ce que le **client** a le droit d'envoyer, souvent bien moins (pas d'`id`, pas de `userId`, pas de `createdAt`).
