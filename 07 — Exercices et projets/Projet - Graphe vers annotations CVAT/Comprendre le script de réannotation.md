---
type: recap
tags:
  - cvat
  - nuclio
  - recap
date: 2026-11-17
---
# Comprendre le script de réannotation

Cette note explique la fonction Nuclio qui réannote un folio CVAT à partir du graphe de `replication` (fichiers `main.py` et `function.py`). Elle a deux niveaux :
- **Partie 1, comme si j'avais 10 ans** : l'idée générale, sans technique ;
- **Partie 2, comme si j'avais 23 ans** : comment ça marche vraiment, ligne par ligne.

Le code complet est en annexe, à donner à ChatGPT avec la note.

> [!tip] Pour ChatGPT
> « Voici une note et le code d'un script Python. Explique-moi chaque partie à mon niveau (développeur alternant). Quand je te pose une question, réponds avec des exemples tirés de ce code. »

---

## Partie 1 : comme si j'avais 10 ans

### L'histoire

Imagine un **plan de tuyaux** dessiné sur une feuille. Des gens ont colorié dessus, au feutre, chaque tuyau, chaque flèche de mesure (les **cotes**) et chaque petit chiffre qui donne la longueur (les **étiquettes**). Ce coloriage, c'est ce qu'on appelle des **annotations**, et la feuille coloriée est rangée dans une grande armoire qui s'appelle **CVAT**.

Un robot, `replication`, sait regarder ce coloriage et en faire un **résumé** : « il y a 33 tuyaux, ils se touchent ici et là, cette flèche mesure ces tuyaux-là et elle dit 2000 ». Ce résumé est écrit dans un fichier, le **JSON**.

**Notre script fait le chemin inverse** : il prend le résumé et **recolorie** la feuille dans l'armoire.

### Les étapes, comme une recette

1. **On reçoit une commande** : « recolorie la feuille n° 3 du classeur n° 3 ». Le classeur, c'est le **job** ; la feuille, c'est le **folio**.
2. **On demande une photocopie** du coloriage actuel à l'armoire (l'**export**).
3. **On donne la photocopie au robot `replication`**, qui écrit son résumé (le **graphe JSON**).
4. **On regarde la liste des feutres** de l'armoire. Chaque feutre a un nom (« tuyau », « ligne de cote », « etiquette ») et un **numéro**. L'armoire ne comprend que les numéros, alors on cherche le numéro de chaque feutre à partir de son nom.
5. **On prépare les nouveaux dessins**, un par un :
   - pour chaque tuyau du résumé, un trait avec le feutre « tuyau » ;
   - pour chaque flèche de mesure, un trait avec le feutre « ligne de cote » ;
   - pour chaque petit chiffre, un rectangle avec le feutre « etiquette », un peu penché si le chiffre est penché.
6. **On envoie tous les dessins à l'armoire** en disant « ajoute-les ».
7. **On répond** : « c'est fait, j'ai ajouté 59 dessins ».

### Ce qu'il faut retenir

- Le script **ajoute** des dessins, il **n'efface rien**. Si on le lance deux fois, il y a deux fois les dessins.
- Le résumé du robot ne parle **que** des tuyaux, des flèches de mesure et des chiffres. Les autres dessins de la feuille (soudures, vannes, cartouche…) ne sont pas dedans, donc le script ne peut pas les refaire. Il ne les abîme pas non plus.
- On trouve les feutres **par leur nom**, pas par leur numéro. Comme ça, si une autre armoire range ses feutres avec d'autres numéros, le script marche quand même.

---

## Partie 2 : comme si j'avais 23 ans

### 2.1 Le contexte

