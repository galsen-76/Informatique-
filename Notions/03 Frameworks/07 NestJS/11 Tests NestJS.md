---
type: notion
statut: a apprendre
resume: "Une API se teste à deux niveaux principaux : les services en test unitaire (avec une fausse base de données), et les routes de bout en bout avec Supertest (une vraie requête HTTP sur l'API, avec une vraie base de test)."
revu:
sources:
  - "https://docs.nestjs.com/fundamentals/testing"
---
# Tests NestJS

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une API se teste à deux niveaux principaux : les **services** en test unitaire (avec une fausse base de données), et les **routes** de bout en bout avec **Supertest** (une vraie requête HTTP sur l'API, avec une vraie base de test).

## Le problème

**Pourquoi c'est utile ?**
Pour tester les services seuls et les routes de bout en bout.

**Qu'est-ce qui se passait sans ça ?**
On testait l'API à la main avec Postman après chaque modification.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Les deux ensemble te permettent de modifier le code sans peur.

### 1. Test unitaire d'un service

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

### 2. Test de bout en bout (e2e)

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

### La base de test

- Une base **séparée** (`cinetrack_test`), jamais celle de développement.
- Remise à zéro avant les tests (`prisma migrate reset --force`) et données de départ (seed).
- En CI : un service PostgreSQL dans le pipeline (voir [[05 Pipeline CI CD full stack|Pipeline full stack]]), ou des Testcontainers.

### Quoi tester

| Niveau | Quoi | Combien |
|---|---|---|
| Unitaire | règles métier des services, fonctions utilitaires | beaucoup |
| E2E | chaque route importante : cas normal, données invalides, pas connecté, pas le droit | un peu pour chaque route |

Méthode générale : [[01 Pyramide des tests|Pyramide des tests]].

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Tester avec la base de développement** : tu effaces tes données.
- **Oublier les cas d'erreur** : ce sont eux qui cassent en production (400, 401, 403, 404).
- **Oublier `ValidationPipe`** dans l'app de test : les tests passent alors qu'en vrai la validation est active (ou l'inverse).

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux NestJS|Fondamentaux NestJS]]
- **Voir aussi :** [[04 Tests d'intégration|Tests d'intégration]], [[03 Mocks et stubs|Mocks et stubs]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.nestjs.com/fundamentals/testing
