---
type: knowledge
category: apprentissages
source: "https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-registry/"
created: 2026-11-05
tags:
  - knowledge
  - docker
---
# Registry Docker

> [!tip] À retenir
> Un registry est un entrepôt d'images : on y pousse (push) une image construite une fois, et on la récupère (pull) ailleurs.

## Le problème
**Pourquoi ça existe ?**
Pour partager une image entre ton poste, la CI et les serveurs sans la reconstruire partout.

**Qu'est-ce qui se passait sans ça ?**
Chaque machine reconstruisait l'image, avec le risque d'obtenir des résultats différents d'une machine à l'autre.

## Points clés
Le nom complet d'une image dit **où elle est rangée** :

```text
registre.exemple.com/equipe/projet/api:1.2.0
└──── registre ────┘└─ chemin ──┘└nom┘└tag┘
```

- **Pas de registre dans le nom** = Docker Hub. `python:3.11-slim` veut dire `docker.io/library/python:3.11-slim`.
- **Le tag** est la version. Sans tag, c'est `latest`.
- Registres courants : **Docker Hub** (public), le **registry GitLab** du projet, le **Nexus** de l'entreprise (voir [[Nexus et proxy d'images Docker]]).

| Commande | Effet |
| --- | --- |
| `docker login <registre>` | s'authentifier |
| `docker tag monapp:1.0 <registre>/equipe/monapp:1.0` | donner à l'image un nom qui indique où l'envoyer |
| `docker push <registre>/equipe/monapp:1.0` | envoyer l'image |
| `docker pull <registre>/equipe/monapp:1.0` | récupérer l'image |

## Exemple
```bash
docker login registry.gitlab.com
docker build -t registry.gitlab.com/equipe/projet/api:1.2.0 .
docker push registry.gitlab.com/equipe/projet/api:1.2.0

# sur une autre machine
docker pull registry.gitlab.com/equipe/projet/api:1.2.0
```

## Points d'attention
- **`latest` n'est pas une version** : utiliser des tags précis (`1.2.0`, ou l'identifiant du commit).
- **Docker Hub limite le nombre de `pull`** sans compte : en CI, ça peut bloquer les builds.
- **Une image publique est visible par tous** : jamais de secret dedans.

## Avec mes mots
*Explique avec tes mots, comme à un collègue : ce que tu as compris, et ce qui reste flou.*


## Liens
- Prérequis : [[Docker image conteneur et Dockerfile]]
- Voir aussi : [[Nexus et proxy d'images Docker]], [[Construire une image Docker dans GitLab CI]]
- Utilisé dans : projet CVAT (CI GitLab + Nexus)
