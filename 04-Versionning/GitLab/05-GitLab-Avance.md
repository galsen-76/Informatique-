---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M11
tags:
  - outils/gitlab/avance
aliases:
  - "GitLab Avancé"
parent: "[[GitLab]]"
children: []
related_theory:
  - "[[03-CI-CD|CI/CD GitLab]]"
  - "[[DK-06-Registry-Docker-Hub|Registry & Docker Hub]]"
  - "[[SEC-02-OWASP-Top-10|Vulnérabilités OWASP Top 10]]"
related_snippets:
  - "[[04_Snippets/05-gitlab-avance]]"
related_projects: []
source: "https://docs.gitlab.com/user/application_security/"
---

# GitLab Avancé

> [!abstract] Introduction
> Ces fonctionnalités complètent le pipeline de base : stockage d'images (Container Registry), hébergement de sites statiques (Pages), scans de sécurité automatiques (SAST, dépendances, secrets), environnements.

> [!warning]- Prérequis
> [[03-CI-CD|CI/CD GitLab]]

---

## Théorie

> [!question]- C'est quoi ?
> - **Container Registry** : stockage d'images Docker liées au projet
> - **Package Registry** : paquets npm/maven privés
> - **GitLab Pages** : hébergement de sites statiques générés depuis le repo
> - **SAST / Dependency Scanning / Secret Detection** : analyse automatique du code, des dépendances et des secrets commités
> - **Environments** : suivi de ce qui est déployé où

> [!example]- Analogie
> Le pipeline de base est une chaîne de montage ; ces briques ajoutent l'entrepôt, le service qualité-sécurité et le transporteur.

> [!question]- Pourquoi l'utiliser ?
> Garder build, sécurité et hébergement dans le même écosystème que le code : versionner les images comme le code, détecter des failles avant la production, savoir ce qui tourne en recette/prod.

> [!question]- Comment ça marche ?
> ```text
> Job CI/CD
> ├── docker push       → Container Registry
> ├── pages:            → publication automatique (GitLab Pages)
> └── include: template → rapports SAST / dépendances dans la MR
> ```
> Correction : `include` est un mot-clé de **premier niveau** du fichier (pas à l'intérieur d'un job).

> [!question]- Quand l'utiliser ?
> - Registry : dès qu'un projet est conteneurisé
> - Pages : documentation technique ou site statique
> - SAST/Secret Detection : souvent imposés par les standards de sécurité en entreprise

> [!danger]- Quand NE PAS l'utiliser / Limites
> Certaines fonctionnalités (tableaux de vulnérabilités, approbations de sécurité) sont réservées aux licences Premium/Ultimate.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Registry | Stockage d'images/paquets |
| SAST | Analyse statique de sécurité du code |
| Dependency scanning | Détection de dépendances vulnérables |
| Environment | Cible de déploiement suivie (staging, production) |

---

## Points clés

- Extensions du pipeline, pas des concepts séparés
- Rapports de sécurité visibles dans la MR
- Pages nécessite un job nommé `pages` produisant un dossier `public`

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Placer `include` dans un job (syntaxe invalide)
> - Ignorer les rapports de vulnérabilités « parce que le pipeline passe »

---

## Exemple minimal

```yaml
include:
  - template: Jobs/SAST.gitlab-ci.yml
  - template: Jobs/Secret-Detection.gitlab-ci.yml
  - template: Jobs/Dependency-Scanning.gitlab-ci.yml

stages: [build, test, deploy]

docker-build:
  stage: build
  image: docker:27
  services: [docker:27-dind]
  script:
    - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" "$CI_REGISTRY"
    - docker build -t "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA" .
    - docker push "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
```

> [!note] Ce que j'en retiens
> Ces briques transforment le pipeline en chaîne complète : build → test → sécurité → publication/déploiement.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Politiques de sécurité, environnements dynamiques par MR (review apps)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[GitLab]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/05-gitlab-avance]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Où se place `include` dans un `.gitlab-ci.yml` ?

---

## Tâches

- [ ] #task Vérifier si Registry ou SAST sont déjà utilisés sur les projets Assystem
- [ ] #task Regarder un rapport de sécurité généré par une MR existante
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Ces fonctionnalités sont-elles disponibles dans l'offre GitLab d'Assystem (certaines sont Premium/Ultimate) ?
