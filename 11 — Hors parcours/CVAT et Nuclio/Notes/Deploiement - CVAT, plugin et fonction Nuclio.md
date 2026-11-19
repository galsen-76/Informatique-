# Déploiement : CVAT + plugin « Generate graph » + fonction Nuclio

Procédure complète pour installer le projet sur une machine Linux (ou WSL) **comme en production** : on part d'un CVAT officiel non modifié, et on n'ajoute que nos fichiers.

```
Navigateur ──► Traefik :8080 ─┬─► /api, /admin…    ──► cvat_server (Django)
                              ├─► /convert-graph   ──► nuclio-nuclio-convert-graph (ma fonction)
                              └─► tout le reste    ──► cvat_ui (interface + mon plugin)
```

---

## 0. Ce qu'il faut avant de commencer

| Élément | Vérifier avec |
|---|---|
| Docker + Docker Compose v2 | `docker --version` et `docker compose version` |
| Git | `git --version` |
| `nuctl` **1.16.3** (même version que le Nuclio de CVAT 2.81.0) | `nuctl version` |
| Accès au Nexus (images Docker, PyPI) | `docker pull vortex-nexus.assystem.com:5000/library/python:3.11-slim` |
| Accès au registre GitLab (image UI) | `docker login vortex-gitlab.assystem.com:5005` |
| Mon dépôt `cvat-nucleo-plugin` | `git clone` du dépôt GitLab |

Installer `nuctl` si besoin :
```bash
curl -L -o nuctl https://github.com/nuclio/nuclio/releases/download/1.16.3/nuctl-1.16.3-linux-amd64
chmod +x nuctl && sudo mv nuctl /usr/local/bin/nuctl
nuctl version
```
> Si le proxy bloque GitHub, récupérer le binaire autrement (collègue, Nexus « raw ») : c'est un simple fichier.

Dossiers utilisés dans la suite :
```bash
export CVAT_DIR=~/Projet/CVAT/cvat-2.81.0          # CVAT officiel
export APP_DIR=~/Projet/CVAT/cvat-nucleo-plugin    # mon dépôt
```

---

## 1. Récupérer CVAT officiel (version figée)

```bash
git clone --depth 1 --branch v2.81.0 https://github.com/cvat-ai/cvat.git "$CVAT_DIR"
cd "$CVAT_DIR"
```
> On ne modifie **aucun fichier de CVAT**. Tout ce qui est à nous est ajouté à côté.

---

## 2. Obtenir l'image de l'interface avec le plugin

### Option A : image construite par la CI (vraie prod)
Rien à construire : l'image est dans le registre GitLab.
```bash
docker login vortex-gitlab.assystem.com:5005
docker pull vortex-gitlab.assystem.com:5005/dec/cstd/projet-i1/replication/cvat-nucleo-plugin/ui:<TAG>
```
Le `<TAG>` est celui affiché par le pipeline (ex. `f5e51d80`). Il ira dans `CVAT_IMAGE_TAG` à l'étape 4.

### Option B : la construire sur la machine (pas de CI)
```bash
cd "$CVAT_DIR"

# 1. Copier le plugin dans CVAT
cp -r "$APP_DIR/plugin/nuclio-job" cvat-ui/plugins/
ls cvat-ui/plugins/nuclio-job/src/ts            # → index.tsx

# 2. Faire passer les images de base par le Nexus (proxy)
sed -i 's#^FROM node:#FROM vortex-nexus.assystem.com:5000/library/node:#' Dockerfile.ui
sed -i 's#^FROM nginxinc/#FROM vortex-nexus.assystem.com:5000/nginxinc/#' Dockerfile.ui
grep -n '^FROM' Dockerfile.ui

# 3. Construire (≈ 5 à 10 min)
docker build -f Dockerfile.ui --build-arg CLIENT_PLUGINS=plugins/nuclio-job -t cvat/ui:graph .
```
Dans les logs, la ligne `Plugins:` doit lister `.../plugins/nuclio-job/src/ts/index.tsx`.

> Ici on a dû modifier `Dockerfile.ui` et `cvat-ui/plugins/` : c'est pour ça que l'option A (CI) est la cible.

---

## 3. Ajouter mes fichiers d'intégration dans CVAT

```bash
cd "$CVAT_DIR"
cp "$APP_DIR/deploy/docker-compose.integration.yml" .
cp "$APP_DIR/deploy/convert_graph_conf.yml" components/serverless/
```

