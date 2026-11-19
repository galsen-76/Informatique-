---
type: howto
concepts:
  - "[[CSRF]]"
  - "[[Volume Docker]]"
  - "[[Variable d'environnement]]"
  - "[[Outil de build front (Vite)]]"
tags:
  - fiche-pratique
  - docker
  - cvat
---
# Fiche - CVAT, mode dev de l'interface

> [!info] Objectif
> Modifier mon plugin et voir le résultat en une seconde sur `localhost:3000`, sans reconstruire l'image ni attendre la CI.

Fait partie de [[Fiche - CVAT, lancer mon interface]].

## Ce qui tourne
- le serveur CVAT, dans Docker, sur `localhost:8080` ;
- l'interface, servie par **webpack** depuis mes fichiers sources, sur `localhost:3000`.

## Le problème : le CSRF
La page vient de `:3000` mais parle au serveur sur `:8080`. Django refuse les requêtes qui viennent d'une autre adresse : erreur `CSRF Failed` (voir [[CSRF]]). Il faut lui dire de faire confiance à `:3000`.

## La solution : un 3e fichier compose
Dans `~/Projet/CVAT/dev-ui/`, deux fichiers.

`settings.py` : les réglages de production, plus une adresse de confiance.
```python
from cvat.settings.production import *  # pylint: disable=wildcard-import
CSRF_TRUSTED_ORIGINS = ["http://localhost:3000"]
```

`docker-compose.ui-dev.yml` : modifie `cvat_server` (voir [[Empiler des fichiers compose]]).
```yaml
services:
  cvat_server:
    environment:
      DJANGO_SETTINGS_MODULE: cvat.settings.ui_dev   # charge mon fichier de réglages
    volumes:
      - /home/osall/Projet/CVAT/dev-ui/settings.py:/opt/cvat/cvat/settings/ui_dev.py:ro   # le dépose dans le conteneur
```

Ce dossier reste **hors du dépôt** : réglage pour mon PC seulement, chemin personnel, et une faille s'il allait en production.

## Lancer
```bash
# 1. CVAT + Nuclio + réglage CSRF
cd ~/Projet/CVAT/processing-integration/cvat-processing-integration
docker compose -f docker-compose.yml \
  -f components/serverless/docker-compose.serverless.yml \
  -f ~/Projet/CVAT/dev-ui/docker-compose.ui-dev.yml up -d

# 2. Bibliothèques JS (une seule fois, à la racine du dépôt)
corepack enable yarn
DISABLE_HUSKY=1 yarn install --immutable

# 3. Interface avec le plugin
cd cvat-ui
CLIENT_PLUGINS=plugins/nuclio-job npx webpack serve --env API_URL=http://localhost:8080 --config ./webpack.config.js --mode=development
```
Ouvrir **http://localhost:3000**.

> [!success] Vérifier
> `docker exec cvat_server printenv DJANGO_SETTINGS_MODULE` → `cvat.settings.ui_dev`

## Si ça ne marche pas
| Erreur | Cause |
| --- | --- |
| `CSRF Failed` | lancé sans le 3e `-f` |
| `ECONNREFUSED` (webpack) | serveur CVAT pas démarré ou pas prêt (`docker logs -f cvat_server`) |
| Bouton absent | `CLIENT_PLUGINS` oublié devant `npx webpack serve` |

## Avec mes mots
> [!quote] Mon résumé, avec mes mots
> _Pourquoi Django refuse, et ce que change le 3e fichier :_

## Liens
[[Fiche - CVAT, lancer mon interface]] · [[Empiler des fichiers compose]] · [[Fiche - CVAT, image de la CI GitLab]] · [[CSRF]] · [[docker exec]]
