---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - backend/nestjs/tests
aliases:
  - "Tests NestJS"
parent: "[[NestJS]]"
related_theory:
  - "[[TEST-04-Tests-Integration-API|Tests d'Intégration d'API]]"
  - "[[TEST-03-Mocks-Stubs-Spies|Mocks Stubs et Spies]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/fundamentals/testing"
---

# Tests NestJS

> [!abstract] En bref
> Une API se teste à deux niveaux principaux : les **services** en test unitaire (avec une fausse base de données), et les **routes** de bout en bout avec **Supertest** (une vraie requête HTTP sur l'API, avec une vraie base de test). Les deux ensemble te permettent de modifier le code sans peur.

## 1. Test unitaire d'un service

On remplace Prisma par un **faux** qui renvoie ce qu'on veut :

```ts
describe('ReviewsService', () => {
  let service: ReviewsService;
  const prisma = {
    review: { findUnique: vi.fn(), update: vi.fn() },
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ReviewsService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = moduleRef.get(ReviewsService);
    vi.clearAllMocks();
  });

  it('refuse de modifier la critique d\'un autre utilisateur', async () => {
    prisma.review.findUnique.mockResolvedValue({ id: 1, userId: 99 });

    await expect(service.update(1, { rating: 5 }, 42)).rejects.toThrow(ForbiddenException);
    expect(prisma.review.update).not.toHaveBeenCalled();
  });

  it('renvoie 404 si la critique n\'existe pas', async () => {
    prisma.review.findUnique.mockResolvedValue(null);
    await expect(service.update(1, {}, 42)).rejects.toThrow(NotFoundException);
  });
});
```

Rapide (quelques millisecondes), idéal pour les **règles métier** : droits, calculs, cas limites.

## 2. Test de bout en bout (e2e)

Une vraie requête HTTP sur l'API complète :

```ts
describe('Reviews (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    const res = await request(app.getHttpServer())
      .post('/auth/login').send({ email: 'test@cinetrack.fr', password: 'Motdepasse123!' });
    token = res.body.accessToken;
  });

  afterAll(() => app.close());

  it('POST /reviews refuse une note de 11', () =>
    request(app.getHttpServer())
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send({ movieId: 1, rating: 11, comment: 'Superbe film vraiment' })
      .expect(400));

  it('POST /reviews sans jeton renvoie 401', () =>
    request(app.getHttpServer()).post('/reviews').send({}).expect(401));
});
```

Ces tests vérifient que **tout est bien branché** : validation, guard, base de données.

## La base de test

- Une base **séparée** (`cinetrack_test`), jamais celle de développement.
- Remise à zéro avant les tests (`prisma migrate reset --force`) et données de départ (seed).
- En CI : un service PostgreSQL dans le pipeline (voir [[CICD-02-Pipeline-Full-Stack|Pipeline full stack]]), ou des Testcontainers.

## Quoi tester

| Niveau | Quoi | Combien |
|---|---|---|
| Unitaire | règles métier des services, fonctions utilitaires | beaucoup |
| E2E | chaque route importante : cas normal, données invalides, pas connecté, pas le droit | un peu pour chaque route |

Méthode générale : [[TEST-01-Pyramide-des-Tests|Pyramide des tests]].

## Pièges

- **Tester avec la base de développement** : tu effaces tes données.
- **Oublier les cas d'erreur** : ce sont eux qui cassent en production (400, 401, 403, 404).
- **Oublier `ValidationPipe`** dans l'app de test : les tests passent alors qu'en vrai la validation est active (ou l'inverse).
