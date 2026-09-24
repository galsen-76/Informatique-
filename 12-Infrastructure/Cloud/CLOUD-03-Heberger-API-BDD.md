---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
tags:
  - infra/hebergement-back
aliases:
  - "Héberger une API et une Base de Données"
parent: "[[Infrastructure]]"
children: []
related_theory:
  - "[[CICD-02-Pipeline-Full-Stack|Pipeline CI/CD Full Stack]]"
  - "[[BDD-09-PostgreSQL-Pratique|PostgreSQL en Pratique]]"
  - "[[SEC-10-Gestion-des-Secrets|Gestion des Secrets]]"
related_snippets:
  - "[[04_Snippets/cloud-03-heberger-api-bdd]]"
related_projects:
  - "[[02_Projects/CinéTrack-Fullstack]]"
source: "https://docs.docker.com/compose/production/"
---

# Héberger une API et une Base de Données

> [!abstract] Introduction
> Mettre en production une API NestJS et sa base PostgreSQL : conteneur de l'API, base managée ou conteneurisée avec volumes et sauvegardes, reverse proxy HTTPS, secrets et migrations.

> [!warning]- Prérequis
> [[DK-03-Docker-Compose|Docker Compose]], [[NET-09-Proxy-Reverse-Proxy-Load-Balancer|Proxy Reverse Proxy et Load Balancer]]

---

## Théorie

> [!question]- C'est quoi ?
> Options par ordre de simplicité :
> 1. **PaaS** (Render, Railway, Clever Cloud, Scalingo) : push → déployé, PostgreSQL managé en un clic
> 2. **VPS + Docker Compose** : Traefik/Nginx + API + PostgreSQL + Redis → très formateur
> 3. **Cloud managé** : conteneurs (Cloud Run, ECS, Azure Container Apps) + BDD managée (RDS, Cloud SQL)
> 4. **Kubernetes** : pour de nombreux services et équipes

> [!example]- Analogie
> Le VPS + Compose, c'est cuisiner soi-même dans sa cuisine : plus de travail, mais on comprend chaque ingrédient ; le PaaS, c'est le traiteur.

> [!question]- Pourquoi l'utiliser ?
> Un full stack doit savoir mettre en ligne ce qu'il construit, au moins de façon simple et sûre.

> [!question]- Comment ça marche ?
> ```yaml
> # docker-compose.prod.yml (VPS)
> services:
>   proxy:
>     image: traefik:v3.1
>     command: ["--providers.docker", "--entrypoints.websecure.address=:443", "--certificatesresolvers.le.acme.tlschallenge=true", "--certificatesresolvers.le.acme.email=moi@exemple.fr", "--certificatesresolvers.le.acme.storage=/letsencrypt/acme.json"]
>     ports: ["443:443"]
>     volumes: ["/var/run/docker.sock:/var/run/docker.sock:ro", "le:/letsencrypt"]
>   api:
>     image: registry.gitlab.com/moi/cinetrack/api:${TAG}
>     env_file: .env.prod
>     labels: ["traefik.http.routers.api.rule=Host(`cinetrack.fr`) && PathPrefix(`/api`)", "traefik.http.routers.api.tls.certresolver=le"]
>     depends_on: { db: { condition: service_healthy } }
>     restart: unless-stopped
>   db:
>     image: postgres:17
>     env_file: .env.db
>     volumes: ["pgdata:/var/lib/postgresql/data"]
>     healthcheck: { test: ["CMD-SHELL", "pg_isready -U cine"], interval: 5s, retries: 10 }
>     restart: unless-stopped
> volumes: { pgdata: {}, le: {} }
> ```
> La BDD n'expose AUCUN port publiquement ; sauvegardes quotidiennes (`pg_dump` vers un stockage externe) et test de restauration.

> [!question]- Quand l'utiliser ?
> Projets perso, petites applications ; en entreprise, suivre la plateforme existante (souvent Kubernetes ou cloud managé).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Une BDD conteneurisée sur un seul VPS = pas de haute disponibilité ; pour de la vraie production critique, préférer une base managée.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| PaaS | Plateforme qui gère serveurs et runtime |
| Base managée | BDD administrée par le fournisseur |
| Healthcheck | Test de disponibilité d'un conteneur |
| `restart: unless-stopped` | Redémarrage automatique |

---

## Points clés

- BDD jamais exposée publiquement
- Sauvegardes automatiques + tests de restauration
- Secrets hors de l'image
- Migrations dans le processus de déploiement

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `ports: ["5432:5432"]` en production
> - Aucune sauvegarde « parce que c'est un projet perso » (jusqu'au jour où…)

---

## Exemple minimal

```bash
# Sauvegarde quotidienne (cron sur le VPS)
0 3 * * * docker compose exec -T db pg_dump -U cine -Fc cinetrack > /backups/cinetrack-$(date +\%F).dump
```

> [!note] Ce que j'en retiens
> Une ligne de cron protège des mois de données.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Haute disponibilité, réplicas, sauvegardes PITR, plan de reprise d'activité

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Infrastructure]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/cloud-03-heberger-api-bdd]]
- Projet → [[02_Projects/CinéTrack-Fullstack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `depends_on` avec `service_healthy` ?

---

## Tâches

- [ ] #task Déployer l'API CinéTrack sur un VPS ou un PaaS avec HTTPS
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
