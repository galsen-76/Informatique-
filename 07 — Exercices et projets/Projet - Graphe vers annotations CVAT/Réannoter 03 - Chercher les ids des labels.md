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
# Réannoter 03 - Chercher les ids des labels

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Étape précédente :** [[Réannoter 02 - Envoyer le premier tuyau]]
> **Cours :** [[Cours - Du graphe JSON aux annotations CVAT par l'API]] (partie 3)

## Le but
Ne plus écrire `2` ni `1` à `6` en dur : le script demande à CVAT les ids de `tuyau` et de ses attributs. Sur un autre serveur, les numéros changent.

## Ce que tu fais
- [ ] `GET /api/labels` avec `params={"job_id": job_id}`. Affiche `count` et `len(results)` : sont-ils égaux ?
- [ ] Récupère **toutes** les pages (suis `next` jusqu'à `None`)
- [ ] Trouve dans la liste le label dont `name` vaut `"tuyau"` et affiche son `id`
- [ ] Construis un dictionnaire `{nom_attribut: id}` pour ses attributs. Tu dois retrouver `{"angles absolus": 1, "axe": 2, "debut": 3, ...}`
- [ ] Remplace les ids en dur de ton `data` par ces valeurs. Relance : le tuyau arrive-t-il toujours ?

> [!warning] Le piège
> Sans `job_id`, tu reçois les labels de **tous** les projets. Et une seule page n'en contient que 10.

> [!success] Ça marche si…
> Aucun id n'est écrit en dur, et le tuyau arrive dans CVAT.

> [!quote] Mes notes
> _Ce que j'ai compris._

> [!question]- Indice
> `while url:` → `GET`, ajouter les `results`, puis `url = reponse["next"]`. Dictionnaire depuis une liste : `{a["name"]: a["id"] for a in label["attributes"]}`.
