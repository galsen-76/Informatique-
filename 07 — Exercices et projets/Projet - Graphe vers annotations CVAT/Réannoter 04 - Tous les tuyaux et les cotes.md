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
# Réannoter 04 - Tous les tuyaux et les cotes

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Étape précédente :** [[Réannoter 03 - Un tuyau en Python]]
> **Cours à avoir lu :** [[Cours - Du graphe JSON aux annotations CVAT par l'API]] (parties 4 et 5)
> **Notions validées par cette étape :** [[Annotations dans l'API CVAT]]

## Le but
Construire la liste complète : 4 tuyaux, 3 lignes de cote, 3 étiquettes, et l'envoyer en **une** requête.

## Ce que tu fais
- [ ] Une boucle sur `pipe_edges` avec ta fonction `forme_tuyau`
- [ ] Écris `forme_ligne_de_cote` et `forme_etiquette`. Pour le rectangle, prends d'abord le premier et le troisième coin de `label_geometry` : regarde dans CVAT ce que ça donne, puis corrige avec min/max
- [ ] Mets l'attribut `nom` de l'étiquette à `str(dc["length"])` : regarde dans CVAT, corrige
- [ ] Envoie les 10 formes en un seul `create` et vérifie dans CVAT

> [!success] Ça marche si…
> Le job affiche les 4 tuyaux, 3 lignes de cote et 3 étiquettes au bon endroit, la première étiquette avec `nom` = `2000`.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> Vérifie d'abord dans tes labels que `ligne de cote` et `etiquette de cote` existent bien sous ces noms exacts sur ton serveur.
