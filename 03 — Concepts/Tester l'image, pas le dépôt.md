---
type: concept
module: "[[Module 14 - DevOps et déploiement]]"
related:
  - "[[Construire une image dans la CI]]"
tags:
  - concept
  - devops
---
# Tester l'image, pas le dépôt

> [!info] En une phrase
> Dans une CI qui construit des images, les tests tournent dans l'image construite : ils vérifient ce qui sera livré, pas les fichiers du dépôt.

## 1 · Comprendre
### Définition
Une pipeline sérieuse construit l'image **puis** lance les tests **dans cette image** (`docker run mon-image pytest`). Le test vérifie donc le contenu réel de l'image : le code copié par le Dockerfile, les paquets installés, la configuration.

### Pourquoi ça existe
Ce qui part en production, c'est l'image. Tester le dépôt à côté prouverait seulement que le code marche **sur le runner**, pas dans l'image.

### Le problème résolu
« Les tests passent mais l'image est cassée » : un fichier oublié par `COPY`, un paquet absent de `requirements.txt`, une variable non définie dans l'image.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  B[build image] --> P[push tag]
  P --> T[run pytest]
  T --> L[publier]
```

### Exemple concret
```yaml
test:
  stage: test
  needs: [build]
  image: docker:24
  services: [docker:24-dind]
  script:
    - docker pull "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
    - docker run --rm "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA" pytest -v tests/
```
Conséquences :
- Corriger un test ou du code dans le dépôt **ne suffit pas** : il faut **reconstruire l'image** pour que le test voie la correction.
- Si le test échoue sur un fichier « qui existe pourtant », vérifie qu'il est bien **dans l'image** (`.dockerignore`, `COPY`).

### Cas d'utilisation
- Ta propre image de script : `docker run mon-zipper` avec un dossier de test monté

> [!warning] À ne pas confondre
> Le dossier du dépôt sur le runner (`$CI_PROJECT_DIR`) et le système de fichiers **de l'image**. Et un test qu'on « débloque » en le désactivant ne prouve plus rien : lis d'abord ce qu'il vérifie.

## 3 · Relier
- **Au travail** : [Tester l'image, pas le dépôt au travail](obsidian://open?vault=Travail&file=Tester%20l%27image%2C%20pas%20le%20d%C3%A9p%C3%B4t%20au%20travail)
- **Prérequis** : [[Image Docker]] · [[Test automatisé]] · [[Pipeline GitLab CI]]
- **Complémentaires** : [[Construire une image dans la CI]]
- **Utilisé par** : [[Fiche - Réflexes pour déboguer une pipeline]]