Rappel de ce qu'ils font :
- `docker-compose.integration.yml` : image UI avec plugin, alias `cvat-server` pour le serveur, montage de la règle Traefik ;
- `convert_graph_conf.yml` : règle Traefik `/convert-graph` → `http://nuclio-nuclio-convert-graph:8080`.

**Uniquement pour l'option B**, ajouter un fichier qui remplace l'image par celle construite en local :
```bash
cat > docker-compose.local-ui.yml <<'EOF'
services:
  cvat_ui:
    image: cvat/ui:graph
EOF
```

---

## 4. Le fichier `.env` de CVAT

Docker Compose lit automatiquement `.env` dans `$CVAT_DIR`.
```bash
cd "$CVAT_DIR"
cp "$APP_DIR/deploy/.env-example" .env
nano .env        # CVAT_HOST (localhost ou nom du serveur), CVAT_IMAGE_TAG (tag de l'image UI, ex. fac5a2b6)
```

---

## 5. Lancer CVAT + Nuclio

Liste des fichiers compose, **dans cet ordre** (le dernier gagne) :
```bash
cd "$CVAT_DIR"
COMPOSE="-f docker-compose.yml \
  -f components/serverless/docker-compose.serverless.yml \
  -f docker-compose.integration.yml"

# Option B seulement :
COMPOSE="$COMPOSE -f docker-compose.local-ui.yml"

docker compose $COMPOSE up -d
docker compose $COMPOSE ps
```
> Si `quay.io/nuclio/dashboard` ne se télécharge pas (proxy), demander si le Nexus a un proxy vers quay.io.

Vérifications :
```bash
docker ps --format '{{.Names}}  {{.Image}}' | grep -E 'cvat_ui|cvat_server|traefik|nuclio'
docker exec traefik ls /etc/traefik/rules       # → convert_graph_conf.yml
```
Ouvrir http://localhost:8080 : la page de connexion CVAT doit s'afficher.

---

## 6. Comptes CVAT

### 6.1 L'administrateur
```bash
docker exec -it cvat_server bash -ic 'python3 ~/manage.py createsuperuser'
```

### 6.2 Le compte de la fonction
1. Se connecter en admin sur http://localhost:8080.
2. Créer un utilisateur dédié (ex. `nuclio_function`) via http://localhost:8080/admin → *Users*, avec les droits nécessaires pour exporter les jobs.
3. Se connecter avec ce compte et créer un **token d'accès** depuis son profil (ou garder identifiant + mot de passe si `config.py` les utilise encore).

