---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M08
tags:
  - backend/nestjs/validation
aliases:
  - "DTO et Validation NestJS"
parent: "[[NestJS]]"
children: []
related_theory:
  - "[[TS-19-Validation-Runtime-Zod|Validation runtime avec Zod]]"
  - "[[SEC-08-Injection-SQL-Validation|Injection SQL et Validation des Entrées]]"
related_snippets:
  - "[[04_Snippets/nest-05-dto-validation-pipes]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/techniques/validation"
---

# DTO et Validation NestJS

> [!abstract] Introduction
> Les DTO (Data Transfer Objects) décrivent la forme des données reçues ; combinés à `ValidationPipe` et class-validator, ils rejettent automatiquement toute requête invalide avant qu'elle n'atteigne le métier.

> [!warning]- Prérequis
> [[NEST-03-Controllers|Controllers NestJS]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> export class CreateFilmDto {
>   @IsString() @Length(1, 200)
>   titre: string;
>
>   @IsInt() @Min(1888) @Max(2100)
>   annee: number;
>
>   @IsOptional() @IsArray() @IsString({ each: true })
>   genres?: string[];
> }
> export class UpdateFilmDto extends PartialType(CreateFilmDto) {}
> ```

> [!example]- Analogie
> Le DTO est le formulaire officiel à remplir ; le ValidationPipe est l'agent au guichet qui refuse le dossier incomplet avant qu'il n'arrive au service instructeur.

> [!question]- Pourquoi l'utiliser ?
> Ne JAMAIS faire confiance aux données client : types, bornes, champs inattendus (mass assignment : un utilisateur qui envoie `role: "admin"`).

> [!question]- Comment ça marche ?
> `ValidationPipe` global avec :
> - `whitelist: true` : retire les propriétés non décorées
> - `forbidNonWhitelisted: true` : rejette la requête s'il y en a
> - `transform: true` : convertit les types (query string → number) et instancie le DTO
> Réponse automatique : 400 avec la liste des erreurs.
> Pipes intégrés : `ParseIntPipe`, `ParseUUIDPipe`, `ParseEnumPipe`, `DefaultValuePipe`.

> [!question]- Quand l'utiliser ?
> Tout body, query et param. DTO de sortie (ou sérialisation) pour ne pas exposer de champs sensibles.

> [!danger]- Quand NE PAS l'utiliser / Limites
> class-validator repose sur les décorateurs et les classes ; pour partager les règles avec le front, certains préfèrent Zod (nestjs-zod).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| DTO | Objet de transfert décrivant un payload |
| Pipe | Transforme/valide une entrée avant le handler |
| Mass assignment | Injection de champs non prévus dans un objet |
| `PartialType` | DTO dont tous les champs sont optionnels |

---

## Points clés

- `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })`
- Un DTO par cas d'usage (create, update, query)
- `PartialType`, `PickType`, `OmitType` (≈ utility types TS)
- DTO de sortie : ne jamais renvoyer le mot de passe

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `transform` → `@Query() page` reste une chaîne
> - Valider côté front uniquement
> - Utiliser l'entité Prisma comme DTO d'entrée

---

## Exemple minimal

```typescript
export class FiltresFilmsDto {
  @IsOptional() @IsString() q?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) taille = 20;
}
```

> [!note] Ce que j'en retiens
> Pagination validée et bornée : impossible de demander 1 million de lignes.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Uniformiser le format d'erreur (RFC 9457 « Problem Details »)
> - Partager des contrats front/back (OpenAPI → client généré)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[NestJS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-07-Formulaires|Formulaires Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/nest-05-dto-validation-pipes]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - À quoi sert `whitelist: true` ?

---

## Tâches

- [ ] #task Créer les DTO create/update/filtres de films avec tests des cas invalides
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
