---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Pipeline GitLab CI]]"
  - "[[Runner GitLab]]"
  - "[[Construire une image dans la CI]]"
  - "[[Variables CI-CD GitLab]]"
  - "[[Règles d'un job GitLab (rules)]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 08 - La CI de l'API

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Étape précédente :** [[MesDépenses 07 - Tout lancer avec compose]]
> **Cours :** [[Cours - Maîtriser le fichier de pipeline GitLab]] · [[Cours - Construire et publier les images d'un projet avec GitLab CI]]
> **Notions :** [[Pipeline GitLab CI]] · [[Runner GitLab]] · [[Construire une image dans la CI]] · [[Kaniko]] · [[Registre Docker]] · [[Variables CI-CD GitLab]] · [[Règles d'un job GitLab (rules)]]
> **Fiches :** [[Fiche - Réflexes pour déboguer une pipeline]] · [[Bonnes pratiques - CI GitLab]]

## Le but
À chaque push, GitLab lance les tests de l'API, puis construit et publie son image. Rien ne se lance pour l'API si tu n'as touché qu'au front.

## Ce que tu fais
- [ ] Pousse le dépôt sur le GitLab de l'entreprise
- [ ] Écris un `.gitlab-ci.yml` avec un job `test-api` qui lance les tests `unittest` de l'API. Fais-le échouer exprès (casse un test), regarde la pipeline, puis répare
- [ ] Ajoute un job `build-api` qui construit l'image de l'API et la publie, avec le SHA du commit comme tag
- [ ] Le build ne doit se lancer que si les tests passent
- [ ] Les deux jobs ne se lancent que si un fichier de `api/` a changé. Vérifie avec un commit qui ne touche que le README de la racine
- [ ] Aucun identifiant dans le fichier : tout en variables CI/CD

> [!warning] Le piège
> Le runner n'a pas Internet en direct : `pip install`, l'image Python et l'outil de build doivent tous passer par le Nexus ou le proxy.

> [!success] Ça marche si…
> Une pipeline verte avec 2 jobs dans l'ordre, une image taguée par le SHA dans le registre, et aucun job API sur un commit qui ne touche pas `api/`.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> `stages` donne l'ordre. `rules: - changes:` filtre selon les fichiers modifiés. GitLab fournit déjà des variables comme `CI_COMMIT_SHORT_SHA`. Les tests se lancent depuis `api/` (voir son README).

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mon .gitlab-ci.yml
