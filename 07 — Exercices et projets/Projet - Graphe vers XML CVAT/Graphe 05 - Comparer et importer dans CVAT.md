---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Format CVAT for images 1.1]]"
tags:
  - exercice
  - mini-projet
---
# Graphe 05 - Comparer et importer dans CVAT

> [!info] Où tu en es
> **Projet :** [[Projet - Convertir le graphe en XML CVAT]]
> **Étape précédente :** [[Graphe 04 - Les cotes et leurs étiquettes]]
> **Notions validées par cette étape :** [[Format CVAT for images 1.1]]

## Le but
Vérifier que `sortie.xml` est identique à `attendu.xml`, puis qu'il s'importe vraiment dans CVAT.

## Ce que tu fais
- [ ] `python3 comparer.py attendu.xml sortie.xml` doit afficher `Identiques`. Sinon, corrige la première différence et recommence
- [ ] Le nom de la tâche (`iso_080_test`) ne vient pas du JSON : fais-en un paramètre de ton script et change-le dans `<meta>`
- [ ] Dans ton CVAT local, crée une tâche avec les 3 labels et une image 800x600, puis Actions → Upload annotations → « CVAT 1.1 » avec `sortie.xml`. Les formes sont-elles au bon endroit ?
- [ ] Change une lettre d'un label dans `sortie.xml` et réimporte : lis le message de CVAT

> [!success] Ça marche si…
> `comparer.py` affiche `Identiques` et CVAT affiche les 4 tuyaux, 3 lignes de cote et 3 étiquettes.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> Le nom de la tâche est dans `meta/task/name` : `racine.find("meta/task/name").text = ...`.
