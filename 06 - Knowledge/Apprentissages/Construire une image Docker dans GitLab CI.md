---
type: knowledge
category: apprentissages
source: "https://docs.gitlab.com/ee/ci/docker/using_docker_build.html"
created: 2026-11-05
tags:
  - knowledge
  - gitlab-ci
  - docker
---
# Construire une image Docker dans GitLab CI

> [!tip] À retenir
> Un job tourne déjà dans un conteneur : pour y construire une image, on ajoute un démon Docker à côté (Docker-in-Docker) ou on utilise un outil sans démon (Kaniko).

## Le problème
**Pourquoi ça existe ?**
Pour que la CI construise et publie les images à chaque version, sans passer par le poste d'un développeur.

**Qu'est-ce qui se passait sans ça ?**
Les images étaient construites à la main sur un poste et poussées sans trace : impossible de savoir quel code était dedans.

## Points clés
Avec **Docker-in-Docker** (`dind`) :
- `image: docker:24` fournit le client `docker` ;
- `services: - docker:24-dind` lance un démon Docker à côté du job ;
- le job fait ensuite `docker login`, `docker build`, `docker push`.

Les variables fournies par GitLab donnent l'adresse du registry du projet (`$CI_REGISTRY`, `$CI_REGISTRY_IMAGE`) et un identifiant de commit pour le tag (`$CI_COMMIT_SHORT_SHA`).

Si le runner n'a pas le droit de lancer Docker-in-Docker, voir [[Kaniko construire une image sans Docker]].

## Exemple
```yaml
build-image:
  image: docker:24
  services:
    - docker:24-dind
  script:
    - echo "$CI_REGISTRY_PASSWORD" | docker login -u "$CI_REGISTRY_USER" --password-stdin "$CI_REGISTRY"
    - docker build -t "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA" .
    - docker push "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
```

## Points d'attention
- **`docker:dind` demande un runner en mode privilégié** : à voir avec l'équipe qui gère les runners, c'est souvent refusé.
- **Les images `docker:` et `docker:dind`** viennent elles aussi de Docker Hub : derrière un Nexus, il faut les récupérer via le proxy.
- **Un projet avec plusieurs Dockerfile** demande un `docker build -f` par image, donc souvent un job par image.

## Avec mes mots
*Explique avec tes mots, comme à un collègue : ce que tu as compris, et ce qui reste flou.*


## Liens
- Prérequis : [[Pipeline GitLab CI]], [[Registry Docker]]
- Voir aussi : [[Kaniko construire une image sans Docker]], [[Variables CI CD GitLab]]
- Utilisé dans : projet CVAT (CI GitLab + Nexus)
