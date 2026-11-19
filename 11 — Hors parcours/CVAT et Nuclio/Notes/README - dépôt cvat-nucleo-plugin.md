# cvat-nucleo-plugin

Ce projet ajoute à **CVAT 2.81.0** la génération d'un graphique PNG à partir des annotations d'un folio (une image d'un job).

Le code de CVAT n'est pas modifié : on clone le dépôt officiel de CVAT, puis on y ajoute le plugin et la fonction à l'aide des fichiers de `deploy/`.

Le dépôt se compose de trois parties :

- **Plugin CVAT UI** (`plugin/`) : ajouté à l'interface de CVAT, il crée un bouton *Generate graph* dans le menu d'un job ;
- **Fonction Nuclio** (`function/`) : appelée par ce bouton, elle génère le graphique et le renvoie ;
- **Déploiement** (`deploy/`) : fichiers qui ajoutent le plugin et la fonction à un CVAT officiel, sans modifier son code.

Deux composants de CVAT sont utilisés :

- **Nuclio** : plateforme *serverless* livrée avec CVAT. Elle exécute des fonctions (ici du Python) dans des conteneurs Docker et les expose en HTTP. CVAT s'en sert d'habitude pour ses modèles d'annotation automatique.
- **Traefik** : *reverse proxy* placé devant CVAT. Il reçoit toutes les requêtes du navigateur sur `:8080` et les envoie au bon conteneur (interface, API…) selon des règles de routage.

Pour installer, suivre les parties **Déploiement** puis **Fonction Nuclio**, et tester depuis un job : **Menu → Generate graph**.

---

## Plugin CVAT UI

Le plugin ajoute le bouton *Generate graph* au menu du job. Au clic, il envoie le job et le folio affiché à la fonction, affiche l'avancement, puis télécharge le PNG.

Le job CI `build-ui` construit l'image de l'interface CVAT avec le plugin intégré et la publie dans le registre du projet : `vortex-gitlab.assystem.com:5005/dec/cstd/projet-i1/replication/cvat-nucleo-plugin/ui:<tag>`, où `<tag>` est le SHA court du commit.

---

## Déploiement

**Prérequis**

- Docker Engine et Docker Compose v2 ;
- Linux, ou Windows avec WSL 2 (cloner les dépôts dans le système de fichiers Linux, pas sous `/mnt/c`) ;
- accès au registre : `docker login vortex-gitlab.assystem.com:5005`.

**Fichiers**

- **`docker-compose.integration.yml`** : complète le `docker-compose.yml` de CVAT pour :
  - utiliser l'image de l'interface qui contient le plugin ;
  - rendre le serveur CVAT joignable par la fonction sous le nom `cvat-server` ;
  - donner à Traefik la règle de routage ci-dessous.
- **`convert_graph_conf.yml`** : règle de routage qui rend la fonction joignable via Traefik, à l'adresse de CVAT (`/convert-graph`).
- **`.env-example`** : modèle de configuration.

**Configuration** : fichier `.env` du dossier CVAT (`../cvat/.env`).

| Variable | Valeur |
|---|---|
| `CVAT_HOST` | Nom d'hôte d'accès à CVAT : `localhost` en local, nom DNS en production. Traefik refuse les autres noms. |
| `CVAT_IMAGE_TAG` | Tag de l'image UI à déployer. |

**Installation**

À lancer depuis la racine de ce dépôt. CVAT est cloné à côté, dans `../cvat`.

```bash
git clone --depth 1 --branch v2.81.0 https://github.com/cvat-ai/cvat.git ../cvat
cp deploy/docker-compose.integration.yml ../cvat/
cp deploy/convert_graph_conf.yml ../cvat/components/serverless/
cp deploy/.env-example ../cvat/.env       # renseigner les variables

cd ../cvat
docker compose -f docker-compose.yml \
  -f components/serverless/docker-compose.serverless.yml \
  -f docker-compose.integration.yml up -d

docker exec -it cvat_server bash -ic 'python3 ~/manage.py createsuperuser'
```

Ouvrir **http://localhost:8080**.

`docker-compose.serverless.yml` démarre Nuclio. `docker-compose.integration.yml` vient en dernier pour que ses réglages s'appliquent par-dessus ceux de CVAT.

---

## Fonction Nuclio

La fonction reçoit le job et le folio, exporte les annotations via l'API CVAT, génère le graphique et renvoie le PNG. Elle s'exécute dans le Nuclio de CVAT, à partir de l'image `convert-graph:<tag>` construite par le job CI `build-function`.

**Prérequis**

- CVAT démarré (voir *Déploiement*)
- `nuctl` **1.16.3** (version du Nuclio de CVAT 2.81.0)

**Configuration** : variables passées au déploiement.

| Variable | Valeur |
|---|---|
| `CVAT_URL` | `http://cvat-server:8080`, l'adresse de l'API vue depuis la fonction. |
| `CVAT_USERNAME` / `CVAT_PASSWORD` | Compte CVAT utilisé par la fonction. |

`function/convert-graph/function.yaml` définit le point d'entrée, le port HTTP, le délai maximal de chaque requête et les métadonnées lues par CVAT.

**Déploiement**

À lancer depuis la racine de ce dépôt.

```bash
# Une seule fois : projet Nuclio utilisé par CVAT
nuctl create project cvat --platform local

nuctl deploy convert-graph \
  --run-image vortex-gitlab.assystem.com:5005/dec/cstd/projet-i1/replication/cvat-nucleo-plugin/convert-graph:<TAG> \
  --file function/convert-graph/function.yaml \
  --project-name cvat --platform local \
  --platform-config '{"attributes": {"network": "cvat_cvat"}}' \
  --env CVAT_URL=http://cvat-server:8080 \
  --env CVAT_USERNAME=<username> \
  --env CVAT_PASSWORD=<password>

nuctl get function --platform local      # convert-graph doit être READY
```

- `--run-image` utilise l'image de la CI, sans la reconstruire.
- `--file` apporte les métadonnées lues par CVAT.
- `--project-name cvat` range la fonction dans le projet Nuclio où CVAT cherche ses fonctions.
- `--platform local` exécute la fonction comme un conteneur Docker sur la même machine que CVAT.
- `--platform-config` place la fonction sur le réseau de CVAT, où Traefik la joint sous le nom `nuclio-nuclio-convert-graph`.

---

## Développement de l'interface

Pour voir chaque modification du plugin immédiatement, sans reconstruire l'image de l'interface, celle-ci est servie par **webpack** depuis les sources, sur `localhost:3000`. Le serveur CVAT reste dans Docker, sur `localhost:8080`.

**Prérequis**

- CVAT cloné et le plugin copié dans `cvat-ui/plugins/nuclio-job` ;
- Node.js et Yarn (via `corepack`).

**CSRF**

La page vient de `:3000` mais appelle l'API sur `:8080`. Django refuse ces requêtes (`CSRF Failed`) tant que `:3000` n'est pas déclaré comme origine de confiance.

`settings.py`, à créer à la racine du CVAT cloné : réglages de production, plus l'origine de confiance.

```python
from cvat.settings.production import *
CSRF_TRUSTED_ORIGINS = ["http://localhost:3000"]
```

`docker-compose.ui-dev.yml`, au même endroit : charge ce fichier dans le conteneur du serveur.

```yaml
services:
  cvat_server:
    environment:
      DJANGO_SETTINGS_MODULE: cvat.settings.ui_dev
    volumes:
      - ./settings.py:/opt/cvat/cvat/settings/ui_dev.py:ro
```

Ces deux fichiers sont réservés au poste de développement : ils ne doivent pas être déployés en production.

**Proxy de webpack**

Dans `cvat-ui/webpack.config.js`, ajouter `|\/convert-graph` à la regex du proxy pour que le bouton joigne la fonction.

**Lancer**

À lancer depuis la racine du CVAT cloné. `docker-compose.integration.yml` reste nécessaire pour le nom `cvat-server` et la règle Traefik de la fonction.

```bash
docker compose -f docker-compose.yml \
  -f components/serverless/docker-compose.serverless.yml \
  -f docker-compose.integration.yml \
  -f docker-compose.ui-dev.yml up -d

corepack enable yarn
DISABLE_HUSKY=1 yarn install --immutable

cd cvat-ui
CLIENT_PLUGINS=plugins/nuclio-job npx webpack serve --env API_URL=http://localhost:8080 \
  --config ./webpack.config.js --mode=development
```

Ouvrir **http://localhost:3000**.
