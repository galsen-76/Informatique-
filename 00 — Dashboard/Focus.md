---
niveau_actuel: 0
current: "[[Python]]"
goal: "Niveau 0 : écrire un petit script Python dans WSL et le ranger dans Git (fil rouge « Suivre ses dépenses en Python »)"
next:
  - "[[Variables et types]]"
  - "[[Condition (if)]]"
  - "[[Boucle (for, while)]]"
tags:
  - focus
---
# Focus

> [!abstract] Une seule chose à la fois
> - **`current`** : la notion que j'apprends maintenant (une seule).
> - **`goal`** : ce que je saurai faire quand ce sera fini, concrètement.
> - **`next`** : les deux ou trois notions qui suivent, dans l'ordre.
> - **`niveau_actuel`** : mon niveau (voir [[Niveaux]]). Le [[Dashboard]] ne compte que les notions jusqu'à ce niveau ; le reste est dans [[Référence travail]].
>
> Le [[Dashboard]] lit ces propriétés et vérifie que les prérequis sont compris.

## Les fondamentaux (dans l'ordre)
La base sans laquelle le reste ne tient pas. Je les fais dans l'ordre, un à la fois.

1. [[Terminal]] et [[Chemin de fichier]]
2. [[Variable d'environnement]]
3. [[Git]], [[Commit]], [[Branche Git]]
4. [[Variables et types]]
5. [[Condition (if)]] et [[Boucle (for, while)]]
6. [[Fonction]] et [[Module et import]]
7. [[Liste et dictionnaire]] et [[JSON]]
8. [[Exception]] et [[Fiche - Lire un message d'erreur]]
9. [[HTTP]], [[Code de statut HTTP]], [[API]]
10. [[Appeler une API HTTP]]
11. [[Port]] et [[Proxy]]
12. [[Image Docker]], [[Conteneur]], [[Dockerfile]]

## Ensuite : les notions de mes projets
Après les fondamentaux, j'apprends ce que je rencontre au travail. Chaque note projet du [coffre Travail](obsidian://open?vault=Travail&file=Aujourd%27hui) a une section « Concepts utilisés » : c'est ma liste. Quand un ticket me fait croiser une notion, je l'ajoute là-bas, j'ouvre sa fiche ici et je l'écris avec mes mots.

Le reste du coffre est un dictionnaire : je l'ouvre quand j'en ai besoin.

## Parking (idées pour plus tard)
Tout ce qui attire mon attention mais n'est **pas** le sujet actuel. Je le note ici, et je reviens au sujet.
-

## Quand je passe au niveau suivant
Quand [[Niveaux]] affiche « validé » pour mon niveau, je change `niveau_actuel` et Claude prépare le fil rouge du niveau suivant.

## Quand je change de sujet
1. Le sujet actuel est au moins *compris* : ses trois cases sont cochées (schéma, exercices visuels, fil rouge).
2. Je planifie sa révision (`next_review`).
3. Je prends le premier élément de `next` comme nouveau `current`.
