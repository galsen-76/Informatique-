---
type: reference
tags:
  - cvat
date: 2026-11-17
---
# Labels CVAT du projet

Source : la liste complète des labels du projet CVAT 1 (réponse de l'API, 2026-11-17).

**60 labels** : 39 squelettes (`skeleton`), 13 rectangles, 6 polylignes, 2 points.

## Contexte (à donner avec la liste)

- CVAT sert à annoter des folios : des plans isométriques de tuyauterie.
- Chaque annotation (une « forme ») a un **label** (la catégorie), un **type** de forme géométrique et des **attributs** (des infos texte).
- Dans l'API, on désigne un label par son `id` et un attribut par son `id` (appelé `spec_id`).
- Un label `skeleton` est un ensemble de points nommés (ses sous-labels : entrée, centre, sortie…). On s'en sert pour les accessoires : coudes, tés, brides, vannes…
- Le module `replication` lit ces annotations et en fait un graphe JSON. Seuls 3 labels y sont repris :
  - `pipe_edges` → **tuyau** ;
  - `dimension_constraints[].dimension_geometry` → **ligne de cote** ;
  - `dimension_constraints[].label_geometry` → l'étiquette de la cote.
- Les autres labels ne sont pas dans le JSON.

Types d'attribut : `text` = texte libre, `select` = liste de choix, `checkbox` = vrai/faux.

## Par type de forme


### Polylignes (lignes avec 2 points ou plus)


**tuyau** (id 2) : dans le JSON via `pipe_edges`

- id 1 `angles absolus` : text
- id 2 `axe` : select, choix X, Y, Z, XY, XZ, YZ, XYZ, défaut `X`
- id 3 `debut` : checkbox, défaut `false`
- id 4 `nom` : text
- id 5 `longueur` : text
- id 6 `notes` : text

**ligne de décalage** (id 3)

- id 7 `nom` : text
- id 8 `longueur` : text, défaut `0.0`
- id 9 `angles absolus` : text, défaut `0.0,0.0,0.0`
- id 10 `axe` : select, choix X, Y, Z, XY, XZ, YZ, XYZ, défaut `X`
- id 11 `notes` : text

**ligne d'extension d'étiquette** (id 9)

- id 22 `nom` : text
- id 23 `longueur` : text, défaut `0.0`
- id 24 `angles absolus` : text, défaut `0.0,0.0,0.0`
- id 25 `axe` : select, choix X, Y, Z, XY, XZ, YZ, XYZ, défaut `X`
- id 26 `notes` : text

**ligne de cote** (id 10) : dans le JSON via `dimension_constraints[].dimension_geometry`

- id 27 `nom` : text
- id 28 `longueur` : text, défaut `0.0`
- id 29 `angles absolus` : text, défaut `0.0,0.0,0.0`
- id 30 `axe` : select, choix X, Y, Z, XY, XZ, YZ, XYZ, défaut `X`
- id 31 `notes` : text

**axe repère global** (id 15)

- id 40 `nom` : text
- id 41 `longueur` : text, défaut `0.0`
- id 42 `angles absolus` : text, défaut `0.0,0.0,0.0`
- id 43 `axe` : select, choix X, Y, Z, XY, XZ, YZ, XYZ, défaut `X`
- id 44 `notes` : text

**ligne de cote angulaire** (id 159)

- id 256 `nom` : text
- id 257 `longueur` : text, défaut `0.0`
- id 258 `angles absolus` : text, défaut `0.0,0.0,0.0`
- id 259 `axe` : select, choix X, Y, Z, XY, XZ, YZ, XYZ, défaut `X`
- id 260 `notes` : text

### Rectangles


**etiquette** (id 8) : dans le JSON via `dimension_constraints[].label_geometry` (à confirmer : voir « etiquette de cote »)

- id 20 `nom` : text
- id 21 `notes` : text

**autre texte** (id 11)

- id 32 `nom` : text
- id 33 `notes` : text

**liste de matériel** (id 12)

- id 34 `nom` : text
- id 35 `notes` : text

**cartouche** (id 13)

- id 36 `nom` : text
- id 37 `notes` : text

**légende** (id 14)

- id 38 `nom` : text
- id 39 `notes` : text

**remarques** (id 16)

- id 45 `nom` : text
- id 46 `notes` : text

**bouchon** (id 35)

- id 75 `nom` : text
- id 76 `notes` : text

**support** (id 42)

- id 86 `nom` : text
- id 87 `notes` : text

**etiquette de cote** (id 147)

- id 236 `nom` : text
- id 237 `notes` : text

**raccordement tube à tube** (id 158)

- id 254 `nom` : text
- id 255 `notes` : text

**Soudure de chantier** (id 161)

- id 264 `nom` : text
- id 265 `notes` : text

**Soudure bout à bout** (id 162)

- id 266 `nom` : text
- id 267 `notes` : text

**Raccordement tube à tube** (id 163)

- id 268 `nom` : text
- id 269 `notes` : text

### Points


**point de soudure** (id 7)

- id 16 `nom` : text
- id 17 `positions` : text
- id 18 `notes` : text
- id 19 `Extremite libre` : checkbox, défaut `false`, non modifiable

**renvoi** (id 160)

- id 261 `nom` : text
- id 262 `positions` : text, défaut `0.0,0.0,0.0`
- id 263 `notes` : text

### Squelettes (accessoires)


**sens d'écoulement** (id 4)

- id 14 `nom` : text
- id 15 `notes` : text
- Points du squelette : entrée (id 5, attribut `notes` id 12), sortie (id 6, attribut `notes` id 13)

**coude 90°** (id 17)

- id 50 `nom` : text
- id 51 `angles intrasèques sortie` : text, défaut `0.0`
- id 52 `notes` : text
- Points du squelette : entrée (id 18, attribut `notes` id 47), centre (id 19, attribut `notes` id 48), sortie (id 20, attribut `notes` id 49)

**coude 45°** (id 21)

- id 56 `nom` : text
- id 57 `angles intrasèques sortie` : text, défaut `0.0`
- id 58 `notes` : text
- Points du squelette : entrée (id 22, attribut `notes` id 53), centre (id 23, attribut `notes` id 54), sortie (id 24, attribut `notes` id 55)

**té égal** (id 25)

- id 63 `nom` : text
- id 64 `angles intrasèques sortie 1` : text, défaut `0.0`
- id 65 `angles intrasèques sortie 2` : text, défaut `0.0`
- id 66 `notes` : text
- Points du squelette : sortie 2 (id 26, attribut `notes` id 59), entrée (id 27, attribut `notes` id 60), centre (id 28, attribut `notes` id 61), sortie 1 (id 29, attribut `notes` id 62)

**té réduit** (id 30)

- id 71 `nom` : text
- id 72 `angles intrasèques sortie 1` : text, défaut `0.0`
- id 73 `angles intrasèques sortie 2` : text, défaut `0.0`
- id 74 `notes` : text
- Points du squelette : entrée (id 31, attribut `notes` id 67), centre (id 32, attribut `notes` id 68), sortie 1 (id 33, attribut `notes` id 69), sortie 2 (id 34, attribut `notes` id 70)

**réducteur concentrique** (id 36)

- id 79 `nom` : text
- id 80 `notes` : text
- Points du squelette : entrée (id 37, attribut `notes` id 77), sortie (id 38, attribut `notes` id 78)

**réducteur excentré** (id 39)

- id 83 `nom` : text
- id 84 `notes` : text
- id 85 `excentricité` : text, défaut `0,0,0`, non modifiable
- Points du squelette : entrée (id 40, attribut `notes` id 81), sortie (id 41, attribut `notes` id 82)

**manchon** (id 43)

- id 90 `nom` : text
- id 91 `notes` : text
- Points du squelette : entrée (id 44, attribut `notes` id 88), sortie (id 45, attribut `notes` id 89)

**autre équipement** (id 46)

- id 94 `nom` : text
- id 95 `notes` : text
- Points du squelette : entrée (id 47, attribut `notes` id 92), sortie (id 48, attribut `notes` id 93)

**bride** (id 49)

- id 98 `nom` : text
- id 99 `notes` : text
- Points du squelette : entrée (id 50, attribut `notes` id 96), sortie (id 51, attribut `notes` id 97)

**bride à collet soudé** (id 52)

- id 102 `nom` : text
- id 103 `notes` : text
- Points du squelette : entrée (id 53, attribut `notes` id 100), sortie (id 54, attribut `notes` id 101)

**bride à emboîtement soudé** (id 55)

- id 106 `nom` : text
- id 107 `notes` : text
- Points du squelette : sortie (id 57, attribut `notes` id 105), entrée (id 56, attribut `notes` id 104)

**bride filetée** (id 58)

- id 110 `nom` : text
- id 111 `notes` : text
- Points du squelette : entrée (id 59, attribut `notes` id 108), sortie (id 60, attribut `notes` id 109)

**bride à enfiler** (id 61)

- id 114 `nom` : text
- id 115 `notes` : text
- Points du squelette : entrée (id 62, attribut `notes` id 112), sortie (id 63, attribut `notes` id 113)

**bride tournante (lap-joint)** (id 64)

- id 118 `nom` : text
- id 119 `notes` : text
- Points du squelette : entrée (id 65, attribut `notes` id 116), sortie (id 66, attribut `notes` id 117)

**bride pleine** (id 67)

- id 122 `nom` : text
- id 123 `notes` : text
- Points du squelette : entrée (id 68, attribut `notes` id 120), sortie (id 69, attribut `notes` id 121)

**vanne à opercule** (id 70)

- id 127 `nom` : text
- id 128 `angles intrasèques sortie` : text, défaut `0.0`
- id 129 `notes` : text
- Points du squelette : entrée (id 71, attribut `notes` id 124), centre (id 72, attribut `notes` id 125), sortie (id 73, attribut `notes` id 126)

**vanne à soupape** (id 74)

- id 133 `nom` : text
- id 134 `angles intrasèques sortie` : text, défaut `0.0`
- id 135 `notes` : text
- Points du squelette : entrée (id 75, attribut `notes` id 130), centre (id 76, attribut `notes` id 131), sortie (id 77, attribut `notes` id 132)

**vanne à boisseau sphérique** (id 78)

- id 139 `nom` : text
- id 140 `angles intrasèques sortie` : text, défaut `0.0`
- id 141 `notes` : text
- Points du squelette : entrée (id 79, attribut `notes` id 136), centre (id 80, attribut `notes` id 137), sortie (id 81, attribut `notes` id 138)

**vanne à boisseau** (id 82)

- id 145 `nom` : text
- id 146 `angles intrasèques sortie` : text, défaut `0.0`
- id 147 `notes` : text
- Points du squelette : entrée (id 83, attribut `notes` id 142), centre (id 84, attribut `notes` id 143), sortie (id 85, attribut `notes` id 144)

**vanne papillon** (id 86)

- id 151 `nom` : text
- id 152 `angles intrasèques sortie` : text, défaut `0.0`
- id 153 `notes` : text
- Points du squelette : entrée (id 87, attribut `notes` id 148), centre (id 88, attribut `notes` id 149), sortie (id 89, attribut `notes` id 150)

**vanne à pointeau** (id 90)

- id 157 `nom` : text
- id 158 `angles intrasèques sortie` : text, défaut `0.0`
- id 159 `notes` : text
- Points du squelette : entrée (id 91, attribut `notes` id 154), centre (id 92, attribut `notes` id 155), sortie (id 93, attribut `notes` id 156)

**vanne à membrane** (id 94)

- id 163 `nom` : text
- id 164 `angles intrasèques sortie` : text, défaut `0.0`
- id 165 `notes` : text
- Points du squelette : entrée (id 95, attribut `notes` id 160), centre (id 96, attribut `notes` id 161), sortie (id 97, attribut `notes` id 162)

**vanne type y** (id 98)

- id 169 `nom` : text
- id 170 `angles intrasèques sortie` : text, défaut `0.0`
- id 171 `notes` : text
- Points du squelette : entrée (id 99, attribut `notes` id 166), centre (id 100, attribut `notes` id 167), sortie (id 101, attribut `notes` id 168)

**vanne 3 voies** (id 102)

- id 176 `nom` : text
- id 177 `angles intrasèques sortie 1` : text, défaut `0.0`
- id 178 `angles intrasèques sortie 2` : text, défaut `0.0`
- id 179 `notes` : text
- Points du squelette : entrée (id 103, attribut `notes` id 172), centre (id 104, attribut `notes` id 173), sortie 1 (id 105, attribut `notes` id 174), sortie 2 (id 106, attribut `notes` id 175)

**clapet anti-retour** (id 107)

- id 182 `nom` : text
- id 183 `notes` : text
- Points du squelette : entrée (id 108, attribut `notes` id 180), sortie (id 109, attribut `notes` id 181)

**vanne de fond** (id 110)

- id 187 `nom` : text
- id 188 `angles intrasèques sortie` : text, défaut `0.0`
- id 189 `notes` : text
- Points du squelette : entrée (id 111, attribut `notes` id 184), centre (id 112, attribut `notes` id 185), sortie (id 113, attribut `notes` id 186)

**soupape de sûreté** (id 114)

- id 193 `nom` : text
- id 194 `angles intrasèques sortie` : text, défaut `0.0`
- id 195 `notes` : text
- Points du squelette : entrée (id 115, attribut `notes` id 190), centre (id 116, attribut `notes` id 191), sortie (id 117, attribut `notes` id 192)

**vanne de régulation droite** (id 118)

- id 199 `nom` : text
- id 200 `angles intrasèques sortie` : text, défaut `0.0`
- id 201 `notes` : text
- Points du squelette : entrée (id 119, attribut `notes` id 196), centre (id 120, attribut `notes` id 197), sortie (id 121, attribut `notes` id 198)

**vanne de régulation à angle** (id 122)

- id 205 `nom` : text
- id 206 `angles intrasèques sortie` : text, défaut `0.0`
- id 207 `notes` : text
- Points du squelette : entrée (id 123, attribut `notes` id 202), centre (id 124, attribut `notes` id 203), sortie (id 125, attribut `notes` id 204)

**piquage weldolet®** (id 126)

- id 210 `nom` : text
- id 211 `notes` : text
- Points du squelette : entrée (id 127, attribut `notes` id 208), sortie (id 128, attribut `notes` id 209)

**piquage nipolet®** (id 129)

- id 214 `nom` : text
- id 215 `notes` : text
- Points du squelette : entrée (id 130, attribut `notes` id 212), sortie (id 131, attribut `notes` id 213)

**piquage à brides flangolet** (id 132)

- id 218 `nom` : text
- id 219 `notes` : text
- Points du squelette : entrée (id 133, attribut `notes` id 216), sortie (id 134, attribut `notes` id 217)

**plaque pleine (spade)** (id 135)

- id 222 `nom` : text
- id 223 `notes` : text
- Points du squelette : entrée (id 136, attribut `notes` id 220), sortie (id 137, attribut `notes` id 221)

**lunette d’obturation (spectacle blind)** (id 138)

- id 226 `nom` : text
- id 227 `notes` : text
- Points du squelette : entrée (id 139, attribut `notes` id 224), sortie (id 140, attribut `notes` id 225)

**obturateur à battant (hammer blind)** (id 141)

- id 230 `nom` : text
- id 231 `notes` : text
- Points du squelette : entrée (id 142, attribut `notes` id 228), sortie (id 143, attribut `notes` id 229)

**entretoise** (id 144)

- id 234 `nom` : text
- id 235 `notes` : text
- Points du squelette : entrée (id 145, attribut `notes` id 232), sortie (id 146, attribut `notes` id 233)

**té égal 2e** (id 148)

- id 242 `nom` : text
- id 243 `angles intrasèques entrée 2` : text, défaut `0.0`
- id 244 `angles intrasèques sortie` : text, défaut `0.0`
- id 245 `notes` : text
- Points du squelette : entrée 1 (id 149, attribut `notes` id 238), entrée 2 (id 150, attribut `notes` id 239), centre (id 151, attribut `notes` id 240), sortie (id 152, attribut `notes` id 241)

**té réduit 2e** (id 153)

- id 250 `nom` : text
- id 251 `angles intrasèques entrée 2` : text, défaut `0.0`
- id 252 `angles intrasèques sortie` : text, défaut `0.0`
- id 253 `notes` : text
- Points du squelette : entrée 1 (id 154, attribut `notes` id 246), entrée 2 (id 155, attribut `notes` id 247), centre (id 156, attribut `notes` id 248), sortie (id 157, attribut `notes` id 249)


## À retenir

- Plusieurs labels ont le même type de forme. C'est le **label id** qui les distingue, jamais le type.
- Les mêmes noms d'attributs (`nom`, `notes`, `axe`…) reviennent dans beaucoup de labels, mais avec des **ids différents**. Il faut donc toujours chercher l'id d'un attribut *dans son label*.
- Il existe deux labels proches pour l'étiquette d'une cote : `etiquette` (id 8) et `etiquette de cote` (id 147). Il faut vérifier lequel `replication` lit, et l'utiliser dans le script.
