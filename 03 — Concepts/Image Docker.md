---
type: concept
domain: devops
module: "[[Module 13 - Docker]]"
status: en-cours
level: intermediaire
niveau: 2
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Docker]]"
parents:
  - "[[Docker]]"
related:
  - "[[Conteneur]]"
  - "[[Dockerfile]]"
  - "[[Registre Docker]]"
next_review: 
tags:
  - concept
  - devops
---
# Image Docker

> [!info] En une phrase
> Le modèle figé d'une application : système minimal, dépendances et code, prêt à être lancé.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Une **image** est construite à partir d'un `Dockerfile`, couche par couche. Elle est en **lecture seule** et peut être partagée via un registre (Docker Hub, GitLab Registry, registre interne).

Une image est un **empilement de couches** : chaque instruction du [[Dockerfile]] (`RUN`, `COPY`…) ajoute une couche par-dessus les précédentes. Une **image dérivée** est une image construite `FROM` une autre : elle réutilise toutes ses couches et n'ajoute que les siennes.

### Pourquoi ça existe
Figer une application et tout son environnement dans un paquet qu'on peut copier, versionner et lancer à l'identique n'importe où.

### Le problème résolu
« Ça marche sur ma machine » : sans image, chaque machine installe ses propres versions des outils et des bibliothèques.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  B[python:3.12-slim] --> P[+ pip install]
  P --> C[+ ton code]
  C --> I[Ton image]
```
- **Couches partagées** : dix images dérivées de `python:3.12-slim` ne stockent cette base qu'une fois.
- **Cache** : au rebuild, Docker réutilise les couches dont l'instruction et les fichiers n'ont pas changé. Une couche modifiée invalide toutes celles **au-dessus**. D'où l'ordre : dépendances d'abord, code ensuite.
- **Nom et tag** : `nom:tag` (`python:3.12-slim`). Le même contenu peut avoir plusieurs tags (`1.2.0` et `latest`).
- **Variantes officielles** : `python:3.12` (complète, lourde), `-slim` (Debian réduite, bon choix par défaut), `-alpine` (minuscule, mais certaines bibliothèques s'y installent mal).

### Exemple concret
```dockerfile
# Image dérivée : on part d'une image officielle et on ajoute un fichier
FROM cvat/server:v2.20.0
COPY mon_reglage.py /home/django/cvat/settings/
```
```bash
docker image ls                    # images présentes sur la machine
docker history mon-image           # ses couches et leur taille
docker image inspect mon-image     # tout le détail (env, CMD, couches)
```

### Cas d'utilisation
- Partir d'une image officielle (`python`, `node`, `postgres`) au lieu d'installer un système complet
- Ajouter une petite modification à l'image d'un projet (image dérivée)

> [!warning] À ne pas confondre
> **Image** (le modèle figé) et [[Conteneur]] (une instance qui tourne). Modifier un fichier dans un conteneur **ne change pas** l'image : il faut changer le Dockerfile et reconstruire.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine une image comme une pile de couches en lecture seule, et deux conteneurs qui partagent cette pile avec chacun leur couche d'écriture.

> [!example] 🛣️ Suis le trajet
> Suis une image `python:3.12-slim` du registre jusqu'à ton PC, puis jusqu'au conteneur de l'API.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Image Docker » et je l'intègre ici avec `![[Schéma - Image Docker.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[MesDépenses Front 09 - Le front Angular dans Docker]]
- [[MesDépenses 06 - Dépanner un conteneur]]
- [[Fil rouge 01 - Lancer l'application dans un conteneur]]

## 4 · Relier
- **Au travail** : [[Image Docker au travail]]
- **Notion parente** : [[Docker]]
- **Prérequis** : [[Dockerfile]]
- **Donne naissance à** : [[Conteneur]]
- **Complémentaires** : [[Registre Docker]] · [[Démon Docker]]
- **Commandes** : [[docker build]] · [[docker tag]] · [[docker push]]

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
