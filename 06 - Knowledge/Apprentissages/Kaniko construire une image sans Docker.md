---
type: knowledge
category: apprentissages
source: "https://docs.gitlab.com/ee/ci/docker/using_kaniko.html"
created: 2026-11-05
tags:
  - knowledge
  - gitlab-ci
  - docker
---
# Kaniko construire une image sans Docker

> [!tip] À retenir
> Kaniko construit une image à partir d'un Dockerfile sans démon Docker : c'est l'alternative à docker:dind quand le runner n'a pas le mode privilégié.

## Le problème
**Pourquoi ça existe ?**
Pour construire des images dans une CI où l'on n'a pas le droit de lancer Docker, ce qui est fréquent en entreprise et sur Kubernetes.

**Qu'est-ce qui se passait sans ça ?**
Docker-in-Docker demande un runner **privilégié**, qui a presque tous les droits sur la machine. Beaucoup d'équipes sécurité le refusent : impossible de construire des images.

## Points clés
Kaniko lit le Dockerfile, exécute chaque instruction dans son propre conteneur et pousse directement le résultat dans le registre. Pas de `docker build` ni de `docker push` : une seule commande, `/kaniko/executor`.

| | `docker:dind` | Kaniko |
| --- | --- | --- |
| Runner privilégié | oui | non |
| Commandes | `docker build`, `docker push` | `/kaniko/executor --destination …` |
| Connexion au registre | `docker login` | un fichier `/kaniko/.docker/config.json` |
| Variables de build | `--build-arg` | `--build-arg`, même option |

## Exemple
```yaml
build-image:
  image:
    name: gcr.io/kaniko-project/executor:debug   # la variante debug contient un shell, nécessaire à GitLab
    entrypoint: [""]
  script:
    - /kaniko/executor
      --context "$CI_PROJECT_DIR"
      --dockerfile "$CI_PROJECT_DIR/Dockerfile"
      --destination "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
```

## Points d'attention
- **Pas de `docker login`** : les identifiants du registre s'écrivent dans `/kaniko/.docker/config.json` au début du script.
- **Prendre la variante `:debug`** : l'image normale n'a pas de shell, et le `script:` de GitLab ne peut pas s'exécuter.
- **Le projet d'origine (Google) a été archivé en 2025** : vérifie avec ton équipe quelle image elle utilise (un fork maintenu, ou une alternative comme Buildah).
- **L'image `executor` elle-même** vient d'un registre externe : derrière un Nexus, il faut la récupérer via le proxy.

## Avec mes mots
*Explique avec tes mots, comme à un collègue : ce que tu as compris, et ce qui reste flou.*


## Liens
- Prérequis : [[Construire une image Docker dans GitLab CI]]
- Voir aussi : [[Registry Docker]], [[Nexus et proxy d'images Docker]]
- Utilisé dans : projet CVAT (CI GitLab + Nexus)
