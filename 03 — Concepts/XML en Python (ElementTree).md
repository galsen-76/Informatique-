---
type: concept
domain: python
module: "[[Module 16 - Python]]"
status: a-decouvrir
level: debutant
niveau: 4
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[XML]]"
  - "[[Liste et dictionnaire]]"
parents: []
related:
  - "[[JSON]]"
  - "[[Lire et écrire un fichier]]"
next_review: 
tags:
  - concept
  - python
---
# XML en Python (ElementTree)

> [!info] En une phrase
> Le module standard `xml.etree.ElementTree` construit, lit et écrit un fichier XML comme un arbre d'objets Python, sans rien installer.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
`ElementTree` (importé en `ET`) représente chaque balise par un objet **Element** qui a :
- `.tag` : son nom ;
- `.attrib` : un dictionnaire de ses attributs ;
- `.text` : le texte à l'intérieur ;
- ses enfants, qu'on parcourt comme une liste.

### Pourquoi ça existe
- Écrire du XML « à la main » avec des f-strings est fragile : on oublie une balise fermante, un `&` ou un `"` dans une valeur casse le fichier. ElementTree s'occupe de l'échappement et de la structure.

### Le problème résolu
- Passer d'une structure Python (dict, list) à un fichier XML valide, et inversement.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  A[ET.Element] --> B[ET.SubElement]
  B --> C[.text et attributs]
  C --> D[write]
```

### Exemple concret
**Écrire**
```python
import xml.etree.ElementTree as ET

racine = ET.Element("bibliotheque")
livre = ET.SubElement(racine, "livre", {"isbn": "978-2"})
livre.set("pages", str(320))            # ajouter un attribut après coup
ET.SubElement(livre, "titre").text = "Dune"

ET.indent(racine, space="  ")            # retraits, Python 3.9+
arbre = ET.ElementTree(racine)
arbre.write("biblio.xml", encoding="utf-8", xml_declaration=True)

octets = ET.tostring(racine, encoding="utf-8", xml_declaration=True)  # sans fichier
```

**Lire**
```python
arbre = ET.parse("biblio.xml")           # ou ET.fromstring(texte)
racine = arbre.getroot()
for livre in racine.iter("livre"):       # tous les <livre>, à toute profondeur
    print(livre.get("isbn"), livre.find("titre").text)
```

| Fonction | Rôle |
| --- | --- |
| `ET.Element(tag, attrib)` | crée un élément seul (souvent la racine) |
| `ET.SubElement(parent, tag, attrib)` | crée un enfant **accroché** au parent, et le renvoie |
| `el.set(nom, valeur)` / `el.get(nom)` | écrire / lire un attribut |
| `el.find(tag)` / `el.findall(tag)` / `el.iter(tag)` | chercher des enfants |
| `ET.indent(el)` | ajouter les retraits pour la lecture |
| `ET.ElementTree(el).write(...)` | écrire dans un fichier |
| `ET.tostring(el, ...)` | obtenir les octets (utile pour renvoyer le XML dans une réponse HTTP) |

### Cas d'utilisation

> [!warning] À ne pas confondre
> - `ET.Element` crée un élément **orphelin** ; `ET.SubElement` l'accroche au parent. Un `Element` créé puis jamais ajouté n'apparaît pas dans le fichier.
> - Attributs et `.text` doivent être des **chaînes** : `{"width": 800}` → `TypeError: cannot serialize 800 (type int)` au moment de l'écriture, pas au moment où tu l'as mis.
> - `write()` sans `encoding="utf-8"` écrit en ASCII avec des `&#233;` à la place des accents.
> - Python écrit la déclaration avec des apostrophes `<?xml version='1.0' ...?>` et les éléments vides en `<values />` : c'est du XML équivalent.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine un fichier XML lu par ElementTree : l'arbre, `find`, `findall`, `get` pour lire un attribut.

> [!example] 🔄 Change de contexte
> Redessine le même parcours sur le JSON des annotations. Qu'est-ce qui remplace `find` et `get` ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - XML en Python (ElementTree) » et je l'intègre ici avec `![[Schéma - XML en Python (ElementTree).excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Au travail** : [[XML en Python (ElementTree) au travail]]
- **Prérequis** : [[XML]], [[Liste et dictionnaire]]
- **Notion parente** :
- **Complémentaires** : [[JSON]], [[Lire et écrire un fichier]]
- **Au travail** : [[Format CVAT for images 1.1]]
- **Commandes** :

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
