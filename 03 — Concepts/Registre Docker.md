---
type: concept
domain: devops
module: "[[Module 13 - Docker]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Image Docker]]"
parents:
  - "[[Docker]]"
related:
  - "[[Nexus]]"
  - "[[Dockerfile]]"
next_review: 
method: []
tags:
  - concept
  - devops
---
# Registre Docker

> [!info] En une phrase
> Un entrepôt d'images : on y pousse (push) une image construite une fois, et on la récupère (pull) ailleurs.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un **registre** (*registry*) est un serveur qui stocke des [[Image Docker|images]]. Exemples : **Docker Hub** (public), le **registre GitLab** d'un projet, le [[Nexus]] d'une entreprise.

### Pourquoi ça existe
Partager une image entre ton poste, la CI et les serveurs, sans la reconstruire partout.

### Le problème résolu
Chaque machine reconstruisait l'image, avec le risque d'obtenir un résultat différent.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart LR
  B[build] --> T[tag] --> P[push] --> Reg[(Registre)]
  Reg -- pull --> S[Serveur]
```

### Exemple concret
Le nom complet d'une image dit **où elle est rangée** :
```text
registre.exemple.com/equipe/projet/api:1.2.0
└──── registre ────┘└─ chemin ──┘└nom┘└tag┘
```
- **Pas de registre dans le nom** = Docker Hub : `python:3.11-slim` = `docker.io/library/python:3.11-slim`.
- **Le tag** est la version ; sans tag, c'est `latest`.

```bash
docker login registry.gitlab.com
docker build -t registry.gitlab.com/equipe/projet/api:1.2.0 .
docker push registry.gitlab.com/equipe/projet/api:1.2.0
docker pull registry.gitlab.com/equipe/projet/api:1.2.0   # sur une autre machine
```

### Cas d'utilisation
- Publier les images construites par la CI
- Récupérer les images de base d'un Dockerfile
- Projet CVAT : partie 1 (reprendre CVAT sur GitLab, construire ses images en CI via le Nexus)

> [!warning] À ne pas confondre
> `latest` n'est **pas** une version : c'est juste le tag par défaut. Préférer un tag précis (`1.2.0`, ou l'identifiant du commit).

## 3 · Pratiquer
- Décompose le nom `nexus.mon-entreprise.com:8082/library/nginx:1.27` : quel est le registre, le chemin, le nom, le tag ?

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Image Docker]]
- **Notion parente** : [[Docker]]
- **Complémentaires** : [[Nexus]] · [[Dockerfile]]
- **Utilisé par** : [[Construire une image dans la CI]]
- **Commandes** : [[docker login]] · [[docker tag]] · [[docker push]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
