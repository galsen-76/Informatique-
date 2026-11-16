---
type: course
order: 7
module: "[[Module 16 - Python]]"
concepts:
  - "[[JSON]]"
  - "[[Annotations dans l'API CVAT]]"
  - "[[Appeler une API HTTP (requests)]]"
  - "[[Liste et dictionnaire]]"
tags:
  - cours
---
# Cours - Du graphe JSON aux annotations CVAT par l'API

> [!abstract] Objectif
> Prendre le JSON du graphe, en faire la liste de formes attendue par l'API CVAT, et remplacer avec elle les annotations d'un folio du job.

## 1. La stratégie
1. **Récupérer les labels** du job : pour connaître l'id de chaque label et de chaque attribut.
2. **Lire le JSON du graphe** et construire la liste `shapes` : une forme par tuyau, par ligne de cote, par étiquette.
3. **Enlever les anciennes formes** de ce folio (seulement les labels que tu remplaces).
4. **Ajouter les nouvelles**.

Pas de XML, pas de fichier : tout passe en JSON par l'API.

## 2. Les 3 requêtes
| But | Requête | Corps |
| --- | --- | --- |
| Lire les labels | `GET /api/labels?job_id={id}` | aucun |
| Lire les annotations du job | `GET /api/jobs/{id}/annotations` | aucun |
| Enlever des formes | `PATCH /api/jobs/{id}/annotations?action=delete` | `{"shapes": [...], "tags": [], "tracks": []}` |
| Ajouter des formes | `PATCH /api/jobs/{id}/annotations?action=create` | `{"shapes": [...], "tags": [], "tracks": []}` |

Pour `delete`, renvoie les formes **telles que le `GET` te les a données** (avec leur `id`).

`PUT /api/jobs/{id}/annotations` existe aussi : il remplace **tout** le job (tous les folios, tous les labels). À éviter ici.

## 3. Les ids des labels
L'API ne connaît pas les noms, seulement des numéros. La réponse de `GET /api/labels` :
```json
{"count": 60, "next": null, "results": [
  {"id": 2, "name": "tuyau", "type": "polyline",
   "attributes": [
     {"id": 2, "name": "axe",   "input_type": "select",   "default_value": "X", "values": ["X", "Y", "Z"]},
     {"id": 3, "name": "debut", "input_type": "checkbox", "default_value": "false"}
   ]}
]}
```
- `label_id` du tuyau = `2` ; `spec_id` de `debut` = `3`.
- Ces numéros sont propres à **ton** serveur : ne les écris jamais en dur, cherche-les par leur nom.
- La liste est paginée : suis `next` jusqu'à `null` (ou `job.get_labels()` avec le SDK).

## 4. Ce que je prends dans le JSON
| JSON du graphe | Forme de l'API |
| --- | --- |
| `image.id` | `"frame"` de chaque forme (numéro de frame dans la tâche) |
| chaque élément de `pipe_edges` | `{"type": "polyline", "label_id": <id de tuyau>, ...}` |
| ↳ `geometry` `[[100.0, 400.0], [300.0, 284.53]]` | `"points": [100.0, 400.0, 300.0, 284.53]` |
| ↳ `attributes.debut` `"true"` | `"attributes": [{"spec_id": <id de debut>, "value": "true"}]` |
| chaque élément de `dimension_constraints` | 1 polyline `ligne de cote` **et** 1 rectangle `etiquette de cote` |
| ↳ `dimension_geometry` | `points` de la ligne de cote, aplatis pareil |
| ↳ `label_geometry` (5 coins) | `{"type": "rectangle", "points": [xtl, ytl, xbr, ybr]}` |
| ↳ `length` `2000.0` | attribut `nom` : `"value": "2000"` |

Tout le reste du JSON est ignoré (`nodes`, `source`, `target`, `pixel_length`, `path_nodes`, `diagnostics`…).

Facultatifs (valeurs par défaut) : `"occluded": false` (forme cachée en partie ?), `"z_order": 0` (ordre d'empilement), `"source"` (qui l'a créée). Mets `"source": "auto"` : tes formes viennent d'un calcul, pas d'un humain (`"manual"`).

## 5. Les conversions
**Aplatir les points** : `[[x1, y1], [x2, y2]]` → `[x1, y1, x2, y2]`.
```python
paires = [[1, 2], [3, 4]]
[v for p in paires for v in p]     # [1, 2, 3, 4]
```

**Rectangle** : `y` descend sur une image, donc le haut = le plus petit `y`.
```text
x : 240, 240, 210, 210, 240  →  xtl = 210, xbr = 240
y : 378, 392, 392, 378, 378  →  ytl = 378, ybr = 392
points = [210.0, 378.0, 240.0, 392.0]
```

**Valeurs d'attributs** : toujours du **texte**. `2000.0` → `"2000"` :
```python
f"{2000.0:g}"    # '2000'
```

**Nom → id** : transforme la réponse des labels en dictionnaire pour chercher vite.
```python
eleves = [{"id": 7, "nom": "Ana"}, {"id": 9, "nom": "Léo"}]
par_nom = {e["nom"]: e for e in eleves}
par_nom["Ana"]["id"]               # 7
```

## 6. Les outils
```python
import requests

auth = (CVAT_USERNAME, CVAT_PASSWORD)
r = requests.get(f"{CVAT_URL}/api/labels", params={"job_id": job_id}, auth=auth, timeout=30)
r.raise_for_status()
donnees = r.json()

r = requests.patch(f"{CVAT_URL}/api/jobs/{job_id}/annotations",
                   params={"action": "create"},
                   json={"shapes": formes, "tags": [], "tracks": []},
                   auth=auth, timeout=30)
r.raise_for_status()
```
Avec le SDK : `job.get_labels()`, `job.get_annotations()`, `job.update_annotations(..., action=...)`, `job.remove_annotations(ids=[...])`.

## 7. Les pièges
> [!warning] À connaître avant de coder
> - `action=create` **ajoute** : sans l'étape « enlever », les anciennes formes restent dessous.
> - Les ids changent d'un serveur à l'autre : cherche-les par nom à chaque exécution.
> - Un attribut `select` (comme `axe`) n'accepte que ses `values` : une autre valeur → erreur 400.
> - `"value"` est toujours une chaîne : `"2000"`, `"true"`, jamais `2000` ou `True`.
> - `"frame"` = le numéro de frame dans la **tâche**, pas forcément 0.
> - Un `spec_id` doit appartenir au label de la forme : l'id de `debut` du tuyau ne marche pas sur une étiquette.
> - Les attributs non envoyés prennent leur valeur par défaut : une valeur saisie par un annotateur (ex. `axe = Y`) est perdue si tu ne la recopies pas.

## Résumé
> [!quote] Avec mes mots
> _Les 4 étapes du script, ce que je prends dans le JSON, et pourquoi je cherche les ids par leur nom._

## Concepts du cours
[[JSON]] · [[Annotations dans l'API CVAT]] · [[Appeler une API HTTP (requests)]] · [[Liste et dictionnaire]]
