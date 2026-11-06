---
type: exercise
status: a-faire
difficulty: difficile
concepts:
  - "[[Intégration et déploiement continus (CI-CD)]]"
  - "[[Linter et formateur]]"
  - "[[Environnement de déploiement]]"
tags:
  - exercice
---
# Exercice — Pipeline complète jusqu'au déploiement

> [!info] Objectif
> Écrire la pipeline d'un vrai petit projet, de la vérification du style au déploiement manuel, avec retour arrière.
> Notions : [[Intégration et déploiement continus (CI-CD)]] · [[Linter et formateur]] · [[Environnement de déploiement]]

## Consignes
- [ ] Prends ton script Python de zip (ou ton API) avec son Dockerfile et ses tests
- [ ] Ajoute ruff (ou ESLint/Prettier) et corrige le code
- [ ] Écris `.gitlab-ci.yml` avec les étapes `verifier` (lint, tests en parallèle), `construire` (image taguée avec `$CI_COMMIT_SHORT_SHA`, poussée dans le registre GitLab ou Nexus), `deployer`
- [ ] Job `preprod` automatique sur la branche par défaut avec `environment: preprod` ; job `prod` en `when: manual`
- [ ] Le déploiement peut être simulé : un script qui affiche la commande `docker run` qu'il lancerait avec la bonne image et la bonne configuration
- [ ] Ajoute un tag Git `v1.0.0` qui produit aussi une image `1.0.0`
- [ ] Explique par écrit comment tu reviendrais à la version précédente

> [!question]- Indice
> Tag d'image : `$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA` ; sur un tag Git, `$CI_COMMIT_TAG`. La règle : `rules: [{ if: $CI_COMMIT_TAG }]`.

> [!question]- Solution
> ```yaml
> stages: [verifier, construire, deployer]
> default: { image: python:3.12-slim }
> lint:  { stage: verifier, script: [pip install ruff, ruff check ., ruff format --check .] }
> tests: { stage: verifier, script: [pip install -r requirements.txt pytest, pytest] }
> image:
>   stage: construire
>   image: { name: gcr.io/kaniko-project/executor:debug, entrypoint: [""] }
>   script:
>     - DEST="--destination $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
>     - '[ -n "$CI_COMMIT_TAG" ] && DEST="$DEST --destination $CI_REGISTRY_IMAGE:${CI_COMMIT_TAG#v}"'
>     - /kaniko/executor --context . --dockerfile Dockerfile $DEST
>   rules: [{ if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH }, { if: $CI_COMMIT_TAG }]
> .deployer:
>   stage: deployer
>   script: ['echo "docker run -d --env-file /etc/app/$CI_ENVIRONMENT_NAME.env $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"']
> preprod: { extends: .deployer, environment: preprod, rules: [{ if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH }] }
> prod:    { extends: .deployer, environment: production, when: manual, rules: [{ if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH }] }
> ```
> Retour arrière : relancer le job `prod` d'une pipeline précédente (page *Environnements* de GitLab), qui redéploie l'image de ce commit, déjà construite et testée.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
