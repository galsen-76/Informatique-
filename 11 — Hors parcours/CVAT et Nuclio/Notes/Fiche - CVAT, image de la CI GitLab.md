---
type: howto
concepts:
  - "[[Registre Docker]]"
  - "[[Construire une image dans la CI]]"
tags:
  - fiche-pratique
  - docker
  - cvat
---
# Fiche - CVAT, image de la CI GitLab

> [!info] Objectif
> Lancer CVAT avec l'interface **construite par la CI** (avec mon plugin), récupérée dans le registre GitLab, sur `localhost:8080`.

Fait partie de [[Fiche - CVAT, lancer mon interface]].

## Le problème
`docker-compose.yml` lance l'image officielle `cvat/ui`, **sans** mon plugin. Mon image est dans le registre GitLab `vortex-gitlab.assystem.com:5005`.

## La solution : un 3e fichier compose
`docker-compose.registry.yml` (dans le dépôt) modifie `cvat_ui` pour qu'il prenne mon image (voir [[Empiler des fichiers compose]]). L'idée, à comparer avec mon vrai fichier :
```yaml
services:
  cvat_ui:
    image: vortex-gitlab.assystem.com:5005/<chemin du projet>/ui:${CVAT_IMAGE_TAG:-dev}
```
`${CVAT_IMAGE_TAG:-dev}` : la variable si elle existe, sinon `dev`.

## Lancer
```bash
# 1. Se connecter au registre (une fois) : identifiant + jeton GitLab read_registry
docker login vortex-gitlab.assystem.com:5005

# 2. Lancer avec l'image d'un commit
CVAT_IMAGE_TAG=<commit-8-caractères> docker compose \
  -f docker-compose.yml \
  -f components/serverless/docker-compose.serverless.yml \
  -f docker-compose.registry.yml up -d
```
Le tag = les 8 premiers caractères du commit. Sans `CVAT_IMAGE_TAG` : tag `dev` (branche principale).

> [!success] Vérifier
> `docker inspect cvat_ui --format '{{.Config.Image}}'` → l'adresse du registre GitLab. Si ça affiche `cvat/ui:v2.81.0`, le 3e fichier manque.

## Si ça ne marche pas
| Erreur | Cause |
| --- | --- |
| `unauthorized` / `denied` | pas de `docker login`, ou jeton sans `read_registry` |
| `manifest unknown` | ce tag n'existe pas : vérifier le commit et que `build-ui` est vert |
| Ancienne interface | 3e `-f` oublié, ou cache du navigateur (Ctrl+F5) |

## Avec mes mots
> [!quote] Mon résumé, avec mes mots
> _D'où vient l'image et comment je choisis laquelle :_

## Liens
[[Fiche - CVAT, lancer mon interface]] · [[Empiler des fichiers compose]] · [[Fiche - CVAT, mode dev de l'interface]] · [[Registre Docker]] · [[docker login]] · [[docker inspect]]
