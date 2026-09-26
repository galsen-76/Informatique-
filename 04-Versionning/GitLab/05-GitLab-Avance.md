---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M11
tags:
  - outils/gitlab/avance
aliases:
  - "GitLab Avancé"
parent: "[[GitLab]]"
related_theory:
  - "[[03-CI-CD|CI/CD GitLab]]"
  - "[[DK-06-Registry-Docker-Hub|Registry & Docker Hub]]"
  - "[[SEC-02-OWASP-Top-10|Vulnérabilités OWASP Top 10]]"
related_projects: []
source: "https://docs.gitlab.com/user/application_security/"
---

# GitLab Avancé

> [!abstract] En bref
> Au-delà du code et des pipelines, GitLab fournit : un **registre d'images Docker**, un **hébergement de sites statiques** (Pages), des **analyses de sécurité automatiques** et des **environnements** de déploiement suivis. Tu t'en serviras surtout au moment de mettre tes projets en ligne (M11).

## Ce qui existe

| Fonctionnalité | Sert à | Dans tes projets |
|---|---|---|
| **Container Registry** | stocker les images Docker construites par le pipeline | l'image de CinéTrack-API |
| **GitLab Pages** | héberger gratuitement un site statique | le Portfolio |
| **Environments** | suivre ce qui est déployé où (staging, production), avec un bouton pour revenir en arrière | CinéTrack Full Stack |
| **SAST** | analyser ton code pour trouver des failles | tous |
| **Dependency Scanning** | détecter les librairies qui ont des failles connues | tous |
| **Secret Detection** | repérer un mot de passe ou une clé commitée par erreur | tous |
| **CODEOWNERS** | désigner qui doit relire quelles parties du code | en équipe |
| **Wiki** | documentation du projet | au choix |

## Construire et stocker une image Docker

```yaml
build-image:
  stage: build
  image: docker:27
  services: [docker:27-dind]
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
```

Les variables `$CI_REGISTRY…` sont fournies automatiquement par GitLab. Voir [[DK-06-Registry-Docker-Hub|Registry]].

## Activer les analyses de sécurité

```yaml
include:
  - template: Jobs/SAST.gitlab-ci.yml
  - template: Jobs/Secret-Detection.gitlab-ci.yml
  - template: Jobs/Dependency-Scanning.gitlab-ci.yml
```

Les résultats apparaissent dans la MR. Certaines analyses demandent une licence payante sur le GitLab de l'entreprise : renseigne-toi.

## Les environnements

```yaml
deploy-prod:
  stage: deploy
  script: ./deploy.sh
  environment:
    name: production
    url: https://cinetrack.fr
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      when: manual                 # bouton « Déployer » à cliquer
```

GitLab garde l'historique des déploiements et permet de **redéployer une version précédente** en un clic. Voir [[CICD-03-Strategies-Deploiement|Stratégies de déploiement]].

## Pièges

- **Ignorer les alertes de sécurité** parce qu'elles sont nombreuses : trie-les, mais traite au moins les critiques.
- **Laisser le registre grossir** indéfiniment : configure une politique de nettoyage des vieilles images.
