---
type: exercise
status: a-faire
niveau: 6
difficulty: moyen
concepts:
  - "[[Pipeline GitLab CI]]"
  - "[[extends GitLab CI]]"
  - "[[Règles d'un job GitLab (rules)]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 14 - La CI du front Angular

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Étape précédente :** [[MesDépenses Front 10 - Angular dans compose]]
> **Déjà fait :** [[MesDépenses 09 - La CI de l'API]] · [[MesDépenses Front 06 - La CI du front Vue]]
> **Notions :** [[Pipeline GitLab CI]] · [[extends GitLab CI]] · [[Règles d'un job GitLab (rules)]] · [[Principes DRY, KISS et YAGNI]]

## Le but
Le front Angular entre dans la pipeline en **réutilisant** ce qui existe : quelques lignes suffisent.

## Ce que tu fais
- [ ] Ajoute le build Angular et la construction de son image, en réutilisant tes jobs cachés de l'étape 09
- [ ] Les jobs Angular ne se lancent que si `front-angular/` a changé
- [ ] Fais un commit qui touche les trois dossiers : tous les jobs tournent. Un commit sur un seul : seulement les siens
- [ ] Compte les lignes ajoutées pour Angular. Si c'est presque autant que pour Vue, qu'est-ce qui n'est pas encore partagé ?

> [!success] Ça marche si…
> Les trois images (api, front-vue, front-angular) sont publiées, et chaque partie ne se reconstruit que quand elle change.

> [!quote] Mes notes
> _Bilan du projet : ce que je sais faire seul maintenant, ce qui reste à consolider._

> [!question]- Indice
> Ce qui change d'un front à l'autre (dossier, nom d'image) peut devenir des `variables` du job.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Bilan du projet fait avec Claude
