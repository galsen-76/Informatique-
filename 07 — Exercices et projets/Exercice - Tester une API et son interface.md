---
type: exercise
status: a-faire
difficulty: difficile
concepts:
  - "[[Test d'intégration]]"
  - "[[Test de bout en bout]]"
  - "[[Couverture de code]]"
tags:
  - exercice
---
# Exercice — Tester une API et son interface

> [!info] Objectif
> Mettre en place les trois niveaux de tests sur une petite application, puis les faire tourner dans une pipeline.
> Notions : [[Test d'intégration]] · [[Test de bout en bout]] · [[Couverture de code]]

## Consignes
- [ ] Sépare ton API Express en `app.js` (exporte `app`) et `server.js` (`app.listen`)
- [ ] Lance une base PostgreSQL de test avec Docker ; écris avec supertest les tests : créer (201), relire (200), nom vide (400), inexistant (404), en vidant la table avant chaque test
- [ ] Mesure la couverture et ajoute un test pour une branche non couverte
- [ ] Installe Playwright dans le frontend et écris un test : ouvrir la liste, ajouter une tâche, la voir apparaître
- [ ] Écris une pipeline `.gitlab-ci.yml` avec un job `test-api` (service `postgres:16`) et un job `e2e` (image `mcr.microsoft.com/playwright`)
- [ ] Fais échouer un test et vérifie que la pipeline s'arrête

> [!question]- Indice
> Dans la CI, le service PostgreSQL est joignable sous le nom d'hôte `postgres`.

> [!question]- Solution
> ```js
> import request from "supertest";
> import { app } from "../src/app.js";
> import { db } from "../src/db.js";
> beforeEach(() => db.query("TRUNCATE tache RESTART IDENTITY"));
> afterAll(() => db.end());
> it("crée et relit", async () => {
>   const { body } = await request(app).post("/taches").send({ nom: "Lot 1" }).expect(201);
>   await request(app).get(`/taches/${body.id}`).expect(200, { id: body.id, nom: "Lot 1", fini: false });
> });
> it("400 si nom vide", () => request(app).post("/taches").send({ nom: "" }).expect(400));
> it("404 si absent", () => request(app).get("/taches/999").expect(404));
> ```
> ```yaml
> stages: [test]
> test-api:
>   stage: test
>   image: node:22
>   services: [postgres:16]
>   variables: { POSTGRES_PASSWORD: test, DATABASE_URL: "postgresql://postgres:test@postgres:5432/postgres" }
>   script: [npm ci, npm run migrate, npx vitest run --coverage]
> e2e:
>   stage: test
>   image: mcr.microsoft.com/playwright:v1.48.0-jammy
>   script: [npm ci, npx playwright test]
>   artifacts: { when: on_failure, paths: [playwright-report/] }
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
