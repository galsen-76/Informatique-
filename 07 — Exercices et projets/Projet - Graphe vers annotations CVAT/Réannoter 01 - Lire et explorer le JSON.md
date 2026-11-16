---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[JSON]]"
  - "[[Liste et dictionnaire]]"
tags:
  - exercice
  - mini-projet
---
# Réannoter 01 - Lire et explorer le JSON

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Étape précédente :** [[Réannoter 00 - Un tuyau à la main dans Bruno]]
> **Cours à avoir lu :** [[Cours - Du graphe JSON aux annotations CVAT par l'API]] (partie 4)
> **Notions validées par cette étape :** [[JSON]], [[Liste et dictionnaire]]

## Le but
Savoir où sont, dans `graph.json`, les données qui deviendront des formes.

## Ce que tu fais
- [ ] Charge le fichier avec `json.load("graph.json")`. Lis l'erreur, corrige
- [ ] Affiche le nom de l'image, puis le nombre de tuyaux et de cotes (4 et 3)
- [ ] Pour chaque tuyau : `segment 0 : debut=true, points [100.0, 400.0, 300.0, 284.53]` (points déjà **aplatis**)
- [ ] Pour chaque cote : sa longueur écrite `2000` (pas `2000.0`) et le rectangle `[xtl, ytl, xbr, ybr]` calculé depuis `label_geometry`
- [ ] Essaie `graph["pipe_edges"]["geometry"]` : lis l'erreur. Liste ou dictionnaire ?

> [!success] Ça marche si…
> Tu as 4 tuyaux, 3 cotes, et pour la première cote `2000` et `[210.0, 378.0, 240.0, 392.0]`.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> `json.load` veut un fichier ouvert (`with open(...) as f`). Aplatir : `[v for p in geometry for v in p]`. Rectangle : `min` et `max` sur les x, puis sur les y.
