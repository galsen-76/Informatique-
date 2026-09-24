---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M11
tags:
  - infra/metriques
aliases:
  - "Métriques et Alerting"
parent: "[[Infrastructure]]"
children: []
related_theory:
  - "[[MON-01-Logs|Logs]]"
  - "[[ARCH-06-Scalabilite|Scalabilité]]"
related_snippets:
  - "[[04_Snippets/mon-02-metriques-alerting]]"
related_projects: []
source: "https://prometheus.io/docs/introduction/overview/"
---

# Métriques et Alerting

> [!abstract] Introduction
> Les métriques sont des mesures chiffrées dans le temps (requêtes/s, latence, erreurs, CPU) visualisées dans des tableaux de bord (Grafana) et surveillées par des alertes qui préviennent AVANT que les utilisateurs se plaignent.

> [!warning]- Prérequis
> [[MON-01-Logs|Logs]]

---

## Théorie

> [!question]- C'est quoi ?
> Méthode **RED** pour les services : **R**ate (débit), **E**rrors (taux d'erreurs), **D**uration (latence, percentiles p50/p95/p99).
> Méthode **USE** pour les ressources : Utilisation, Saturation, Erreurs.
> Front : **Core Web Vitals** (LCP, INP, CLS) mesurés chez les vrais utilisateurs (RUM).
> Stack classique : Prometheus (collecte) + Grafana (tableaux de bord) + Alertmanager ; ou outils SaaS (Datadog, Grafana Cloud).

> [!example]- Analogie
> Le tableau de bord d'une voiture : vitesse, température, niveau d'huile — et un voyant qui s'allume avant la panne.

> [!question]- Pourquoi l'utiliser ?
> Détecter une dégradation (latence qui monte, erreurs 5xx), dimensionner, vérifier l'impact d'un déploiement.

> [!question]- Comment ça marche ?
> - Exposer `/metrics` (prom-client, `@willsoto/nestjs-prometheus`)
> - Alerter sur les symptômes utilisateurs (taux d'erreurs > 1 %, p95 > 800 ms) plutôt que sur chaque CPU à 80 %
> - SLO : objectif de qualité (99,9 % de requêtes réussies sur 30 jours)

> [!question]- Quand l'utiliser ?
> Toute application en production avec des utilisateurs réels.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Trop d'alertes = alertes ignorées (fatigue d'alerte).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Percentile p95 | 95 % des requêtes sont plus rapides que cette valeur |
| SLO / SLA | Objectif / engagement contractuel de niveau de service |
| RUM | Mesure chez les vrais utilisateurs |
| Dashboard | Tableau de bord de métriques |

---

## Points clés

- RED pour les API
- Percentiles plutôt que moyennes
- Alertes sur les symptômes
- Core Web Vitals pour le front

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Surveiller la moyenne de latence (cache les lenteurs de quelques utilisateurs)

---

## Exemple minimal

```text
Alerte : taux de 5xx > 2 % pendant 5 min sur /api → notification Teams/Slack + lien vers le dashboard et les logs
```

> [!note] Ce que j'en retiens
> Une alerte actionnable dit quoi, où, depuis quand, et où regarder.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Définir SLO et budgets d'erreur avec le produit

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Infrastructure]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/mon-02-metriques-alerting]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi le p95 est-il plus utile que la moyenne ?

---

## Tâches

- [ ] #task Ajouter Prometheus + Grafana au docker-compose et un dashboard RED de l'API
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
