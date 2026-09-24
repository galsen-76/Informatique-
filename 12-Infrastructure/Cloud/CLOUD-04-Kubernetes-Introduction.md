---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M11
tags:
  - infra/kubernetes
aliases:
  - "Kubernetes Introduction"
parent: "[[Infrastructure]]"
children: []
related_theory:
  - "[[DK-01-Fondamentaux|Fondamentaux Docker]]"
  - "[[CICD-03-Strategies-Deploiement|Stratégies de Déploiement]]"
  - "[[ARCH-06-Scalabilite|Scalabilité]]"
related_snippets:
  - "[[04_Snippets/cloud-04-kubernetes-introduction]]"
related_projects: []
source: "https://kubernetes.io/fr/docs/concepts/"
---

# Kubernetes Introduction

> [!abstract] Introduction
> Kubernetes (K8s) orchestre des conteneurs sur un cluster de machines : il les déploie, les redémarre, les met à l'échelle et les expose, à partir d'une description déclarative (YAML) de l'état souhaité.

> [!warning]- Prérequis
> [[DK-03-Docker-Compose|Docker Compose]]

---

## Théorie

> [!question]- C'est quoi ?
> Objets principaux :
> | Objet | Rôle |
> |---|---|
> | Pod | Un ou plusieurs conteneurs qui tournent ensemble |
> | Deployment | Maintient N pods d'une version, gère les rolling updates |
> | Service | Adresse stable pour joindre des pods |
> | Ingress | Point d'entrée HTTP(S) externe (reverse proxy) |
> | ConfigMap / Secret | Configuration / données sensibles |
> | Namespace | Espace isolé (par équipe, environnement) |
> | HPA | Mise à l'échelle automatique |

> [!example]- Analogie
> Docker Compose est un chef qui dirige une cuisine ; Kubernetes est le directeur d'une chaîne de restaurants qui garantit qu'il y a toujours le bon nombre de cuisiniers dans chaque restaurant, remplace les absents et ouvre des cuisines supplémentaires en cas d'affluence.

> [!question]- Pourquoi l'utiliser ?
> Standard de fait des grandes infrastructures (et de nombreux clients d'ESN) : haute disponibilité, autoscaling, déploiements progressifs.

> [!question]- Comment ça marche ?
> ```yaml
> apiVersion: apps/v1
> kind: Deployment
> metadata: { name: cinetrack-api }
> spec:
>   replicas: 3
>   selector: { matchLabels: { app: api } }
>   template:
>     metadata: { labels: { app: api } }
>     spec:
>       containers:
>         - name: api
>           image: registry.gitlab.com/moi/cinetrack/api:3f2a91c
>           ports: [{ containerPort: 3000 }]
>           envFrom: [{ secretRef: { name: api-secrets } }]
>           readinessProbe: { httpGet: { path: /api/health, port: 3000 } }
>           resources: { requests: { cpu: 100m, memory: 256Mi }, limits: { memory: 512Mi } }
> ```
> ```bash
> kubectl apply -f api.yaml
> kubectl get pods; kubectl logs -f deploy/cinetrack-api; kubectl rollout undo deploy/cinetrack-api
> ```

> [!question]- Quand l'utiliser ?
> En tant que développeur : savoir lire les manifestes, consulter logs et pods, comprendre readiness/liveness. L'administration du cluster est souvent le rôle d'une équipe plateforme/DevOps.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Complexité élevée : surdimensionné pour un petit projet (préférer PaaS ou Compose).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Cluster | Ensemble de machines gérées par K8s |
| Pod | Plus petite unité déployable |
| Manifeste | Fichier YAML décrivant un objet |
| Readiness probe | Le pod est-il prêt à recevoir du trafic ? |
| Helm | Gestionnaire de « paquets » Kubernetes |

---

## Points clés

- Déclaratif : on décrit l'état souhaité
- Deployment + Service + Ingress = application web
- Probes et ressources obligatoires en production
- `kubectl logs/describe/get` pour déboguer

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Pas de readiness probe → trafic envoyé à un pod pas prêt
> - Pas de limites mémoire → un pod peut étouffer le nœud

---

## Exemple minimal

```bash
kind create cluster       # cluster local pour s'entraîner (ou minikube)
```

> [!note] Ce que j'en retiens
> On s'entraîne gratuitement en local.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Helm/Kustomize, GitOps (Argo CD), observabilité du cluster

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Infrastructure]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/cloud-04-kubernetes-introduction]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quel objet K8s garantit qu'il y a toujours 3 instances de l'API ?

---

## Tâches

- [ ] #task Déployer l'API CinéTrack sur un cluster kind local
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
