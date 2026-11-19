---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[API]]"
  - "[[API REST]]"
  - "[[CORS]]"
tags:
  - exercice
---
# Exercice — Distinguer API, API REST et CORS

> [!info] Objectif
> Savoir dire si quelque chose est une API, si elle est REST, et prévoir quand CORS va bloquer.
> Notions : [[API]] · [[API REST]] · [[CORS]]

## Consignes
### Partie 1 · API ou pas ?
- [ ] Pour chaque cas, dis si c'est une API et explique pourquoi en une phrase :
  1. `zipfile.ZipFile("archive.zip", "w")` en Python
  2. `GET https://api.github.com/users/galsen-76`
  3. La page web de GitHub que tu ouvres dans ton navigateur
  4. `POST /graphql` avec `{"query": "{ user { name } }"}`

### Partie 2 · REST ou pas ?
- [ ] Classe ces routes en « REST » ou « non REST », puis réécris les non REST à la façon REST :
  - `GET /taches`
  - `GET /getTacheById?id=7`
  - `POST /taches`
  - `POST /supprimerTache` avec `{"id": 7}`
  - `PATCH /taches/7`
  - `POST /api` avec `{"action": "listerTaches"}`
- [ ] Pour chaque route REST, donne le code de statut attendu en cas de succès

### Partie 3 · CORS va-t-il bloquer ?
- [ ] Une API tourne sur `http://localhost:3000` **sans** en-tête `Access-Control-Allow-Origin`. Pour chaque appel, prédis « marche » ou « bloqué par CORS » :
  1. `curl http://localhost:3000/taches`
  2. `fetch` depuis une page servie par `http://localhost:3000`
  3. `fetch` depuis une page servie par `http://localhost:5173`
  4. Un script Python `requests.get("http://localhost:3000/taches")`
  5. `fetch` depuis `https://localhost:3000` (attention au protocole)
- [ ] Vérifie au moins les cas 1 et 3 en vrai : lance une petite API, appelle-la avec curl puis depuis une page sur un autre port, lis l'erreur dans la console du navigateur
- [ ] Corrige le cas 3 côté serveur, en autorisant **seulement** l'origine de ta page

### Partie 4 · Avec tes mots
- [ ] Écris en trois phrases la différence entre API, API REST et CORS, sans regarder les fiches

> [!question]- Indice
> Partie 1 : une API, c'est un contrat qu'un **programme** utilise. Partie 2 : cherche un verbe dans l'URL ou dans le corps. Partie 3 : CORS ne concerne que le **JavaScript d'une page dans un navigateur**, et l'origine = protocole + domaine + port.

> [!question]- Solution
> **Partie 1**
> 1. Oui : l'API d'une bibliothèque Python (des fonctions et leurs paramètres).
> 2. Oui : une API web, et REST (ressource `users/galsen-76`, méthode GET).
> 3. Non : c'est une page faite pour un humain, pas un contrat pour un programme (même si elle utilise des API en coulisses).
> 4. Oui : une API web, mais pas REST (GraphQL : une seule URL, la demande est dans le corps).
>
> **Partie 2**
> | Route | REST ? | Version REST | Succès |
> | --- | --- | --- | --- |
> | `GET /taches` | oui | | `200` |
> | `GET /getTacheById?id=7` | non | `GET /taches/7` | `200` |
> | `POST /taches` | oui | | `201` |
> | `POST /supprimerTache` | non | `DELETE /taches/7` | `204` |
> | `PATCH /taches/7` | oui | | `200` |
> | `POST /api` + action | non | `GET /taches` | `200` |
>
> **Partie 3**
> 1. Marche : curl n'est pas un navigateur.
> 2. Marche : même origine.
> 3. Bloqué : port différent, donc autre origine.
> 4. Marche : Python n'est pas un navigateur.
> 5. Bloqué : `https` au lieu de `http`, donc autre origine (et ton API ne parle sans doute même pas HTTPS).
>
> Correction du cas 3 avec Express :
> ```js
> import express from "express";
> import cors from "cors";
> const app = express();
> app.use(cors({ origin: "http://localhost:5173" }));
> app.get("/taches", (req, res) => res.json([{ id: 1, nom: "Courses" }]));
> app.listen(3000);
> ```
>
> **Partie 4** (une formulation possible, à comparer avec la tienne)
> Une API est un contrat qui permet à un programme d'en utiliser un autre. Une API REST est une API web organisée en ressources manipulées avec les méthodes HTTP. CORS est une règle du navigateur qui décide si une page peut lire la réponse d'une API d'une autre origine.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
