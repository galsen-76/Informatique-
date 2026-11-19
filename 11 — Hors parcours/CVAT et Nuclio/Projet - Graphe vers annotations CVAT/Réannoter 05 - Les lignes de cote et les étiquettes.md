---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Annotations dans l'API CVAT]]"
tags:
  - exercice
  - mini-projet
---
# Réannoter 05 - Les lignes de cote et les étiquettes

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Étape précédente :** [[Réannoter 04 - Tous les tuyaux et leurs attributs]]
> **Cours :** [[Cours - Du graphe JSON aux annotations CVAT par l'API]] (parties 4 et 5)

## Le but
Pour chaque élément de `dimension_constraints` : une polyline `ligne de cote` et, s'il y en a une, un rectangle `etiquette` avec la longueur dans son attribut `nom`.

## Ce que tu fais
- [ ] Ajoute les lignes de cote : même principe que les tuyaux, avec `dimension_geometry` et le label `ligne de cote`
- [ ] Ajoute les étiquettes avec le label `etiquette` (type `rectangle`) : `points` = `[xtl, ytl, xbr, ybr]` calculés avec min et max sur `label_geometry`
- [ ] Lance avec le petit JSON : lis l'erreur sur `DC_0`. Que vaut son `label_geometry` ? Fais en sorte que la ligne soit créée mais pas l'étiquette
- [ ] Mets `nom` à `str(dc["length"])` et regarde dans CVAT : `2000.0` ou `2000` ? Corrige
- [ ] Sur le gros JSON, regarde DC_0, DC_5, DC_6 : l'étiquette colle-t-elle au chiffre ? (c'est l'étape 07)

> [!success] Ça marche si…
> Petit JSON : 3 formes (2 tuyaux, 1 ligne). Gros JSON : toutes les lignes et étiquettes, les droites bien placées.

> [!quote] Mes notes
> _Ce que j'ai compris._

> [!question]- Indice
> `if dc["label_geometry"] is None: continue` saute la suite de la boucle. `f"{2000.0:g}"` donne `"2000"`.
