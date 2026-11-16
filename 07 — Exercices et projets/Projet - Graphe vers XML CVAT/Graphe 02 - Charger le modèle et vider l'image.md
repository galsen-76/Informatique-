---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[XML]]"
  - "[[XML en Python (ElementTree)]]"
tags:
  - exercice
  - mini-projet
---
# Graphe 02 - Charger le modèle et vider l'image

> [!info] Où tu en es
> **Projet :** [[Projet - Convertir le graphe en XML CVAT]]
> **Étape précédente :** [[Graphe 01 - Lire et explorer le JSON]]
> **Cours à avoir lu :** [[Cours - Du JSON au XML, convertir le graphe en annotations CVAT]] (parties 1, 4 et 5)
> **Notions validées par cette étape :** [[XML]], [[XML en Python (ElementTree)]]

## Le but
Charger `modele.xml`, enlever toutes les formes de `<image>`, mettre ses attributs à jour depuis le JSON, et écrire `sortie.xml`.

## Ce que tu fais
- [ ] Charge `modele.xml` et trouve la balise `image`. Affiche combien elle a d'enfants (10)
- [ ] Enlève-les avec `for enfant in image: image.remove(enfant)`. Recompte : pourquoi en reste-t-il ? Corrige
- [ ] Essaie `image.clear()` à la place et regarde la balise `<image>` dans `sortie.xml` : qu'est-ce qui a disparu en plus ? Reviens à ta solution
- [ ] Mets à jour `id`, `name`, `width`, `height` avec les valeurs de `graph["image"]`. Lis l'erreur à l'écriture et corrige
- [ ] Écris `sortie.xml` et ouvre-le : le haut doit être identique au modèle, et `<image ... />` vide

> [!success] Ça marche si…
> `sortie.xml` contient le même `<meta>` que le modèle et `<image id="0" name="iso_080.jpg" width="800" height="600" />` sans rien dedans.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> `len(image)` donne le nombre d'enfants. Pour supprimer en parcourant, parcours une **copie** : `list(image)`.
