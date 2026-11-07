---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Preuve de concept (POC)]]"
  - "[[Prototype]]"
  - "[[MVP (produit minimum viable)]]"
tags:
  - exercice
---
# Exercice — POC, prototype ou MVP

> [!info] Objectif
> Reconnaître, à partir d'une situation, si on a besoin d'un POC, d'un prototype ou d'un MVP, et justifier par la **question** à laquelle on répond.
> Notions : [[Preuve de concept (POC)]] · [[Prototype]] · [[MVP (produit minimum viable)]]

## Consignes
- [ ] Pour chaque situation, écris POC, prototype ou MVP, avec une phrase de justification, **avant** d'ouvrir la solution
- [ ] 1. Ton responsable demande si Nuclio peut vraiment appeler l'API de CVAT depuis le réseau de l'entreprise
- [ ] 2. Tu dessines dans Figma l'emplacement du bouton d'export et tu le montres à trois annotateurs
- [ ] 3. L'équipe utilise depuis une semaine un bouton qui exporte une tâche en PNG, avec une gestion d'erreur et des journaux, sans les options avancées
- [ ] 4. Tu veux savoir si la bibliothèque Pillow dessine 50 images de plans en moins de 10 secondes
- [ ] 5. Une start-up met en ligne une application de réservation qui ne gère qu'un seul type de salle, pour voir si des clients paient
- [ ] 6. Un client hésite entre deux parcours de commande ; tu lui fais cliquer deux maquettes
- [ ] Pour finir : écris en une phrase la question à laquelle répond **ton** projet actuel

> [!question]- Indice
> Demande-toi : la question est-elle « est-ce faisable ? », « est-ce ce qu'il faut ? » ou « est-ce utile pour de vrai, à de vrais utilisateurs ? ».

> [!question]- Solution
> 1. **POC** : question de faisabilité technique dans un environnement donné.
> 2. **Prototype** : on montre pour recueillir des avis sur l'usage, rien n'a besoin de fonctionner.
> 3. **MVP** : de vrais utilisateurs, en production, avec le minimum de fonctions mais une vraie qualité.
> 4. **POC** (ciblé sur la performance) : on mesure, on répond oui ou non.
> 5. **MVP** : une seule fonction, mais un vrai produit utilisé par de vrais clients.
> 6. **Prototype** : comparer deux usages avant de construire.
> Ton projet : « Peut-on, avec GitLab et le Nexus de l'entreprise, ajouter à CVAT un bouton qui appelle une fonction Nuclio et renvoie un PNG des annotations ? » C'est un **POC**.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque réponse
