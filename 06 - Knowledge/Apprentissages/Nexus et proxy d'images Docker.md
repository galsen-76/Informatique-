---
type: knowledge
category: apprentissages
source: "https://help.sonatype.com/en/docker-registry.html"
created: 2026-11-05
tags:
  - knowledge
  - docker
  - nexus
---
# Nexus et proxy d'images Docker

> [!tip] À retenir
> Nexus est l'entrepôt interne de l'entreprise : il garde une copie des images de Docker Hub (proxy) et stocke les images de l'équipe (hosted).

## Le problème
**Pourquoi ça existe ?**
Pour que les postes, les runners et les serveurs récupèrent images et paquets à un seul endroit, contrôlé, sans sortir sur Internet.

**Qu'est-ce qui se passait sans ça ?**
Chaque machine allait sur Docker Hub : builds bloqués par les limites de téléchargement, images impossibles à récupérer derrière le pare-feu, et aucune idée de ce qui entrait dans l'entreprise.

## Points clés
Nexus (de Sonatype) gère des **dépôts** de trois types :

| Type | Rôle | On y fait |
| --- | --- | --- |
| **proxy** | copie en cache d'un registre externe : Nexus va chercher l'image la première fois, puis la garde | `pull` |
| **hosted** | dépôt interne pour les images de l'équipe | `push` et `pull` |
| **group** | une seule adresse qui regroupe plusieurs dépôts (proxy + hosted) | `pull` |

Un dépôt Docker Nexus est exposé à une adresse, souvent avec un port dédié. On met cette adresse **devant le nom de l'image**, comme pour n'importe quel [[Registry Docker|registry]].

Nexus ne gère pas que Docker : le même serveur sert souvent de proxy pour **npm**, **pip** et **apt**.

## Exemple
```text
python:3.11-slim                                          # Docker Hub (implicite)
docker.io/library/python:3.11-slim                        # la même, nom complet
nexus.mon-entreprise.com:8082/library/python:3.11-slim    # la même, via le proxy Nexus
```

```bash
docker login nexus.mon-entreprise.com:8082
docker pull nexus.mon-entreprise.com:8082/library/python:3.11-slim
```

## Points d'attention
- **`library/`** : les images officielles de Docker Hub (`python`, `node`, `nginx`…) sont rangées sous `library/`. L'oublier donne une erreur « not found ».
- **On pousse vers un hosted, jamais vers un proxy** : un `push` vers le proxy est refusé.
- **Changer le `FROM` ne suffit pas toujours** : si le Dockerfile fait `apt-get install`, `pip install` ou `npm ci`, ces paquets viennent aussi d'Internet et doivent passer par leurs propres proxys Nexus.
- **Le runner aussi doit s'authentifier** pour récupérer l'`image:` d'un job depuis Nexus : variable `DOCKER_AUTH_CONFIG` (voir [[Variables CI CD GitLab]]).
- **Les adresses et les noms de dépôts sont propres à chaque entreprise** : demande-les à l'équipe qui gère Nexus.

## Avec mes mots
*Explique avec tes mots, comme à un collègue : ce que tu as compris, et ce qui reste flou.*


## Liens
- Prérequis : [[Registry Docker]], [[Docker image conteneur et Dockerfile]]
- Voir aussi : [[ARG et images de base paramétrables]], [[Variables CI CD GitLab]]
- Utilisé dans : projet CVAT (CI GitLab + Nexus)
