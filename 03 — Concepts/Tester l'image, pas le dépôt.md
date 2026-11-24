---
type: concept
domain: devops
module: "[[Module 14 - DevOps et déploiement]]"
status: a-decouvrir
level: intermediaire
niveau: 3
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Image Docker]]"
  - "[[Test automatisé]]"
  - "[[Pipeline GitLab CI]]"
parents: []
related:
  - "[[Construire une image dans la CI]]"
next_review: 
tags:
  - concept
  - devops
---
# Tester l'image, pas le dépôt

> [!info] En une phrase
> Dans une CI qui construit des images, les tests tournent dans l'image construite : ils vérifient ce qui sera livré, pas les fichiers du dépôt.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

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

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] ⚖️ Avant / après
> Avant / après : des tests lancés sur le code du dépôt, puis dans l'image construite. Dessine un bug qui passe dans le premier cas et qui est attrapé dans le second.

> [!example] 🛣️ Suis le trajet
> Dessine la pipeline : build de l'image, tests dans cette image, push seulement si les tests passent.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Tester l'image, pas le dépôt » et je l'intègre ici avec `![[Schéma - Tester l'image, pas le dépôt.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[MesDépenses Front 06 - La CI du front Vue]]
- [[Fil rouge 07 - Tester l'image et ranger la pipeline]]

## 4 · Relier
- **Au travail** : [Tester l'image, pas le dépôt au travail](obsidian://open?vault=Travail&file=Tester%20l%27image%2C%20pas%20le%20d%C3%A9p%C3%B4t%20au%20travail)
- **Prérequis** : [[Image Docker]] · [[Test automatisé]] · [[Pipeline GitLab CI]]
- **Complémentaires** : [[Construire une image dans la CI]]
- **Utilisé par** : [[Fiche - Réflexes pour déboguer une pipeline]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
