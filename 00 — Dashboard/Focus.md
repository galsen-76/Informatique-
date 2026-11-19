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

## Parking (idées pour plus tard)
Tout ce qui attire mon attention mais n'est **pas** le sujet actuel. Je le note ici, et je reviens au sujet.
-

## Quand je passe au niveau suivant
Quand [[Niveaux]] affiche « validé » pour mon niveau, je change `niveau_actuel` et Claude prépare le fil rouge du niveau suivant.

## Quand je change de sujet
1. Le sujet actuel est au moins *compris* : ses trois cases sont cochées (schéma, exercices visuels, fil rouge).
2. Je planifie sa révision (`next_review`).
3. Je prends le premier élément de `next` comme nouveau `current`.
