---
created: 2026-10-01
modified: 2026-10-01
type: knowledge
status: "🟡 In Progress"
level: Intermédiaire
tags:
  - tests/squash
  - tests/automatisation
aliases:
  - "Orchestrator vs API"
parent: "[[Squash TM]]"
---

# Orchestrator vs API

## Introduction

Pour relier des tests automatisés ([[Playwright]]) à [[Squash TM]], il y a deux solutions :
- le **[[Squash Orchestrator]]** ;
- l'**[[API Squash TM]]** + un script dans un pipeline GitLab CI.

## 1. Avec l'Orchestrator

L'Orchestrator gère **les deux sens** :
- **l'aller** : Squash lance les bons scripts, grâce à la référence du test automatisé ;
- **le retour** : les résultats sont rattachés automatiquement aux cas de test.

```
Squash TM -> Orchestrator -> scripts Playwright -> résultats -> Squash TM
```

## 2. Avec l'API seule

#### Comment ça fonctionne ?

```
Pipeline GitLab CI
 |
 |-- npx playwright test             -> rapport de tests
 |-- parser                          -> rapport converti au format JSON de Squash
 |-- envoi via l'API Squash TM       -> résultats rattachés aux cas de test
```

- Le **parser** est un petit programme qui convertit le rapport de Playwright au format attendu par Squash.
- Les résultats sont rattachés aux cas de test dont la **référence correspond exactement**. Sinon, ils sont **ignorés**.

Squash propose un **guide CI/CD officiel** pour cette approche.

## 3. La comparaison

| | Orchestrator | API + script |
| --- | --- | --- |
| Lien script ↔ cas de test | Automatique | Script à écrire |
| Infrastructure | Orchestrator + agents à héberger | Juste le pipeline CI existant |
| Maintenance | Configuration | Code du parser à maintenir |
| Lancer depuis Squash TM | Oui | Non, seulement depuis la CI |

## 4. Comment choisir

- On veut **lancer les tests depuis Squash** et avoir la **traçabilité** -> **Orchestrator**.
- Les tests sont **déjà dans GitLab CI** et on veut **juste remonter les résultats** -> **API**.

## 5. L'usage typique

```
GitLab CI           -> non-régression (chaque nuit ou avant une release)
Bouton Squash TM    -> relancer ponctuellement une suite après une correction
En local            -> npx playwright test, pendant l'écriture (sans Squash ni Orchestrator)
```

## Conclusion

| | Avantages | Inconvénients |
| --- | --- | --- |
| **Orchestrator** | lien automatique, lancement depuis Squash TM | Orchestrator et agents à héberger |
| **API + script** | utilise le pipeline CI existant | parser à écrire et à maintenir, pas de lancement depuis Squash TM |
