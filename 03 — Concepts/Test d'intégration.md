---
type: concept
domain: tests
module: "[[Module 12 - Tests]]"
status: a-decouvrir
level: intermediaire
niveau: 3
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Test unitaire]]"
  - "[[API REST]]"
  - "[[SQL]]"
parents:
  - "[[Test automatisé]]"
related:
  - "[[Test de bout en bout]]"
  - "[[Pipeline GitLab CI]]"
next_review: 
tags:
  - concept
  - tests
---
# Test d'intégration

> [!info] En une phrase
> Un test d'intégration vérifie que plusieurs parties fonctionnent ensemble pour de vrai : une route d'API avec sa base de données, un script avec le système de fichiers.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Là où le test unitaire isole, le test d'intégration **assemble** : on lance l'API (sans la mettre sur un vrai port), avec une **vraie base de test**, et on lui envoie de vraies requêtes HTTP.
- Base jetable : un conteneur PostgreSQL lancé pour les tests (service de la CI, `docker compose`, ou **Testcontainers**), vidé entre les tests.
- Outils : **supertest** (Node/Express), le client de test de FastAPI ou Django, `pytest` avec des *fixtures*.
- On vérifie le code de statut, le corps, **et** l'effet en base.

### Pourquoi ça existe
Les briques testées séparément peuvent mal s'assembler : mauvaise requête SQL, mauvais format JSON, middleware oublié.

### Le problème résolu
Attraper les bugs de jonction, qui sont souvent ceux qui arrivent en production.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
T[Test] -->|HTTP| A[API]
  A --> B[(Base de test)]
  T -->|vérifie| B
```

### Exemple concret
```js
import request from "supertest";
import { app } from "../src/app.js";      // l'app Express, sans app.listen
beforeEach(async () => { await db.query("TRUNCATE tache RESTART IDENTITY CASCADE"); });
it("crée puis relit une tâche", async () => {
  const cree = await request(app).post("/taches").send({ nom: "Lot 1" }).expect(201);
  const lu = await request(app).get(`/taches/${cree.body.id}`).expect(200);
  expect(lu.body.nom).toBe("Lot 1");
});
it("refuse un nom vide", () => request(app).post("/taches").send({ nom: "" }).expect(400));
```
```yaml
# GitLab CI : une base pour les tests
test:
  image: node:22
  services: [postgres:16]
  variables: { POSTGRES_PASSWORD: test, DATABASE_URL: "postgresql://postgres:test@postgres/postgres" }
  script: [npm ci, npm test]
```

### Cas d'utilisation
- Routes d'API
- Accès à la base

> [!warning] À ne pas confondre
> Partager l'état entre tests (une tâche créée par un test, utilisée par le suivant) : l'ordre compte et tout casse au hasard. Chaque test prépare ses données.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine les pièces réunies par un test d'intégration de l'API : la route, l'ORM, une vraie base SQLite de test.

> [!example] 🔄 Change de contexte
> Place sur un même dessin un test unitaire, un test d'intégration et un test de bout en bout de ton application. Qu'est-ce que chacun touche ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Test d'intégration » et je l'intègre ici avec `![[Schéma - Test d'intégration.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[MesDépenses 08 - Tester l'API]]

## 4 · Relier
- **Au travail** : [[Test d'intégration au travail]]
- **Prérequis** : [[Test unitaire]] · [[API REST]] · [[SQL]]
- **Complémentaires** : [[Test de bout en bout]] · [[Pipeline GitLab CI]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
