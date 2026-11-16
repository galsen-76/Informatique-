---
type: course
order: 7
module: "[[Module 16 - Python]]"
concepts:
  - "[[JSON]]"
  - "[[XML]]"
  - "[[XML en Python (ElementTree)]]"
  - "[[Format CVAT for images 1.1]]"
  - "[[Liste et dictionnaire]]"
tags:
  - cours
---
# Cours - Du JSON au XML, convertir le graphe en annotations CVAT

> [!abstract] Objectif
> Partir d'un XML modèle, remplacer le contenu de `<image>` par les formes calculées depuis le JSON, puis renvoyer ce XML (CVAT 1.1) dans le job pour remplacer ses annotations.

## 1. La stratégie
Le haut du XML (`<version>` et `<meta>`) est **toujours le même**. Seul le contenu de `<image>` dépend du JSON. Donc :

1. charger `modele.xml` ;
2. trouver la balise `<image>` et **enlever toutes les formes** de l'exemple ;
3. mettre à jour les attributs de `<image>` (`id`, `name`, `width`, `height`) avec le JSON ;
4. ajouter **une forme par élément** du JSON : les tuyaux, puis les lignes de cote, puis les étiquettes ;
5. écrire `sortie.xml` ;
6. **l'importer dans le job** au format `"CVAT 1.1"` : ses annotations sont remplacées par les tiennes.

Le nombre de formes n'est écrit nulle part ailleurs : CVAT lit tout ce qu'il trouve dans `<image>`. 6 tuyaux dans le JSON = 6 polylines, c'est tout.

## 2. Ce que je prends dans le JSON
| JSON | Devient | Conversion |
| --- | --- | --- |
| `image` : `id`, `name`, `width`, `height` | attributs de `<image>` | en texte : `800` → `"800"` |
| chaque élément de `pipe_edges` | `<polyline label="tuyau">` | voir ci-dessous |
| ↳ `geometry` | attribut `points` | `[[100.0, 400.0], [300.0, 284.53]]` → `"100.00,400.00;300.00,284.53"` |
| ↳ `attributes.debut` | `<attribute name="debut">true</attribute>` | recopié tel quel |
| ↳ `segment_id` | rien | sert à **trier** les tuyaux (0, 1, 2, 3) |
| chaque élément de `dimension_constraints` | 1 `<polyline label="ligne de cote">` **et** 1 `<box label="etiquette de cote">` | voir ci-dessous |
| ↳ `dimension_geometry` | `points` de la ligne de cote | même conversion que `geometry` |
| ↳ `label_geometry` | `xtl ytl xbr ybr` de la box | min et max des x et des y |
| ↳ `length` | `<attribute name="nom">2000</attribute>` | `2000.0` → `"2000"` |

**Tout le reste du JSON est ignoré** (`nodes`, `source`, `target`, `pixel_length`, `path_nodes`, `diagnostics`…). Règle : si ça ne sert pas à dessiner une forme ni à remplir `debut` ou `nom`, ça ne va pas dans le XML.

**Toujours pareil, écrit en dur dans chaque forme :** `source="manual"`, `occluded="0"`, `z_order="0"`.

## 3. Les 4 conversions
**Points** : chaque point `[x, y]` devient `"x,y"` avec 2 décimales, et les points sont collés avec `;`.

**Nombres à 2 décimales** : `str(100.0)` donne `"100.0"`, CVAT écrit `"100.00"`.
```python
f"{7.5:.2f}"     # '7.50'
```

**Rectangle** : `label_geometry` donne 5 coins, la box n'en garde que 2. Sur une image, `y` descend, donc le haut = le plus petit `y`.
```text
x : 240, 240, 210, 210, 240  →  xtl = min = 210   xbr = max = 240
y : 378, 392, 392, 378, 378  →  ytl = min = 378   ybr = max = 392
```

**Longueur** : `2000.0` doit devenir `"2000"`.
```python
f"{2000.0:g}"    # '2000'      et f"{1500.5:g}" donne '1500.5'
```

## 4. Les outils
**Lire le JSON**
```python
import json
with open("graph.json", encoding="utf-8") as f:
    graph = json.load(f)
```

**Charger le modèle et trouver `<image>`**
```python
import xml.etree.ElementTree as ET
arbre = ET.parse("modele.xml")
racine = arbre.getroot()
image = racine.find("image")
```

**Enlever les formes de l'exemple**
```python
for enfant in list(image):     # list() fait une copie : indispensable, voir les pièges
    image.remove(enfant)
```

**Changer un attribut**
```python
image.set("width", "800")      # toujours une chaîne
```

**Ajouter une forme et son attribut CVAT**
```python
forme = ET.SubElement(image, "polyline", {"label": "tuyau", "points": "..."})
ET.SubElement(forme, "attribute", {"name": "debut"}).text = "true"
```

**Préparer les données**
```python
";".join(["a", "b"])                          # 'a;b'
[p[0] for p in points]                        # tous les x
min(xs), max(xs)
sorted(liste, key=lambda e: e["segment_id"])  # trier sur une clé
```

**Écrire**
```python
ET.indent(racine, space="  ")
arbre.write("sortie.xml", encoding="utf-8", xml_declaration=True)
```

**Renvoyer le XML dans le job (SDK)**
```python
from cvat_sdk import make_client
with make_client(host, credentials=(user, password)) as client:
    job = client.jobs.retrieve(job_id)
    job.import_annotations("CVAT 1.1", "sortie.xml")   # remplace les annotations du job
```

## 5. Les pièges
> [!warning] À connaître avant de coder
> - `for enfant in image: image.remove(enfant)` en enlève **un sur deux** : on modifie la liste pendant qu'on la parcourt. Parcours `list(image)`.
> - `image.clear()` enlève les formes **et aussi** les attributs `id`, `name`… de `<image>`.
> - Un nombre dans `.set()` ou `.text` : `TypeError: cannot serialize 800 (type int)`, seulement au moment d'écrire.
> - Le premier coin de `label_geometry` est en haut à **droite** : prends min et max.
> - L'import remplace **tout le job** : une forme absente de ton XML disparaît de CVAT. Garde l'`id` et le `name` de l'image tels qu'ils sont dans l'export.
> - Tuyaux non triés : le XML marche dans CVAT, mais n'est pas identique à l'exemple.

## Résumé
> [!quote] Avec mes mots
> _Ce que je garde du modèle, ce que je prends dans le JSON, ce que j'ignore, et comment je convertis._

## Concepts du cours
[[JSON]] · [[XML]] · [[XML en Python (ElementTree)]] · [[Format CVAT for images 1.1]] · [[Liste et dictionnaire]]
