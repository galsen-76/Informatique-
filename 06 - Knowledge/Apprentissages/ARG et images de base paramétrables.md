---
type: knowledge
category: apprentissages
source: "https://docs.docker.com/reference/dockerfile/#arg"
created: 2026-11-05
tags:
  - knowledge
  - docker
---
# ARG et images de base paramétrables

> [!tip] À retenir
> ARG déclare une variable de build : on change sa valeur avec --build-arg, et on peut même s'en servir dans le FROM pour choisir d'où vient l'image de base.

## Le problème
**Pourquoi ça existe ?**
Pour construire des variantes d'une même image (une autre version, un autre registre) sans dupliquer ni modifier le Dockerfile.

**Qu'est-ce qui se passait sans ça ?**
On copiait le Dockerfile pour chaque variante, ou on le modifiait à la main avant chaque build. Les copies divergeaient et les modifications étaient oubliées.

## Points clés
- `ARG NOM=valeur` déclare une variable, avec une valeur par défaut.
- `docker build --build-arg NOM=autre` change sa valeur au moment du build.
- **Un `ARG` peut être placé avant le `FROM`** : c'est le seul cas où une instruction précède le `FROM`. Il sert alors à paramétrer l'image de base.

| | `ARG` | `ENV` |
| --- | --- | --- |
| Existe pendant | le build seulement | le build **et** l'exécution du conteneur |
| Se change avec | `docker build --build-arg` | `docker run -e` |

## Exemple
```dockerfile
ARG PYTHON_VERSION=3.11
FROM python:${PYTHON_VERSION}-slim
ARG APP_VERSION=dev
RUN echo "Version $APP_VERSION" > /version.txt
```

```bash
docker build --build-arg PYTHON_VERSION=3.12 --build-arg APP_VERSION=1.4.0 -t mon-app .
```

## Points d'attention
- **Un `ARG` déclaré avant `FROM` n'existe plus après** : pour s'en servir ensuite, il faut le redéclarer (`ARG PYTHON_VERSION` sans valeur) après le `FROM`.
- **Multi-stage** : chaque `FROM` démarre une nouvelle étape, et les `ARG` d'une étape ne passent pas à la suivante.
- **Pas de secret dans un `ARG`** : sa valeur reste visible avec `docker history`.
- **Un `--build-arg` qui ne correspond à aucun `ARG`** est ignoré avec un simple avertissement : une faute de frappe passe inaperçue.

## Avec mes mots
*Explique avec tes mots, comme à un collègue : ce que tu as compris, et ce qui reste flou.*


## Liens
- Prérequis : [[Docker image conteneur et Dockerfile]]
- Voir aussi : [[Nexus et proxy d'images Docker]]
- Utilisé dans : projet CVAT (CI GitLab + Nexus)
