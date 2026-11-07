---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Spécification (specs)]]"
  - "[[Exigences fonctionnelles et non fonctionnelles]]"
  - "[[User story]]"
  - "[[Critères d'acceptation]]"
  - "[[Spécification technique]]"
tags:
  - exercice
---
# Exercice — Écrire les specs du bouton d'export

> [!info] Objectif
> Écrire une spec courte mais complète (fonctionnelle puis technique) pour l'export PNG de CVAT, comme si une autre personne devait le développer sans te poser de question.
> Notions : [[Spécification (specs)]] · [[Exigences fonctionnelles et non fonctionnelles]] · [[User story]] · [[Critères d'acceptation]] · [[Spécification technique]]

## Consignes
- [ ] Crée une note `Specs - Export PNG` en suivant le plan de [[Bonnes pratiques - Specs]]
- [ ] Contexte et objectif : 3 lignes maximum
- [ ] Périmètre : dedans et hors périmètre
- [ ] Au moins 3 exigences fonctionnelles et 3 non fonctionnelles, numérotées, toutes vérifiables
- [ ] 2 user stories (deux types d'utilisateurs différents) avec un vrai « afin de »
- [ ] Pour chaque story, au moins 3 scénarios Étant donné / Quand / Alors, dont au moins un cas d'erreur
- [ ] Partie technique : un schéma Mermaid de 4 boîtes maximum, le contrat de la fonction Nuclio (entrée, sortie, codes d'erreur), où vit le jeton d'accès à CVAT
- [ ] Questions ouvertes : au moins deux choses que tu ne sais pas encore
- [ ] Relis toute ta spec en cherchant les mots flous (« rapide », « simple », « etc. », « gérer ») et remplace-les

> [!question]- Indice
> Pour les non fonctionnelles, pense à : temps, droits d'accès, déploiement (CI et Nexus), journaux. Pour les cas d'erreur : tâche vide, tâche introuvable, utilisateur sans droit, fonction Nuclio arrêtée. Un critère se vérifie en regardant l'écran ou un fichier, sans lire le code.

> [!question]- Solution
> Il n'y a pas une seule bonne spec. Vérifie la tienne avec cette grille :
> - chaque exigence a un numéro et peut être testée par oui ou non ;
> - le hors périmètre contient au moins un élément que quelqu'un pourrait demander (PDF, export groupé) ;
> - chaque story dit **qui**, **quoi** et **pourquoi**, et le pourquoi n'est pas une répétition du quoi ;
> - les scénarios décrivent ce qu'on **voit** (un téléchargement, un message), pas le code ;
> - la partie technique dit qui appelle qui, avec quelles données, et ce qui arrive en cas d'erreur (par exemple 404 si la tâche n'existe pas, 403 sans droit, 504 si CVAT ne répond pas) ;
> - le jeton de service est stocké dans la configuration de la fonction Nuclio ou un secret, jamais dans le front ;
> - les questions ouvertes sont de vraies questions (une image par photo ou une planche ? qui a le droit d'exporter ?).
> Compare avec les exemples des fiches [[Spécification (specs)]], [[Critères d'acceptation]] et [[Spécification technique]].

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
