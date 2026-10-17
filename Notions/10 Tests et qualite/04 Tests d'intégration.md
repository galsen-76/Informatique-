---
type: notion
statut: a apprendre
resume: "Un test d'intégration vérifie que plusieurs pièces fonctionnent ensemble : la route, la validation, le guard, le service et la vraie base de données."
revu:
sources:
  - "https://testcontainers.com/"
---
# Tests d'intégration

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un **test d'intégration** vérifie que plusieurs pièces **fonctionnent ensemble** : la route, la validation, le guard, le service et la **vraie** base de données.

## Le problème

**Pourquoi c'est utile ?**
Pour vérifier que plusieurs pièces fonctionnent ensemble, avec de vraies requêtes et une vraie base de test.

**Qu'est-ce qui se passait sans ça ?**
Chaque pièce marchait seule, mais l'ensemble plantait : on ne le découvrait qu'en recette.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Pour une API, on envoie de vraies requêtes HTTP (avec **Supertest**) et on vérifie les réponses. C'est ce qui attrape les erreurs de branchement que les tests unitaires ne voient pas.

### Ce que ça attrape

| Bug | Test unitaire | Test d'intégration |
|---|---|---|
| mauvais calcul dans un service | ✅ | ✅ |
| `ValidationPipe` oublié | ❌ | ✅ |
| route non protégée par le guard | ❌ | ✅ |
| contrainte de base violée, migration manquante | ❌ | ✅ |
| requête Prisma incorrecte | ❌ | ✅ |

### Un test de route

```ts
describe('POST /reviews', () => {
  it('crée une critique (201)', async () => {
    const res = await request(app.getHttpServer())
      .post('/reviews')
      .set('Authorization', `Bearer ${tokenAwa}`)
      .send({ movieId: 27205, rating: 9, comment: 'Un chef-d\'œuvre absolu.' })
      .expect(201);

    expect(res.body).toMatchObject({ movieId: 27205, rating: 9 });
    expect(await prisma.review.count()).toBe(1);   // vérifier aussi en base
  });

  it('refuse une deuxième critique du même film (409)', async () => { /* … */ });
  it('refuse sans jeton (401)', () => request(app.getHttpServer()).post('/reviews').expect(401));
  it('refuse de modifier la critique de quelqu\'un d\'autre (403)', async () => { /* avec tokenMoussa */ });
});
```

### Les cas à couvrir pour chaque route

| Cas | Code attendu |
|---|---|
| normal | 200 / 201 / 204 |
| données invalides | 400 |
| sans jeton | 401 |
| jeton d'un autre utilisateur | 403 |
| ressource inexistante | 404 |
| doublon | 409 |

### Dans la CI

```yaml
test-api:
  image: node:22
  services:
    - name: postgres:17
      alias: db
  variables:
    POSTGRES_USER: test
    POSTGRES_PASSWORD: test
    POSTGRES_DB: cinetrack_test
    DATABASE_URL: postgresql://test:test@db:5432/cinetrack_test
  script:
    - npm ci
    - npx prisma migrate deploy
    - npm run test:e2e
```

Voir [[11 Tests NestJS|Tests NestJS]].

## 🧪 Exemple

### Une base de test propre

```yaml
# docker-compose.test.yml
services:
  db-test:
    image: postgres:17
    environment: { POSTGRES_USER: test, POSTGRES_PASSWORD: test, POSTGRES_DB: cinetrack_test }
    ports: ["5433:5432"]
```

```bash
DATABASE_URL=postgresql://test:test@localhost:5433/cinetrack_test npx prisma migrate reset --force
```

Avant chaque série de tests : base vidée, migrations appliquées, données de départ insérées. Chaque test crée les données **dont il a besoin**.

Alternative : **Testcontainers**, qui lance automatiquement un conteneur PostgreSQL le temps des tests.

## ⚠️ Limites et pièges

- **Utiliser la base de développement** : tu effaces tes données.
- **Des tests qui dépendent de l'ordre** (le test B utilise la critique créée par le test A).
- **Appeler la vraie API TMDB** : remplace-la par un faux (voir [[03 Mocks et stubs|Mocks]]).

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[11 Tests NestJS|Tests NestJS]], [[01 Pyramide des tests|Pyramide des tests]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://testcontainers.com/
