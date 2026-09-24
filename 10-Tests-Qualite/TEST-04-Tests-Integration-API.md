---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - tests/integration
aliases:
  - "Tests d'Intégration d'API"
parent: "[[Tests et Qualité]]"
children: []
related_theory:
  - "[[NEST-11-Tests-NestJS|Tests NestJS]]"
  - "[[TEST-01-Pyramide-des-Tests|Pyramide des Tests]]"
related_snippets:
  - "[[04_Snippets/test-04-tests-integration-api]]"
related_projects: []
source: "https://testcontainers.com/"
---

# Tests d'Intégration d'API

> [!abstract] Introduction
> Les tests d'intégration vérifient que plusieurs briques fonctionnent ensemble réellement : endpoint HTTP + validation + service + vraie base de données, sans passer par un navigateur.

> [!warning]- Prérequis
> [[NEST-11-Tests-NestJS|Tests NestJS]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> it('crée puis relit un film', async () => {
>   const cree = await request(app.getHttpServer())
>     .post('/api/films').set('Authorization', `Bearer ${admin}`)
>     .send({ titre: 'Dune', annee: 2021 }).expect(201);
>   await request(app.getHttpServer()).get(`/api/films/${cree.body.id}`).expect(200)
>     .expect(res => expect(res.body.titre).toBe('Dune'));
> });
> ```

> [!example]- Analogie
> Tester que la prise, le câble et la lampe fonctionnent ensemble, pas seulement chaque pièce séparément.

> [!question]- Pourquoi l'utiliser ?
> La plupart des bugs sont aux jonctions : mapping DTO, requêtes SQL, contraintes, transactions, sérialisation.

> [!question]- Comment ça marche ?
> - BDD de test isolée : conteneur PostgreSQL (Testcontainers ou docker compose), migrations appliquées
> - Réinitialiser les données entre tests (transaction annulée, TRUNCATE, schéma par worker)
> - Fabriques de données (factories) pour créer des jeux de test lisibles
> - En CI : service `postgres` dans le job GitLab

> [!question]- Quand l'utiliser ?
> Chaque endpoint important, chaque requête non triviale, les règles d'autorisation.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Plus lents que les unitaires : ne pas y tester toutes les combinaisons de règles métier.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Testcontainers | Conteneurs Docker éphémères pour les tests |
| Factory | Fonction qui crée des données de test |
| Isolation | Chaque test ne dépend d'aucun autre |

---

## Points clés

- Vraie BDD, pas de mock de l'ORM
- Données réinitialisées entre tests
- Tester succès ET erreurs (400, 401, 403, 404, 409)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Tests qui partagent des données et échouent selon l'ordre

---

## Exemple minimal

```yaml
# .gitlab-ci.yml
test-api:
  image: node:22
  services: [postgres:17]
  variables:
    POSTGRES_DB: test
    POSTGRES_USER: test
    POSTGRES_PASSWORD: test
    DATABASE_URL: postgresql://test:test@postgres:5432/test
  script: [npm ci, npx prisma migrate deploy, npm run test:e2e]
```

> [!note] Ce que j'en retiens
> La CI démarre une vraie PostgreSQL jetable pour chaque pipeline.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Tests de contrat consommateur/fournisseur entre fronts et API

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Tests et Qualité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/test-04-tests-integration-api]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi ne pas mocker Prisma dans un test d'intégration ?

---

## Tâches

- [ ] #task Mettre en place la BDD de test et 5 tests d'intégration de l'API
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
