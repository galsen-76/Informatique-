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

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] ⚖️ Avant / après
> Avant / après : un Dockerfile avec l'adresse du Nexus écrite en dur, puis avec `ARG`. Dessine ce qui change quand tu construis chez toi et au travail.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   A[ARG API_URL] --> B[Build]
>   B --> R[Conteneur lancé]
>   R --> L[Lit ARG]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Variable de build Docker (ARG) » et je l'intègre ici avec `![[Schéma - Variable de build Docker (ARG).excalidraw]]`._

### Appliquer dans le fil rouge
- [[MesDépenses 02 - L'API dans Docker]]
- [[MesDépenses 06 - Le front Vue dans Docker]]
- [[Fil rouge 02 - Écrire le Dockerfile]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

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
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
