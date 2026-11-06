---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Supervision et observabilité]]"
  - "[[Environnement de déploiement]]"
tags:
  - exercice
---
# Exercice — Superviser une application

> [!info] Objectif
> Rendre une application observable : santé, journaux structurés, métriques simples et alerte.
> Notions : [[Supervision et observabilité]] · [[Environnement de déploiement]]

## Consignes
- [ ] Ajoute à ton API un endpoint `/health` qui teste la base et répond 200 ou 503
- [ ] Remplace les `console.log` par des logs JSON (niveau, message, id de requête, durée) ; un middleware journalise chaque requête
- [ ] Ajoute un `HEALTHCHECK` au Dockerfile ; arrête la base et observe l'état `unhealthy` dans `docker ps`
- [ ] Ajoute un endpoint `/metrics` avec `prom-client` (nombre de requêtes par code, durée)
- [ ] Avec `docker compose`, lance Prometheus qui lit `/metrics`, puis Grafana ; affiche le taux de 5xx
- [ ] Écris une règle d'alerte : plus de 5 % de 5xx pendant 5 minutes
- [ ] Lance deux configurations (préprod et prod) de la même image avec des niveaux de log différents

> [!question]- Indice
> Middleware de log : note `Date.now()` au début, et écoute `res.on("finish", …)` pour journaliser le code et la durée.

> [!question]- Solution
> ```js
> import { randomUUID } from "node:crypto";
> import client from "prom-client";
> const requetes = new client.Counter({ name: "http_requetes_total", help: "Requêtes", labelNames: ["code"] });
> app.use((req, res, next) => {
>   const t0 = Date.now(), id = randomUUID();
>   res.on("finish", () => {
>     requetes.inc({ code: res.statusCode });
>     console.log(JSON.stringify({ niveau: "info", id, methode: req.method, chemin: req.path, code: res.statusCode, duree_ms: Date.now() - t0 }));
>   });
>   next();
> });
> app.get("/health", async (req, res) => {
>   try { await db.query("SELECT 1"); res.json({ statut: "ok" }); } catch { res.status(503).json({ statut: "ko" }); }
> });
> app.get("/metrics", async (req, res) => { res.type(client.register.contentType); res.send(await client.register.metrics()); });
> ```
> ```yaml
> # règle Prometheus
> - alert: TropDErreurs
>   expr: sum(rate(http_requetes_total{code=~"5.."}[5m])) / sum(rate(http_requetes_total[5m])) > 0.05
>   for: 5m
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
