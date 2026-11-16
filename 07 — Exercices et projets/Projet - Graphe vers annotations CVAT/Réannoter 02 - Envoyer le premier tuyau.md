---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Annotations dans l'API CVAT]]"
  - "[[Appeler une API HTTP (requests)]]"
tags:
  - exercice
  - mini-projet
---
# Réannoter 02 - Envoyer le premier tuyau

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Étape précédente :** [[Réannoter 01 - Lire le JSON dans ton script]]
> **Cours :** [[Cours - Du graphe JSON aux annotations CVAT par l'API]] (parties 4, 5 et 6)

## Le but
Ton `data` (celui que tu as testé dans Bruno) devient du vrai code : les `points` viennent du **premier tuyau du JSON**, et le script l'envoie lui-même à CVAT. Les ids (`2`, `1` à `6`) restent écrits en dur pour l'instant.

## Ce que tu fais
- [ ] Récupère le premier tuyau du JSON dans une variable `edge`
- [ ] Transforme `edge["geometry"]` (liste de paires) en liste plate `[x1, y1, x2, y2, ...]`. Affiche-la et compare avec ton `data`
- [ ] Remets `data` dans le code (plus en commentaire) et mets cette liste dans `"points"`. Prends `"frame"` dans `graph["image"]["id"]` : attention au type
- [ ] Envoie `data` avec `requests.patch` sur `/api/jobs/{job_id}/annotations`, `action=create`, avec `auth=(username, password)`. Affiche le code de statut
- [ ] Regarde dans CVAT. Relance le script : combien de tuyaux maintenant ? (normal, on corrige à l'étape 06)

> [!warning] Le piège
> `graph["image"]["id"]` vaut `"0"` (texte), CVAT veut `0` (nombre). Et sans `raise_for_status()`, une erreur 400 passe inaperçue.

> [!success] Ça marche si…
> Le script affiche `200` et le tuyau apparaît dans CVAT.

> [!quote] Mes notes
> _Ce que j'ai compris._

> [!question]- Indice
> Aplatir : une boucle sur les points, et pour chaque point on ajoute x puis y à une liste (`.append` ou `.extend`). Requête : `requests.patch(url, params={"action": "create"}, json=data, auth=..., timeout=30)`.
