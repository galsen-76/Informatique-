---
created: 2026-10-01
modified: 2026-10-01
type: knowledge
status: "🟡 In Progress"
level: Fondamental
tags:
  - tests/squash
aliases:
  - "Squash TM"
parent: "[[Tests et Qualité]]"
source: "https://tm-fr.doc.squashtest.com/v8/user-guide/presentation-generale/espaces-squash.html"
---

# Squash TM

## Introduction

Squash TM est une application web qui sert à **définir et suivre les tests** d'un système (logiciel, application, site web…).

Elle est organisée en trois espaces :
- **Exigences** : ce que le système doit faire ;
- **Cas de test** : comment on vérifie qu'il le fait ;
- **Exécution** : le passage des tests et leurs résultats.

Notes liées :
- [[Vocabulaire du test]]
- [[API Squash TM]]
- [[Squash Orchestrator]]
- [[Playwright]]
- [[Squash TM et GitLab]]
- [[Docker pour Squash TM|Docker]]
- [[Orchestrator vs API]]

## 1. Exigence

Une **exigence** est un comportement attendu du système.

Format : « Le `système` doit permettre `action` ».
Exemple : « Le site web doit permettre de se connecter ».

Il est préférable de **lister les exigences en amont**, dans un document.

#### Comment ça fonctionne ?

Dans Squash TM, une exigence est un **objet** avec des **attributs** (par exemple sa description).

**Les statuts**
- **En cours de rédaction** : le statut par défaut.
- **Approuvée** : l'exigence n'est plus modifiable et peut servir aux tests.
- **Obsolète** : permet d'archiver une exigence qui n'est plus valable (par exemple après une nouvelle version du système).

**Les relations entre exigences**

On peut relier des exigences entre elles. Par exemple, découper une grosse exigence (le **parent**) en plusieurs petites (les **enfants**) :

```
Exigence parent : Le site web doit permettre de gérer son compte
 |
 |-- Exigence enfant : Le site web doit permettre de se connecter
 |-- Exigence enfant : Le site web doit permettre de modifier son mot de passe
```

**Les indicateurs de couverture**

Ils indiquent où en sont les tests d'une exigence :

| Indicateur | Ce qu'il mesure |
| --- | --- |
| Taux de rédaction | % de cas de test au statut « À approuver » ou « Approuvé », parmi ceux qui couvrent l'exigence |
| Taux de vérification | % de cas de test exécutés (dernière exécution seulement), parmi ceux qui couvrent l'exigence |
| Taux de validation | % de cas de test au statut concluant (Succès ou Arbitré, dernière exécution), parmi les cas exécutés qui couvrent l'exigence |

## 2. Cas de test

Un **cas de test** est un scénario qui permet de tester une exigence.

On y renseigne :
- les **prérequis** : ce qui doit être vrai avant de commencer ;
- les **jeux de données** (optionnel) : les valeurs à utiliser ;
- les **actions** : ce que fait le testeur ;
- le **résultat attendu** : ce qui doit se passer ;
- l'**exigence testée**.

#### Comment ça fonctionne ?

Les jeux de données créent des **variables**, que l'on utilise sous la forme `${nom_de_la_variable}`.

Exemple :

| Champ | Valeur |
| --- | --- |
| Prérequis | Avoir de la connexion |
| Jeu de données | `username` = "admin", `password` = "1234" |
| Action | Saisir `${username}` et `${password}` |
| Résultat attendu | Redirection vers la page d'accueil avec un logo |
| Exigence testée | Le site web doit permettre de se connecter |

## 3. Exécution

#### Les définitions

- **Campagne** : l'objectif global de test. Exemples : recette V1, non-régression release 2.0.
- **Itération** : une passe d'exécution des tests dans la campagne, sur une livraison précise (1re livraison, livraison corrigée, avant mise en production…).
  Dans une recette, les tests changent peu d'une itération à l'autre : on rejoue les mêmes tests sur des livraisons corrigées jusqu'à ce que tout passe. Parfois, on ne rejoue que les tests échoués et les zones corrigées.
- **Suite** : un regroupement de cas de test par thème au sein d'une itération (connexion, paiement…). Une suite n'est **pas** un sprint.
- Une campagne a **au moins une itération** : c'est dans l'itération qu'on exécute les tests.

#### Deux façons d'organiser

**Le cycle en V**

On développe tout, puis on teste tout à la fin, dans une grosse phase de recette (la campagne). Plusieurs itérations = plusieurs passes jusqu'à la validation.

```
Campagne : Recette V1
 |
 |-- Itération 1 : 1re livraison      -> 10 bugs    -> correction
 |-- Itération 2 : livraison corrigée -> 2 bugs     -> correction
 |-- Itération 3 : livraison finale   -> tout passe -> V1 validée
```

**L'agile**

Chaque sprint teste ses nouveautés. Plusieurs sprints forment une **release** : c'est la release qui regroupe les sprints, pas l'itération.

Avant de livrer la release, on lance une **campagne de non-régression**, souvent avec une seule itération, découpée en suites :

```
Campagne : Non-régression Release 2.0
 |
 |-- Itération : avant mise en production
      |
      |-- Suite : connexion
      |-- Suite : utilisateurs
      |-- Suite : paiement
```

#### Nouvelles fonctionnalités

Nouvelles fonctionnalités = nouvelle version = **nouvelle campagne** (par exemple Recette V2).

Elle contient :
- les nouveaux cas de test ;
- une suite de non-régression avec les anciens.

On n'ajoute **pas** une itération à la campagne V1 pour ça.

```
Campagne : Recette V2
 |
 |-- Itération : 1re livraison V2
      |
      |-- Suite : nouvelles fonctionnalités  -> nouveaux cas de test
      |-- Suite : non-régression             -> anciens cas de test
```

#### L'objet Sprint dans Squash

Squash TM propose aussi un objet **Sprint** : des sprints de 1 à 4 semaines. Il sert à tester **uniquement** ce qui a été développé pendant le sprint.

## Conclusion

| Avantages | Inconvénients |
| --- | --- |
| Gestion des exigences | Orienté tests manuels (automatisation via [[Squash Orchestrator]]) |
| Traçabilité exigences ↔ cas de test ↔ résultats | Certaines fonctionnalités réservées aux versions payantes |
| Version communautaire gratuite et open source | Installation et hébergement à gérer soi-même (serveur, base de données) |
| Organisation claire (campagnes, itérations, suites) | Prise en main qui demande du temps |
| API REST (voir [[API Squash TM]]) | |

Guide : https://tm-fr.doc.squashtest.com/v8/user-guide/presentation-generale/espaces-squash.html
