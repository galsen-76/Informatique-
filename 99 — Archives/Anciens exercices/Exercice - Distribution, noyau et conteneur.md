---
type: project
status: a-faire
difficulty: facile
concepts:
  - "[[Distribution Linux]]"
tags:
  - exercice
---
# Exercice — Distribution, noyau et conteneur

> [!abstract] Mise en situation
> Une version guidée de l'exercice sur les distributions.
> Elle mélange plusieurs notions : fais-la **après** les exercices de chacune. Elle ne compte pas dans la validation de la maîtrise.

> [!info] Objectif
> Voir de tes yeux la différence entre le noyau et la distribution.
> Notions : [[Distribution Linux]]

## Consignes
- [ ] Dans Ubuntu, affiche la version du noyau, puis le nom et la version de la distribution
- [ ] Lance les deux mêmes commandes dans un conteneur `alpine`, puis dans un conteneur `python:3.12-slim`
- [ ] Compare : qu'est-ce qui change, qu'est-ce qui reste identique ? Explique pourquoi
- [ ] Dans le conteneur `alpine`, essaie d'installer `curl` avec `apt`. Que se passe-t-il ? Trouve la bonne commande
- [ ] Explique en deux phrases la différence entre un conteneur et une machine virtuelle

> [!question]- Indice
> `uname -r` et `cat /etc/os-release`.
> Pour entrer dans un conteneur : `docker run --rm -it alpine sh`.

> [!question]- Solution
> ```bash
> uname -r ; cat /etc/os-release                       # noyau WSL2, Ubuntu
> docker run --rm alpine sh -c 'uname -r; cat /etc/os-release'
> docker run --rm python:3.12-slim sh -c 'uname -r; cat /etc/os-release'
> ```
> Le noyau est **identique** partout (`…microsoft-standard-WSL2`) : les conteneurs empruntent celui de WSL. La distribution **change** (Ubuntu, Alpine, Debian) : ce sont les outils contenus dans l'image.
> ```bash
> docker run --rm -it alpine sh
> apt install curl     # sh: apt: not found
> apk add curl         # le gestionnaire de paquets d'Alpine
> ```
> Un conteneur partage le noyau de la machine : il démarre en une seconde. Une machine virtuelle a son propre noyau : plus isolée, mais plus lourde et plus lente.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
