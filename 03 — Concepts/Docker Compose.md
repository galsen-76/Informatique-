---
type: concept
module: "[[Module 13 - Docker]]"
related:
  - "[[Reverse proxy]]"
tags:
  - concept
  - devops
---
# Docker Compose

> [!info] En une phrase
> Décrire dans un fichier YAML plusieurs conteneurs qui vont ensemble (services, ports, volumes, réseau) et les lancer d'une seule commande.

## 1 · Comprendre
### Définition
`docker compose` lit un fichier `docker-compose.yml` (ou `compose.yaml`) qui décrit des **services**. Chaque service = un conteneur, avec son image (ou son `build`), ses ports, volumes, variables. Compose crée aussi un **réseau** où les services se joignent **par leur nom**.

### Pourquoi ça existe
Une vraie application = plusieurs conteneurs (par exemple : serveur, interface, base, Redis, reverse proxy). Les lancer un par un avec de longues commandes `docker run` est ingérable.

### Le problème résolu
Remplacer dix commandes `docker run` à retenir par un fichier versionné, lisible et partagé.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  Y[compose.yml] --> W[web]
  Y --> DB[db]
  W --> DB
```

### Exemple concret
```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: dev
    volumes:
      - db-data:/var/lib/postgresql/data
  api:
    build: .                  # construit l'image depuis le Dockerfile local
    ports:
      - "8080:8000"
    environment:
      DB_HOST: db             # le nom du service sert d'adresse
    depends_on:
      - db
volumes:
  db-data:
```
```bash
docker compose up -d          # crée et démarre tout
docker compose ps             # état des services
docker compose logs -f api    # suivre les logs d'un service
docker compose down           # arrête et supprime (ajouter -v supprime aussi les volumes)
```
Plusieurs fichiers peuvent se superposer : `docker compose -f docker-compose.yml -f docker-compose.dev.yml up` (les gros projets en ont souvent plusieurs).

### Cas d'utilisation
- Comprendre quelles images un projet **construit** (`build:`) ou **télécharge** (`image:`)

> [!warning] À ne pas confondre
> `docker compose` (v2, une sous-commande, à utiliser) et `docker-compose` (l'ancien outil séparé). Et `depends_on` attend que le conteneur **démarre**, pas que le service soit **prêt**.

## 3 · Relier
- **Au travail** : [Docker Compose au travail](obsidian://open?vault=Travail&file=Docker%20Compose%20au%20travail)
- **Prérequis** : [[Conteneur]] · [[YAML]] · [[Volume Docker]] · [[Port]]
- **Complémentaires** : [[Reverse proxy]]
- **Commandes** : [[docker compose up]]
