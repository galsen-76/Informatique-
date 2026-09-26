---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
aliases:
  - "Commandes CLI Essentielles Docker"
tags:
  - infrastructure/docker/cli
parent: "[[Docker]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.docker.com/engine/reference/commandline/cli/"
---

# Commandes Docker CLI

> [!abstract] En bref
> L'aide-mémoire des commandes Docker du quotidien : lancer, voir, entrer dans un conteneur, lire les logs, nettoyer.

## Les conteneurs

| Commande | Rôle |
|---|---|
| `docker run -d --name api -p 3000:3000 image` | lancer un conteneur en arrière-plan |
| `docker run -it --rm node:22 bash` | lancer un conteneur jetable et entrer dedans |
| `docker ps` | les conteneurs **en marche** |
| `docker ps -a` | **tous** les conteneurs (arrêtés compris) |
| `docker stop api` / `docker start api` | arrêter / relancer |
| `docker restart api` | redémarrer |
| `docker rm api` | supprimer (arrêté) ; `-f` pour forcer |
| `docker logs -f api` | suivre les logs |
| `docker logs --tail 100 api` | les 100 dernières lignes |
| `docker exec -it api sh` | ouvrir un terminal **dans** un conteneur |
| `docker inspect api` | tout le détail (IP, variables, volumes) |
| `docker stats` | CPU et mémoire en direct |

## Les images

| Commande | Rôle |
|---|---|
| `docker build -t cinetrack-api .` | construire depuis le Dockerfile du dossier |
| `docker images` | lister les images |
| `docker pull postgres:17` | télécharger |
| `docker rmi image` | supprimer une image |
| `docker history image` | la taille de chaque couche |

## Les options de `docker run`

| Option | Effet |
|---|---|
| `-d` | en arrière-plan |
| `--name api` | donner un nom |
| `-p 3000:3000` | publier un port (machine:conteneur) |
| `-e CLE=valeur` / `--env-file .env` | variables d'environnement |
| `-v db-data:/var/lib/postgresql/data` | un volume |
| `--rm` | supprimer le conteneur à l'arrêt |
| `-it` | mode interactif (pour un terminal) |
| `--network nom` | rejoindre un réseau |

## Compose

| Commande | Rôle |
|---|---|
| `docker compose up -d` | tout lancer |
| `docker compose logs -f api` | logs d'un service |
| `docker compose exec db psql -U cinetrack` | entrer dans un service |
| `docker compose down` | tout arrêter |

Détails : [[DK-03-Docker-Compose|Docker Compose]].

## Faire de la place

| Commande | Supprime |
|---|---|
| `docker system df` | (affiche l'espace utilisé) |
| `docker container prune` | les conteneurs arrêtés |
| `docker image prune` | les images sans nom |
| `docker builder prune` | le cache de construction |
| `docker system prune` | tout ce qui est inutilisé (**sauf volumes**) |
| `docker system prune --volumes` | ⚠️ **y compris les volumes** (données des bases) |

## Le déroulé de débogage

1. `docker ps -a` : le conteneur tourne-t-il ? S'est-il arrêté ?
2. `docker logs api` : que dit-il ?
3. `docker exec -it api sh` : entrer et vérifier (fichiers, variables avec `env`).
4. `docker inspect api` : ports, réseau, volumes.
