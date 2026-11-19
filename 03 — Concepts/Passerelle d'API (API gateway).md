---
type: concept
domain: architecture
module: "[[Module 15 - Architecture logicielle]]"
status: a-decouvrir
level: intermediaire
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Reverse proxy]]"
  - "[[API REST]]"
parents: []
related:
  - "[[Monolithe et microservices]]"
  - "[[JWT]]"
  - "[[Authentification]]"
next_review: 
method: []
tags:
  - concept
  - architecture
---
# Passerelle d'API (API gateway)

> [!info] En une phrase
> Une passerelle d'API est le point d'entrée unique devant plusieurs services : elle reçoit toutes les requêtes et s'occupe de l'authentification, des limites de débit et du routage vers le bon service.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Elle se place entre les clients (navigateur, appli mobile) et les services internes.

Ses rôles habituels :
- **Routage** : `/api/tasks` → service tâches, `/api/export` → fonction d'export
- **Authentification** : vérifier le jeton (JWT) une fois pour tous
- **Limitation de débit** (*rate limiting*) : pas plus de N requêtes par minute
- **TLS** : le HTTPS se termine ici
- **Journalisation et mesures** centralisées

Outils : Kong, Traefik, NGINX, AWS API Gateway. Dans CVAT, **Traefik** joue ce rôle devant le serveur, l'interface et les fonctions.

### Pourquoi ça existe
Avec plusieurs services, chaque client devrait connaître toutes les adresses, et chaque service réimplémenterait l'authentification et la sécurité.

### Le problème résolu
Une seule adresse publique, des règles transverses écrites une fois, des services internes cachés et remplaçables.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
CL[Client] --> GW[Passerelle]
  GW --> S1[Service tâches]
  GW --> S2[Service export]
  GW --> S3[Interface]
```

### Exemple concret
```yaml
# Traefik dans un docker-compose (extrait simplifié)
services:
  traefik:
    image: traefik:v3.1
    ports: ["8080:8080"]
  export:
    image: mon-export
    labels:
      - traefik.http.routers.export.rule=PathPrefix(`/api/export`)
```
Le client appelle seulement `http://localhost:8080/api/export` ; il ignore où tourne réellement le service.

### Cas d'utilisation
- Devant des microservices
- Devant CVAT (Traefik)
- Exposer des fonctions serverless

> [!warning] À ne pas confondre
> Une passerelle est un reverse proxy spécialisé pour les API (auth, quotas, versions). Elle ne doit pas contenir de logique métier, sinon elle devient un nouveau monolithe fragile.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine une passerelle devant trois services : une requête arrive, elle est vérifiée, routée, journalisée.

> [!example] 🔄 Change de contexte
> Compare sur le même dessin une passerelle d'API et le reverse proxy nginx de ton application. Qu'ajoute la passerelle ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Passerelle d'API (API gateway) » et je l'intègre ici avec `![[Schéma - Passerelle d'API (API gateway).excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Reverse proxy]] · [[API REST]]
- **Complémentaires** : [[Monolithe et microservices]] · [[JWT]] · [[Authentification]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
