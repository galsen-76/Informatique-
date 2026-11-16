---
type: exercise
status: a-faire
difficulty: difficile
concepts:
  - "[[Format CVAT for images 1.1]]"
tags:
  - exercice
  - mini-projet
---
# Graphe 09 - Le masque et le squelette

> [!info] Où tu en es
> **Projet :** [[Projet - Convertir le graphe en XML CVAT]]
> **Étape précédente :** [[Graphe 08 - Toutes les formes avec un format d'entrée commun]]
> **Fiche à avoir lue :** [[Format CVAT for images 1.1]] (masque et squelette)
> **Notions validées par cette étape :** [[Format CVAT for images 1.1]]

## Le but
Ajouter les deux formes les plus différentes : le **masque** (des pixels, encodés en RLE) et le **squelette** (une forme qui contient d'autres formes). Après ça, ton convertisseur couvre tout le format.

## Ce que tu fais
**Le masque**
- [ ] Décide comment ton format commun décrit un masque. Le plus lisible : `left`, `top` et une grille de 0 et de 1, par exemple `[[0,0,1,1],[0,0,0,0],[1,1,0,0]]`
- [ ] Écris `grille_en_rle(grille)` qui renvoie la liste des longueurs. Teste-la sur l'exemple de la fiche : tu dois obtenir `[2, 2, 4, 2, 2]`
- [ ] Teste une grille qui **commence** par un 1 : que doit valoir le premier nombre ? Ta fonction le fait-elle ?
- [ ] Écris `ecrire_mask` : `width` et `height` viennent de la grille. Regarde comment CVAT sépare les nombres du `rle` dans ta référence
- [ ] Vérifie à l'envers : additionne ton `rle`, tu dois retrouver `width × height`

**Le squelette**
- [ ] Décide comment ton format commun décrit un squelette : un label et une liste de points nommés
- [ ] Écris `ecrire_skeleton` : la balise `skeleton`, puis un `<points>` **dedans** pour chaque point. Compare les attributs du parent et des enfants avec ta référence : lesquels n'ont pas `occluded`, `outside`, `z_order` ?
- [ ] Ajoute le bloc `<meta>` du squelette en le recopiant de ta référence

**Pour finir**
- [ ] Compare ta sortie complète avec `reference_formes.xml` : `Identiques`
- [ ] La vraie preuve : importe ta sortie dans une **nouvelle** tâche CVAT qui a les mêmes labels, et vérifie que les 9 annotations s'affichent au bon endroit

> [!warning] Le piège de cette étape
> Le RLE compte **toujours** d'abord les pixels vides. Et le squelette ne suit pas la règle des autres formes : ses enfants ont `outside`, et pas de `z_order`.

> [!success] Ça marche si…
> `comparer.py reference_formes.xml sortie.xml` affiche `Identiques` et l'import dans CVAT montre les 9 annotations.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> Pour le RLE : aplatis la grille en une seule liste de pixels, puis parcours-la en gardant « la valeur en cours » (au début 0) et un compteur. Quand la valeur change, tu ranges le compteur dans la liste et tu repars à 1.
