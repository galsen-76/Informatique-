---
type: exercise
status: a-faire
niveau: 3
difficulty: moyen
concepts:
  - "[[Branche Git]]"
  - "[[Merge]]"
  - "[[Conflit de merge]]"
  - "[[Merge request]]"
  - "[[Convention de commit]]"
  - "[[Annuler dans Git]]"
  - "[[Stash]]"
  - "[[User story]]"
  - "[[Critères d'acceptation]]"
  - "[[Définition de terminé]]"
  - "[[Rebase]]"
  - "[[Dépôt upstream]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 07 - Travailler en branche

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Niveau :** 3 · **Étape précédente :** [[MesDépenses 06 - Dépanner un conteneur]]
> **Notions :** [[Branche Git]] · [[Merge]] · [[Conflit de merge]] · [[Merge request]] · [[Convention de commit]] · [[Annuler dans Git]] · [[Stash]] · [[User story]] · [[Critères d'acceptation]] · [[Définition de terminé]] · [[Rebase]] · [[Dépôt upstream]]

## Le but
Travailler comme dans une équipe : une branche par changement, une merge request relue, un historique propre. C'est la façon de travailler sur tous les dépôts de l'entreprise.

> [!tip] Au travail
> Le jour où tu travailles à plusieurs sur un dépôt, ce sont exactement ces gestes : branche, conflit, merge request, annuler proprement.

## Ce que tu fais
- [ ] Pousse le dépôt sur GitLab (ou GitHub). La branche principale est protégée : plus de push direct dessus
- [ ] Crée une branche pour ajouter une commande `supprimer` à ton client Python, avec des commits au format conventionnel
- [ ] Pendant ce temps, modifie la même ligne sur la branche principale (comme si un collègue l'avait fait). Fusionne et règle le conflit
- [ ] Ouvre une merge request avec une description claire : ce qui change, comment tester
- [ ] Tu es interrompu au milieu d'un changement : mets-le de côté, corrige autre chose, puis reprends-le
- [ ] Tu as fait un mauvais commit déjà poussé : annule-le sans réécrire l'historique partagé
- [ ] Avant de coder, écris le besoin en une user story avec ses critères d'acceptation, et mets-les dans la merge request
- [ ] Mets ta branche à jour avec la branche principale par rebase avant la fusion, et compare l'historique avec celui d'un merge
- [ ] Fais un fork du dépôt, ajoute le dépôt d'origine comme upstream et récupère dedans un changement fait sur l'original

> [!warning] Les pièges
> - Réécrire un historique déjà poussé casse le travail des autres.
> - Un conflit n'est pas une erreur : Git te demande juste de choisir.

> [!success] Ça marche si…
> La merge request est fusionnée, l'historique montre tes commits conventionnels, le conflit est réglé, et le mauvais commit est annulé par un nouveau commit.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> `git switch -c`, `git merge`, `git stash`, `git revert`. La fiche [[Exemples de commits conventionnels]] donne des exemples.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu ma merge request
