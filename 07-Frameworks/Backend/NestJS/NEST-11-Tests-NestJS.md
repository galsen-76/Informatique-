---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - backend/nestjs/tests
aliases:
  - "Tests NestJS"
parent: "[[NestJS]]"
children: []
related_theory:
  - "[[TEST-04-Tests-Integration-API|Tests d'Intégration d'API]]"
  - "[[TEST-03-Mocks-Stubs-Spies|Mocks Stubs et Spies]]"
related_snippets:
  - "[[04_Snippets/nest-11-tests-nestjs]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/fundamentals/testing"
---

# Tests NestJS

> [!abstract] Introduction
> Tester une API Nest à trois niveaux : services en unitaire (dépendances mockées), controllers/modules en intégration, et endpoints de bout en bout avec Supertest sur une vraie base de test.

> [!warning]- Prérequis
> [[NEST-04-Providers-DI|Providers et Injection de Dépendances NestJS]], [[TEST-01-Pyramide-des-Tests|Pyramide des Tests]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> describe('FilmsService', () => {
>   let service: FilmsService;
>   const prisma = { film: { findUnique: vi.fn() } };
>   beforeEach(async () => {
>     const module = await Test.createTestingModule({
>       providers: [FilmsService, { provide: PrismaService, useValue: prisma }],
>     }).compile();
>     service = module.get(FilmsService);
>   });
>   it('lève NotFound si le film est absent', async () => {
>     prisma.film.findUnique.mockResolvedValue(null);
>     await expect(service.obtenir(42)).rejects.toThrow(NotFoundException);
>   });
> });
> ```

> [!example]- Analogie
> Test unitaire : tester le moteur sur un banc. Test e2e : faire un vrai tour de piste avec la voiture complète.

> [!question]- Pourquoi l'utiliser ?
> L'API est le contrat des fronts : une régression casse Angular ET Vue.

> [!question]- Comment ça marche ?
> - Unitaire : `Test.createTestingModule` + mocks (`useValue`), Jest (par défaut) ou Vitest
> - E2E : `app = module.createNestApplication()` puis `request(app.getHttpServer()).get('/api/films').expect(200)`
> - BDD de test : conteneur PostgreSQL (docker compose / Testcontainers), migrations appliquées, données réinitialisées entre tests
> - Tester statuts, validation (400), autorisations (401/403), cas limites

> [!question]- Quand l'utiliser ?
> Services : logique métier. E2E : chaque endpoint critique (auth, création, droits).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Mocker Prisma de façon trop fine teste l'implémentation ; pour l'accès données, préférer des tests d'intégration sur vraie BDD.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Supertest | Librairie pour tester des requêtes HTTP |
| Testcontainers | Démarre des conteneurs Docker pour les tests |
| Fixture | Données de test préparées |

---

## Points clés

- Unitaire pour le métier, e2e pour le contrat HTTP
- Vraie BDD pour tester les requêtes
- Tester les cas d'erreur et d'autorisation

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Tests e2e qui dépendent de l'ordre d'exécution (données partagées)
> - Tester uniquement le « happy path »

---

## Exemple minimal

```typescript
it('POST /api/films refuse un titre vide', () =>
  request(app.getHttpServer())
    .post('/api/films').set('Authorization', `Bearer ${tokenAdmin}`)
    .send({ titre: '', annee: 2010 })
    .expect(400));
```

> [!note] Ce que j'en retiens
> Un test e2e vérifie en une fois routing, guard, validation et format d'erreur.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Tests de contrat (Pact) entre fronts et API

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[NestJS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-14-Tests|Tests Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/nest-11-tests-nestjs]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi préférer une vraie BDD pour tester la couche données ?

---

## Tâches

- [ ] #task Écrire les tests e2e de /auth et /films
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
