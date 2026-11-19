---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Validation des données]]"
  - "[[Gestion des erreurs d'une API]]"
  - "[[CORS]]"
tags:
  - exercice
---
# Exercice — Rendre une API robuste

> [!info] Objectif
> Reprendre une API Express et la rendre sûre et prévisible face à de mauvaises requêtes.
> Notions : [[Validation des données]] · [[Gestion des erreurs d'une API]] · [[CORS]]

## Consignes
- [ ] Pars de l'API de l'[[Exercice - Créer une API REST avec Express]] (ou d'une route `POST /taches` minimale)
- [ ] Ajoute un schéma Zod pour `POST /taches` (`nom` 1 à 100 caractères, `priorite` dans une liste, `echeance` date optionnelle) ; réponds 400 avec les détails
- [ ] Crée une classe `ErreurApi` et un middleware d'erreur central ; toutes les erreurs ont la forme `{ erreur: { code, message } }`
- [ ] Une tâche inexistante donne 404, une exception imprévue donne 500 avec un message générique (et le détail dans la console)
- [ ] Envoie avec curl six requêtes invalides (JSON cassé, champ manquant, mauvais type…) et vérifie chaque code
- [ ] Crée une page sur un autre port qui appelle l'API avec fetch : observe l'erreur CORS, puis autorise seulement cette origine

> [!question]- Indice
> Le JSON cassé est rejeté par `express.json()` avant ta route : ton middleware d'erreur reçoit une erreur avec `err.type === "entity.parse.failed"` et `status` 400.

> [!question]- Solution
> ```js
> import express from "express";
> import cors from "cors";
> import { z } from "zod";
> const app = express();
> app.use(cors({ origin: "http://localhost:5173" }));
> app.use(express.json());
>
> class ErreurApi extends Error { constructor(s, c, m) { super(m); this.status = s; this.code = c; } }
> const taches = new Map();
> const Schema = z.object({ nom: z.string().min(1).max(100),
>   priorite: z.enum(["basse", "normale", "haute"]).default("normale"),
>   echeance: z.string().date().optional() });
>
> app.post("/taches", (req, res) => {
>   const r = Schema.safeParse(req.body);
>   if (!r.success) throw new ErreurApi(400, "DONNEES_INVALIDES", r.error.issues.map((i) => `${i.path}: ${i.message}`).join("; "));
>   const t = { id: taches.size + 1, ...r.data };
>   taches.set(t.id, t);
>   res.status(201).json(t);
> });
> app.get("/taches/:id", (req, res) => {
>   const t = taches.get(Number(req.params.id));
>   if (!t) throw new ErreurApi(404, "TACHE_INTROUVABLE", `La tâche ${req.params.id} n'existe pas`);
>   res.json(t);
> });
> app.use((req, res) => res.status(404).json({ erreur: { code: "ROUTE_INCONNUE", message: req.path } }));
> app.use((err, req, res, next) => {
>   const status = err.status ?? 500;
>   if (status >= 500) console.error(err);
>   res.status(status).json({ erreur: { code: err.code ?? (status === 400 ? "JSON_INVALIDE" : "ERREUR_INTERNE"),
>     message: status >= 500 ? "Erreur interne" : err.message } });
> });
> app.listen(3000);
> ```
> Express 5 transmet tout seul au middleware d'erreur les exceptions des routes (même `async`) ; en Express 4, il faut `next(err)` dans un `catch` pour les routes `async`.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
