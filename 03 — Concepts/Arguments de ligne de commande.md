---
type: concept
module: "[[Module 16 - Python]]"
related:
  - "[[Variable d'environnement]]"
tags:
  - concept
  - python
---
# Arguments de ligne de commande

> [!info] En une phrase
> Les valeurs tapées après le nom du script (python zipper.py photos --sortie export.zip), que le script récupère pour savoir sur quoi travailler.

## 1 · Comprendre
### Définition
Tout ce qui suit `python script.py` est transmis au script. Deux façons de le lire :
- `sys.argv` : la liste brute (`sys.argv[0]` est le nom du script).
- `argparse` (standard) : décrit les arguments attendus, vérifie, et génère `--help` tout seul.

### Pourquoi ça existe
Lancer le même script sur des dossiers différents sans modifier son code, depuis le terminal, Docker ou la CI.

### Le problème résolu
Un script avec le chemin écrit en dur ne sert qu'une fois ; il faut l'éditer à chaque usage.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  C[Commande] --> A[argparse]
  A --> V[Valeurs]
```

### Exemple concret
```python
import argparse
from pathlib import Path

parser = argparse.ArgumentParser(description="Zippe les fichiers d'un dossier.")
parser.add_argument("dossier", type=Path, help="dossier à traiter")
parser.add_argument("--sortie", type=Path, default=Path("archive.zip"))
parser.add_argument("--extension", default=".png")
args = parser.parse_args()

print(args.dossier, args.sortie, args.extension)
```
```bash
python zipper.py photos --sortie export.zip
python zipper.py --help            # aide générée
```
| Sorte | Exemple | Obligatoire ? |
| --- | --- | --- |
| positionnel | `dossier` | oui |
| option | `--sortie export.zip` | non, valeur par défaut |
| drapeau | `--verbeux` (`action="store_true"`) | non, vaut `True` si présent |

> [!abstract]- Comment ça s'écrit (référence à chercher, pas à apprendre par cœur)
> L'idée est la même partout ; seule l'écriture change.
>
> **Python**
> ```python
> import sys
> print(sys.argv[1:])          # liste des arguments
> # mieux : argparse
> import argparse
> p = argparse.ArgumentParser()
> p.add_argument("fichier")
> p.add_argument("--categorie")
> args = p.parse_args()
> ```
>
> **JavaScript (Node)**
> ```js
> const [fichier, categorie] = process.argv.slice(2);
> // process.argv[0] = node, [1] = le script
> ```
>
> **Bash**
> ```bash
> echo "$1"     # premier argument
> echo "$#"     # nombre d'arguments
> echo "$@"     # tous les arguments
> [ $# -lt 1 ] && { echo "usage : $0 fichier" >&2; exit 1; }
> ```

### Cas d'utilisation
- Passer le dossier source et le nom de l'archive au script
- Dans Docker : les arguments après le nom de l'image arrivent au script (voir [[Python dans Docker]])

> [!warning] À ne pas confondre
> Argument de ligne de commande (`python s.py photos`) et [[Variable d'environnement]] (`DOSSIER=photos`). Les arguments disent **quoi traiter**, les variables d'environnement règlent plutôt **la configuration** (adresse d'un serveur, secret).

## 3 · Relier
- **Prérequis** : [[Fonction]] · [[Code de sortie]]
- **Complémentaires** : [[Variable d'environnement]]
- **Utilisé par** : [[Python dans Docker]]
