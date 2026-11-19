---
type: concept
domain: python
module: "[[Module 16 - Python]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Système de fichiers]]"
  - "[[Boucle (for, while)]]"
parents: []
related:
  - "[[Lire et écrire un fichier]]"
  - "[[Archive zip (zipfile)]]"
next_review: 
method: []
tags:
  - concept
  - python
---
# Chemin de fichier en Python (pathlib)

> [!info] En une phrase
> pathlib représente un chemin comme un objet Path : on le construit avec /, on teste s'il existe, on liste un dossier, sans se soucier de Windows ou Linux.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
`Path` (module `pathlib`, bibliothèque standard) est un **objet chemin**. Au lieu de coller des bouts de texte avec `"\\"` ou `"/"`, on écrit `dossier / "photo.png"` et Python met le bon séparateur selon le système.

### Pourquoi ça existe
Écrire des chemins qui marchent à la fois sous Windows et dans un conteneur Linux, et avoir sous la main toutes les opérations courantes (existe ? extension ? lister ?).

### Le problème résolu
Les chemins écrits en texte (`"C:\\dossier\\" + nom`) cassent dès qu'on change de système, et les fonctions de l'ancien module `os.path` sont éparpillées.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  P[Path] --> T[Tester]
  P --> L[Lister]
  P --> C[Construire]
```
| Pour… | On écrit |
| --- | --- |
| créer un chemin | `Path("donnees")`, `Path.cwd()` (dossier courant), `Path.home()` |
| assembler | `dossier / "sous" / "a.png"` |
| tester | `.exists()`, `.is_file()`, `.is_dir()` |
| décomposer | `.name` (`a.png`), `.stem` (`a`), `.suffix` (`.png`), `.parent` |
| lister un dossier | `.iterdir()` (un niveau), `.glob("*.png")`, `.rglob("*.png")` (récursif) |
| créer un dossier | `.mkdir(parents=True, exist_ok=True)` |
| chemin absolu | `.resolve()` |
| chemin relatif | `.relative_to(base)` |
| supprimer un fichier | `.unlink()` |

### Exemple concret
```python
from pathlib import Path

source = Path("donnees")
sortie = Path("sortie")
sortie.mkdir(exist_ok=True)

for fichier in source.rglob("*.png"):
    print(fichier.name, fichier.stat().st_size, "octets")
    print("  relatif :", fichier.relative_to(source))
```

### Cas d'utilisation
- Trouver tous les fichiers à zipper dans un dossier et ses sous-dossiers
- Construire le chemin de l'archive de sortie

> [!warning] À ne pas confondre
> Un chemin **relatif** (`Path("donnees")`) dépend du dossier depuis lequel tu **lances** le script, pas de l'endroit où se trouve le fichier `.py`. Pour partir du script : `Path(__file__).parent / "donnees"`. Dans Docker, c'est le `WORKDIR`.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine `Path("data") / "graph.json"` : les morceaux, l'objet obtenu, et ce que donnent `.name`, `.suffix`, `.parent`.

> [!example] 🔄 Change de contexte
> Redessine le même chemin dans un conteneur Docker où le dossier est monté en `/data`. Qu'est-ce qui change ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Chemin de fichier en Python (pathlib) » et je l'intègre ici avec `![[Schéma - Chemin de fichier en Python (pathlib).excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Système de fichiers]] · [[Boucle (for, while)]]
- **Complémentaires** : [[Lire et écrire un fichier]] · [[Copier et déplacer des fichiers (shutil)]]
- **Utilisé par** : [[Archive zip (zipfile)]] · [[Volume Docker]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
