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
  - "Squash Orchestrator"
parent: "[[Squash TM]]"
source: "https://tm-fr.doc.squashtest.com/v8/install-guide/installation/installation-orchestrator/components.html"
---

# Squash Orchestrator

## Introduction

Squash Orchestrator **exécute les tests automatisés depuis [[Squash TM]]** et **renvoie les résultats dans Squash TM**.

C'est un ensemble de **micro-services** (plusieurs petits programmes qui travaillent ensemble), basé sur **OpenTestFactory Orchestrator**.

## 1. Les composants

| Composant | Rôle |
| --- | --- |
| **Orchestrateur** | pilote la chaîne d'exécution |
| **Agent** | processus installé sur l'environnement d'exécution ; il interroge régulièrement l'orchestrateur pour récupérer des ordres |
| **opentf-ctl** | ligne de commande : lancer des workflows, les suivre, lister les environnements |
| **Plugin Jenkins** | envoyer un workflow depuis un pipeline Jenkins |

## 2. Le fonctionnement

#### Comment ça fonctionne ?

```
1. Squash TM    -> on lance une itération / suite automatisée -> plan envoyé à l'Orchestrator
2. Orchestrator -> prépare les ordres ("clone ce dépôt, lance ces tests")
3. Agent        -> récupère les ordres, clone le dépôt Git des tests, lance les tests,
                   renvoie les résultats
4. Orchestrator -> publie les résultats dans Squash TM
5. Squash TM    -> statuts des exécutions mis à jour
```

#### Le dépôt Git des tests

L'Orchestrator récupère les scripts de test dans un **dépôt Git**. À ne pas confondre avec **GitLab CI**, qui est le système de pipelines.

- Le dépôt contient **les tests** (par exemple des fichiers `.spec.ts`), **pas l'application**.
- L'application doit **déjà tourner** (sur l'environnement de recette). [[Playwright]] la teste via son **URL**.

```
Dépôt Git des tests -> Agent lance les tests -> Application déjà en ligne (recette, via son URL)
```

## 3. Trois façons de lancer les tests

1. **Le bouton dans Squash TM**, sur une itération ou une suite.
2. **`opentf-ctl`** avec un workflow.
3. **Un pipeline GitLab CI** qui envoie un workflow, par exemple chaque nuit ou à chaque push.

## 4. Les technologies de test

| Licence | Technologies |
| --- | --- |
| Standard | Cypress, Cucumber JVM, JUnit, Playwright, Postman, Robot Framework, SKF, SoapUI |
| Ultimate (payante) | Agilitest, Katalon, Ranorex, UFT |

Règle : **une seule technologie de test par dépôt Git**.

## 5. L'hébergement

L'Orchestrator est **à héberger soi-même**. Il existe une image [[Docker pour Squash TM|Docker]] « tout-en-un » : `squashtest/squash-orchestrator`.

Le plus lourd, c'est l'**environnement d'exécution** : l'agent, Node.js et les navigateurs de Playwright.

Pour alléger :
- tout mettre sur **une seule machine** pour un POC (une preuve de concept, un essai) ;
- n'installer **qu'un seul navigateur** : `npx playwright install chromium` ;
- ou **se passer de l'Orchestrator** (voir [[Orchestrator vs API]]).

## 6. Écrire les tests reste indispensable

Pour une nouvelle fonctionnalité, il faut toujours écrire les tests.

En automatisé, on écrit **le cas de test + un script**. C'est plus long au départ, mais le script se **rejoue ensuite automatiquement**.

C'est pourquoi on automatise **en priorité la non-régression** (voir [[Vocabulaire du test]]).

```
Test automatisé -> plus long à écrire au départ -> rejoué automatiquement ensuite
```

## Conclusion

| Avantages | Inconvénients |
| --- | --- |
| Exécution automatique depuis Squash TM | Installation complexe |
| Résultats remontés automatiquement | Certaines technologies réservées à la licence Ultimate |
| Nombreuses technologies supportées | Une seule technologie par dépôt |
| Intégration CI/CD | Il faut savoir écrire des tests automatisés |

Guide : https://tm-fr.doc.squashtest.com/v8/install-guide/installation/installation-orchestrator/components.html
