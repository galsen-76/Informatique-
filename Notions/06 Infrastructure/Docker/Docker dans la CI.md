---
type: notion
statut: a apprendre
resume: "Dans GitLab CI, chaque job tourne dans un conteneur : on choisit l'image avec image:, et on ajoute des conteneurs annexes avec services:."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Dans GitLab CI, **chaque job tourne dans un conteneur** : on choisit l'image avec `image:`, et on ajoute des conteneurs annexes avec `services:`.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour que la pipeline tourne toujours dans le même environnement, identique d'un runner à l'autre et identique à celui des développeurs.

**Qu'est-ce qui se passait sans ça ?**
Les runners étaient des machines installées à la main : la mauvaise version de Node ou un navigateur manquant faisait échouer la pipeline sans raison liée au code.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

**Choisir l'environnement d'un job** :
```yaml
test:
  image: node:22
  script:
    - npm ci
    - npm test
```

**Ajouter une base de données pour les tests** :
```yaml
test-integration:
  image: node:22
  services:
    - postgres:16
  variables:
    POSTGRES_PASSWORD: secret
    DB_HOST: postgres        # le service est joignable par son nom
  script:
    - npm ci
    - npm run test:integration
```

**Tests Playwright** avec l'image officielle, qui contient déjà les navigateurs :
```yaml
e2e:
  image: mcr.microsoft.com/playwright:v1.63.0-noble
  script:
    - npm ci
    - npx playwright test
```

**Construire et pousser une image** dans le registry du projet, avec les variables fournies par GitLab :
```yaml
build-image:
  image: docker:27
  services:
    - docker:27-dind
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
```

## ⚠️ Limites et pièges

- **La version de l'image Playwright doit correspondre** à celle de `@playwright/test` dans le `package.json`, sinon les navigateurs ne sont pas trouvés.
- **Le nom d'un service** est dérivé de l'image (`postgres:16` donne `postgres`). On peut le changer avec `alias`.
- **`docker:dind`** (Docker dans Docker) demande un runner configuré en mode privilégié : à voir avec l'équipe qui gère les runners.
- **Chaque job repart d'un conteneur neuf** : rien n'est gardé entre deux jobs, sauf avec `cache` ou `artifacts`.

## 🔗 Liens

- **Prérequis :** [[Docker]], [[Registry Docker]]
- **Voir aussi :** [[Docker Compose]]
- **Utilisé dans :** la pipeline GitLab (tests unitaires, intégration, Playwright, build d'image)

## 📚 Notes

- 