- **CVAT** est l'outil d'annotation. Un **projet** contient des **tâches**, une tâche est découpée en **jobs**, un job contient des **images** (les folios), et chaque image a des **formes** (*shapes*).
- **Nuclio** est une plateforme *serverless* : on y déploie une fonction Python qui tourne dans un conteneur et répond à des requêtes HTTP. Le plugin CVAT (le bouton dans l'interface) appelle cette fonction avec un body JSON `{"job_id": 3, "folio_id": 3}`.
- **`replication`** est le module qui transforme les annotations XML d'un folio (format *CVAT for images 1.1*) en **graphe géométrique** JSON : `pipe_edges` (les tuyaux), `dimension_constraints` (les cotes et leurs étiquettes), `nodes` (les jonctions), `diagnostics`.
- **But du script** : boucler la boucle **CVAT → XML → replication → JSON → CVAT**, c'est-à-dire réécrire dans CVAT ce que `replication` a compris du plan.

### 2.2 Le flux complet

1. Le plugin envoie `POST` à la fonction Nuclio avec `job_id` et `folio_id`.
2. `handler` lit et vérifie le body (sinon `400`).
3. Dans un **dossier temporaire** propre à la requête :
   1. `get_annotations` exporte le job depuis CVAT (ZIP contenant `annotations.xml`) ;
   2. `extract_folio_data` ne garde que le folio demandé ;
   3. `run_geometry` produit le graphe dans `output/image_{folio_id}_geometric_graph.json` ;
   4. on lit ce JSON en mémoire **avant** que le dossier temporaire soit supprimé.
4. `read_labels` lit les labels du job dans l'API.
5. `build_shapes` transforme le graphe en liste de formes CVAT.
6. `send_shapes` envoie ces formes avec `PATCH ?action=create`.
7. `handler` répond `200 {"created": 59}`, ou `500 {"error": "..."}` en cas d'erreur.

### 2.3 Les deux fichiers

- **`main.py`** : l'**orchestration**. Le `handler` Nuclio, et trois fonctions qui parlent à CVAT ou au graphe (`read_labels`, `build_shapes`, `send_shapes`). C'est lui qui connaît les noms des labels (`LABEL_TUYAU`…).
- **`function.py`** : des **outils** purs, sans réseau : aplatir des points, trouver un label, construire les attributs, construire une forme, convertir un rectangle penché. On peut les tester sans CVAT.

Séparer les deux rend le code plus lisible : `main.py` dit *quoi faire*, `function.py` dit *comment*.

### 2.4 Les données en entrée : le graphe JSON

```json
{
  "image": {"id": "3", "name": "...jpg", "width": ..., "height": ...},
  "pipe_edges": [
    {"geometry": [[101.03, 397.94], [300.0, 281.44]],
     "attributes": {"axe": "X", "debut": "false", "nom": "", "...": ""}}
  ],
  "dimension_constraints": [
    {"dimension_geometry": [[518.4, 228.1], [317.9, 107.2]],
     "label_geometry": [[x0, y0], [x1, y1], [x2, y2], [x3, y3]],
     "length": 2000.0}
  ]
}
```

- `image.id` : le numéro de l'image dans le job, c'est-à-dire le **`frame`** de CVAT. C'est une chaîne, d'où `int(...)`.
- `pipe_edges[].geometry` : les points d'un tuyau, par paires `[x, y]`.
- `pipe_edges[].attributes` : les attributs du tuyau (nom → valeur).
- `dimension_constraints[].dimension_geometry` : les 2 points de la ligne de cote.
- `dimension_constraints[].label_geometry` : les **4 coins** de l'étiquette, ou `null` si la cote n'a pas d'étiquette.
- `dimension_constraints[].length` : la longueur lue sur l'étiquette (un float), ou `null`.
- **Piège** : le `label_id` présent dans ce JSON est l'id de l'étiquette pour `replication`, **pas** le `label_id` de CVAT.

### 2.5 Les données en sortie : une forme CVAT

```python
{
    "type": "polyline",            # forme géométrique, donnée par le label
    "frame": 3,                    # numéro de l'image dans le job (int)
    "label_id": 2,                 # id du label CVAT (ici « tuyau »)
    "points": [101.03, 397.94, 300.0, 281.44],   # liste PLATE
    "attributes": [{"spec_id": 2, "value": "X"}], # id de l'attribut + valeur en chaîne
    "rotation": 0,                 # utile pour les rectangles penchés
    "source": "auto",              # qui a créé la forme : auto, manual, semi-auto…
}
```

Le body envoyé à CVAT : `{"shapes": [forme, forme, ...], "tags": [], "tracks": []}`.
- **shape** : une forme sur une seule image (notre cas) ;
- **track** : un objet suivi sur plusieurs images (vidéo), pas utilisé ici ;
- **tag** : une étiquette sur l'image entière, pas utilisé ici.

### 2.6 Les fonctions, une par une

**`flatten(points)`** (function.py)
Transforme `[[x1, y1], [x2, y2]]` en `[x1, y1, x2, y2]`. CVAT veut une liste plate pour les polylines, le JSON donne des paires. Deux boucles imbriquées : la première sur les points, la seconde sur les 2 coordonnées.

**`find_label(labels, label_name)`** (function.py)
Parcourt `labels["results"]` (la réponse de `GET /api/labels`) et renvoie le label dont le `name` correspond. S'il n'existe pas, il lève une `ValueError` claire plutôt que d'envoyer une forme sans label. C'est ce qui rend le script **indépendant des ids** : sur un autre serveur, « tuyau » peut avoir l'id 57, le script le retrouve quand même.

**`make_attributes(label, json_attributes)`** (function.py)
Construit la liste `attributes` d'une forme. Pour chaque attribut **défini dans CVAT** pour ce label :
- si le JSON a une valeur pour ce nom, on ajoute `{"spec_id": id_cvat, "value": str(valeur)}` ;
- sinon on ne l'envoie pas, et CVAT met la valeur par défaut.

On cherche les attributs **dans le label**, car les mêmes noms (`nom`, `notes`, `axe`…) existent dans beaucoup de labels avec des ids différents. `value` est toujours une **chaîne** : c'est ce que CVAT attend, même pour une case à cocher (`"false"`).

**`make_shape(labels, label_name, frame, points, json_attributes={}, rotation=0)`** (function.py)
Assemble une forme complète :
- le `type` vient du label CVAT (`label["type"]`), donc il n'est écrit nulle part dans le code ;
- le `label_id` vient aussi du label ;
- les attributs viennent de `make_attributes`.

Il refuse les labels `skeleton` (coudes, tés, vannes…) : un squelette demande une liste de points nommés (`elements`) que cette fonction ne sait pas construire, et le JSON n'en contient pas.

**`rectangle_from_corners(corners)`** (function.py)
Le JSON donne les 4 coins d'une étiquette, parfois **penchée**. CVAT, lui, décrit un rectangle par `[xtl, ytl, xbr, ybr]` (coin haut-gauche, coin bas-droit) **d'un rectangle droit**, plus un angle `rotation` autour de son centre. La fonction :
1. calcule le **centre** = la moyenne des 4 coins ;
2. calcule la **largeur** et la **hauteur** = la longueur de deux côtés (`math.dist`) ;
3. calcule l'**angle** d'un côté avec `atan2`, converti en degrés entre 0 et 360 ;
4. reconstruit le rectangle droit centré au même endroit : `[cx - w/2, cy - h/2, cx + w/2, cy + h/2]`.

Pourquoi pas simplement le min et le max des coins ? Parce que sur une étiquette penchée, ça donnerait un rectangle **plus grand** que l'étiquette (la boîte qui l'englobe), et pas tourné.

