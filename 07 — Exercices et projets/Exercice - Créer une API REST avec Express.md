---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[API REST]]"
  - "[[Express]]"
  - "[[Endpoint]]"
  - "[[JSON]]"
  - "[[HTTP]]"
  - "[[Middleware]]"
tags:
  - exercice
---
# Exercice — Créer une API REST avec Express

> [!info] Objectif
> Construire l'API CRUD d'une ressource `livres`, stockée en mémoire, et la tester avec `curl`.
> Cours : [[Cours - Construire une API REST avec Express]]

## Spécification
| Méthode | Route | Réponse attendue |
| --- | --- | --- |
| GET | `/livres` | `200` + liste |
| GET | `/livres/:id` | `200` + livre, ou `404` |
| POST | `/livres` | `201` + livre créé ; `400` si `titre` manque |
| PATCH | `/livres/:id` | `200` + livre modifié, ou `404` |
| DELETE | `/livres/:id` | `204`, ou `404` |

## Étapes
- [ ] Initialiser le projet ([[Fiche - Démarrer un projet Node.js]]) et installer Express
- [ ] Route `GET /livres`
- [ ] Route `GET /livres/:id` avec `404`
- [ ] Route `POST /livres` avec validation (`400`)
- [ ] Routes `PATCH` et `DELETE`
- [ ] Bonus : un [[Middleware]] `logger` qui affiche méthode et URL de chaque requête

## Tester
```bash
curl -i http://localhost:3000/livres
curl -i -X POST http://localhost:3000/livres -H "Content-Type: application/json" -d '{"titre":"Clean Code"}'
curl -i -X DELETE http://localhost:3000/livres/1
```

> [!question]- Indice : trouver un livre par id
> `req.params.id` est une chaîne : `livres.find(l => l.id === Number(req.params.id))`.

> [!question]- Solution : POST avec validation
> ```js
> app.post('/livres', (req, res) => {
>   if (!req.body.titre) return res.status(400).json({ error: 'titre requis' });
>   const livre = { id: Date.now(), titre: req.body.titre };
>   livres.push(livre);
>   res.status(201).json(livre);
> });
> ```

## Validation
- [ ] Tous les codes de statut du tableau sont respectés
- [ ] Je sais expliquer pourquoi `express.json()` est nécessaire
