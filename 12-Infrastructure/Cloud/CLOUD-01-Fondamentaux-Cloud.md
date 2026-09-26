---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M11
tags:
  - infra/cloud
aliases:
  - "Fondamentaux du Cloud"
parent: "[[Infrastructure]]"
related_theory: []
related_projects: []
source: "https://aws.amazon.com/fr/what-is-cloud-computing/"
---

# Fondamentaux du Cloud

> [!abstract] En bref
> Le **cloud**, c'est **louer** des ressources informatiques (serveurs, bases de données, stockage) à la demande, au lieu d'acheter et gérer ses propres machines. Du plus « tout fait » au plus « fais-le toi-même », il existe plusieurs niveaux. Pour tes projets, les offres **les plus simples** suffisent largement.

## Les niveaux de service

Image : se nourrir.

| Niveau | Tu gères | Image | Exemples |
|---|---|---|---|
| **Sur site** (on-premise) | **tout** : matériel, système, application | cuisiner chez soi, en achetant la cuisine | serveurs de l'entreprise |
| **IaaS** (infrastructure) | système, runtime, application | louer une cuisine équipée | machine virtuelle (VPS) : OVH, Scaleway, AWS EC2 |
| **PaaS** (plateforme) | **ton application seulement** | commander un plat, mais choisir la recette | Render, Railway, Fly.io, Heroku, Clever Cloud |
| **Serverless / BaaS** | des fonctions, ou juste la configuration | aller au restaurant | Vercel, Netlify, Supabase, AWS Lambda |
| **SaaS** (logiciel) | rien, tu utilises | se faire livrer | GitLab.com, Gmail |

Plus tu montes, **moins tu as à gérer**, mais **moins tu as de contrôle** (et parfois plus c'est cher à grande échelle).

## Les briques qu'on retrouve partout

| Besoin | Brique | Exemples |
|---|---|---|
| faire tourner du code | calcul (VM, conteneur, fonction) | EC2, Cloud Run, Fly.io |
| base relationnelle | base gérée (sauvegardes, mises à jour incluses) | RDS, Neon, Supabase, Scaleway |
| fichiers (images, exports) | stockage objet | S3, Cloudflare R2 |
| distribuer vite partout | CDN | Cloudflare, CloudFront |
| noms de domaine | DNS | Cloudflare, Route 53 |
| secrets | coffre-fort | Secrets Manager, Vault |

## Les grands fournisseurs

| Fournisseur | Remarque |
|---|---|
| **AWS** (Amazon) | le plus grand, le plus de services |
| **Azure** (Microsoft) | fort en entreprise |
| **GCP** (Google) | fort sur les données et l'IA |
| **OVHcloud, Scaleway** | européens, données hébergées en France |

## Pour tes projets

| Projet | Hébergement simple |
|---|---|
| Portfolio | GitLab Pages, Netlify, Cloudflare Pages (gratuit) |
| CinéTrack (front) | idem |
| CinéTrack API + PostgreSQL | un PaaS (Render, Railway, Fly.io, Clever Cloud) ou un petit VPS avec Docker Compose |

Voir [[CLOUD-02-Heberger-Front|Héberger un front]] et [[CLOUD-03-Heberger-API-BDD|Héberger une API]].

## Pièges

- **La facture surprise** : active des alertes de budget dès le premier jour, surtout sur AWS / Azure / GCP.
- **Tout construire sur AWS** pour un projet perso : complexité et coût inutiles.
- **Oublier les données personnelles** (RGPD) : où sont-elles stockées, qui y a accès.