**`read_labels(job_id)`** (main.py)
`GET /api/labels?job_id=…&page_size=200`. La réponse est **paginée** (`count`, `next`, `results`). Le projet a 60 labels : avec `page_size=200`, tout tient sur une page. Si `next` n'est pas `null`, il en manque, et on préfère s'arrêter plutôt que de rater un label.

**`build_shapes(graph, labels)`** (main.py)
Le cœur de la conversion :
- `frame = int(graph["image"]["id"])` ;
- **une forme `tuyau` par `pipe_edge`**, avec ses points aplatis et ses attributs ;
- **une forme `ligne de cote` par `dimension_constraint`** ;
- **une forme `etiquette` par cote qui en a une** (`label_geometry` pas `None`), avec :
  - `nom` = la longueur formatée avec `f"{length:g}"` (`2000.0` → `"2000"`, `12.5` → `"12.5"`) ;
  - les points et l'angle calculés par `rectangle_from_corners`.

Le label d'une forme se déduit de **la clé du JSON** où on la lit : `pipe_edges` → tuyau, `dimension_constraints` → ligne de cote et étiquette. Le JSON ne contient pas de champ « type ».

**`send_shapes(job_id, shapes)`** (main.py)
`PATCH /api/jobs/{id}/annotations?action=create` avec le body `{"shapes", "tags", "tracks"}`. `raise_for_status()` lève une exception si CVAT répond une erreur (400, 401, 500…), qui remonte jusqu'au `handler`.

