---
type: project
status: a-faire
difficulty: moyen
concepts:
  - "[[Docker Compose]]"
  - "[[Port]]"
tags:
  - exercice
---
# Exercice — Une application avec docker compose

> [!abstract] Mise en situation
> Une application complète avec Compose.
> Elle mélange plusieurs notions : fais-la **après** les exercices de chacune. Elle ne compte pas dans la validation de la maîtrise.

> [!info] Objectif
> Décrire et lancer plusieurs services qui se parlent.
> Notions : [[Docker Compose]] · [[Port]]

## Consignes
- [ ] Écris un `compose.yaml` avec un service `db` (postgres) avec un volume nommé, et un service `outil` (`python:3.12-slim`, `command: sleep infinity`)
- [ ] Lance tout en arrière-plan et vérifie l'état
- [ ] Depuis `outil`, vérifie que `db` se résout par son nom
- [ ] Publie le port de la base sur ta machine et connecte-toi avec `psql` depuis WSL ou depuis le conteneur
- [ ] Arrête tout **sans** perdre les données, relance, vérifie qu'elles sont là
- [ ] Lis le `docker-compose.yml` de CVAT et liste ses services, leurs images et les ports publiés

> [!question]- Indice
> Voir [[docker compose up]]. `docker compose exec outil getent hosts db`. `down` garde les volumes, `down -v` les supprime.

> [!question]- Solution
> ```yaml
> services:
>   db:
>     image: postgres:16
>     environment:
>       POSTGRES_PASSWORD: dev
>     ports:
>       - "5432:5432"
>     volumes:
>       - db-data:/var/lib/postgresql/data
>   outil:
>     image: python:3.12-slim
>     command: sleep infinity
> volumes:
>   db-data:
> ```
> ```bash
> docker compose up -d && docker compose ps
> docker compose exec outil getent hosts db
> docker compose down && docker compose up -d   # données conservées
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
