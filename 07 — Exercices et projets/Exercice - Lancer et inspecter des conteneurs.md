---
type: project
status: a-faire
difficulty: facile
concepts:
  - "[[Docker]]"
  - "[[Démon Docker]]"
  - "[[Image Docker]]"
  - "[[Conteneur]]"
tags:
  - exercice
---
# Exercice — Lancer et inspecter des conteneurs

> [!abstract] Mise en situation
> Un tour complet du cycle de vie d'un conteneur.
> Elle mélange plusieurs notions : fais-la **après** les exercices de chacune. Elle ne compte pas dans la validation de la maîtrise.

> [!info] Objectif
> Comprendre en pratique client, démon, image et conteneur.
> Notions : [[Docker]] · [[Démon Docker]] · [[Image Docker]] · [[Conteneur]]

## Consignes
- [ ] Lance `docker version` avec Docker Desktop fermé puis ouvert, et explique la différence
- [ ] Télécharge `python:3.12-slim` et regarde ses couches avec `docker history`
- [ ] Lance un shell dedans (`-it --rm`), crée un fichier, sors, relance : le fichier est-il là ? Pourquoi ?
- [ ] Lance un conteneur qui sort avec le code 3 et retrouve ce code dans `docker ps -a`
- [ ] Lance `nginx` en arrière-plan, lis ses logs, entre dedans avec `docker exec`, puis supprime-le
- [ ] Fais le ménage et regarde la place libérée avec `docker system df`

> [!question]- Indice
> Sans démon : seul le bloc *Client* répond. Chaque `docker run` crée un **nouveau** conteneur à partir de l'image, qui n'a pas changé.

> [!question]- Solution
> ```bash
> docker pull python:3.12-slim && docker history python:3.12-slim
> docker run -it --rm python:3.12-slim bash     # touch /tmp/x ; exit → disparu au prochain run
> docker run --name ko python:3.12-slim python -c "import sys; sys.exit(3)"
> docker ps -a --filter name=ko                 # Exited (3)
> docker run -d --name web nginx && docker logs web && docker exec -it web sh
> docker rm -f web ko && docker system df
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
