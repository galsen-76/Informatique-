---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/bdd/postgresql
aliases:
  - "PostgreSQL en Pratique"
parent: "[[Bases de Données]]"
related_theory:
  - "[[BDD-01-Fondamentaux-SGBD|Fondamentaux des Bases de Données]]"
  - "[[SEC-10-Gestion-des-Secrets|Gestion des Secrets]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/"
---

# PostgreSQL en Pratique

> [!abstract] En bref
> Les gestes du quotidien avec PostgreSQL : le lancer en local avec Docker, s'y connecter, explorer les tables, sauvegarder et restaurer. De quoi être autonome sur CinéTrack-API.

## Lancer PostgreSQL en local

```bash
docker run -d --name cinetrack-db \
  -e POSTGRES_USER=cinetrack -e POSTGRES_PASSWORD=motdepasse -e POSTGRES_DB=cinetrack \
  -p 5432:5432 -v cinetrack-data:/var/lib/postgresql/data \
  postgres:17
```

- `-v cinetrack-data:…` : les données survivent à la suppression du conteneur (voir [[DK-04-Volumes|Volumes]]).
- L'URL de connexion pour Prisma : `postgresql://cinetrack:motdepasse@localhost:5432/cinetrack`.

Plus tard, tout ça ira dans un `docker-compose.yml` avec l'API (voir [[DK-03-Docker-Compose|Docker Compose]]).

## Se connecter

| Outil | Pour |
|---|---|
| `psql` (terminal) | rapide, partout |
| **Outil Database d'IntelliJ** / **DBeaver** | explorer, écrire des requêtes avec autocomplétion |
| `npx prisma studio` | voir et modifier les données dans le navigateur |

```bash
docker exec -it cinetrack-db psql -U cinetrack -d cinetrack
```

## Les commandes `psql` utiles

| Commande | Rôle |
|---|---|
| `\l` | lister les bases |
| `\c cinetrack` | se connecter à une base |
| `\dt` | lister les tables |
| `\d "Review"` | voir la structure d'une table (colonnes, index, contraintes) |
| `\x` | affichage vertical (lignes larges) |
| `\timing` | afficher le temps de chaque requête |
| `\q` | quitter |

Les noms créés par Prisma sont en `PascalCase` : il faut des guillemets (`SELECT * FROM "Review";`), sauf si tu utilises `@@map("reviews")` dans le schéma.

## Sauvegarder et restaurer

```bash
# sauvegarde
docker exec cinetrack-db pg_dump -U cinetrack -Fc cinetrack > sauvegarde.dump

# restauration
docker exec -i cinetrack-db pg_restore -U cinetrack -d cinetrack --clean < sauvegarde.dump
```

En production, les sauvegardes sont **automatiques** (hébergeur ou tâche planifiée) et **testées** régulièrement : une sauvegarde qu'on n'a jamais restaurée n'est pas une sauvegarde.

## Les bonnes pratiques

| Pratique | Pourquoi |
|---|---|
| un utilisateur dédié par application, avec seulement les droits nécessaires | limiter les dégâts en cas de faille |
| la base jamais exposée sur Internet | seule l'API s'y connecte |
| un **pool** de connexions (Prisma le gère) | ouvrir une connexion coûte cher |
| `EXPLAIN ANALYZE` sur les requêtes lentes | voir [[BDD-04-Indexation-Performance\|Index]] |
| extensions utiles : `pg_trgm` (recherche approximative), `pgvector` (IA) | fonctionnalités en plus sans autre base |

## Pièges

- **Oublier le volume Docker** : `docker rm` et toutes tes données disparaissent.
- **Le port 5432 déjà utilisé** (un PostgreSQL installé sur la machine) : change le port (`-p 5433:5432`).
- **Travailler directement sur la base de production** : jamais sans sauvegarde et transaction.
