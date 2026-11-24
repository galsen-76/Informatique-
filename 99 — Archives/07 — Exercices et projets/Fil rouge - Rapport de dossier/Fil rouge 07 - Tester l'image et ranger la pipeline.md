---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Tester l'image, pas le dépôt]]"
  - "[[Artefacts GitLab CI]]"
  - "[[Règles d'un job GitLab (rules)]]"
  - "[[extends GitLab CI]]"
tags:
  - exercice
  - fil-rouge
---
# Fil rouge 07 - Tester l'image et ranger la pipeline

> [!info] Où tu en es
> **Projet :** [[Projet fil rouge - Rapport de dossier]] · **Étape du parcours :** 5 · GitLab CI
> **Étape précédente :** [[Fil rouge 06 - Construire l'image dans la CI]]
> **Cours à avoir lus :** [[Cours - Maîtriser le fichier de pipeline GitLab]] · [[Cours - Construire et publier les images d'un projet avec GitLab CI]]
> **Notions validées par cette étape :** [[Tester l'image, pas le dépôt]] · [[Artefacts GitLab CI]] · [[Règles d'un job GitLab (rules)]] · [[extends GitLab CI]]

## Le but
Vérifier que **l'image construite** marche vraiment, garder son rapport comme preuve, et rendre la pipeline plus intelligente : certains jobs seulement sur `main` ou sur un tag, sans répéter la même configuration.

## Ce que tu fais
- [ ] Ajoute un stage `verif` : un job qui lance **l'image construite** sur `exemple/` et vérifie que le rapport contient le bon total
- [ ] Garde le `rapport.json` produit comme artefact, téléchargeable depuis GitLab pendant une semaine
- [ ] Fais en sorte que la publication avec le nom du tag ne tourne **que** sur un tag Git, et ajoute un job de publication `latest` qui ne se lance qu'à la main, sur `main`
- [ ] Les jobs qui utilisent Docker répètent les mêmes lignes : factorise-les dans un modèle de job caché, et fais-en hériter les jobs
- [ ] Pousse une branche de test et un tag `v0.2.0` : vérifie que chaque pipeline lance bien les bons jobs

> [!success] Ça marche si…
> Sur une branche : tests + build + vérif. Sur `main` : en plus, un bouton pour publier `latest`. Sur un tag : l'image publiée avec le nom du tag. Et le rapport est téléchargeable depuis le job de vérif.

## Est-ce que j'ai compris ?
Réponds par écrit, en dessous, **sans regarder la solution**. Ensuite, demande à Claude de vérifier tes réponses.
1. Pourquoi tester l'image construite, alors que les tests du dépôt passent déjà au stage `test` ? Donne un bug que seul le test de l'image attraperait.
2. Où va un artefact, combien de temps reste-t-il, et en quoi est-il différent d'un cache ?
3. Qu'est-ce qui décide si un job apparaît dans une pipeline ? Que veut dire `when: manual` ?
4. Qu'apporte `extends` par rapport à un copier-coller ? Que se passe-t-il si le job enfant redéfinit une clé ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Le job de vérif lance `$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA` comme **image** du job. Un modèle caché commence par un point (`.docker:`). Les règles se lisent dans l'ordre : `if: $CI_COMMIT_TAG`, `if: $CI_COMMIT_BRANCH == "main"`.

> [!question]- Solution
> ```yaml
> stages: [test, build, verif, publier]
>
> .docker:
>   image: docker:27
>   services: [docker:27-dind]
>   before_script:
>     - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" "$CI_REGISTRY"
>
> tests:
>   stage: test
>   image: python:3.12-slim
>   script:
>     - pip install -r requirements.txt
>     - python -m pytest -q
>
> construire:
>   extends: .docker
>   stage: build
>   script:
>     - docker build -t "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA" .
>     - docker push "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
>
> verifier-image:
>   stage: verif
>   image: "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
>   variables: { SORTIE: "$CI_PROJECT_DIR/sortie" }
>   script:
>     - python /app/app.py "$CI_PROJECT_DIR/exemple"
>     - python -c "import json; r=json.load(open('sortie/rapport.json')); assert r['total'] > 0, r"
>   artifacts:
>     paths: [sortie/rapport.json]
>     expire_in: 1 week
>
> publier-version:
>   extends: .docker
>   stage: publier
>   rules:
>     - if: $CI_COMMIT_TAG
>   script:
>     - docker pull "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
>     - docker tag "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA" "$CI_REGISTRY_IMAGE:$CI_COMMIT_TAG"
>     - docker push "$CI_REGISTRY_IMAGE:$CI_COMMIT_TAG"
>
> publier-latest:
>   extends: .docker
>   stage: publier
>   rules:
>     - if: $CI_COMMIT_BRANCH == "main"
>       when: manual
>   script:
>     - docker pull "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
>     - docker tag "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA" "$CI_REGISTRY_IMAGE:latest"
>     - docker push "$CI_REGISTRY_IMAGE:latest"
> ```
> (Pense à commiter `exemple/` avec quelques fichiers vides, sinon le dossier n'existe pas dans la CI : Git ne garde pas les dossiers vides.)
> 1. Les tests du dépôt testent le **code** ; l'image peut être cassée autrement : fichier oublié par le `.dockerignore`, mauvais `CMD`, dépendance absente. Seul le test de l'image le voit.
> 2. Un artefact est **un résultat** gardé par GitLab, téléchargeable et transmis aux stages suivants, pour la durée choisie. Un cache sert seulement à accélérer (dépendances), sans garantie.
> 3. Les `rules`, lues dans l'ordre : la première qui correspond décide. Sans règle qui correspond, le job n'apparaît pas. `when: manual` = un bouton à cliquer.
> 4. Une seule définition à maintenir ; le job enfant garde ce qu'il redéfinit (ses clés remplacent celles du modèle, les listes ne se fusionnent pas).

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
- [ ] Commit poussé sur GitLab
