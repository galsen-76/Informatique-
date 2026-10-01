---
created: 2026-10-01
modified: 2026-10-01
type: knowledge
status: "🟡 In Progress"
level: Fondamental
tags:
  - tests/squash
  - tests/vocabulaire
aliases:
  - "Vocabulaire du test"
parent: "[[Squash TM]]"
---

# Vocabulaire du test

## Introduction

Les mots du test et de la gestion de projet que l'on croise dans [[Squash TM]], en réunion et dans les outils. Chaque terme en une phrase simple.

## 1. Versions et livraisons

| Terme | Définition |
| --- | --- |
| **Version** | un état de l'application, identifié par un numéro (V1, 2.0…) |
| **Livraison** | les développeurs fournissent une version aux testeurs ou au client |
| **Recette** | la phase où l'on vérifie que l'application fait ce qui était demandé, avant de l'accepter |
| **PV de recette** | le procès-verbal signé par le client pour valider la recette |
| **Release** | la version qu'on décide de mettre en production ; elle regroupe plusieurs sprints |
| **MEP** (mise en production) | la version devient accessible aux vrais utilisateurs |

## 2. Les environnements

Un environnement est une installation de l'application, avec un rôle précis.

```
Dev -> Recette -> Préprod (optionnel) -> Prod
```

| Environnement | Rôle |
| --- | --- |
| **Dev** | les développeurs codent |
| **Recette** | les testeurs valident, avec de fausses données |
| **Préprod** (optionnel) | une copie très proche de la production |
| **Prod** | les vrais utilisateurs |

On ne teste **jamais** en production.

## 3. L'organisation agile

| Terme | Définition |
| --- | --- |
| **Sprint** | une période de 1 à 4 semaines où l'équipe développe et teste quelques fonctionnalités |
| **User story** | une fonctionnalité vue par l'utilisateur : « En tant que client, je veux payer par carte… » |
| **Backlog** | la liste priorisée des user stories |
| **Product Owner** (PO) | représente le client, fixe les priorités, valide |

## 4. Les tests

| Terme | Définition |
| --- | --- |
| **Exigence** | un comportement attendu du système (voir [[Squash TM]]) |
| **Cas de test** | un scénario pour vérifier une exigence |
| **Anomalie / bug** | un écart entre le résultat obtenu et le résultat attendu |
| **Régression** | ce qui marchait avant ne marche plus, à cause d'une modification récente |
| **Test de non-régression** (TNR) | rejouer des tests existants pour vérifier qu'il n'y a pas de régression |
| **Couverture** | la part des exigences vérifiées par au moins un cas de test |

#### Comment ça fonctionne ? (la non-régression)

On rejoue **tous** les tests existants, ou **une sélection** : les fonctions critiques + les zones modifiées.

Ces tests sont souvent **automatisés** (voir [[Squash Orchestrator]] et [[Playwright]]). Ils sont parfois lancés à chaque sprint, ou à chaque modification.

En agile, il y a **deux moments** dans la même méthode :
- **pendant le sprint** : on teste seulement les nouveautés ;
- **avant la release** : on vérifie tout avec la non-régression.

## 5. L'automatisation

| Terme | Définition |
| --- | --- |
| **CI/CD** | une chaîne automatique qui, à chaque modification, compile, teste et peut déployer |
| **Pipeline** | la suite d'étapes de cette chaîne |

```
build -> tests -> déploiement
```

## 6. Le parcours complet

```
Sprints -> Livraison en recette -> Recette + TNR -> PV signé -> Release -> MEP
```
