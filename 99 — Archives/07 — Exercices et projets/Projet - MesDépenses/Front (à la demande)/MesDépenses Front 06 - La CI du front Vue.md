---
type: exercise
status: a-faire
niveau: 6
difficulty: moyen
concepts:
  - "[[Pipeline GitLab CI]]"
  - "[[extends GitLab CI]]"
  - "[[Artefacts GitLab CI]]"
  - "[[Tester l'image, pas le dépôt]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 09 - La CI du front Vue

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Étape précédente :** [[MesDépenses 09 - La CI de l'API]]
> **Cours :** [[Cours - Construire et publier les images d'un projet avec GitLab CI]]
> **Notions :** [[Pipeline GitLab CI]] · [[extends GitLab CI]] · [[Artefacts GitLab CI]] · [[Tester l'image, pas le dépôt]] · [[Principes DRY, KISS et YAGNI]]
> **Fiches :** [[Fiche - Réflexes pour déboguer une pipeline]] · [[Bonnes pratiques - CI GitLab]]

## Le but
Le front Vue a sa propre partie de pipeline : il est construit, son image est publiée, et le fichier de CI ne se répète pas entre l'API et le front.

## Ce que tu fais
- [ ] Ajoute un job qui vérifie que le front se construit (`npm ci` puis `npm run build`). Casse exprès une ligne TypeScript, regarde le job échouer, répare
- [ ] Ajoute le job qui construit et publie l'image du front Vue
- [ ] Ton job `build-api` et ton job `build-front-vue` se ressemblent : mets la partie commune dans un job caché et réutilise-la
- [ ] Les jobs du front ne se lancent que si `front-vue/` a changé
- [ ] Ajoute un job qui lance l'image publiée et vérifie qu'elle répond sur `/`

> [!warning] Le piège
> `npm install` derrière le proxy du runner : même problème que `pip` à l'étape 08. Et `npm ci` exige un `package-lock.json` dans le dépôt.

> [!success] Ça marche si…
> Un commit dans `front-vue/` ne lance que les jobs du front, l'image est publiée, et la partie commune des builds n'est écrite qu'une fois.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> Un job dont le nom commence par un point (`.build-image`) n'est jamais lancé seul : il sert de modèle. `extends` le recopie, et tu ne changes que ce qui diffère (dossier, nom d'image).

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mon .gitlab-ci.yml