### 6.3 Les variables de la fonction
Elles sont passées directement à `nuctl deploy` (étape 7) avec `--env` :
- `CVAT_URL=http://cvat-server:8080` : l'adresse de CVAT vue depuis le conteneur de la fonction (l'alias réseau), pas `localhost` ;
- `CVAT_USERNAME` et `CVAT_PASSWORD` : le compte que la fonction utilise pour se connecter à CVAT (compte dédié de l'étape 6.2).

> Les noms doivent être **exactement** ceux que lit `config.py` (sinon `KeyError` au démarrage de la fonction). Ne jamais écrire le vrai mot de passe dans la doc ni dans Git.

---

## 7. Déployer la fonction Nuclio (image)

La fonction est une image Docker (construite par la CI, job `build-function`, ou en local). On passe `function/convert-graph/function.yaml` **sans bloc `build:`** (sinon nuctl reconstruit l'image) : il donne les annotations lues par CVAT, le runtime, le handler et le trigger HTTP.

```bash
cd "$APP_DIR"
nuctl create project cvat --platform local      # une seule fois ; « already exists » est normal

# Image : CI (prod) ou build local (test)
IMAGE=vortex-gitlab.assystem.com:5005/dec/cstd/projet-i1/replication/cvat-nucleo-plugin/convert-graph:<TAG>
docker pull "$IMAGE"

# ou en local : docker build -t test-fonction function/convert-graph && IMAGE=test-fonction

nuctl deploy convert-graph \
  --run-image "$IMAGE" \
  --file function/convert-graph/function.yaml \
  --platform local --project-name cvat \
  --platform-config '{"attributes": {"network": "cvat_cvat"}}' \
  --env CVAT_URL=http://cvat-server:8080 \
  --env CVAT_USERNAME=<compte_fonction> \
  --env CVAT_PASSWORD=<mot_de_passe>
```
Le log ne doit pas contenir « Building processor image ».

> Imports Python : le code est copié directement dans `/opt/nuclio`, donc `from replication...` et jamais `from function.replication...`.

Vérifications :
```bash
nuctl get function --platform local                         # état READY
docker ps --format '{{.Names}}' | grep convert-graph        # → nuclio-nuclio-convert-graph
docker logs --tail 30 nuclio-nuclio-convert-graph           # → « convert-graph prête »
```
> Si le conteneur porte un autre nom, corriger la ligne `url:` de `convert_graph_conf.yml`, puis `docker compose $COMPOSE restart traefik`.

---

## 8. Tester de bout en bout

### 8.1 Sans l'interface (curl, à travers Traefik)
```bash
curl -s -o test.png -w "%{http_code}\n" \
  -X POST http://localhost:8080/convert-graph \
  -H 'Content-Type: application/json' \
  -d '{"job_id": 1, "folio_id": 0}'
file test.png       # → PNG image data
```
- `200` + PNG : tout fonctionne.
- `404` : Traefik ne connaît pas la route (étape 3 / 5).
- `502` / `503` : Traefik ne joint pas la fonction (nom du conteneur, réseau `cvat_cvat`).
- `500` : erreur dans la fonction → `docker logs nuclio-nuclio-convert-graph`.

### 8.2 Dans l'interface
1. Créer une tâche avec quelques images et des annotations.
2. Ouvrir un job → menu **Menu** en haut à gauche → **Generate graph**.
3. Encart orange « Creating graph… » puis vert « Graph downloaded » ; le PNG est dans le dossier Téléchargements.

> Pas de bouton ? `Ctrl + Shift + R`, puis vérifier que le plugin est compilé :
> `docker exec cvat_ui sh -c 'ls /usr/share/nginx/html/assets | grep plugin'` → `plugin_0` **et** `plugin_1`.

---

## 9. Mettre à jour

| Ce qui change | Commandes |
|---|---|
| Le plugin (option A) | nouveau pipeline → changer `CVAT_IMAGE_TAG` dans `.env` → `docker compose $COMPOSE up -d cvat_ui` |
| Le plugin (option B) | recopier le dossier, `docker build` (étape 2B) → `docker compose $COMPOSE up -d --force-recreate cvat_ui` |
| La fonction | nouveau pipeline (job build-function) → relancer `nuctl deploy` avec le nouveau tag (étape 7) |
| La règle Traefik | recopier `convert_graph_conf.yml` → `docker compose $COMPOSE restart traefik` |
| La version de CVAT | nouveau clone au nouveau tag → étapes 1 à 5 (mes fichiers ne changent pas) ; vérifier la version de `nuctl` |

---

## 10. Arrêter / tout supprimer

```bash
cd "$CVAT_DIR"
docker compose $COMPOSE down                 # arrête, garde les données
nuctl delete function convert-graph --platform local

docker compose $COMPOSE down -v              # ⚠️ supprime aussi les données CVAT (tâches, annotations)
```

---

## Récapitulatif express

```bash
# 1. CVAT
git clone --depth 1 --branch v2.81.0 https://github.com/cvat-ai/cvat.git "$CVAT_DIR" && cd "$CVAT_DIR"
# 3. Mes fichiers
cp "$APP_DIR/deploy/docker-compose.integration.yml" .
cp "$APP_DIR/deploy/convert_graph_conf.yml" components/serverless/
# 4. .env (CVAT_HOST, CVAT_IMAGE_TAG)
# 5. Lancer
docker compose -f docker-compose.yml -f components/serverless/docker-compose.serverless.yml -f docker-compose.integration.yml up -d
# 6. Admin + compte de la fonction + .env de la fonction
# 7. Fonction
cd "$APP_DIR" && nuctl deploy convert-graph --run-image "$IMAGE" --file function/convert-graph/function.yaml --platform local --project-name cvat --platform-config '{"attributes": {"network": "cvat_cvat"}}' --env CVAT_URL=http://cvat-server:8080 --env CVAT_USERNAME=<compte_fonction> --env CVAT_PASSWORD=<mot_de_passe>
# 8. Test
curl -X POST http://localhost:8080/convert-graph -H 'Content-Type: application/json' -d '{"job_id": 1, "folio_id": 0}' -o test.png
```
