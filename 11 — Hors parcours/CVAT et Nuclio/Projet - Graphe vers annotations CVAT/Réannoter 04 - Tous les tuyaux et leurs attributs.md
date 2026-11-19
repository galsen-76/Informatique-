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
# Réannoter 04 - Tous les tuyaux et leurs attributs

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Étape précédente :** [[Réannoter 03 - Chercher les ids des labels]]
> **Cours :** [[Cours - Du graphe JSON aux annotations CVAT par l'API]] (parties 4 et 5)

## Le but
Envoyer **tous** les tuyaux du JSON en une requête, chacun avec **ses** attributs (pas toujours `"X"` et `"false"`).

## Ce que tu fais
- [ ] Écris une fonction `forme_tuyau(edge)` qui renvoie le dictionnaire d'**une** forme
- [ ] Dedans, construis `"attributes"` à partir de `edge["attributes"]` : pour chaque paire `nom: valeur`, un `{"spec_id": ..., "value": ...}`
- [ ] Fais une boucle sur `pipe_edges` qui remplit une liste `formes`, puis envoie `{"shapes": formes, "tags": [], "tracks": []}`
- [ ] Sur le gros JSON (`trang_71`), vérifie dans CVAT que le segment 15 a bien `axe` = `Y` et le segment 21 `debut` coché

> [!success] Ça marche si…
> Tous les tuyaux sont dans CVAT, avec leurs vrais attributs.

> [!quote] Mes notes
> _Ce que j'ai compris._

> [!question]- Indice
> `for nom, valeur in edge["attributes"].items():` parcourt les paires d'un dictionnaire.
