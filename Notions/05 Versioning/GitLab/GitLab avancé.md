---
type: notion
statut: a apprendre
resume: "Au-delà du code et des pipelines, GitLab fournit : un registre d'images Docker, un hébergement de sites statiques (Pages), des analyses de sécurité automatiques et des environnements de déploiement suivis."
revu:
sources:
  - "https://docs.gitlab.com/user/application_security/"
---
# GitLab avancé

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Au-delà du code et des pipelines, GitLab fournit : un **registre d'images Docker**, un **hébergement de sites statiques** (Pages), des **analyses de sécurité automatiques** et des **environnements** de déploiement suivis.

## Le problème

**Pourquoi c'est utile ?**
Pour utiliser les services en plus de GitLab : registre d'images, Pages, analyses de sécurité, environnements.

**Qu'est-ce qui se passait sans ça ?**
Il fallait un outil différent pour chaque besoin, chacun avec ses accès et sa configuration.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Tu t'en serviras surtout au moment de mettre tes projets en ligne (M11).

### Ce qui existe

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

### Activer les analyses de sécurité

```yaml
include:
  - template: Jobs/SAST.gitlab-ci.yml
  - template: Jobs/Secret-Detection.gitlab-ci.yml
  - template: Jobs/Dependency-Scanning.gitlab-ci.yml
```

Les résultats apparaissent dans la MR. Certaines analyses demandent une licence payante sur le GitLab de l'entreprise : renseigne-toi.

### Les environnements

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

GitLab garde l'historique des déploiements et permet de **redéployer une version précédente** en un clic. Voir [[Stratégies de déploiement]].

## 🧪 Exemple

### Construire et stocker une image Docker

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

Les variables `$CI_REGISTRY…` sont fournies automatiquement par GitLab. Voir [[Registry Docker|Registry]].

## ⚠️ Limites et pièges

- **Ignorer les alertes de sécurité** parce qu'elles sont nombreuses : trie-les, mais traite au moins les critiques.
- **Laisser le registre grossir** indéfiniment : configure une politique de nettoyage des vieilles images.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux GitLab]]
- **Voir aussi :** [[Pipeline GitLab CI]], [[Registry Docker]], [[OWASP Top 10]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.gitlab.com/user/application_security/
