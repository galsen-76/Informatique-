---
type: recap
tags:
  - cvat
  - recap
date: 2026-11-16
---
# Récap - Ce qu'on a fait et pourquoi

Cette note résume le projet : le contexte, le rôle de chaque brique, les choix faits et où j'en suis. Elle sert à pouvoir l'expliquer (à mon tuteur, en soutenance) sans relire tout l'historique.

## 1. Le contexte

Dans CVAT, des folios (plans isométriques de tuyauterie) sont annotés : tuyaux, lignes de cote, étiquettes…

Le module `replication` sait déjà lire ces annotations. On exporte le job au format CVAT for images 1.1 (XML), puis `run_geometry` transforme ces annotations en **graphe géométrique**, un JSON (`output/{job_id}/image_{folio_id}_geometric_graph.json`). Dans ce graphe, les tuyaux sont reliés entre eux et chaque cote est rattachée aux tuyaux qu'elle mesure.

**Mon travail, c'est le chemin inverse** : partir de ce JSON et réannoter le folio dans CVAT. Ça permet :
- de vérifier visuellement ce que `replication` a compris du plan ;
- de remettre dans CVAT des annotations corrigées ou recalculées par le graphe ;
- de le refaire autant de fois que nécessaire (le script doit être répétable).

La boucle complète :

1. CVAT : folio annoté
2. Export XML (CVAT 1.1)
3. `replication` : graphe JSON
4. **Mon script** : lit le JSON et renvoie les formes à CVAT par l'API
5. CVAT : folio réannoté

## 2. Les briques et leur rôle

| Brique | Ce que c'est |
|---|---|
| **Job** | Une unité de travail dans CVAT (`job_id`). Il contient une ou plusieurs images. |
| **Folio / frame** | Une image du job. Dans l'API, c'est le numéro `frame` (un entier, ici `0`). |
| **Label** | La catégorie d'une annotation : `tuyau`, `ligne de cote`, `etiquette`… Chaque label a un **id** propre au projet CVAT. |
| **Attribut** | Une info attachée à un label (`axe`, `nom`, `debut`…). Il a aussi un id, appelé `spec_id`. |
| **Forme (shape)** | Une annotation dessinée sur une image : un type géométrique, des points, un label. |
| **Graphe JSON** | La sortie de `replication` : `pipe_edges` (les tuyaux), `dimension_constraints` (les cotes et leurs étiquettes), `nodes` (points de jonction), `diagnostics`. |

## 3. Les choix faits, et pourquoi

**API JSON plutôt que XML.** Au début, l'idée était de regénérer un fichier XML CVAT 1.1 puis de l'importer. On a abandonné : il fallait reconstruire tout un fichier, alors que l'API accepte directement une liste de formes en JSON. Avec un `PATCH` par job, il n'y a ni fichier ni import. C'est plus simple et plus facile à tester petit à petit.

**Un élément du JSON = une forme CVAT.** Le JSON ne dit pas « ceci est un tuyau » : c'est **la clé** où se trouve l'élément qui le dit.
- tout ce qui est dans `pipe_edges` → label `tuyau` ;
- `dimension_constraints[].dimension_geometry` → label `ligne de cote` ;
- `dimension_constraints[].label_geometry` (si pas `null`) → label `etiquette`.

C'est une correspondance fixe que j'écris moi-même. On l'a vérifié : les attributs des `pipe_edges` (`angles absolus`, `axe`, `debut`, `nom`, `longueur`, `notes`) sont exactement ceux du label tuyau.

**Chercher les ids par le nom, pas en dur.** Les ids (tuyau = 2, ligne de cote = 10…) sont ceux de *mon* projet CVAT. Sur un autre projet, ils changent. Le script lit donc `GET /api/labels?job_id=...` et retrouve l'id à partir du nom. Seule condition : que les noms des labels soient identiques.

**`type` et `label_id` sont deux choses différentes.**
- `type` donne la forme géométrique : `polyline`, `rectangle`… Plusieurs labels peuvent avoir le même. Tuyau et ligne de cote sont tous les deux des `polyline`.
- `label_id` dit ce que c'est. C'est lui seul que CVAT utilise pour afficher le nom.

**`source: "auto"`.** Les formes existantes du folio sont en `auto` (créées par un script). Sans ce champ, CVAT met `manual` par défaut.

