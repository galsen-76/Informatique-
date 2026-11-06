---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Pipeline GitLab CI]]"
  - "[[Variables CI-CD GitLab]]"
  - "[[Règles d'un job GitLab (rules)]]"
tags:
  - exercice
---
# Exercice — Première pipeline GitLab

> [!info] Objectif
> Écrire une pipeline à plusieurs stages qui décide elle-même quoi lancer.
> Notions : [[Pipeline GitLab CI]] · [[Variables CI-CD GitLab]] · [[Règles d'un job GitLab (rules)]]

## Consignes
- [ ] Dans un projet GitLab de test, écris un `.gitlab-ci.yml` à deux stages : `test` (`python --version`) et `build` (`echo build`)
- [ ] Affiche dans un job trois variables prédéfinies (commit, branche, dossier du projet)
- [ ] Ajoute une variable de projet **masquée** dans les paramètres et vérifie qu'elle apparaît `[MASKED]` dans le log
- [ ] Rends `build` automatique sur `main` et manuel ailleurs, sans bloquer la pipeline
- [ ] Fais échouer un job exprès (`exit 1`) et observe l'état des jobs suivants
- [ ] Utilise `needs` pour qu'un job démarre sans attendre tout le stage précédent

> [!question]- Indice
> Vérifie la syntaxe dans *Build > Pipeline editor*. `rules:` est lu de haut en bas, la première règle qui correspond décide.

> [!question]- Solution
> ```yaml
> stages: [test, build]
>
> test:
>   stage: test
>   image: python:3.12-slim
>   script:
>     - python --version
>     - echo "$CI_COMMIT_SHORT_SHA $CI_COMMIT_BRANCH $CI_PROJECT_DIR"
>     - echo "$MON_SECRET"
>
> build:
>   stage: build
>   needs: [test]
>   script: echo build
>   rules:
>     - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
>     - when: manual
>       allow_failure: true
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
