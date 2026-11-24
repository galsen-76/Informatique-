---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Pipeline GitLab CI]]"
  - "[[Runner GitLab]]"
  - "[[Variables CI-CD GitLab]]"
tags:
  - exercice
  - fil-rouge
---
# Fil rouge 05 - Première pipeline, les tests

> [!info] Où tu en es
> **Projet :** [[Projet fil rouge - Rapport de dossier]] · **Étape du parcours :** 5 · GitLab CI
> **Étape précédente :** [[Fil rouge 04 - Ranger le projet dans Git]]
> **Cours à avoir lus :** [[Cours - Maîtriser le fichier de pipeline GitLab]]
> **Notions validées par cette étape :** [[Pipeline GitLab CI]] · [[Runner GitLab]] · [[Variables CI-CD GitLab]]

## Le but
À chaque `git push`, GitLab lance **tout seul** les tests de l'application. Si un test échoue, la pipeline devient rouge.

## Ce que tu fais
- [ ] Écris un `.gitlab-ci.yml` avec un stage `test` et un job qui lance `pytest` dans une image Python
- [ ] Pousse, et regarde la pipeline dans GitLab : quel runner a pris le job, et dans quelle image a-t-il tourné ?
- [ ] Casse volontairement un test, pousse, lis le log du job et retrouve la ligne qui fait échouer le job
- [ ] Répare le test, pousse, la pipeline doit repasser au vert
- [ ] Affiche dans le log la branche et l'identifiant court du commit, sans les écrire en dur

> [!success] Ça marche si…
> Dans GitLab, la pipeline est **verte** quand les tests passent et **rouge** quand un test échoue, sans que tu aies rien lancé toi-même.

## Est-ce que j'ai compris ?
Réponds par écrit, en dessous, **sans regarder la solution**. Ensuite, demande à Claude de vérifier tes réponses.
1. Qui exécute réellement ton job : GitLab, ton PC, ou autre chose ? Où tourne-t-il ?
2. Comment GitLab sait-il qu'un job a échoué ? (Pense au code de sortie.)
3. D'où viennent les variables comme la branche ou le commit ? Faut-il les déclarer ?
4. Pourquoi le job doit-il réinstaller `pytest` à chaque fois ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Un job = un nom, un `stage`, une `image`, un `script`. Les variables prédéfinies de GitLab commencent par `CI_` : cherche celles de la branche et du commit dans la fiche [[Variables CI-CD GitLab]].

> [!question]- Solution
> ```yaml
> stages: [test]
>
> tests:
>   stage: test
>   image: python:3.12-slim
>   script:
>     - echo "Branche $CI_COMMIT_BRANCH, commit $CI_COMMIT_SHORT_SHA"
>     - pip install -r requirements.txt
>     - python -m pytest -q
> ```
> 1. Un **runner** (une machine de GitLab ou de ton entreprise) récupère le job et le lance dans un conteneur de l'image demandée.
> 2. Chaque ligne du `script` renvoie un code de sortie : `pytest` renvoie autre chose que `0` quand un test échoue, le job s'arrête en rouge.
> 3. GitLab les fournit à chaque job : ce sont des variables prédéfinies, rien à déclarer.
> 4. Chaque job démarre dans un conteneur neuf : rien n'est gardé d'un job à l'autre (sauf cache ou artefacts).

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
- [ ] Commit poussé sur GitLab
