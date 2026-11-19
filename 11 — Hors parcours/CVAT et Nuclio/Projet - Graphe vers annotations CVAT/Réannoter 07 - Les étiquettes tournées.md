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
# Réannoter 07 - Les étiquettes tournées

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Étape précédente :** [[Réannoter 06 - Remplacer au lieu d'ajouter]]

## Le but
Sur le gros JSON, certaines étiquettes sont penchées (DC_0, DC_5, DC_6). Le min/max fait un rectangle droit trop grand. CVAT décrit un rectangle penché comme **un rectangle droit + un angle** (`"rotation"` en degrés) autour de son centre.

## L'idée, en image
```text
  rectangle penché (4 coins)        rectangle droit + rotation
        p0                          +------------+
       /  \                         |   centre   |   tourné de 329°
     p3    p1          →            |     x      |   autour du centre
       \  /                         +------------+
        p2                           largeur × hauteur
```
- **centre** = moyenne des 4 coins
- **largeur** = longueur du côté p1 → p2, **hauteur** = longueur du côté p0 → p1
- **angle** = direction du côté p2 → p1
- puis le rectangle droit : `[cx - largeur/2, cy - hauteur/2, cx + largeur/2, cy + hauteur/2]`

## Ce que tu fais
- [ ] Écris `rectangle(coins)` qui renvoie `(points, rotation)`. Teste-la d'abord **sans CVAT** sur DC_0 du gros JSON
- [ ] Teste-la sur une étiquette droite (DC_1) : tu dois retrouver le min/max et une rotation de 0
- [ ] Ajoute `"rotation"` à la forme de l'étiquette et regarde dans CVAT

> [!success] Ça marche si…
> DC_0 donne un centre ≈ (5618.31, 4330.40), 124.45 × 71.31, rotation ≈ 329°, et l'étiquette colle au chiffre dans CVAT.

> [!quote] Mes notes
> _Ce que j'ai compris._

> [!question]- Indice
> `math.dist(a, b)` = longueur entre deux points. `math.atan2(dy, dx)` = angle en radians, `math.degrees(...)` le convertit, `% 360` le ramène entre 0 et 360.
