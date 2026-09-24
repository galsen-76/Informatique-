---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M11
tags:
  - infra/deploiement
aliases:
  - "Stratégies de Déploiement"
parent: "[[Infrastructure]]"
children: []
related_theory:
  - "[[CICD-01-Fondamentaux|Fondamentaux CI/CD]]"
  - "[[NET-09-Proxy-Reverse-Proxy-Load-Balancer|Proxy Reverse Proxy et Load Balancer]]"
related_snippets:
  - "[[04_Snippets/cicd-03-strategies-deploiement]]"
related_projects: []
source: "https://martinfowler.com/bliki/BlueGreenDeployment.html"
---

# Stratégies de Déploiement

> [!abstract] Introduction
> Mettre en production sans interruption ni risque excessif : rolling update, blue/green, canary, feature flags — et toujours un plan de retour arrière.

> [!warning]- Prérequis
> [[CICD-01-Fondamentaux|Fondamentaux CI/CD]]

---

## Théorie

> [!question]- C'est quoi ?
> | Stratégie | Principe | + | − |
> |---|---|---|---|
> | Recreate | Arrêter l'ancien, démarrer le nouveau | Simple | Coupure |
> | Rolling | Remplacer les instances une par une | Sans coupure | Deux versions en même temps |
> | Blue/Green | Deux environnements, bascule du trafic | Rollback instantané | Double infrastructure |
> | Canary | Nouvelle version pour x % du trafic | Risque limité, mesuré | Outillage et observabilité |
> | Feature flags | Code déployé mais fonctionnalité désactivée | Découple déploiement et activation | Dette si flags jamais retirés |

> [!example]- Analogie
> Canary : les mineurs emmenaient un canari dans la mine ; s'il allait mal, on sortait avant que tout le monde soit touché.

> [!question]- Pourquoi l'utiliser ?
> Déployer en journée sans stress, limiter l'impact d'un bug, revenir en arrière en secondes.

> [!question]- Comment ça marche ?
> ```mermaid
> flowchart LR
>   LB[Load balancer] -->|"100 %"| B["Blue v1.4"]
>   LB -. "0 % → bascule" .-> G["Green v1.5"]
> ```
> Prérequis : health checks, migrations compatibles (expand/contract), monitoring pour décider (erreurs, latence), rollback documenté et testé.

> [!question]- Quand l'utiliser ?
> Rolling par défaut (Kubernetes) ; canary/blue-green pour les applications critiques ; feature flags pour les grosses fonctionnalités.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Avec plusieurs versions simultanées, API et BDD doivent rester rétrocompatibles.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Rollback | Retour à la version précédente |
| Health check | Vérification qu'une instance est prête |
| Canary | Déploiement progressif sur une fraction du trafic |
| Feature flag | Interrupteur de fonctionnalité |

---

## Points clés

- Toujours un plan de rollback
- Migrations rétrocompatibles
- Surveiller après chaque déploiement
- Retirer les feature flags obsolètes

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Déployer un vendredi soir sans monitoring ni rollback

---

## Exemple minimal

```typescript
// Feature flag simple côté front (config chargée au démarrage)
@if (flags.actif('recommandations-ia')) { <app-recommandations /> }
```

> [!note] Ce que j'en retiens
> La fonctionnalité est en production mais invisible tant que le flag est éteint.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Déploiements progressifs automatisés avec analyse de métriques (Argo Rollouts, Flagger)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Infrastructure]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/cicd-03-strategies-deploiement]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quel prérequis BDD pour un rolling update ?

---

## Tâches

- [ ] #task Ajouter un endpoint `/health` à l'API et un healthcheck Docker
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
