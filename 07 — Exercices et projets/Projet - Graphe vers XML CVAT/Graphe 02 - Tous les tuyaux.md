---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[XML en Python (ElementTree)]]"
  - "[[Format CVAT for images 1.1]]"
tags:
  - exercice
  - mini-projet
---
# Graphe 02 - Tous les tuyaux

> [!info] Où tu en es
> **Projet :** [[Projet - Convertir le graphe en XML CVAT]]
> **Étape précédente :** [[Graphe 01 - Lire et explorer le JSON]]
> **Cours à avoir lu :** [[Cours - Du JSON au XML, convertir le graphe en annotations CVAT]] (parties 2, 3 et 4)
> **Notions validées par cette étape :** [[XML en Python (ElementTree)]], [[Format CVAT for images 1.1]]

## Le but
Passer d'un tuyau à **tous** : une `<polyline label="tuyau">` par élément de `pipe_edges`, puis réimporter dans le job.

## Ce que tu fais
- [ ] Remplace ton `pipe_edges[0]` par une boucle sur toute la liste
- [ ] Sors la conversion des points dans une fonction `points_en_texte(geometry)` qui transforme `[[100.0, 400.0], [300.0, 284.53]]` en chaîne. Commence avec `str()` sur chaque nombre et regarde ce que tu obtiens
- [ ] Lance `comparer.py` : quelle différence sur les points ? Corrige le format des nombres
- [ ] Crée une polyline par tuyau, avec les attributs XML `label`, `source`, `occluded`, `points`, `z_order` et l'enfant `<attribute name="debut">`
- [ ] Compare l'ordre de tes tuyaux avec `attendu.xml` : le 3e est-il le même ? Corrige l'ordre **sans** toucher au JSON
- [ ] Mets `debut` à partir de `edge["attributes"]["debut"]`. Que se passe-t-il si un tuyau n'a pas de clé `attributes` ? Choisis une valeur par défaut raisonnable
- [ ] Lance le script : il réimporte dans le job. Les 4 tuyaux sont-ils dans CVAT, et le tuyau `debut` est-il le bon ?

> [!warning] Le piège de cette étape
> `str(100.0)` donne `"100.0"`, CVAT écrit `"100.00"`. Et le JSON ne range pas les tuyaux par `segment_id` : le fichier serait valide pour CVAT, mais différent de l'attendu.

> [!success] Ça marche si…
> Tes 4 tuyaux sont identiques à ceux d'`attendu.xml`, dans le même ordre, et le job CVAT les affiche.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> Un point : `f"{x:.2f},{y:.2f}"`. Plusieurs points : `";".join(...)`. Trier une liste de dictionnaires sur une clé : `sorted(liste, key=lambda e: e["segment_id"])`. Valeur par défaut d'une clé absente : `dict.get(cle, defaut)`.
