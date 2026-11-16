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
# Graphe 01 - Lire et explorer le JSON

> [!info] Où tu en es
> **Projet :** [[Projet - Convertir le graphe en XML CVAT]]
> **Étape précédente :** rien, c'est le début
> **Cours à avoir lu :** [[Cours - Du JSON au XML, convertir le graphe en annotations CVAT]] (parties 1, 5 et 6)
> **Notions validées par cette étape :** [[JSON]], [[Liste et dictionnaire]]

## Le but
Avant de fabriquer quoi que ce soit, savoir **où sont les données** dont le XML a besoin. Ton script charge `graph.json` et affiche un petit résumé de son contenu.

## Ce que tu fais
- [ ] Charge le fichier en écrivant `json.load("graph.json")`. Lis l'erreur : que reçoit `load`, et qu'attend-il ? Corrige
- [ ] Affiche le nom et la taille de l'image, puis le nombre de nœuds, de tuyaux et de cotes. Tu dois trouver 5, 4 et 3
- [ ] Pour chaque tuyau, affiche une ligne `segment 0 : PC_0 -> PC_1, debut=true, 2 points`. Regarde l'ordre des `segment_id` : que remarques-tu ?
- [ ] Pour chaque cote, affiche son id, sa longueur et le **nombre** de points de `label_geometry`. Pourquoi 5 points pour un rectangle ?
- [ ] Essaie `graph["pipe_edges"]["geometry"]` : lis l'erreur. Qu'est-ce que `pipe_edges`, une liste ou un dictionnaire ?
- [ ] Dans le cours, parties 2 à 5, repère dans ta tête ce que tu viens d'afficher qui servira au XML, et ce qui ne servira pas

> [!warning] Le piège de cette étape
> `json.load` veut un **fichier ouvert**, `json.loads` veut une **chaîne**. Et dans ce JSON, les listes (`[...]`) contiennent des dictionnaires (`{...}`) qui contiennent des listes : il faut savoir à chaque niveau si on indexe avec un **numéro** ou une **clé**.

> [!success] Ça marche si…
> Tu as `iso_080.jpg 800x600`, `5 nœuds, 4 tuyaux, 3 cotes`, les segments dans l'ordre 0, 1, 3, 2, et 5 points pour chaque étiquette.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> `with open("graph.json", encoding="utf-8") as f:` puis `json.load(f)`. Pour parcourir les tuyaux : `for edge in graph["pipe_edges"]:`. `len()` donne la taille d'une liste.
