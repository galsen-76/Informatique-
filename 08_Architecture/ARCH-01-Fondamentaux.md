---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
aliases:
  - "Fondamentaux de l'Architecture Logicielle"
tags:
  - cs/architecture/fondamentaux
parent: "[[Architecture Logicielle]]"
children:
  - "[[ARCH-02-Monolithe-vs-Microservices|Monolithe vs Microservices]]"
  - "[[ARCH-03-Architecture-en-Couches|Architecture en Couches]]"
related_theory:
  - "[[TG-05-Paradigmes-POO|Paradigmes de Programmation]]"
related_snippets: []
related_projects:
  - "[[02_Projects/app-planification-sprints]]"
source: "https://en.wikipedia.org/wiki/Software_architecture"
---

# Fondamentaux de l'Architecture Logicielle

> [!abstract] Introduction
> L'architecture logicielle, c'est l'ensemble des grandes décisions structurelles d'une application — comment elle est découpée en parties, comment ces parties communiquent — prises AVANT d'écrire le détail du code, et difficiles à changer une fois le projet avancé.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] Différence entre "code" et "architecture"
> > Le CODE répond à "comment cette fonction calcule-t-elle ce résultat ?". L'ARCHITECTURE répond à des questions bien plus larges : "où vivent les données ?", "comment le frontend parle-t-il au backend ?", "que se passe-t-il si ce service tombe en panne ?". Ce sont deux niveaux de réflexion différents.
>
> L'architecture définit :
> - Les grandes **parties** de l'application (frontend, backend, base de données, services externes)
> - Comment elles **communiquent** entre elles (API REST, messages, appels directs)
> - Comment l'application **grandit** (peut-elle gérer plus d'utilisateurs sans tout réécrire ?)
> - Ce qui se passe en cas de **panne** partielle

> [!question]- Pourquoi l'utiliser ?
> Une mauvaise décision de code (une fonction mal nommée) coûte quelques minutes à corriger. Une mauvaise décision d'ARCHITECTURE (un mauvais découpage entre services, par exemple) peut coûter des semaines ou des mois à corriger une fois le projet avancé — d'où l'importance d'y réfléchir sérieusement dès le départ, sans pour autant sur-ingénierie un projet simple.

> [!question]- Comment ça marche ?
> **Les grandes questions qu'une architecture doit trancher :**
> 1. **Découpage** : une seule application (monolithe) ou plusieurs services séparés (microservices) ? (voir [[ARCH-02-Monolithe-vs-Microservices|Monolithe vs Microservices]])
> 2. **Organisation interne** : comment structurer le code À L'INTÉRIEUR d'une même application ? (voir [[ARCH-03-Architecture-en-Couches|Architecture en Couches]])
> 3. **Communication** : comment les parties séparées échangent-elles des données ? (voir [[ARCH-05-Client-Serveur-Communication|Client-Serveur et Communication]], [[ARCH-08-Architecture-Evenementielle|Architecture Evenementielle]])
> 4. **Stockage** : où et comment les données persistent-elles ?
> 5. **Montée en charge** : comment l'application absorbe-t-elle plus de trafic ? (voir [[ARCH-06-Scalabilite|Scalabilite]])
>
> > [!note] Le piège du "sur-architecturer"
> > Concevoir une architecture en microservices ultra-sophistiquée pour une application utilisée par 50 personnes est souvent une erreur — la complexité ajoutée dépasse largement le bénéfice réel. L'architecture doit être proportionnée au besoin RÉEL du projet, pas à ce qui semble impressionnant.
>
> **Les qualités qu'une bonne architecture recherche :**
> - **Maintenabilité** : facile à comprendre et modifier plus tard
> - **Scalabilité** : peut grandir sans tout reconstruire
> - **Résilience** : continue de fonctionner (au moins partiellement) même si une partie tombe en panne
> - **Testabilité** : chaque partie peut être testée isolément

> [!question]- Quand l'utiliser ?
> Réfléchir à l'architecture dès qu'un projet dépasse le stade du script ou du petit prototype — même une réflexion de 30 minutes sur "comment je découpe ça" évite souvent des refontes douloureuses plus tard.

---

## Points clés

- L'architecture = les décisions structurelles larges, prises avant le détail du code
- Une mauvaise décision d'architecture coûte beaucoup plus cher à corriger qu'une mauvaise décision de code
- Les 4 qualités recherchées : maintenabilité, scalabilité, résilience, testabilité
- Sur-architecturer un petit projet est une erreur aussi fréquente que sous-architecturer un gros projet
- L'architecture doit toujours être proportionnée au besoin réel, pas à la mode du moment

---

## Paramètres / Configuration

| Question architecturale | Notes concernées |
|-----------|-------------|
| Comment découper l'application ? | [[ARCH-02-Monolithe-vs-Microservices\|Monolithe vs Microservices]] |
| Comment organiser le code interne ? | [[ARCH-03-Architecture-en-Couches\|Architecture en Couches]] |
| Comment les parties communiquent ? | [[ARCH-05-Client-Serveur-Communication\|Client-Serveur et Communication]], [[ARCH-08-Architecture-Evenementielle\|Architecture Evenementielle]] |
| Comment absorber plus de trafic ? | [[ARCH-06-Scalabilite\|Scalabilite]] |
| Quels patterns de code réutiliser ? | [[ARCH-07-Design-Patterns-Fondamentaux\|Design Patterns Fondamentaux]] |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Sur-architecturer un petit projet (microservices, hexagonal) dès le premier jour
> - Choisir une architecture à la mode sans ADR ni critères

---

## Exemple minimal

> [!note] Pas d'exemple de code
> L'architecture se raisonne à un niveau plus haut que des lignes de code précises — un schéma ou une description vaut mieux qu'un extrait ici. Voir les notes suivantes pour des exemples concrets par sujet.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Documenter l'architecture avec le modèle C4 (contexte, conteneurs, composants) et des ADR (voir [[CONC-08-ADR-Architecture-Decision-Records|Architecture Decision Records ADR]])

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Architecture Logicielle]]
- Sous-sujets → [[ARCH-02-Monolithe-vs-Microservices|Monolithe vs Microservices]], [[ARCH-03-Architecture-en-Couches|Architecture en Couches]]
- À comparer avec → [[TG-05-Paradigmes-POO|Paradigmes de Programmation]]

**Pratique :**
- Extrait de code → (aucun, sujet conceptuel)
- Projet → [[02_Projects/app-planification-sprints]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle différence entre architecture et code ?

> [!faq]- Questions d'entretien
> - Comment prenez-vous une décision d'architecture ?

---

## Tâches

- [ ] #task Dessiner un schéma simple de l'architecture actuelle de l'app de planification de sprints (Angular + API GitLab, sans base de données)
- [ ] #task Identifier les qualités (maintenabilité, scalabilité, résilience) déjà présentes ou manquantes dans un projet existant
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Pour un projet avec l'ampleur de l'app de planification de sprints, quel niveau d'architecture est réellement justifié, sans sur-ingénierie ?
