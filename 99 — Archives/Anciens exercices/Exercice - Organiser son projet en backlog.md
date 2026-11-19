---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Méthode agile (Scrum et Kanban)]]"
  - "[[Backlog et priorisation]]"
  - "[[Définition de terminé]]"
  - "[[User story]]"
  - "[[MVP (produit minimum viable)]]"
tags:
  - exercice
---
# Exercice — Organiser son projet en backlog

> [!info] Objectif
> Organiser ton vrai projet CVAT comme une équipe agile : un backlog trié, un tableau Kanban et une définition de terminé.
> Notions : [[Méthode agile (Scrum et Kanban)]] · [[Backlog et priorisation]] · [[Définition de terminé]] · [[User story]] · [[MVP (produit minimum viable)]]

## Consignes
- [ ] Liste toutes les tâches de ton projet CVAT (au moins 10), sans trier
- [ ] Réécris au moins 3 d'entre elles en user stories
- [ ] Classe chaque tâche en Must, Should, Could ou Won't
- [ ] Mets-les dans l'ordre, en plaçant en haut ce qui est le plus **risqué**
- [ ] Entoure ce qui forme le MVP
- [ ] Crée un tableau (GitLab *Issue boards*, ou papier) : À faire, En cours, En revue, Terminé, avec au maximum 2 cartes « En cours »
- [ ] Écris ta définition de terminé (5 à 7 lignes)
- [ ] Pendant une semaine, déplace tes cartes chaque jour ; note à la fin ce qui t'a bloqué

> [!question]- Indice
> Ce qui est risqué, c'est ce qui peut faire échouer tout le projet : en général l'infrastructure (le Nexus, la CI, le réseau entre Nuclio et CVAT) avant l'interface. Pour la définition de terminé, pense à ce que vérifie ta pipeline GitLab.

> [!question]- Solution
> Exemple d'ordre : 1. image CVAT construite en CI avec le Nexus (Must, risque élevé) ; 2. fonction Nuclio qui appelle l'API CVAT ; 3. dessin du PNG à partir des annotations ; 4. bouton React qui appelle la fonction ; 5. message d'erreur clair (ces cinq-là forment le MVP) ; 6. journaux des exports (Should) ; 7. tests de bout en bout (Should) ; 8. choix des couleurs (Could) ; 9. export PDF (Won't).
> Exemple de définition de terminé : critères d'acceptation vérifiés ; merge request relue ; pipeline verte ; pas de secret dans le code ; README à jour ; déployé en recette.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
