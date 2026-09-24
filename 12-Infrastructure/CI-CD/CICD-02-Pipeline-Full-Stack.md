---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M11
tags:
  - infra/pipeline
aliases:
  - "Pipeline CI/CD Full Stack"
parent: "[[Infrastructure]]"
children: []
related_theory:
  - "[[CICD-01-Fondamentaux|Fondamentaux CI/CD]]"
  - "[[03-CI-CD|CI/CD GitLab]]"
  - "[[DK-08-Multi-stage-Builds|Multi-stage Builds Docker]]"
related_snippets:
  - "[[04_Snippets/cicd-02-pipeline-full-stack]]"
related_projects:
  - "[[02_Projects/CinéTrack-Fullstack]]"
source: "https://docs.gitlab.com/ci/yaml/"
---

# Pipeline CI/CD Full Stack

> [!abstract] Introduction
> Exemple complet de pipeline GitLab pour un monorepo front (Angular ou Vue) + API NestJS : qualité, tests avec PostgreSQL, build d'images Docker, déploiement recette puis production.

> [!warning]- Prérequis
> [[03-CI-CD|CI/CD GitLab]], [[DK-08-Multi-stage-Builds|Multi-stage Builds Docker]]

---

## Théorie

> [!question]- C'est quoi ?
> ```yaml
> stages: [quality, test, build, deploy]
> default:
>   image: node:22
>   cache: { key: { files: [package-lock.json] }, paths: [.npm/] }
>   before_script: [npm ci --cache .npm --prefer-offline]
>
> lint:
>   stage: quality
>   script: [npm run lint, npm run typecheck]
>
> test-front:
>   stage: test
>   script: [npm run test --workspace=front -- --run --coverage]
>   coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
>
> test-api:
>   stage: test
>   services: [postgres:17]
>   variables: { POSTGRES_DB: test, POSTGRES_USER: test, POSTGRES_PASSWORD: test, DATABASE_URL: "postgresql://test:test@postgres:5432/test" }
>   script: [npx prisma migrate deploy --schema api/prisma/schema.prisma, npm run test:e2e --workspace=api]
>
> .docker:
>   stage: build
>   image: docker:27
>   services: [docker:27-dind]
>   before_script: [docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" "$CI_REGISTRY"]
>   rules: [{ if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH }]
>
> build-api:
>   extends: .docker
>   script:
>     - docker build -t $CI_REGISTRY_IMAGE/api:$CI_COMMIT_SHORT_SHA -f api/Dockerfile .
>     - docker push $CI_REGISTRY_IMAGE/api:$CI_COMMIT_SHORT_SHA
>
> deploy-recette:
>   stage: deploy
>   image: alpine:3.20
>   environment: { name: recette, url: https://recette.cinetrack.fr }
>   script: [./scripts/deploy.sh recette $CI_COMMIT_SHORT_SHA]
>   rules: [{ if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH }]
>
> deploy-prod:
>   extends: deploy-recette
>   environment: { name: production, url: https://cinetrack.fr }
>   script: [./scripts/deploy.sh production $CI_COMMIT_SHORT_SHA]
>   when: manual
> ```

> [!example]- Analogie
> Le plan de vol complet d'un avion : chaque étape est vérifiée, et le décollage en production nécessite l'accord du commandant (bouton manuel).

> [!question]- Pourquoi l'utiliser ?
> Voir comment toutes les notions (tests, BDD de test, Docker, registry, environnements, secrets) s'assemblent dans un vrai projet.

> [!question]- Comment ça marche ?
> Points clés :
> - `before_script` + cache npm par lockfile
> - Service PostgreSQL éphémère pour les tests d'API
> - Images taguées par SHA, construites seulement sur `main`
> - `environment` : GitLab suit ce qui est déployé où
> - Production : `when: manual` (continuous delivery)
> - Migrations BDD appliquées par le script de déploiement AVANT de basculer le trafic

> [!question]- Quand l'utiliser ?
> Projet full stack d'équipe ou projet perso « vitrine » pour le portfolio.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Docker-in-Docker nécessite des runners privilégiés ; alternatives : Kaniko, Buildah.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Monorepo | Front et back dans le même dépôt |
| dind | Docker in Docker |
| Environment | Cible de déploiement suivie par GitLab |
| `extends` | Héritage de configuration entre jobs |

---

## Points clés

- Qualité → tests → build → déploiement
- Même image en recette et en prod
- Production manuelle au début
- Migrations avant bascule

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Déployer sans avoir exécuté les migrations
> - Variables sensibles non masquées dans les logs

---

## Exemple minimal

```bash
# scripts/deploy.sh (simplifié, sur un VPS)
ssh deploy@$HOST "cd /srv/cinetrack && \
  TAG=$2 docker compose pull && \
  TAG=$2 docker compose run --rm api npx prisma migrate deploy && \
  TAG=$2 docker compose up -d"
```

> [!note] Ce que j'en retiens
> Pull, migrer, redémarrer : trois étapes reproductibles.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Review apps par MR, rollback automatisé, déploiement GitOps (Argo CD)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Infrastructure]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/cicd-02-pipeline-full-stack]]
- Projet → [[02_Projects/CinéTrack-Fullstack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi les migrations doivent-elles être compatibles avec l'ancienne version du code ?

---

## Tâches

- [ ] #task Mettre en place ce pipeline sur CinéTrack (GitLab.com gratuit)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
