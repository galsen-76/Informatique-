---
type: howto
concepts:
  - "[[Docker]]"
  - "[[Conteneur]]"
  - "[[SQL]]"
tags:
  - fiche-pratique
---
# Fiche - Lancer PostgreSQL avec Docker

> [!info] Objectif
> Avoir une base PostgreSQL locale en une commande, sans rien installer d'autre que Docker.

## Étapes
1. Lancer le conteneur avec un volume pour garder les données :
   ```bash
   docker run -d --name pg-notes \
     -e POSTGRES_PASSWORD=dev -e POSTGRES_DB=notes \
     -p 5432:5432 -v pg-notes-data:/var/lib/postgresql/data \
     postgres:16
   ```
2. Vérifier qu'il tourne : `docker ps`.
3. Ouvrir une console SQL dans le conteneur :
   ```bash
   docker exec -it pg-notes psql -U postgres -d notes
   ```
4. Tester : `SELECT version();` puis `\q` pour quitter.

> [!success] Vérifier que ça marche
> `SELECT version();` affiche la version de PostgreSQL.

## Liens
- [[Docker]] · [[Conteneur]] · [[SQL]] · [[docker run]] · [[docker ps]] · [[SELECT]]
