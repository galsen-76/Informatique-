---
created: 2026-09-24
modified: 2026-10-02
type: moc
tags:
  - moc
aliases:
  - "Infrastructure"
---

# 🗂️ Infrastructure

> [!abstract] Pourquoi ce domaine
> Mettre en production et exploiter : Linux, CI/CD, cloud, Kubernetes, IaC, observabilité. Voir aussi [[Docker]].

> [!tip] Quand l'étudier
> M11.

← [[Accueil]] · [[Roadmap-12-mois|Roadmap 12 mois]]

---

## Ordre de lecture

1. [[LNX-01-Linux-Essentiels|Linux Essentiels]] — Fondamental · M11
2. [[LNX-02-Permissions-Processus-Services|Permissions Processus et Services]] — Intermédiaire · M11
3. [[CICD-01-Fondamentaux|CI/CD Fondamentaux]] — Fondamental · M11
4. [[CICD-02-Pipeline-Full-Stack|Pipeline CI/CD Full Stack]] — Avancé · M11
5. [[CICD-03-Strategies-Deploiement|Stratégies de Déploiement]] — Avancé · M11
6. [[CLOUD-01-Fondamentaux-Cloud|Fondamentaux du Cloud]] — Fondamental · M11
7. [[CLOUD-02-Heberger-Front|Héberger un Front]] — Intermédiaire · M11
8. [[CLOUD-03-Heberger-API-BDD|Héberger une API et une Base de Données]] — Intermédiaire · M11
9. [[CLOUD-04-Kubernetes-Introduction|Kubernetes Introduction]] — Avancé · M11
10. [[CLOUD-05-Infrastructure-as-Code|Infrastructure as Code]] — Avancé · M11
11. [[MON-01-Logs|Logs]] — Intermédiaire · M11
12. [[MON-02-Metriques-Alerting|Métriques et Alerting]] — Avancé · M11
13. [[MON-03-Tracing-Sentry-OpenTelemetry|Tracing Sentry et OpenTelemetry]] — Avancé · M11

Voir aussi : [[Docker]]

## Carte du domaine CI/CD

> [!tip] Le but
> Pas « j'ai lu les notes », mais : **« donne-moi un problème nouveau et laisse-moi le résoudre »**. Méthode : [[Methode-du-coach|Méthode du coach]].

| Niveau | Notions | Note |
|---|---|---|
| **Fondamental** | CI, livraison et déploiement continus, étapes d'un pipeline, règles d'équipe | [[CICD-01-Fondamentaux\|CI/CD Fondamentaux]] |
| **Indispensable** | écrire un `.gitlab-ci.yml` : stages, jobs, règles, services, variables, images Docker | [[CICD-02-Pipeline-Full-Stack\|Pipeline full stack]] |
| **Avancé** | stratégies de déploiement, migrations compatibles, retour arrière | [[CICD-03-Strategies-Deploiement\|Stratégies de déploiement]] |

- **Compétences pratiques** : lire un pipeline rouge et trouver le job en cause ; ajouter un job ; mettre un secret dans les variables ; déployer manuellement depuis `main`.
- **Confusions fréquentes** : « pipeline vert = application qui marche » (il ne vérifie que ce qu'on teste) ; « les jobs d'un stage s'enchaînent » (ils tournent en parallèle) ; « blue / green = retour arrière toujours instantané » (pas si la base a changé).
- **Prérequis** : [[Git]], [[03-CI-CD|GitLab CI/CD]], [[DK-02-Dockerfile|Dockerfile]], [[TEST-01-Pyramide-des-Tests|Pyramide des tests]].
- **À ignorer au début** : canary et feature flags, runners auto-hébergés, pipelines multi-projets.

```mermaid
flowchart LR
  C1["CICD-01 Fondamentaux"] --> C2["CICD-02 Pipeline"] --> C3["CICD-03 Stratégies"]
```


---

## Progression

```dataview
TABLE WITHOUT ID file.link AS "Note", level AS "Niveau", month AS "Mois", status AS "Statut"
FROM "12-Infrastructure"
WHERE type = "knowledge"
SORT file.name ASC
```
