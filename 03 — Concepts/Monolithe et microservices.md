---
type: concept
domain: architecture
module: "[[Module 15 - Architecture logicielle]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[API REST]]"
  - "[[Docker Compose]]"
parents:
  - "[[Séparation des responsabilités]]"
related:
  - "[[Architecture en couches]]"
  - "[[Reverse proxy]]"
next_review: 
method: []
tags:
  - concept
  - architecture
---
# Monolithe et microservices

> [!info] En une phrase
> Un monolithe est une seule application qui fait tout ; une architecture en microservices découpe en petits services indépendants qui communiquent par le réseau, chacun déployé séparément.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
| | Monolithe | Microservices |
| --- | --- | --- |
| Déploiement | un seul | un par service |
| Communication | appels de fonction | HTTP, messages (file) |
| Base | souvent une seule | une par service |
| Complexité | dans le code | dans l'infrastructure (réseau, supervision, versions) |
| Bon pour | la plupart des projets, petites équipes | grandes organisations, parties à faire évoluer séparément |
Entre les deux : le **monolithe modulaire** (une application, mais des modules bien séparés). Et les **fonctions serverless** (Nuclio, AWS Lambda) : de petits traitements déclenchés à la demande.
CVAT est un **monolithe Django** entouré de quelques services (frontend, workers, Redis, base, Traefik, et les **fonctions Nuclio** pour l'annotation automatique).

### Pourquoi ça existe
Quand une application et l'équipe grandissent, tout livrer ensemble devient lent ; mais découper trop tôt coûte cher.

### Le problème résolu
Choisir consciemment : la simplicité du monolithe, ou l'indépendance des services au prix de la complexité.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
U[Client] --> G[Passerelle]
  G --> S1[Service tâches]
  G --> S2[Service export]
  S2 --> Q[File]
```

### Exemple concret
```yaml
# docker compose : plusieurs services qui se parlent par le réseau
services:
  api:     { image: app/api:1.4, depends_on: [db, redis] }
  worker:  { image: app/api:1.4, command: ["python", "worker.py"] }
  db:      { image: postgres:16 }
  redis:   { image: redis:7 }
  proxy:   { image: traefik:v3 }
```
Ta fonction Nuclio est un service séparé : CVAT l'appelle par HTTP, elle a son propre déploiement et ses propres dépendances.

### Cas d'utilisation
- Comprendre l'architecture de CVAT
- Décider de découper (ou non) une application
- Fonctions serverless

> [!warning] À ne pas confondre
> Croire que les microservices sont « plus modernes » donc mieux : un mauvais découpage crée un monolithe distribué, avec tous les inconvénients des deux. Commence en monolithe bien organisé.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] ⚖️ Avant / après
> Avant / après : MesDépenses en une seule application, puis découpée en trois services. Dessine ce qu'il faut ajouter entre les services.

> [!example] 🧠 Dessine de mémoire
> Dessine CVAT : ses conteneurs (serveur, interface, base, Nuclio…). Est-ce un monolithe, des microservices, ou entre les deux ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Monolithe et microservices » et je l'intègre ici avec `![[Schéma - Monolithe et microservices.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[API REST]] · [[Docker Compose]]
- **Complémentaires** : [[Architecture en couches]] · [[Reverse proxy]]

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
