---
type: exercise
status: a-faire
difficulty: difficile
concepts:
  - "[[Construire une image dans la CI]]"
  - "[[Kaniko]]"
  - "[[Tester l'image, pas le dépôt]]"
tags:
  - exercice
---
# Exercice — Construire et tester une image en CI

> [!info] Objectif
> Construire l'image de ton script dans GitLab, la pousser, puis lancer les tests dedans.
> Notions : [[Construire une image dans la CI]] · [[Kaniko]] · [[Tester l'image, pas le dépôt]]

## Consignes
- [ ] Demande à ton équipe si les runners sont privilégiés (Docker-in-Docker possible) ou s'il faut Kaniko
- [ ] Écris un job `build` qui construit et pousse l'image taguée avec `$CI_COMMIT_SHORT_SHA`
- [ ] Écris un job `test` qui tire cette image et lance `pytest` **dedans**
- [ ] Retire un fichier de la ligne `COPY` du Dockerfile : le test doit échouer alors que le fichier est dans le dépôt. Explique pourquoi
- [ ] Si le runner n'est pas privilégié, réécris le job `build` avec Kaniko

> [!question]- Indice
> Docker-in-Docker : `image: docker:24` + `services: [docker:24-dind]`. Kaniko : `image: gcr.io/kaniko-project/executor:debug` avec `entrypoint: [""]` et un fichier `/kaniko/.docker/config.json` pour l'authentification.

> [!question]- Solution
> ```yaml
> build:
>   stage: build
>   image: docker:24
>   services: [docker:24-dind]
>   script:
>     - echo "$CI_REGISTRY_PASSWORD" | docker login -u "$CI_REGISTRY_USER" --password-stdin "$CI_REGISTRY"
>     - docker build -t "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA" .
>     - docker push "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
>
> test:
>   stage: test
>   needs: [build]
>   image: docker:24
>   services: [docker:24-dind]
>   script:
>     - echo "$CI_REGISTRY_PASSWORD" | docker login -u "$CI_REGISTRY_USER" --password-stdin "$CI_REGISTRY"
>     - docker run --rm --entrypoint pytest "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA" -v
> ```
> Le test tourne dans l'image : un fichier absent de l'image est absent pour le test, même s'il est dans le dépôt.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
