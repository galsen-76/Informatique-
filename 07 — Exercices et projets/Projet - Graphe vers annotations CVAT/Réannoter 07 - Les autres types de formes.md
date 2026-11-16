---
type: exercise
status: a-faire
difficulty: difficile
concepts:
  - "[[Annotations dans l'API CVAT]]"
tags:
  - exercice
  - mini-projet
---
# Réannoter 07 - Les autres types de formes

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Étape précédente :** [[Réannoter 06 - Une fonction prête pour Nuclio]]
> **Fiche à avoir lue :** [[Annotations dans l'API CVAT]] (tableau « Les points selon le type »)
> **Notions validées par cette étape :** [[Annotations dans l'API CVAT]]

## Le but
Savoir écrire **n'importe quel** type de forme CVAT, au cas où une autre source en fournit.

## Ce que tu fais
- [ ] Dans un job de test, dessine à la main un exemple de chaque type (rectangle tourné, polygone, points, ellipse, cuboïde, masque, squelette, tag), puis `GET` les annotations : c'est ta référence
- [ ] Pour chaque type, retrouve dans la référence ce que contient `points` (et `elements` pour le squelette, `tags` pour le tag)
- [ ] Écris une fonction par type et choisis-la avec un dictionnaire `{"rectangle": forme_rectangle, ...}`. Un type inconnu → erreur claire
- [ ] Recrée chaque forme de la référence avec tes fonctions, sur un autre folio, et compare dans CVAT

> [!success] Ça marche si…
> Les formes recréées sont identiques à celles dessinées à la main.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> Ellipse : `[cx, cy, cx + rx, cy - ry]`. Masque : les nombres du RLE, puis `[left, top, right, bottom]`.
