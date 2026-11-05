---
type: concept
domain: devops
module: "[[Module 14 - DevOps et déploiement]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Registre Docker]]"
parents:
  - "[[Registre Docker]]"
related:
  - "[[Variable de build Docker (ARG)]]"
  - "[[Variables CI-CD GitLab]]"
next_review: 
method: []
tags:
  - concept
  - devops
---
# Nexus

> [!info] En une phrase
> L'entrepôt interne de l'entreprise : il garde une copie des images de Docker Hub (proxy) et stocke les images de l'équipe (hosted).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Nexus** (de Sonatype) est un gestionnaire de dépôts. Il stocke des images Docker, mais aussi des paquets **npm**, **pip** ou **apt**. En entreprise, il sert souvent de passage obligé vers Internet.

### Pourquoi ça existe
Que les postes, les runners et les serveurs récupèrent images et paquets à **un seul endroit contrôlé**, sans sortir sur Internet.

### Le problème résolu
Chaque machine allait sur Docker Hub : builds bloqués par les limites de téléchargement ou par le pare-feu, et aucun contrôle sur ce qui entrait.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart LR
  CI[Runner GitLab] -- pull --> G[Nexus : group]
  G --> PX[proxy] -- 1re fois --> DH[(Docker Hub)]
  G --> H[hosted]
  CI -- push --> H
```

### Exemple concret
| Type de dépôt | Rôle | On y fait |
| --- | --- | --- |
| **proxy** | copie en cache d'un registre externe | `pull` |
| **hosted** | dépôt interne pour les images de l'équipe | `push` et `pull` |
| **group** | une adresse qui regroupe plusieurs dépôts | `pull` |

```text
python:3.11-slim                                          # Docker Hub (implicite)
nexus.mon-entreprise.com:8082/library/python:3.11-slim    # la même, via le proxy Nexus
```
```bash
docker login nexus.mon-entreprise.com:8082
docker pull nexus.mon-entreprise.com:8082/library/python:3.11-slim
```

### Cas d'utilisation
- Récupérer les images de base sans accès direct à Internet
- Stocker les images construites par la CI
- Projet CVAT : partie 1 (reprendre CVAT sur GitLab, construire ses images en CI via le Nexus)

> [!warning] À ne pas confondre
> Un dépôt **proxy** (on y lit) et un dépôt **hosted** (on y pousse) : un `push` vers un proxy est refusé.

## 3 · Pratiquer
- Demande à ton équipe et note ici : l'adresse du dépôt Docker proxy ou group, le dépôt où pousser, le compte de service pour la CI, et s'il existe des proxys pip, npm et apt.
- Récupère une image officielle via le Nexus avec `docker pull`.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Registre Docker]]
- **Notion parente** : [[Registre Docker]]
- **Complémentaires** : [[Variable de build Docker (ARG)]] · [[Variables CI-CD GitLab]]
- **Utilisé par** : [[Construire une image dans la CI]] · [[Kaniko]]
- **Commandes** : [[docker login]] · [[docker push]]

## 6 · Réviser
> [!question]- Pourquoi `library/` dans le chemin d'une image officielle via Nexus ?
> Les images officielles de Docker Hub sont rangées sous `library/` ; l'oublier donne « not found ».

> [!question]- Changer le `FROM` d'un Dockerfile suffit-il pour ne plus sortir sur Internet ?
> Pas toujours : les `apt-get`, `pip install` ou `npm ci` du Dockerfile téléchargent aussi des paquets, qui doivent passer par leurs propres proxys Nexus.

> [!question]- Comment le runner récupère-t-il l'`image:` d'un job depuis Nexus ?
> Il doit s'authentifier, avec la variable `DOCKER_AUTH_CONFIG` (voir [[Variables CI-CD GitLab]]).

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