**`handler(context, event)`** (main.py)
Le point d'entrée appelé par Nuclio :
- `event.body` est un dict si la requête a `Content-Type: application/json`, sinon des bytes, d'où le `json.loads` ;
- il vérifie `job_id` et `folio_id`, sinon `400` ;
- `tempfile.TemporaryDirectory()` crée un dossier unique supprimé à la fin du `with` : deux appels en même temps ne se marchent pas dessus, et on ne relit jamais un vieux fichier (c'est ce qui causait le bug « 120 formes pour deux folios ») ;
- tout est dans un `try/except` : n'importe quelle erreur devient une réponse `500` avec le message, et un log `context.logger.error`.

### 2.7 Les quatre actions de l'API annotations

| Requête | Effet |
|---|---|
| `PATCH ?action=create` | **ajoute** les formes envoyées (ce qu'on fait) |
| `PATCH ?action=update` | modifie des formes existantes (avec leur `id`) |
| `PATCH ?action=delete` | supprime les formes envoyées |
| `PUT` | **remplace tout** le job (dangereux) |

Vérifié sur ton serveur : 3224 formes avant, 3283 après (+59). `create` n'écrase rien.

### 2.8 Les limites actuelles

- **Doublons** : relancer ajoute une deuxième fois les mêmes formes. La suite logique (étape 06) : avant le `create`, faire un `GET` des annotations, garder les formes de **ce frame** et de **ces 3 labels**, les envoyer en `delete`, puis faire le `create`.
- **Seulement 3 labels** : `replication` n'exporte que tuyaux, cotes et étiquettes. Les 57 autres labels (soudures, accessoires…) ne sont pas recréés.
- **Étiquette** : le projet a deux labels possibles, `etiquette` (id 8) et `etiquette de cote` (id 147). Le script utilise `etiquette` (constante `LABEL_ETIQUETTE`).
- **Source** : les formes sont créées en `auto`. Sur le job 3, les originales sont en `manual`, donc le filtre **Source == Auto** de CVAT montre uniquement ce que le script a créé.
- **Plugin** : la fonction renvoie du JSON, pas une image. Le plugin doit lire `response.json()` et non un PNG.

### 2.9 Faire évoluer le script

- **Un label renommé dans CVAT** : changer la constante en haut de `main.py`.
- **Un autre serveur ou projet** : rien à changer, les ids sont lus par nom.
- **Un nouvel élément exporté par `replication`** (par exemple les soudures) : ajouter une boucle dans `build_shapes`, sur le modèle des autres, avec `make_shape`.
- **Un label squelette** : il faudrait une nouvelle fonction qui construit la liste `elements` (un point par sous-label).

### 2.10 Vocabulaire

- **Job** : une partie d'une tâche CVAT, contenant une ou plusieurs images.
- **Folio / frame** : une image du job ; `frame` est son numéro dans l'API.
- **Label** : la catégorie d'une forme (tuyau…), avec un `id` et un `type`.
- **Attribut / spec_id** : une info attachée à un label ; `spec_id` est son id.
- **Shape** : une forme sur une image.
- **Polyline** : une ligne brisée (2 points ou plus).
- **Skeleton** : un ensemble de points nommés reliés (accessoires).
- **Serverless / Nuclio** : du code déployé comme une fonction qui répond à des requêtes, sans gérer de serveur.
- **Pagination** : une réponse d'API découpée en pages (`next`).

---

## Annexe : le code complet

### main.py

```python
"""Fonction Nuclio

Reçoit l'identifiant du job et du folio depuis le plugin CVAT, récupère les annotations
du folio via l'API CVAT, génère le graphe géométrique et réannote le folio dans CVAT
(tuyaux, lignes de cote et étiquettes).
"""
import json
from pathlib import Path
import tempfile
import nuclio_sdk
import requests
from cvat_sdk.api_client import ApiClient, Configuration
from config import CVAT_URL, PASSWORD, USERNAME
from models import ExportParams
from replication.workflows import run_geometry
from sdk_cvat import extract_folio_data, get_annotations
from function import flatten, make_shape, rectangle_from_corners

# Connexion à l'API CVAT avec le compte de la fonction
configuration = Configuration(
    host=CVAT_URL,
    username=USERNAME,
    password=PASSWORD,
)
auth = (USERNAME, PASSWORD)

# Noms des labels dans CVAT (à changer ici seulement si un label est renommé)
LABEL_TUYAU = "tuyau"
LABEL_LIGNE_DE_COTE = "ligne de cote"
LABEL_ETIQUETTE = "etiquette"


def read_labels(job_id: int) -> dict:
    """Lit les labels du job (ids des labels et des attributs)"""
    response = requests.get(f"{CVAT_URL}/api/labels",
                            params={"job_id": job_id, "page_size": 200}, auth=auth)
    response.raise_for_status()
    labels = response.json()
    if labels["next"] is not None:
        raise RuntimeError("Not all labels were read, increase page_size")
    return labels


def build_shapes(graph: dict, labels: dict) -> list:
    """Graphe JSON -> formes CVAT (tuyaux, lignes de cote, étiquettes)"""
    frame = int(graph["image"]["id"])
    shapes = []

    # Tuyaux : une polyline par pipe_edge, avec ses attributs
    for pipe_edge in graph["pipe_edges"]:
        points = flatten(pipe_edge["geometry"])
        shapes.append(make_shape(labels, LABEL_TUYAU, frame, points, pipe_edge["attributes"]))

    # Cotes : une ligne de cote par dimension_constraint, + son étiquette si elle existe
    for dc in graph["dimension_constraints"]:
        points = flatten(dc["dimension_geometry"])
        shapes.append(make_shape(labels, LABEL_LIGNE_DE_COTE, frame, points))

        if dc["label_geometry"] is None:
            continue

        # L'étiquette affiche la longueur : 2000.0 -> "2000"
        etiquette_attributes = {}
        if dc["length"] is not None:
            etiquette_attributes["nom"] = f"{dc['length']:g}"

        points, rotation = rectangle_from_corners(dc["label_geometry"])
        shapes.append(make_shape(labels, LABEL_ETIQUETTE, frame, points, etiquette_attributes, rotation))

    return shapes


def send_shapes(job_id: int, shapes: list) -> None:
    """Ajoute les formes au job (action=create : n'écrase rien)"""
    body = {"shapes": shapes, "tags": [], "tracks": []}
    response = requests.patch(f"{CVAT_URL}/api/jobs/{job_id}/annotations",
                              params={"action": "create"}, json=body, auth=auth)
    response.raise_for_status()


def handler(context: nuclio_sdk.Context, event: nuclio_sdk.Event) -> nuclio_sdk.Response:
    """Point d'entrée Nuclio : réannote le folio et renvoie le nombre de formes créées"""
    # Récupération du payload au format JSON
    body = event.body if isinstance(event.body, dict) else json.loads(event.body)

    if "job_id" not in body or "folio_id" not in body:
        return context.Response(body="job_id and folio_id are required",
                                status_code=400, content_type="text/plain")
    job_id = int(body["job_id"])
    folio_id = int(body["folio_id"])
    context.logger.info(f"Request received: job {job_id}, folio {folio_id}")

    try:
        # Dossier de travail propre à la requête (évite les conflits entre workers)
        with tempfile.TemporaryDirectory() as tmp:
            work_dir = Path(tmp)

            # Exporte les annotations du job depuis CVAT
            with ApiClient(configuration) as api_client:
                get_annotations(api_client, ExportParams(job_id), work_dir)

            # Ne garde que les annotations du folio demandé
            extract_folio_data(folio_id, work_dir)

            # Génère le graphe géométrique
            run_geometry(
                work_dir / "annotations.xml",
                folio_id,
                10.0,
                50.0,
                2.0,
                10.0,
                None,
                work_dir / "output",
            )
            # Lire le graphe du folio avant la suppression du dossier temporaire
            graph_file = work_dir / "output" / f"image_{folio_id}_geometric_graph.json"
            if not graph_file.exists():
                raise FileNotFoundError(f"No geometric graph found: {graph_file.name}")
            graph = json.loads(graph_file.read_text(encoding="utf-8"))

        # Construire les formes et les envoyer à CVAT
        labels = read_labels(job_id)
        shapes = build_shapes(graph, labels)
        send_shapes(job_id, shapes)
        context.logger.info(f"{len(shapes)} shapes created on job {job_id}, folio {folio_id}")

        return context.Response(body=json.dumps({"created": len(shapes)}),
                                content_type="application/json", status_code=200)

    except Exception as error:
        context.logger.error(f"Reannotation failed: {error}")
        return context.Response(body=json.dumps({"error": str(error)}),
                                content_type="application/json", status_code=500)
```

### function.py

```python
"""
Fonctions pour transformer le graphe JSON de replication en formes CVAT.
"""
import math


def flatten(points):
    """[[x, y], [x, y]] -> [x, y, x, y] : le format des points pour CVAT"""
    flat = []
    for point in points:
        for coordinate in point:
            flat.append(coordinate)
    return flat


def find_label(labels, label_name):
    # Cherche le label par son nom dans la réponse de GET /api/labels
    for label in labels["results"]:
        if label["name"] == label_name:
            return label
    raise ValueError(f"Label '{label_name}' not found in CVAT")


def make_attributes(label, json_attributes):
    # spec_id vient de l'API, value vient du JSON (toujours en chaîne)
    attributes = []
    for attribute in label["attributes"]:
        name = attribute["name"]
        if name in json_attributes:
            attributes.append({"spec_id": attribute["id"], "value": str(json_attributes[name])})
    return attributes


def make_shape(labels, label_name, frame, points, json_attributes={}, rotation=0):
    # Une forme CVAT : le type vient du label (polyline, rectangle…)
    label = find_label(labels, label_name)

    # Un squelette (coude, té, vanne…) a besoin de ses points nommés (entrée, sortie…) :
    # ce script ne sait pas le construire, et le JSON de replication n'en contient pas
    if label["type"] == "skeleton":
        raise ValueError(f"Label '{label_name}' is a skeleton, not supported by make_shape")

    return {
        "type": label["type"],
        "frame": frame,
        "label_id": label["id"],
        "points": points,
        "attributes": make_attributes(label, json_attributes),
        "rotation": rotation,
        "source": "auto",
    }


def rectangle_from_corners(corners):
    """
    Les 4 coins d'une étiquette (parfois penchée) -> rectangle droit + angle.
    CVAT veut [xtl, ytl, xbr, ybr] d'un rectangle droit, puis il le tourne de
    « rotation » degrés autour de son centre.
    """
    p0, p1, p2, p3 = corners[:4]

    # Le centre = la moyenne des 4 coins
    cx = (p0[0] + p1[0] + p2[0] + p3[0]) / 4
    cy = (p0[1] + p1[1] + p2[1] + p3[1]) / 4

    # La largeur et la hauteur = la longueur de deux côtés
    width = math.dist(p1, p2)
    height = math.dist(p0, p1)

    # L'angle du côté p2 -> p1, en degrés entre 0 et 360
    rotation = math.degrees(math.atan2(p1[1] - p2[1], p1[0] - p2[0])) % 360

    points = [cx - width / 2, cy - height / 2, cx + width / 2, cy + height / 2]
    return points, round(rotation, 2)
```
