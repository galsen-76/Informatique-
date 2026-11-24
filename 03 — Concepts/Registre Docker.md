---
type: concept
module: "[[Module 13 - Docker]]"
related:
  - "[[Démon Docker]]"
  - "[[Dockerfile]]"
tags:
  - concept
  - devops
---
# Registre Docker

> [!info] En une phrase
> Un entrepôt d'images : on y pousse (push) une image construite une fois, et on la récupère (pull) ailleurs.

## 1 · Comprendre
### Définition
Un **registre** (*registry*) est un serveur qui stocke des [[Image Docker|images]]. Exemples : **Docker Hub** (public), le **registre GitLab** d'un projet, le registre interne d'une entreprise (Nexus, Artifactory).

### Pourquoi ça existe
Partager une image entre ton poste, la CI et les serveurs, sans la reconstruire partout.

### Le problème résolu
Chaque machine reconstruisait l'image, avec le risque d'obtenir un résultat différent.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart LR
  B[build] --> T[tag] --> P[push] --> Reg[(Registre)]
  Reg -- pull --> S[Serveur]
```

### Exemple concret
Le nom complet d'une image dit **où elle est rangée** :
```text
registre.exemple.com/equipe/projet/api:1.2.0
└──── registre ────┘└─ chemin ──┘└nom┘└tag┘
```
- **Pas de registre dans le nom** = Docker Hub : `python:3.11-slim` = `docker.io/library/python:3.11-slim`.
- **Le tag** est la version ; sans tag, c'est `latest`.

```bash
docker login registry.gitlab.com
docker build -t registry.gitlab.com/equipe/projet/api:1.2.0 .
docker push registry.gitlab.com/equipe/projet/api:1.2.0
docker pull registry.gitlab.com/equipe/projet/api:1.2.0   # sur une autre machine
```

### Les registres que tu croiseras
| Registre | Préfixe | Exemple |
| --- | --- | --- |
| Docker Hub | rien, ou `docker.io/` | `python:3.12-slim`, `cvat/server` |
| GitHub Container Registry | `ghcr.io/` | `ghcr.io/organisation/image:tag` |
| Registre GitLab | `registry.gitlab.com/` ou celui de ton GitLab | `$CI_REGISTRY_IMAGE` |
| Registre interne | `registre.interne.exemple.com:8082/` | miroir de Docker Hub |

### Miroir de registre
Un **miroir** (*mirror*) est un registre qui garde une copie d'un autre (souvent Docker Hub). Deux façons de s'en servir :
- **Écrire son adresse dans le nom** de l'image : `nexus…:8082/library/python:3.12-slim`. Explicite, marche partout.
- **Configurer le démon** (`registry-mirrors` dans `daemon.json`) : `docker pull python` passe par le miroir sans changer les noms. Ne marche que pour Docker Hub, et seulement là où le [[Démon Docker|démon]] est configuré.

Un projet open source peut publier ses images sur **plusieurs** registres (Docker Hub et ghcr.io) : le nom indiqué dans son `docker-compose.yml` dit lequel il utilise.

### Cas d'utilisation
- Publier les images construites par la CI
- Récupérer les images de base d'un Dockerfile

> [!warning] À ne pas confondre
> `latest` n'est **pas** une version : c'est juste le tag par défaut. Préférer un tag précis (`1.2.0`, ou l'identifiant du commit).

## 3 · Relier
- **Au travail** : [Registre Docker au travail](obsidian://open?vault=Travail&file=Registre%20Docker%20au%20travail)
- **Prérequis** : [[Image Docker]]
- **Notion parente** : [[Docker]]
- **Complémentaires** : [[Dockerfile]]
- **Utilisé par** : [[Construire une image dans la CI]]
- **Commandes** : [[docker login]] · [[docker tag]] · [[docker push]]
