---
type: notion
statut: a apprendre
resume: "Le cloud, c'est louer des ressources informatiques (serveurs, bases de données, stockage) à la demande, au lieu d'acheter et gérer ses propres machines."
revu:
sources:
  - "https://aws.amazon.com/fr/what-is-cloud-computing/"
---
# Cloud notions de base

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Le **cloud**, c'est **louer** des ressources informatiques (serveurs, bases de données, stockage) à la demande, au lieu d'acheter et gérer ses propres machines.

## Le problème

**Pourquoi c'est utile ?**
Pour louer des ressources à la demande au lieu d'acheter et gérer ses propres machines.

**Qu'est-ce qui se passait sans ça ?**
Il fallait acheter des serveurs, les installer et les dimensionner pour le pic de charge, même s'il n'arrivait jamais.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Du plus « tout fait » au plus « fais-le toi-même », il existe plusieurs niveaux. Pour tes projets, les offres **les plus simples** suffisent largement.

### Les niveaux de service

Image : se nourrir.

| Niveau | Tu gères | Image | Exemples |
|---|---|---|---|
| **Sur site** (on-premise) | **tout** : matériel, système, application | cuisiner chez soi, en achetant la cuisine | serveurs de l'entreprise |
| **IaaS** (infrastructure) | système, runtime, application | louer une cuisine équipée | machine virtuelle (VPS) : OVH, Scaleway, AWS EC2 |
| **PaaS** (plateforme) | **ton application seulement** | commander un plat, mais choisir la recette | Render, Railway, Fly.io, Heroku, Clever Cloud |
| **Serverless / BaaS** | des fonctions, ou juste la configuration | aller au restaurant | Vercel, Netlify, Supabase, AWS Lambda |
| **SaaS** (logiciel) | rien, tu utilises | se faire livrer | GitLab.com, Gmail |

Plus tu montes, **moins tu as à gérer**, mais **moins tu as de contrôle** (et parfois plus c'est cher à grande échelle).

### Les briques qu'on retrouve partout

| Besoin | Brique | Exemples |
|---|---|---|
| faire tourner du code | calcul (VM, conteneur, fonction) | EC2, Cloud Run, Fly.io |
| base relationnelle | base gérée (sauvegardes, mises à jour incluses) | RDS, Neon, Supabase, Scaleway |
| fichiers (images, exports) | stockage objet | S3, Cloudflare R2 |
| distribuer vite partout | CDN | Cloudflare, CloudFront |
| noms de domaine | DNS | Cloudflare, Route 53 |
| secrets | coffre-fort | Secrets Manager, Vault |

### Les grands fournisseurs

| Fournisseur | Remarque |
|---|---|
| **AWS** (Amazon) | le plus grand, le plus de services |
| **Azure** (Microsoft) | fort en entreprise |
| **GCP** (Google) | fort sur les données et l'IA |
| **OVHcloud, Scaleway** | européens, données hébergées en France |

## 🧪 Exemple

### Pour tes projets

| Projet | Hébergement simple |
|---|---|
| Portfolio | GitLab Pages, Netlify, Cloudflare Pages (gratuit) |
| CinéTrack (front) | idem |
| CinéTrack API + PostgreSQL | un PaaS (Render, Railway, Fly.io, Clever Cloud) ou un petit VPS avec Docker Compose |

Voir [[02 Héberger un front|Héberger un front]] et [[03 Héberger une API et une base de données|Héberger une API]].

## ⚠️ Limites et pièges

- **La facture surprise** : active des alertes de budget dès le premier jour, surtout sur AWS / Azure / GCP.
- **Tout construire sur AWS** pour un projet perso : complexité et coût inutiles.
- **Oublier les données personnelles** (RGPD) : où sont-elles stockées, qui y a accès.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://aws.amazon.com/fr/what-is-cloud-computing/
