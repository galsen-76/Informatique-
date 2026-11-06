---
type: exercise
status: a-faire
difficulty: difficile
concepts:
  - "[[Arbre et graphe]]"
  - "[[Parcours en largeur et en profondeur]]"
tags:
  - exercice
---
# Exercice — Explorer un graphe

> [!info] Objectif
> Modéliser de vrais problèmes en graphes et les résoudre par des parcours.
> Notions : [[Arbre et graphe]] · [[Parcours en largeur et en profondeur]]

## Consignes
- [ ] Écris un dictionnaire qui représente les prérequis des modules de ton coffre (ouvre Parcours.md)
- [ ] Avec un parcours en profondeur, calcule un ordre des modules qui respecte tous les prérequis (tri topologique)
- [ ] Ajoute volontairement un cycle (01 dépend de 21) et fais en sorte que ton programme le détecte et le signale
- [ ] Représente ce labyrinthe par une liste de chaînes (`#` mur, `.` libre, `D` départ, `A` arrivée) et trouve le plus court chemin avec un parcours en largeur ; affiche le nombre de pas
- [ ] Affiche le labyrinthe avec le chemin dessiné en `*`
- [ ] Écris une fonction récursive qui affiche un arbre de dossiers avec une indentation, comme la commande `tree`
- [ ] Explique pourquoi le parcours en largeur donne le plus court chemin et pas le parcours en profondeur

> [!question]- Indice
> Grille : chaque case libre est un nœud, ses voisins sont les cases haut, bas, gauche, droite qui ne sont pas des murs. Garde, pour chaque case visitée, la case d'où tu viens : c'est ce qui permet de reconstruire le chemin.

> [!question]- Solution
> ```python
> from collections import deque
> prerequis = {"01": [], "02": ["01"], "03": ["02"], "16": ["01", "02"], "13": ["02", "07", "16"],
>              "07": ["02", "05"], "05": ["04"], "04": ["01"], "21": ["01", "16"]}
>
> def ordre(graphe):
>     etat, res = {}, []                     # absent : jamais vu ; 1 : en cours ; 2 : fini
>     def visiter(n):
>         if etat.get(n) == 2: return
>         if etat.get(n) == 1: raise ValueError(f"cycle détecté autour de {n}")
>         etat[n] = 1
>         for p in graphe.get(n, []): visiter(p)
>         etat[n] = 2
>         res.append(n)
>     for n in graphe: visiter(n)
>     return res
>
> LAB = ["##########",
>        "#D...#...#",
>        "#.##.#.#.#",
>        "#..#...#A#",
>        "##########"]
> def chemin(lab):
>     g = [list(l) for l in lab]
>     dep = next((i, j) for i, l in enumerate(g) for j, c in enumerate(l) if c == "D")
>     file, venu_de = deque([dep]), {dep: None}
>     while file:
>         i, j = file.popleft()
>         if g[i][j] == "A":
>             case = venu_de[(i, j)]
>             while case and case != dep:
>                 g[case[0]][case[1]] = "*"; case = venu_de[case]
>             return len([1 for l in g for c in l if c == "*"]) + 1, ["".join(l) for l in g]
>         for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
>             v = (i + di, j + dj)
>             if g[v[0]][v[1]] != "#" and v not in venu_de:
>                 venu_de[v] = (i, j); file.append(v)
>     return None
>
> def arbre(d, prof=0):
>     print("    " * prof + d.name + ("/" if d.is_dir() else ""))
>     if d.is_dir():
>         for p in sorted(d.iterdir()): arbre(p, prof + 1)
> ```
> Le parcours en largeur explore toutes les cases à 1 pas, puis toutes celles à 2 pas, etc. : la première fois qu'il atteint l'arrivée, c'est forcément par un chemin minimal. Le parcours en profondeur peut l'atteindre par un long détour.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
