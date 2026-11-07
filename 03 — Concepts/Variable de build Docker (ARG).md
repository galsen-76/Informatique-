---
type: concept
domain: devops
module: "[[Module 13 - Docker]]"
status: maitrise
level: intermediaire
prerequisites:
  - "[[Dockerfile]]"
parents:
  - "[[Dockerfile]]"
related:
  - "[[Nexus]]"
next_review: 
method: []
tags:
  - concept
  - devops
---
# Variable de build Docker (ARG)

> [!info] En une phrase
> ARG déclare une variable de build : on change sa valeur avec --build-arg, et on peut s'en servir dans le FROM pour choisir l'image de base.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
`ARG NOM=valeur` déclare dans un [[Dockerfile]] une variable qui n'existe **que pendant la construction**. `docker build --build-arg NOM=autre` change sa valeur.

### Pourquoi ça existe
Construire des variantes d'une même image (autre version, autre registre) sans dupliquer ni modifier le Dockerfile.

### Le problème résolu
On copiait le Dockerfile pour chaque variante, ou on le modifiait à la main avant chaque build : copies divergentes, modifications oubliées.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart LR
  BA[--build-arg] --> A[ARG]
  A --> FR[FROM] --> I[Image]
```

### Exemple concret
```dockerfile
ARG PYTHON_VERSION=3.11              # le seul cas où une instruction précède FROM
FROM python:${PYTHON_VERSION}-slim
ARG APP_VERSION=dev
RUN echo "Version $APP_VERSION" > /version.txt
```
```bash
docker build --build-arg PYTHON_VERSION=3.12 --build-arg APP_VERSION=1.4.0 -t mon-app .
```

| | `ARG` | `ENV` |
| --- | --- | --- |
| Existe pendant | le build seulement | le build **et** l'exécution |
| Se change avec | `docker build --build-arg` | `docker run -e` |

### Cas d'utilisation
- Choisir une version ou un registre d'image de base au moment du build
- Projet CVAT : partie 1 (reprendre CVAT sur GitLab, construire ses images en CI via le Nexus)

> [!warning] À ne pas confondre
> `ARG` (build seulement) et `ENV` (aussi dans le conteneur qui tourne). Et un `ARG` déclaré **avant** `FROM` n'existe plus **après** : il faut le redéclarer.

## 3 · Pratiquer
- Écris un petit Dockerfile dont l'image de base vient d'un `ARG`, et construis-le avec deux valeurs différentes.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Dockerfile]]
- **Notion parente** : [[Dockerfile]]
- **Complémentaires** : [[Nexus]]
- **Utilisé par** : [[Construire une image dans la CI]]
- **Commandes** : [[docker build]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
