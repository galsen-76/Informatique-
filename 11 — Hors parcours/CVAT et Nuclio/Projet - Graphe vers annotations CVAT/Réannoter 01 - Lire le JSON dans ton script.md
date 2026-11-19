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
# Réannoter 01 - Lire le JSON dans ton script

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Cours :** [[Cours - Du graphe JSON aux annotations CVAT par l'API]] (partie 4)

## Le but
Que ton script lise le JSON comme un **dictionnaire**, et que tu saches y retrouver un tuyau.

## Ce que tu fais
- [ ] Lance ton script tel qu'il est : lis l'erreur sur `output_data["pipe_edges"]`. Que contient `output_data` : du texte ou un dictionnaire ? (`print(type(output_data))`)
- [ ] Corrige la lecture pour obtenir un dictionnaire
- [ ] Affiche le nombre de tuyaux (`pipe_edges`) et de cotes (`dimension_constraints`)
- [ ] Affiche, pour le premier tuyau : sa `geometry` et son `attributes`
- [ ] Remplace ton `"""""` par `#` devant les lignes du `data` (ou `"""`), pour garder ton exemple sous les yeux

> [!success] Ça marche si…
> Avec le petit JSON : `2` tuyaux, `1` cote, et la géométrie `[[101.03, 397.94], [300.0, 281.44], ...]`.

> [!quote] Mes notes
> _Ce que j'ai compris._

> [!question]- Indice
> `.read()` renvoie une chaîne. Le module `json` a une fonction qui prend un **fichier ouvert** et renvoie un dictionnaire.
