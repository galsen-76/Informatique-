---
type: concept
module: "[[Module 15 - Architecture logicielle]]"
related:
  - "[[Monolithe et microservices]]"
  - "[[JWT]]"
  - "[[Authentification]]"
tags:
  - concept
  - architecture
---
# Passerelle d'API (API gateway)

> [!info] En une phrase
> Une passerelle d'API est le point d'entrée unique devant plusieurs services : elle reçoit toutes les requêtes et s'occupe de l'authentification, des limites de débit et du routage vers le bon service.

## 1 · Comprendre
### Définition
Elle se place entre les clients (navigateur, appli mobile) et les services internes.

Ses rôles habituels :
- **Routage** : `/api/tasks` → service tâches, `/api/export` → fonction d'export
- **Authentification** : vérifier le jeton (JWT) une fois pour tous
- **Limitation de débit** (*rate limiting*) : pas plus de N requêtes par minute
- **TLS** : le HTTPS se termine ici
- **Journalisation et mesures** centralisées

Outils : Kong, Traefik, NGINX, AWS API Gateway. Souvent, **Traefik** ou nginx jouent ce rôle devant le serveur, l'interface et les fonctions.

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
- Exposer des fonctions serverless

> [!warning] À ne pas confondre
> Une passerelle est un reverse proxy spécialisé pour les API (auth, quotas, versions). Elle ne doit pas contenir de logique métier, sinon elle devient un nouveau monolithe fragile.

## 3 · Relier
- **Au travail** : [Passerelle d'API (API gateway) au travail](obsidian://open?vault=Travail&file=Passerelle%20d%27API%20%28API%20gateway%29%20au%20travail)
- **Prérequis** : [[Reverse proxy]] · [[API REST]]
- **Complémentaires** : [[Monolithe et microservices]] · [[JWT]] · [[Authentification]]
