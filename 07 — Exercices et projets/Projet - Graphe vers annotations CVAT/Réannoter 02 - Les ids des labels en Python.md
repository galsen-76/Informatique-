---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Appeler une API HTTP (requests)]]"
  - "[[Liste et dictionnaire]]"
tags:
  - exercice
  - mini-projet
---
# Réannoter 02 - Les ids des labels en Python

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Étape précédente :** [[Réannoter 01 - Lire et explorer le JSON]]
> **Cours à avoir lu :** [[Cours - Du graphe JSON aux annotations CVAT par l'API]] (parties 3, 5 et 6)
> **Notions validées par cette étape :** [[Appeler une API HTTP (requests)]], [[Liste et dictionnaire]]

## Le but
Une fonction `lire_labels(job_id)` qui renvoie, pour chaque nom de label, son id et les ids de ses attributs, pour écrire ensuite `labels["tuyau"]["id"]` et `labels["tuyau"]["attributs"]["debut"]`.

## Ce que tu fais
- [ ] Appelle `GET /api/labels` avec `requests` et les identifiants du `.env`. Affiche `count` et le nombre de `results` : sont-ils égaux ?
- [ ] Récupère **toutes** les pages en suivant `next` jusqu'à `None`
- [ ] Construis le dictionnaire `{nom: {"id": ..., "attributs": {nom_attribut: id}}}`
- [ ] Affiche les ids de `tuyau`, `debut`, `ligne de cote`, `etiquette de cote`, `nom`. Compare avec ce que tu as noté dans Bruno
- [ ] Demande un label qui n'existe pas (`labels["tuyo"]`) : lis l'erreur. Remplace-la par un message clair en anglais

> [!warning] Le piège de cette étape
> La réponse est **paginée** : avec 60 labels et 10 par page, une seule requête en rate 50.

> [!success] Ça marche si…
> `labels["tuyau"]["id"]` vaut l'id vu dans Bruno, et `labels["tuyau"]["attributs"]["debut"]` aussi.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> Boucle `while url:` : tu fais le `GET`, tu ajoutes `results` à ta liste, puis `url = donnees["next"]`. Dictionnaire depuis une liste : `{a["name"]: a["id"] for a in label["attributes"]}`.