**Remplacer, pas ajouter.** Un `PATCH action=create` *ajoute* des formes. Si je relance le script, j'ai donc des doublons. Il faut d'abord supprimer (`action=delete`) les anciennes formes, mais seulement **celles du folio et des 3 labels** que `replication` sait reproduire. Les autres labels (point de soudure, sens d'écoulement, cartouche…) ne sont pas dans le JSON : si je les supprimais, je les perdrais.

**Les étiquettes tournées.** Certaines `label_geometry` sont des rectangles penchés (4 coins). CVAT, lui, veut un rectangle droit plus un angle `rotation`. Il faut donc calculer le centre, la largeur, la hauteur et l'angle, et pas juste prendre le min et le max des coins (sinon l'étiquette grossit).

## 4. Comment une forme est construite

```python
forme = {
    "type": "polyline",          # forme géométrique (dépend du label)
    "frame": 0,                  # numéro de l'image, entier
    "label_id": 2,               # id du label, lu dans l'API
    "points": [x1, y1, x2, y2],  # liste PLATE
    "attributes": [],            # [{"spec_id": id, "value": "texte"}]
    "source": "auto",
}
body = {"shapes": [forme, ...], "tags": [], "tracks": []}
```

- `points` n'existe pas dans le JSON. Je le fabrique en **aplatissant** `geometry` (`[[x, y], [x, y]]` devient `[x, y, x, y]`).
- `frame` vient de `json_data["image"]["id"]`, une chaîne `"0"` à convertir en `int`.
- Un tuyau peut avoir 2, 3, 4… points (selon ses coudes). Une ligne de cote en a toujours 2.

Les requêtes utilisées :
- `GET /api/labels?job_id=1&page_size=200` : les labels et leurs attributs (réponse paginée : `results`, `next`) ;
- `GET /api/jobs/1/annotations` : les formes actuelles ;
- `PATCH /api/jobs/1/annotations?action=create` : ajouter des formes ;
- `PATCH /api/jobs/1/annotations?action=delete` : supprimer (on renvoie les formes telles que le GET les a données).

## 5. Les pièges que j'ai rencontrés

- Le `label_id` du JSON de `replication` **n'est pas** le `label_id` de CVAT. Dans le JSON, c'est l'id de l'étiquette texte associée à la cote (souvent `null` quand il n'y en a pas).
- Mettre les listes de points directement dans `shapes`. Il faut d'abord les emballer chacune dans un dict de forme.
- Mettre `frame` au niveau du body au lieu de le mettre dans chaque forme.
- Recopier le dict du tuyau pour la cote et garder `label_id: 2`, ce qui fait que la cote s'affiche en « tuyau ».
- `len(geometry[0])` donne 2 (un seul point `[x, y]`), pas le nombre de points.
- Un import inutile (`from openpyxl.chart import shapes`) qui écrasait ma variable `shapes`.
- Le nom exact du label : `"ligne de cote"` (singulier, minuscules).

## 6. Où j'en suis

- [x] 01 : lire le JSON dans le script
- [x] 02 : envoyer un premier tuyau (et une cote) avec `PATCH action=create`
- [x] 03 : lire les ids des labels et des attributs dans l'API
- [ ] 04 : tous les tuyaux (boucle sur tous les `pipe_edges`, pas seulement `[0]`) et leurs attributs
- [ ] 05 : les lignes de cote et les étiquettes
- [ ] 06 : remplacer au lieu d'ajouter (delete puis create)
- [ ] 07 : les étiquettes tournées
- [ ] 08 : ranger le script en fonctions

Les détails de chaque étape sont dans [[Projet - Réannoter un job CVAT depuis le graphe]] et le cours [[Cours - Du graphe JSON aux annotations CVAT par l'API]].

## 7. Questions à voir avec mon tuteur

- **La longueur d'une cote** : où doit-elle aller ? Dans l'attribut `nom` de l'étiquette, ou dans l'attribut `longueur` de la ligne de cote ?
- **Les cotes sans étiquette** (`label_geometry: null`, diagnostic `unmatched_dimension_line`) : on crée seulement la ligne de cote, ou on signale le problème ?
- **Le périmètre de la suppression** : est-ce que supprimer uniquement tuyaux, lignes de cote et étiquettes du folio lui convient ?
