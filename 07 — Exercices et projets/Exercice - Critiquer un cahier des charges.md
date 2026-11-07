---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Cahier des charges]]"
  - "[[Exigences fonctionnelles et non fonctionnelles]]"
  - "[[Spécification (specs)]]"
tags:
  - exercice
---
# Exercice — Critiquer un cahier des charges

> [!info] Objectif
> Apprendre à **lire** une demande comme un développeur expérimenté : repérer ce qui est flou, manquant ou contradictoire, et le transformer en questions avant de coder.
> Notions : [[Cahier des charges]] · [[Exigences fonctionnelles et non fonctionnelles]] · [[Spécification (specs)]]

## Le document reçu
```text
Cahier des charges - Outil de suivi des annotations
1. Nous voulons un outil simple et rapide pour suivre l'avancement des annotations.
2. L'outil doit afficher toutes les tâches et leurs statistiques.
3. Il doit être sécurisé.
4. Les responsables doivent pouvoir exporter les données, etc.
5. L'outil doit fonctionner hors ligne et se mettre à jour en temps réel.
6. Il faut utiliser MongoDB.
7. Livraison : rapidement.
```

## Consignes
- [ ] Souligne chaque mot flou et explique pourquoi on ne peut pas le tester
- [ ] Repère la contradiction
- [ ] Repère la ligne qui impose une solution au lieu d'exprimer un besoin
- [ ] Classe chaque ligne : besoin fonctionnel, non fonctionnel, contrainte ou autre
- [ ] Liste ce qui manque complètement (au moins quatre éléments)
- [ ] Écris 8 questions à poser au demandeur
- [ ] Réécris les lignes 1, 3 et 4 sous forme d'exigences vérifiables (invente des valeurs raisonnables)

> [!question]- Indice
> Pour chaque mot, demande-toi : « comment je prouverais que c'est fait ? ». Pour ce qui manque, reprends le contenu habituel d'un cahier des charges dans la fiche [[Cahier des charges]].

> [!question]- Solution
> - **Mots flous** : simple, rapide, toutes, statistiques (lesquelles ?), sécurisé (contre quoi ? qui a accès ?), les données (lesquelles ? dans quel format ?), etc., rapidement.
> - **Contradiction** : « hors ligne » et « temps réel » (ligne 5) ; il faut savoir lequel compte vraiment et dans quelle situation.
> - **Solution imposée** : « utiliser MongoDB » (ligne 6). Demander pourquoi : contrainte réelle de l'entreprise ou habitude ?
> - **Classement** : 1 non fonctionnel (vague), 2 fonctionnel, 3 non fonctionnel, 4 fonctionnel, 5 non fonctionnel, 6 contrainte, 7 planning.
> - **Manque** : les utilisateurs et leur nombre, le contexte et l'objectif réel, le périmètre et le hors périmètre, les critères de réception, l'hébergement et l'infrastructure, une date, le volume de données.
> - **Exemples de réécriture** : « La page d'accueil s'affiche en moins de 2 s pour 500 tâches. » « Seuls les comptes du groupe Annotation accèdent à l'outil, via l'authentification de l'entreprise. » « Un responsable exporte en CSV la liste des tâches avec : nom, nombre d'images, nombre d'annotations, statut. »

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
