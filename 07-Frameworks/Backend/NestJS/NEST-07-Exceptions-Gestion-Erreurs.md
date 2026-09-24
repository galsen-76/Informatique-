---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - backend/nestjs/erreurs
aliases:
  - "Exceptions et Gestion des Erreurs NestJS"
parent: "[[NestJS]]"
children: []
related_theory:
  - "[[JS-12-Erreurs-Debug-DevTools|Gestion des Erreurs et DevTools]]"
  - "[[MON-01-Logs|Logs]]"
related_snippets:
  - "[[04_Snippets/nest-07-exceptions-gestion-erreurs]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/exception-filters"
---

# Exceptions et Gestion des Erreurs NestJS

> [!abstract] Introduction
> Nest transforme les exceptions en réponses HTTP ; les exception filters personnalisent le format des erreurs et permettent de convertir les erreurs techniques (Prisma, réseau) en erreurs métier cohérentes.

> [!warning]- Prérequis
> [[NEST-03-Controllers|Controllers NestJS]]

---

## Théorie

> [!question]- C'est quoi ?
> Exceptions intégrées : `BadRequestException` (400), `UnauthorizedException` (401), `ForbiddenException` (403), `NotFoundException` (404), `ConflictException` (409), `UnprocessableEntityException` (422), `InternalServerErrorException` (500).
> ```typescript
> @Catch(Prisma.PrismaClientKnownRequestError)
> export class PrismaExceptionFilter implements ExceptionFilter {
>   catch(e: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
>     const res = host.switchToHttp().getResponse<Response>();
>     const map: Record<string, number> = { P2002: 409, P2025: 404 };
>     res.status(map[e.code] ?? 500).json({ statusCode: map[e.code] ?? 500, message: e.code === 'P2002' ? 'Valeur déjà utilisée' : 'Erreur base de données' });
>   }
> }
> ```

> [!example]- Analogie
> Le filtre d'exception est le service client : quelle que soit la panne en coulisse, il répond au client avec un message clair et poli, sans lui montrer l'atelier.

> [!question]- Pourquoi l'utiliser ?
> Réponses d'erreur homogènes pour le front, pas de fuite d'informations (stack traces, requêtes SQL), codes de statut justes.

> [!question]- Comment ça marche ?
> - Lever des exceptions explicites dans les services
> - Filtre global pour les erreurs inattendues : logger avec contexte, renvoyer 500 générique
> - Distinguer erreurs attendues (4xx, métier) et inattendues (5xx, bug/infra)

> [!question]- Quand l'utiliser ?
> Toujours : un filtre global + filtres ciblés (Prisma, librairies externes).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Attraper toutes les erreurs et répondre 200 masque les bugs.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Exception filter | Intercepte les exceptions et formate la réponse |
| Erreur métier | Règle fonctionnelle violée (4xx) |
| Erreur technique | Panne/bug (5xx) |

---

## Points clés

- Services lèvent des exceptions HTTP ou métier
- Jamais de stack trace dans la réponse en production
- Logger les 5xx avec un identifiant de corrélation
- Format d'erreur unique pour tous les fronts

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Renvoyer `err.message` brut d'une erreur SQL au client
> - Oublier de logger les erreurs 500

---

## Exemple minimal

```typescript
app.useGlobalFilters(new PrismaExceptionFilter());
// Réponse côté front : { statusCode: 409, message: "Valeur déjà utilisée" }
```

> [!note] Ce que j'en retiens
> Un email déjà pris devient un 409 compréhensible au lieu d'un 500 obscur.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Adopter le format Problem Details (RFC 9457) et un `traceId` renvoyé au client

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[NestJS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/nest-07-exceptions-gestion-erreurs]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle différence entre une 400 et une 500 du point de vue de la responsabilité ?

---

## Tâches

- [ ] #task Créer le filtre Prisma et un filtre global de logs
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
