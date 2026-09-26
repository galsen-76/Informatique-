---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
aliases:
  - "Fondamentaux de l'Architecture Logicielle"
tags:
  - cs/architecture/fondamentaux
parent: "[[Architecture Logicielle]]"
related_theory:
  - "[[TG-05-Paradigmes-POO|Paradigmes de Programmation]]"
related_projects:
  - "[[02_Projects/app-planification-sprints]]"
source: "https://en.wikipedia.org/wiki/Software_architecture"
---

# Fondamentaux de l'Architecture Logicielle

> [!abstract] En bref
> L'**architecture**, c'est la façon d'**organiser** une application : comment la découper en morceaux, et comment ces morceaux communiquent. Une bonne architecture ne se voit pas le premier jour ; elle se voit dans six mois, quand ajouter une fonctionnalité reste **simple** au lieu de tout casser.

## L'image : urbanisme

Construire une cabane ne demande pas d'architecte. Construire un quartier, si : où passent les routes, où sont les égouts, quelles règles pour ajouter un immeuble sans bloquer les voisins. Une application qui grandit, c'est pareil.

## Ce qui rend un code « bien architecturé »

| Qualité | En clair | Question pour vérifier |
|---|---|---|
| **Séparation des responsabilités** | chaque morceau fait **une** chose | « si je change l'API TMDB, combien de fichiers je touche ? » (idéalement 2) |
| **Faible couplage** | les morceaux dépendent peu les uns des autres | « puis-je modifier ce module sans casser l'autre ? » |
| **Forte cohésion** | ce qui va ensemble est rangé ensemble | « tout ce qui concerne les favoris est-il au même endroit ? » |
| **Testabilité** | on peut tester un morceau seul | « puis-je tester ce service sans base de données ? » |
| **Simplicité** | pas plus complexe que nécessaire | « un nouveau venu comprend-il en une heure ? » |

## Les grands choix, du plus concret au plus abstrait

| Niveau | Question | Note |
|---|---|---|
| Dossiers | où ranger les fichiers ? | [[ARCH-15-Structure-de-Projet\|Structure de projet]] |
| Couches | comment circule une requête ? | [[ARCH-03-Architecture-en-Couches\|Architecture en couches]] |
| Communication | comment front et back se parlent ? | [[ARCH-04-API-REST-Design\|API REST]], [[ARCH-05-Client-Serveur-Communication\|Client-serveur]] |
| Découpage global | un bloc ou plusieurs services ? | [[ARCH-02-Monolithe-vs-Microservices\|Monolithe vs microservices]] |
| Code | comment écrire des classes et fonctions saines ? | [[ARCH-10-Clean-Code\|Clean code]], [[ARCH-11-SOLID\|SOLID]], [[ARCH-07-Design-Patterns-Fondamentaux\|Patterns]] |
| Métier complexe | comment isoler les règles métier ? | [[ARCH-12-Clean-Architecture-Hexagonale\|Hexagonale]], [[ARCH-13-Domain-Driven-Design\|DDD]] |
| Charge | comment tenir quand il y a beaucoup d'utilisateurs ? | [[ARCH-06-Scalabilite\|Scalabilité]], [[ARCH-09-Cache-Performance\|Cache]] |

## La règle d'or : ne pas sur-architecturer

Une architecture se choisit selon la **taille réelle** du projet :

- Portfolio : quelques dossiers bien rangés suffisent.
- CinéTrack-API : des couches claires (controller → service → base).
- Une application métier de 50 écrans avec 10 développeurs : des règles strictes, peut-être une architecture hexagonale.

Ajouter des couches, des interfaces et des patterns « au cas où » rend le code **plus difficile**, pas plus propre. On fait simple, et on fait évoluer quand le besoin apparaît.

## Documenter les choix

Un choix d'architecture important (« on prend NestJS », « on passe par un cache Redis ») s'écrit en quelques lignes dans un **ADR** : le contexte, la décision, les conséquences. Dans six mois, tu sauras **pourquoi**. Voir [[CONC-08-ADR-Architecture-Decision-Records|ADR]].
