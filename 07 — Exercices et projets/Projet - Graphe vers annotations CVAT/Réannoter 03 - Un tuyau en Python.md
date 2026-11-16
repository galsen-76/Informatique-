---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Annotations dans l'API CVAT]]"
tags:
  - exercice
  - mini-projet
---
# Réannoter 03 - Un tuyau en Python

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Étape précédente :** [[Réannoter 02 - Les ids des labels en Python]]
> **Cours à avoir lu :** [[Cours - Du graphe JSON aux annotations CVAT par l'API]] (parties 4 à 6)
> **Notions validées par cette étape :** [[Annotations dans l'API CVAT]]

## Le but
Refaire en Python le `create` de l'étape 00 : le **premier** tuyau du JSON devient une forme envoyée au job.

## Ce que tu fais
- [ ] Écris `forme_tuyau(edge, labels, frame)` qui renvoie le dictionnaire de la forme
- [ ] Envoie-la avec `PATCH ?action=create`. Vérifie dans CVAT
- [ ] Mets `"frame": 99999` (une frame qui n'est pas dans le job) : lis l'erreur
- [ ] Oublie `raise_for_status()` et provoque une erreur : le script dit-il que ça a marché ? Remets-le

> [!success] Ça marche si…
> Le tuyau apparaît dans le job, avec `debut` coché, sans aucun id écrit en dur dans ton code.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> `frame` = `int(graph["image"]["id"])`. Le corps du `PATCH` : `{"shapes": [forme], "tags": [], "tracks": []}`.
