---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Format CVAT for images 1.1]]"
  - "[[Patron Stratégie (Strategy)]]"
tags:
  - exercice
  - mini-projet
---
# Graphe 08 - Toutes les formes avec un format d'entrée commun

> [!info] Où tu en es
> **Projet :** [[Projet - Convertir le graphe en XML CVAT]]
> **Étape précédente :** [[Graphe 07 - Un fichier de référence exporté de CVAT]]
> **Fiche à avoir lue :** [[Format CVAT for images 1.1]]
> **Notions validées par cette étape :** [[Format CVAT for images 1.1]], [[Patron Stratégie (Strategy)]]

## Le but
Ton convertisseur sait faire des tuyaux et des cotes. Maintenant il doit savoir écrire **n'importe quelle** forme CVAT (sauf masque et squelette, à l'étape 09). Pour ça, tu sépares le travail en deux :
1. le graphe est d'abord transformé en une **liste de formes simples**, toutes au même format, par exemple `{"type": "polyline", "label": "tuyau", "points": [[100.0, 400.0], [300.0, 284.53]], "attributes": {"debut": "true"}}` ;
2. une seconde partie, qui ne connaît **rien** du graphe, écrit chaque forme de cette liste en XML.

## Ce que tu fais
- [ ] Écris `formes.json` à la main : la liste des formes de `reference_formes.xml` (sans masque, squelette, tag pour l'instant), dans **ton** format commun. Décide pour chaque type quelles clés il faut (rectangle : 4 nombres ou 2 points ? ellipse : centre et rayons ?)
- [ ] Écris une fonction par type : `ecrire_box(parent, forme)`, `ecrire_ellipse(...)`, `ecrire_cuboid(...)`… Une **seule** fonction pour `polygon`, `polyline` et `points`
- [ ] Choisis la bonne fonction d'abord avec une suite de `if / elif`. Puis remplace-la par un dictionnaire `{"box": ecrire_box, ...}`. Lequel est le plus simple quand tu ajoutes un type ?
- [ ] Mets une forme `"type": "cercle"` dans `formes.json` : que se passe-t-il ? Lève une erreur claire en anglais qui donne le type inconnu
- [ ] Ajoute le tag. Où doit-il aller dans `<image>` ? Que n'a-t-il pas, par rapport aux formes ?
- [ ] Gère la rotation : l'attribut n'apparaît que s'il est différent de 0
- [ ] Compare avec `reference_formes.xml` (mets de côté masque et squelette en les retirant d'une copie)
- [ ] Fais repasser ton graphe des étapes 01 à 05 par ce nouveau chemin (graphe → liste de formes → XML) : `comparer.py attendu.xml sortie.xml` doit toujours dire `Identiques`

> [!warning] Le piège de cette étape
> Mélanger « lire le graphe » et « écrire le XML » dans les mêmes fonctions : chaque nouveau type t'obligerait à toucher au code du graphe. Avec un format commun au milieu, ajouter une forme = ajouter **une** fonction et **une** ligne dans le dictionnaire.

> [!success] Ça marche si…
> Les 6 formes et le tag sont identiques à la référence, une forme de type inconnu donne une erreur claire, et le graphe donne toujours `Identiques`.

> [!quote] Mes notes
> _Mon format commun, et pourquoi je l'ai choisi ainsi._

> [!question]- Indice
> Un dictionnaire peut contenir des fonctions : `ECRIVAINS = {"box": ecrire_box}` puis `ECRIVAINS[forme["type"]](image_el, forme)`. Pour savoir si la clé existe avant : `forme["type"] in ECRIVAINS`. Pour l'ellipse, relis la fiche : CVAT écrit `cx cy rx ry`.
