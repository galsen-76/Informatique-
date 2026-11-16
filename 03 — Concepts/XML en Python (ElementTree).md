---
type: concept
domain: python
module: "[[Module 16 - Python]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[XML]]"
  - "[[Liste et dictionnaire]]"
parents: []
related:
  - "[[JSON]]"
  - "[[Lire et écrire un fichier]]"
next_review: 
method: []
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
| `ET.tostring(el, ...)` | obtenir les octets (utile dans une fonction Nuclio) |

### Cas d'utilisation
- Fabriquer un XML d'annotations CVAT depuis un autre format.
- Lire un export CVAT pour en extraire les formes.

> [!warning] À ne pas confondre
> - `ET.Element` crée un élément **orphelin** ; `ET.SubElement` l'accroche au parent. Un `Element` créé puis jamais ajouté n'apparaît pas dans le fichier.
> - Attributs et `.text` doivent être des **chaînes** : `{"width": 800}` → `TypeError: cannot serialize 800 (type int)` au moment de l'écriture, pas au moment où tu l'as mis.
> - `write()` sans `encoding="utf-8"` écrit en ASCII avec des `&#233;` à la place des accents.
> - Python écrit la déclaration avec des apostrophes `<?xml version='1.0' ...?>` et les éléments vides en `<values />` : c'est du XML équivalent.

## 3 · Pratiquer
- [[Projet - Convertir le graphe en XML CVAT]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[XML]], [[Liste et dictionnaire]]
- **Notion parente** :
- **Complémentaires** : [[JSON]], [[Lire et écrire un fichier]]
- **Utilisé par** : [[Format CVAT for images 1.1]]
- **Commandes** :

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
