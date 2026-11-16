---
type: reference
tags:
  - cvat
date: 2026-11-16
---
# Labels CVAT du projet

Source : la réponse de `GET /api/labels?job_id=1` sur mon serveur (projet CVAT 1).
La page 1 de la réponse contient **10 labels** (voir la remarque en bas). Le label `sens d'écoulement` (squelette) contient en plus 2 sous-labels, soit 12 en tout.

## Contexte (à donner avec la liste)

- CVAT sert à annoter des folios : des plans isométriques de tuyauterie.
- Chaque annotation (une « forme ») a un **label** (la catégorie), un **type** de forme géométrique et des **attributs** (des infos texte).
- Dans l'API, on désigne un label par son `id` et un attribut par son `id` (appelé `spec_id`).
- Le module `replication` lit ces annotations et en fait un graphe JSON. Seuls 3 labels y sont repris :
  - `pipe_edges` → **tuyau** ;
  - `dimension_constraints[].dimension_geometry` → **ligne de cote** ;
  - `dimension_constraints[].label_geometry` → **etiquette** (le texte de la cote).
- Les autres labels ne sont pas dans le JSON.

## Les labels

Types d'attribut : `text` = texte libre, `select` = liste de choix, `checkbox` = vrai/faux.
« Modifiable » = l'attribut peut changer d'une image à l'autre (`mutable`).

### 1. tuyau (id 2)
- Type de forme : `polyline` (2 points ou plus, un par coude)
- Couleur : #33DDFF
- Dans le JSON : `pipe_edges`
- Attributs :
  - id 1, `angles absolus` : text, défaut vide
  - id 2, `axe` : select, défaut `X`, valeurs X, Y, Z, XY, XZ, YZ, XYZ
  - id 3, `debut` : checkbox, défaut `false`
  - id 4, `nom` : text, défaut vide
  - id 5, `longueur` : text, défaut vide
  - id 6, `notes` : text, défaut vide

### 2. ligne de décalage (id 3)
- Type de forme : `polyline`
- Couleur : #CC9933
- Dans le JSON : non
- Attributs :
  - id 7, `nom` : text, défaut vide
  - id 8, `longueur` : text, défaut `0.0`
  - id 9, `angles absolus` : text, défaut `0.0,0.0,0.0`
  - id 10, `axe` : select, défaut `X`, valeurs X, Y, Z, XY, XZ, YZ, XYZ
  - id 11, `notes` : text, défaut vide

### 3. sens d'écoulement (id 4)
- Type de forme : `skeleton` (un squelette fait de 2 points nommés)
- Couleur : #FFCC33
- Dans le JSON : non
- Attributs :
  - id 14, `nom` : text, défaut vide
  - id 15, `notes` : text, défaut vide
- Sous-labels (les points du squelette) :
  - **entrée** (id 5) : type `points`, couleur #e194bb, attribut id 12 `notes` (text)
  - **sortie** (id 6) : type `points`, couleur #6fcaca, attribut id 13 `notes` (text)

### 4. point de soudure (id 7)
- Type de forme : `points`
- Couleur : #3D3DF5
- Dans le JSON : non
- Attributs :
  - id 16, `nom` : text, défaut vide
  - id 17, `positions` : text, défaut vide
  - id 18, `notes` : text, défaut vide
  - id 19, `Extremite libre` : checkbox, défaut `false`, **non modifiable**

### 5. etiquette (id 8)
- Type de forme : `rectangle` (peut être tourné, avec `rotation`)
- Couleur : #24B353
- Dans le JSON : `dimension_constraints[].label_geometry` (le texte d'une cote)
- Attributs :
  - id 20, `nom` : text, défaut vide
  - id 21, `notes` : text, défaut vide

### 6. ligne d'extension d'étiquette (id 9)
- Type de forme : `polyline`
- Couleur : #5986B3
- Dans le JSON : non
- Attributs :
  - id 22, `nom` : text, défaut vide
  - id 23, `longueur` : text, défaut `0.0`
  - id 24, `angles absolus` : text, défaut `0.0,0.0,0.0`
  - id 25, `axe` : select, défaut `X`, valeurs X, Y, Z, XY, XZ, YZ, XYZ
  - id 26, `notes` : text, défaut vide

### 7. ligne de cote (id 10)
- Type de forme : `polyline` (toujours 2 points : début et fin)
- Couleur : #FA3253
- Dans le JSON : `dimension_constraints[].dimension_geometry`
- Attributs :
  - id 27, `nom` : text, défaut vide
  - id 28, `longueur` : text, défaut `0.0`
  - id 29, `angles absolus` : text, défaut `0.0,0.0,0.0`
  - id 30, `axe` : select, défaut `X`, valeurs X, Y, Z, XY, XZ, YZ, XYZ
  - id 31, `notes` : text, défaut vide

### 8. autre texte (id 11)
- Type de forme : `rectangle`
- Couleur : #AAF0D1
- Dans le JSON : non
- Attributs : id 32 `nom` (text), id 33 `notes` (text)

### 9. liste de matériel (id 12)
- Type de forme : `rectangle`
- Couleur : #D2F037
- Dans le JSON : non
- Attributs : id 34 `nom` (text), id 35 `notes` (text)

### 10. cartouche (id 13)
- Type de forme : `rectangle`
- Couleur : #D2F037
- Dans le JSON : non
- Attributs : id 36 `nom` (text), id 37 `notes` (text)

## À retenir

- Plusieurs labels ont le même type de forme (5 `polyline`, 4 `rectangle`). C'est le **label id** qui les distingue, jamais le type.
- Les mêmes noms d'attributs (`nom`, `notes`, `axe`…) reviennent dans plusieurs labels, mais avec des **ids différents**. Il faut donc toujours chercher l'id d'un attribut *dans son label*.
- La réponse que j'avais collée annonçait `count: 60` avec une page 2 (`next`). Cette liste vient donc de la **page 1 seulement** (10 labels, ids 2 à 13 qui se suivent, tous du projet 1). Pour être sûr qu'il n'en manque aucun, relancer avec `page_size=100` et vérifier que `next` vaut `null`.
