---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Reverse proxy]]"
tags:
  - exercice
---
# Exercice — CVAT derrière Traefik

> [!info] Objectif
> Comprendre comment Traefik dirige les requêtes vers les services de CVAT.
> Notions : [[Reverse proxy]]

## Consignes
- [ ] Lance CVAT en local avec docker compose et ouvre `http://localhost:8080`
- [ ] Ouvre-le avec `http://127.0.0.1:8080` : que se passe-t-il ? Pourquoi ?
- [ ] Dans le `docker-compose.yml`, retrouve les labels Traefik de `cvat_server` et `cvat_ui` et explique leur règle
- [ ] Relance CVAT avec `CVAT_HOST` égal à l'adresse IP de ton PC et ouvre-le depuis un autre appareil du réseau
- [ ] Explique la différence entre ce reverse proxy et le proxy de l'entreprise

> [!question]- Indice
> Les règles Traefik utilisent `Host(...)` : un nom d'hôte différent de `CVAT_HOST` ne correspond à aucune règle.

> [!question]- Solution
> Avec `127.0.0.1`, Traefik répond **404** : la règle attend `Host(localhost)` (valeur par défaut de `CVAT_HOST`).
> ```bash
> docker compose down
> export CVAT_HOST=192.168.1.20
> docker compose up -d
> ```
> `cvat_server` reçoit `Host(CVAT_HOST) && PathPrefix(/api/)…`, `cvat_ui` le reste. Le reverse proxy reçoit les visiteurs (entrant) ; le proxy d'entreprise fait sortir les requêtes vers Internet (sortant).

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
