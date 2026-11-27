---
type: concept
module: "[[Module 03 - Git et GitHub]]"
related:
  - "[[Changelog]]"
  - "[[Convention de commit]]"
tags:
  - concept
  - git
---
# Tag Git

> [!info] En une phrase
> Une étiquette fixe posée sur un commit précis, en général pour marquer une version (v2.20.0).

## 1 · Comprendre
### Définition
Un **tag** est un nom qui pointe **pour toujours** vers un commit. Contrairement à une branche, il ne bouge pas quand on ajoute des commits. Le tag **annoté** (`-a`) garde aussi un message, un auteur et une date : c'est celui à utiliser pour une version.

### Pourquoi ça existe
Retrouver exactement le code d'une version publiée, des mois plus tard.

### Le problème résolu
« Quel commit correspond à la version en production ? » : sans tag, il faut fouiller l'historique.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  C1[commit] --> C2[commit]
  C2 --> C3[commit]
  T[v2.20.0] -.-> C2
  B[main] -.-> C3
```

### Exemple concret
```bash
git tag                                  # lister
git tag -a v1.0.0 -m "Première version"  # créer sur le commit actuel
git push origin v1.0.0                   # les tags ne partent pas avec un simple git push
git switch --detach v2.20.0              # se placer sur une version
git describe --tags                      # le tag le plus proche du commit actuel
```

### Cas d'utilisation
- Déclencher une pipeline de publication sur un tag (`$CI_COMMIT_TAG`)
- Tagger l'image Docker avec la même version

> [!warning] À ne pas confondre
> **Tag** (fixe) et **branche** (avance à chaque commit). Et le tag Git (`v2.20.0`) avec le tag d'image Docker (`:v2.20.0`) : même idée, deux systèmes différents.

## 3 · Relier
- **Au travail** : [Tag Git au travail](obsidian://open?vault=Travail&file=Tag%20Git%20au%20travail)
- **Prérequis** : [[Commit]] · [[Branche Git]]
- **Complémentaires** : [[Changelog]] · [[Convention de commit]]
- **Commandes** : [[git tag]] · [[git diff]]
