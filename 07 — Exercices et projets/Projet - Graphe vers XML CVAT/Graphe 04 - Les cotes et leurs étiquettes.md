---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Format CVAT for images 1.1]]"
tags:
  - exercice
  - mini-projet
---
# Graphe 04 - Les cotes et leurs étiquettes

> [!info] Où tu en es
> **Projet :** [[Projet - Convertir le graphe en XML CVAT]]
> **Étape précédente :** [[Graphe 03 - Les tuyaux]]
> **Cours à avoir lu :** [[Cours - Du JSON au XML, convertir le graphe en annotations CVAT]] (parties 2 et 3)
> **Notions validées par cette étape :** [[Format CVAT for images 1.1]]

## Le but
Pour chaque élément de `dimension_constraints`, ajouter une `<polyline label="ligne de cote">` et une `<box label="etiquette de cote">` dont l'attribut CVAT `nom` est la longueur.

## Ce que tu fais
- [ ] Ajoute les lignes de cote : c'est presque la même chose que les tuyaux. Réutilise ta fonction de points au lieu de la recopier
- [ ] Ajoute les boxes en prenant `xtl, ytl` sur le **premier** point de `label_geometry` et `xbr, ybr` sur le **troisième**. Compare : que s'est-il passé ? Dessine le rectangle sur une feuille avec l'axe y vers le bas
- [ ] Corrige pour que ça marche **quel que soit** l'ordre des coins dans le JSON
- [ ] Mets `nom` à `str(dc["length"])` : compare avec l'attendu et corrige. Et si une longueur valait `1500.5` un jour, que voudrais-tu écrire ?
- [ ] Attention à l'ordre : dans l'attendu, **toutes** les lignes de cote viennent avant **toutes** les étiquettes. Est-ce le cas chez toi ?

> [!warning] Le piège de cette étape
> Un rectangle CVAT, c'est 2 coins (haut gauche, bas droite). Le JSON en donne 5, dans un ordre qui commence en haut à **droite**. Et `2000.0` n'est pas `2000`.

> [!success] Ça marche si…
> Les 3 lignes de cote et les 3 étiquettes sont identiques à l'attendu (`210.00 378.00 240.00 392.00` et `nom` = `2000` pour la première).

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> `xs = [p[0] for p in dc["label_geometry"]]`, puis `min(xs)` et `max(xs)`. Pour la longueur : `float.is_integer()` dit si un nombre n'a pas de partie décimale, ou essaie le format `f"{n:g}"`.
