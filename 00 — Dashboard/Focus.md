---
niveau_actuel: 0
current: "[[Terminal]]"
goal: "Fondamentaux 1 à 3 : me déplacer dans WSL, régler une variable d'environnement, ranger mon travail dans Git"
next:
  - "[[Chemin de fichier]]"
  - "[[Variable d'environnement]]"
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

## Les fondamentaux utiles (dans l'ordre)
Seulement ce que j'utilise vraiment au travail. Une notion à la fois, je ne passe à la suivante que quand elle est **finie**.

**Mon poste**
1. [[Terminal]] et [[Chemin de fichier]] (WSL)
2. [[Variable d'environnement]] (proxy, fichier .env)
3. [[Git]], [[Branche Git]], [[Merge request]]

**Python**
4. [[Variables et types]], [[Condition (if)]], [[Boucle (for, while)]]
5. [[Fonction]], [[Module et import]], [[Environnement virtuel Python]]
6. [[Liste et dictionnaire]] et [[JSON]]
7. [[Exception]] et [[Fiche - Lire un message d'erreur]]

**Réseau et API**
8. [[HTTP]] et [[Code de statut HTTP]]
9. [[API]] et [[Appeler une API HTTP]]
10. [[Port]], [[Proxy]], [[CORS]]

**Livrer**
11. [[Image Docker]], [[Conteneur]], [[Dockerfile]]
12. [[Docker Compose]]
13. [[Pipeline GitLab CI]]

## Ma méthode pour une notion (environ 1 h)
1. **Comprendre (10 min)** : je lis seulement « En une phrase » et « 1 · Comprendre ». Pas toute la fiche.
2. **Dessiner (15 min)** : sans regarder, je dessine le mécanisme dans Excalidraw (qui parle à qui, dans quel ordre). Je compare avec la fiche et je corrige.
3. **Faire (20 min)** : je l'utilise pour de vrai, sur mon travail ou sur MesDépenses. Je laisse les erreurs arriver et je les corrige.
4. **Expliquer (5 min)** : 3 phrases avec mes mots dans « 4 · Expliquer », puis je demande à Claude de m'interroger.
5. **Revoir** : le lendemain, puis 1 semaine après, puis 1 mois après (3 questions, sans regarder).

Une notion est **finie** quand j'ai le dessin, que je l'ai utilisée et que je sais l'expliquer sans regarder.
Si une notion en demande une autre : je lis seulement « En une phrase » de l'autre, je la note dans Parking, et je reviens.

## Ensuite : les notions de mes projets
Après les fondamentaux, j'apprends ce que je rencontre au travail. Chaque note projet du [coffre Travail](obsidian://open?vault=Travail&file=Aujourd%27hui) a une section « Concepts utilisés » : c'est ma liste. Le reste de ce coffre est un dictionnaire, je l'ouvre seulement quand j'en ai besoin.

## Parking (idées pour plus tard)
Tout ce qui attire mon attention mais n'est **pas** le sujet actuel. Je le note ici, et je reviens au sujet.
-

## Quand je passe au niveau suivant
Quand [[Niveaux]] affiche « validé » pour mon niveau, je change `niveau_actuel` et Claude prépare le fil rouge du niveau suivant.

## Quand je change de sujet
1. Le sujet actuel est au moins *compris* : ses trois cases sont cochées (schéma, exercices visuels, fil rouge).
2. Je planifie sa révision (`next_review`).
3. Je prends le premier élément de `next` comme nouveau `current`.
