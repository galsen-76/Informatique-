---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - backend/nestjs/swagger
aliases:
  - "OpenAPI et Swagger NestJS"
parent: "[[NestJS]]"
children: []
related_theory:
  - "[[ARCH-04-API-REST-Design|API REST Design]]"
  - "[[METH-04-Documentation-Technique|Documentation Technique]]"
related_snippets:
  - "[[04_Snippets/nest-12-openapi-swagger]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/openapi/introduction"
---

# OpenAPI et Swagger NestJS

> [!abstract] Introduction
> OpenAPI est le standard de description d'une API REST ; `@nestjs/swagger` la génère à partir du code et fournit une interface Swagger UI pour explorer et tester l'API — et permet de générer des clients typés pour Angular/Vue.

> [!warning]- Prérequis
> [[NEST-03-Controllers|Controllers NestJS]], [[NEST-05-DTO-Validation-Pipes|DTO et Validation NestJS]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> const config = new DocumentBuilder().setTitle('CinéTrack API').setVersion('1.0').addBearerAuth().build();
> SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));
> ```
> ```typescript
> @ApiTags('films')
> @ApiOkResponse({ type: FilmDto, isArray: true })
> @Get() lister() {}
> ```

> [!example]- Analogie
> La spec OpenAPI est le menu détaillé d'un restaurant (plats, ingrédients, prix) : les clients (fronts) savent exactement quoi commander et ce qu'ils recevront.

> [!question]- Pourquoi l'utiliser ?
> Documentation toujours à jour, contrat clair front/back, test manuel rapide, génération de clients TypeScript (plus de types écrits à la main côté front).

> [!question]- Comment ça marche ?
> - Le plugin CLI Nest déduit les propriétés des DTO (moins de décorateurs `@ApiProperty`)
> - Génération de clients : `openapi-typescript`, `orval`, `openapi-generator` (services Angular ou fonctions pour Vue)
> - Export du JSON en CI pour détecter les changements cassants

> [!question]- Quand l'utiliser ?
> Toute API consommée par une autre équipe ou plusieurs fronts.

> [!danger]- Quand NE PAS l'utiliser / Limites
> La doc n'est juste que si les DTO et décorateurs le sont ; ne pas exposer Swagger publiquement en production sans réflexion.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| OpenAPI | Standard de description d'API REST (ex-Swagger) |
| Swagger UI | Interface web interactive de la spec |
| Client généré | Code d'appel produit depuis la spec |
| Breaking change | Modification incompatible du contrat |

---

## Points clés

- Documentation générée depuis le code
- Clients typés générés pour les fronts
- Détecter les breaking changes en CI

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Swagger public en production avec routes d'admin
> - Spec désynchronisée car DTO mal décorés

---

## Exemple minimal

```bash
npx openapi-typescript http://localhost:3000/api/docs-json -o src/app/api/schema.d.ts
```

> [!note] Ce que j'en retiens
> Le front obtient les types exacts de l'API en une commande.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Approche « contract-first » (spec écrite avant le code) pour les équipes séparées

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[NestJS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/nest-12-openapi-swagger]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi générer les types front depuis l'API plutôt que les écrire à la main ?

---

## Tâches

- [ ] #task Exposer /api/docs et générer le client pour CinéTrack Angular
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
