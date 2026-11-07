---
type: project
status: a-faire
difficulty: moyen
concepts:
  - "[[Registre Docker]]"
  - "[[Variable de build Docker (ARG)]]"
  - "[[Nexus]]"
tags:
  - exercice
---
# Exercice — Registres, tags et ARG

> [!abstract] Mise en situation
> Construire, étiqueter et pousser une image comme dans un vrai projet.
> Elle mélange plusieurs notions : fais-la **après** les exercices de chacune. Elle ne compte pas dans la validation de la maîtrise.

> [!info] Objectif
> Nommer, taguer et pousser une image, et rendre son image de base paramétrable.
> Notions : [[Registre Docker]] · [[Variable de build Docker (ARG)]] · [[Nexus]]

## Consignes
- [ ] Décompose le nom complet de trois images (Docker Hub, ghcr.io, Nexus) : registre, chemin, nom, tag
- [ ] Ajoute `ARG BASE_IMAGE=python:3.12-slim` et `FROM ${BASE_IMAGE}` à ton Dockerfile
- [ ] Construis avec la valeur par défaut, puis avec `--build-arg BASE_IMAGE=python:3.11-slim`, et vérifie la version de Python
- [ ] Tague ton image avec une version précise et `latest`, et explique pourquoi `latest` n'est pas une version
- [ ] Si tu as accès au Nexus : connecte-toi, tire une image par le proxy, pousse la tienne dans le dépôt hosted

> [!question]- Indice
> Un `ARG` placé avant `FROM` sert dans `FROM`. Sans registre dans le nom, c'est Docker Hub (`docker.io/library/…`).

> [!question]- Solution
> ```dockerfile
> ARG BASE_IMAGE=python:3.12-slim
> FROM ${BASE_IMAGE}
> ```
> ```bash
> docker build -t mon-zipper:0.2.0 --build-arg BASE_IMAGE=python:3.11-slim .
> docker run --rm --entrypoint python mon-zipper:0.2.0 --version   # 3.11
> docker tag mon-zipper:0.2.0 mon-zipper:latest
> docker login nexus.mon-entreprise.com:8082
> docker tag mon-zipper:0.2.0 nexus.mon-entreprise.com:8083/equipe/mon-zipper:0.2.0
> docker push nexus.mon-entreprise.com:8083/equipe/mon-zipper:0.2.0
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
