---
type: exercise
status: a-faire
niveau: 3
difficulty: facile
concepts:
  - "[[Tag Git]]"
  - "[[Version sémantique (semver)]]"
  - "[[Changelog]]"
  - "[[Registre Docker]]"
  - "[[Règles d'un job GitLab (rules)]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 10 - Sortir une version

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Niveau :** 3 · **Étape précédente :** [[MesDépenses 09 - La CI de l'API]]
> **Notions :** [[Tag Git]] · [[Version sémantique (semver)]] · [[Changelog]] · [[Registre Docker]] · [[Règles d'un job GitLab (rules)]]

## Le but
Livrer une version identifiable : un numéro, une liste de ce qui a changé, et une image qui porte ce numéro. C'est ce qu'on te demandera pour savoir « ce qui tourne en ce moment ».

> [!tip] Au travail
> Savoir relier une image qui tourne à son commit et à sa version, c'est ce qui permet de répondre vite quand quelque chose casse en production.

## Ce que tu fais
- [ ] Choisis le numéro de ta première version et écris le `CHANGELOG.md`
- [ ] Pose un tag Git avec ce numéro et pousse-le
- [ ] Dans la CI, un job ne se lance que sur un tag : il publie l'image avec le numéro de version **et** `latest`
- [ ] Fais un petit correctif, puis un ajout : quel numéro donner à chaque fois ? Sors les deux versions
- [ ] Retrouve, à partir d'une image en cours d'exécution, de quel commit elle vient

> [!warning] Les pièges
> - `latest` ne dit pas quelle version tourne : ne compte jamais dessus pour déployer.
> - Un tag mal placé se corrige, mais pas après que d'autres l'ont récupéré.

> [!success] Ça marche si…
> Le registre contient trois images numérotées, le changelog décrit les trois versions, et tu sais dire de quel commit vient l'image qui tourne.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> `git tag -a`, `git push --tags`, la variable `CI_COMMIT_TAG` et `rules: - if: $CI_COMMIT_TAG`. Un label `org.opencontainers.image.revision` garde le commit dans l'image.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mon changelog et ma CI
