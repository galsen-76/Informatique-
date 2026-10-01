---
created: 2026-10-01
modified: 2026-10-01
type: knowledge
status: "🟡 In Progress"
level: Fondamental
tags:
  - tests/squash
  - docker
aliases:
  - "Docker pour Squash TM"
parent: "[[Squash TM]]"
related_theory:
  - "[[DK-01-Fondamentaux|Fondamentaux Docker]]"
---

# Docker

## Introduction

Docker évite d'installer à la main tout ce dont [[Squash TM]] a besoin (Java, la base de données, la configuration…). L'application est **emballée avec tout ce qu'il lui faut**, et se lance en une commande.

## 1. Le vocabulaire

| Terme | Définition |
| --- | --- |
| **Image** | un modèle figé (par exemple l'image Squash TM), téléchargé depuis **Docker Hub** |
| **Conteneur** | une image en train de tourner. Image = la recette, conteneur = le plat |
| **Volume** | un dossier qui **survit** au conteneur (par exemple les données de la base) |
| **Port** | `8090:8080` = le port 8080 du conteneur est accessible sur le port 8090 de la machine |

```
Image -> docker compose up -> Conteneur en marche
                                |
                                |-- Volume : les données restent même si le conteneur est supprimé
                                |-- Port 8090 de la machine -> port 8080 du conteneur
```

## 2. Le fichier docker-compose.yml

On **clone un dépôt** pour récupérer le fichier `docker-compose.yml` et la configuration. On ne clone **pas** Squash lui-même.

Le `docker-compose.yml` est la **recette d'assemblage** de plusieurs conteneurs : Squash TM + la base de données.

#### Comment ça fonctionne ?

```bash
docker compose up -d
```

```
docker compose up -d
 |
 |-- lit le fichier docker-compose.yml
 |-- télécharge les images
 |-- crée un réseau privé entre les conteneurs
 |-- démarre la base de données, puis Squash TM
 |
 -> Squash TM accessible sur http://localhost:8090
```

## 3. Les commandes

| Commande | Rôle |
| --- | --- |
| `docker compose up -d` | démarrer (en arrière-plan) |
| `docker compose down` | arrêter et supprimer les conteneurs (les volumes sont conservés) |
| `docker compose ps` | voir les conteneurs et leur état |
| `docker compose logs -f` | suivre les messages (logs) en direct |

## 4. L'installation

- **Docker Desktop** : sous Windows (avec WSL 2) et Mac.
- **Docker Engine** : sous Linux.

Sur un PC d'entreprise :
- les **droits administrateur** sont souvent nécessaires ;
- **Docker Desktop est payant** pour les grandes entreprises : vérifier la licence, ou utiliser **Rancher Desktop** ou **Podman Desktop**.

Les ressources :
- **16 Go de RAM** : confortable ;
- **8 Go** : possible, mais juste ;
- commencer par **Squash TM seul** (sans [[Squash Orchestrator]]).
