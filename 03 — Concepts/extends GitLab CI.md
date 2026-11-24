---
type: concept
module: "[[Module 14 - DevOps et déploiement]]"
related:
  - "[[Règles d'un job GitLab (rules)]]"
tags:
  - concept
  - devops
---
# extends GitLab CI

> [!info] En une phrase
> Faire hériter un job d'un modèle commun avec extends:, pour ne pas recopier la même configuration dans chaque job.

## 1 · Comprendre
### Définition
`extends:` copie la configuration d'un autre job (souvent un **job caché**, dont le nom commence par `.`) puis applique par-dessus ce que le job redéfinit. Un job caché n'est jamais lancé : c'est un modèle.

### Pourquoi ça existe
Plusieurs jobs partagent la même image, les mêmes services, le même `before_script` (connexion au registre).

### Le problème résolu
Le même bloc recopié dix fois : un changement (adresse du registre) oublié dans un des jobs.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  M[.docker-build] --> J1[build-server]
  M --> J2[build-ui]
```

### Exemple concret
```yaml
.docker-build:                     # modèle caché
  image: $NEXUS/docker:24
  services: [$NEXUS/docker:24-dind]
  before_script:
    - echo "$NEXUS_PASSWORD" | docker login -u "$NEXUS_USER" --password-stdin "$NEXUS"

build-server:
  extends: .docker-build
  script:
    - docker build -f Dockerfile -t "$NEXUS/cvat/server:$CI_COMMIT_SHORT_SHA" .

build-ui:
  extends: .docker-build
  script:
    - docker build -f Dockerfile.ui -t "$NEXUS/cvat/ui:$CI_COMMIT_SHORT_SHA" .
```
Les **dictionnaires** (`variables:`) sont fusionnés ; les **listes** (`script:`, `rules:`) sont **remplacées** entièrement. Le pipeline editor de GitLab (*Full configuration*) montre le résultat fusionné.

### Cas d'utilisation
- Un modèle commun pour tous les jobs qui construisent des images
- Lire la CI d'un gros projet qui en utilise beaucoup

> [!warning] À ne pas confondre
> `extends:` (héritage propre à GitLab, lisible) et les **ancres YAML** `&nom` / `<<: *nom` (mécanisme du YAML lui-même, qui ne marche pas entre fichiers inclus). Et redéfinir `script:` dans le job **remplace** celui du modèle, il ne s'y ajoute pas.

## 3 · Relier
- **Prérequis** : [[Pipeline GitLab CI]] · [[YAML]]
- **Complémentaires** : [[Règles d'un job GitLab (rules)]] · [[Construire une image dans la CI]]
