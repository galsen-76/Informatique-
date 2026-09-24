---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
tags:
  - outils/gitlab/ci-cd
aliases:
  - "CI/CD GitLab"
parent: "[[GitLab]]"
children: []
related_theory:
  - "[[CICD-01-Fondamentaux|Fondamentaux CI/CD]]"
  - "[[CICD-02-Pipeline-Full-Stack|Pipeline CI/CD Full Stack]]"
related_snippets:
  - "[[04_Snippets/03-ci-cd]]"
related_projects: []
source: "https://docs.gitlab.com/ci/"
---

# CI/CD GitLab

> [!abstract] Introduction
> GitLab CI/CD automatise le build, les tests et le déploiement du code à chaque modification, via un fichier `.gitlab-ci.yml` exécuté par des runners.

> [!warning]- Prérequis
> [[01-GitLab|Fondamentaux GitLab]]

---

## Théorie

> [!question]- C'est quoi ?
> Une chaîne automatisée (**pipeline**) définie dans `.gitlab-ci.yml`, exécutée à chaque push, MR ou tag. Elle est composée de **stages** (étapes) contenant des **jobs**, exécutés par des **runners**.

> [!example]- Analogie
> Une chaîne de contrôle qualité automatique en usine : chaque pièce (commit) passe par les mêmes postes de vérification avant d'être expédiée.

> [!question]- Pourquoi l'utiliser ?
> - Garantir que le code compile et passe les tests avant merge
> - Automatiser le déploiement vers différents environnements
> - Centraliser les vérifications (lint, sécurité)

> [!question]- Comment ça marche ?
> ```text
> Pipeline
> ├── Stage: build   → jobs de compilation
> ├── Stage: test    → jobs de test (en parallèle)
> └── Stage: deploy  → jobs de déploiement
> ```
> Mots-clés essentiels : `stages`, `image`, `script`, `rules` (conditions ; préférer `rules` à l'ancien `only/except`), `needs` (dépendances entre jobs, pipeline DAG), `artifacts`, `cache`, `variables`, `environment`, `when: manual`.

> [!question]- Quand l'utiliser ?
> Sur tout projet en production ou en équipe — c'est le filet de sécurité avant merge/déploiement.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un pipeline lent (> 15 min) décourage les petites MR : optimiser cache, parallélisme et `needs`.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Pipeline | Exécution complète des jobs pour un commit |
| Stage | Grande étape ordonnée |
| Job | Tâche précise exécutée par un runner |
| Runner | Machine/agent qui exécute les jobs |
| Artifact | Fichier produit par un job, transmis aux suivants |

---

## Points clés

- Les jobs d'un même stage tournent en parallèle
- Variables CI/CD (Settings > CI/CD) pour les secrets, masquées et protégées
- Artifacts pour transmettre, cache pour accélérer
- `rules` plutôt que `only/except`

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Secrets écrits en dur dans `.gitlab-ci.yml`
> - Cache de `node_modules` mal configuré (clé non liée au lockfile)

---

## Paramètres / Configuration

| Mot-clé | Rôle |
|---|---|
| `stages` | Ordre des grandes étapes |
| `script` | Commandes exécutées par le job |
| `rules` | Conditions de déclenchement |
| `needs` | Démarrer dès qu'un job précis est fini |
| `artifacts` | Fichiers à conserver après le job |
| `cache` | Dépendances réutilisées entre pipelines |

---

## Exemple minimal

```yaml
stages: [install, test, build]
default:
  image: node:22
  cache:
    key: { files: [package-lock.json] }
    paths: [.npm/]
install:
  stage: install
  script: [npm ci --cache .npm --prefer-offline]
  artifacts: { paths: [node_modules/], expire_in: 1h }
lint:
  stage: test
  needs: [install]
  script: [npm run lint]
test:
  stage: test
  needs: [install]
  script: [npm test -- --watch=false]
build:
  stage: build
  needs: [install]
  script: [npm run build]
  artifacts: { paths: [dist/] }
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

> [!note] Ce que j'en retiens
> Le pipeline est le contrôle qualité automatique avant qu'un changement n'atteigne la production.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Templates partagés (`include`), pipelines parents/enfants, environnements de review par MR

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[GitLab]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[CICD-01-Fondamentaux|GitHub Actions]]

**Pratique :**
- Extrait de code → [[04_Snippets/03-ci-cd]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre `artifacts` et `cache` ?

---

## Tâches

- [ ] #task Lire un `.gitlab-ci.yml` réel chez Assystem
- [ ] #task Identifier les runners utilisés (partagés vs dédiés)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Quels environnements de déploiement sont configurés chez Assystem (staging, prod) ?
