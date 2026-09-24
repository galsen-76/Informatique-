---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M11
tags:
  - infra/cloud
aliases:
  - "Fondamentaux du Cloud"
parent: "[[Infrastructure]]"
children:
  - "[[CLOUD-02-Heberger-Front|Héberger un Front]]"
  - "[[CLOUD-03-Heberger-API-BDD|Héberger une API et une Base de Données]]"
  - "[[CLOUD-04-Kubernetes-Introduction|Kubernetes Introduction]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/cloud-01-fondamentaux-cloud]]"
related_projects: []
source: "https://aws.amazon.com/fr/what-is-cloud-computing/"
---

# Fondamentaux du Cloud

> [!abstract] Introduction
> Le cloud fournit des ressources informatiques à la demande (serveurs, bases, stockage, réseau) facturées à l'usage ; on distingue IaaS, PaaS, SaaS et serverless selon ce que l'on gère soi-même.

---

## Théorie

> [!question]- C'est quoi ?
> | Modèle | Tu gères | Le fournisseur gère | Exemples |
> |---|---|---|---|
> | On-premise | Tout | Rien | Serveurs de l'entreprise |
> | IaaS | OS, runtime, app | Matériel, réseau, virtualisation | VM (EC2, Compute Engine, Scaleway, OVH) |
> | CaaS | Conteneurs | Orchestration | Kubernetes managé, Cloud Run |
> | PaaS | Code + config | Serveurs, runtime, scaling | Render, Railway, Heroku, Clever Cloud |
> | Serverless / FaaS | Fonctions | Tout le reste, scaling à zéro | Lambda, Cloud Functions |
> | SaaS | Usage | Tout | GitLab.com, Google Workspace |
> Fournisseurs : AWS, Azure, GCP ; européens/français : OVHcloud, Scaleway, Clever Cloud (souveraineté des données, RGPD).

> [!example]- Analogie
> IaaS : louer un terrain et construire sa maison. PaaS : louer un appartement meublé. SaaS : aller à l'hôtel. Serverless : payer la chambre à l'heure uniquement quand tu dors.

> [!question]- Pourquoi l'utiliser ?
> Déployer sans acheter de matériel, monter en charge rapidement, services managés (BDD, cache, files) ; beaucoup de clients d'ESN migrent vers le cloud.

> [!question]- Comment ça marche ?
> Concepts transverses : régions et zones de disponibilité, VPC (réseau privé), IAM (identités et droits), stockage objet (S3), load balancers, bases managées, facturation à l'usage (et risques de surcoût).

> [!question]- Quand l'utiliser ?
> Presque tout nouveau projet ; certaines entreprises gardent l'on-premise ou un cloud privé pour des raisons réglementaires.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Coûts difficiles à prévoir, dépendance au fournisseur (lock-in), responsabilité partagée : la sécurité de ton application reste TA responsabilité.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Région | Zone géographique de datacenters |
| Zone de disponibilité | Datacenter isolé dans une région |
| IAM | Gestion des identités et accès |
| Stockage objet | Fichiers accessibles par API (S3) |
| Lock-in | Dépendance forte à un fournisseur |

---

## Points clés

- Plus c'est managé, moins tu administres (et plus c'est cher/contraint)
- Démarrer simple (PaaS/VPS), complexifier si besoin
- Responsabilité partagée
- Surveiller les coûts (alertes de budget)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Laisser tourner des ressources oubliées
> - Stocker des données personnelles hors UE sans analyse RGPD

---

## Exemple minimal

```text
Projet perso CinéTrack : front sur hébergeur statique (gratuit), API + PostgreSQL sur un PaaS ou un petit VPS (~5 €/mois)
Projet entreprise : conteneurs sur Kubernetes managé, PostgreSQL managé, stockage objet pour les affiches
```

> [!note] Ce que j'en retiens
> Adapter l'infrastructure à l'échelle réelle du projet.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Concevoir une architecture cloud haute disponibilité et maîtrisée en coûts (FinOps)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Infrastructure]]
- Sous-sujets → [[CLOUD-02-Heberger-Front|Héberger un Front]], [[CLOUD-03-Heberger-API-BDD|Héberger une API et une Base de Données]], [[CLOUD-04-Kubernetes-Introduction|Kubernetes Introduction]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/cloud-01-fondamentaux-cloud]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre IaaS et PaaS ?

> [!faq]- Questions d'entretien
> - Quelle expérience avez-vous du cloud ?

---

## Tâches

- [ ] #task Demander quelle infrastructure héberge les applications au travail (on-premise ? cloud ?)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
