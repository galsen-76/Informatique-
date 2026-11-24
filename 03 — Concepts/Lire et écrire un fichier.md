---
type: concept
module: "[[Module 16 - Python]]"
related:
  - "[[JSON]]"
  - "[[Exception]]"
tags:
  - concept
  - python
---
# Lire et écrire un fichier

> [!info] En une phrase
> Ouvrir un fichier pour en lire ou écrire le contenu, en mode texte (avec un encodage) ou en mode binaire (octets bruts).

## 1 · Comprendre
### Définition
- **Texte** : `Path.read_text(encoding="utf-8")` / `write_text(...)`, ou `open(chemin, "r", encoding="utf-8")`.
- **Binaire** : `read_bytes()` / `write_bytes()`, ou `open(chemin, "rb")`. Pour les images, les zip, les PDF.
- Le **mode** dit ce qu'on fait : `"r"` lire, `"w"` écrire (écrase !), `"a"` ajouter à la fin, `b` en plus pour binaire.

### Pourquoi ça existe
Un programme doit lire ses entrées (configuration, annotations XML, images) et produire des sorties (rapport, PNG, archive).

### Le problème résolu
Garder des données après la fin du programme, et échanger avec d'autres programmes.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  O[Ouvrir] --> L[Lire / écrire]
  L --> F[Fermer]
```
`with open(...) as f:` ferme le fichier **automatiquement** à la fin du bloc, même en cas d'erreur. Toujours l'utiliser avec `open`.

### Exemple concret
```python
from pathlib import Path
import json

# texte entier
contenu = Path("notes.txt").read_text(encoding="utf-8")

# ligne par ligne (gros fichiers)
with open("journal.log", encoding="utf-8") as f:
    for ligne in f:
        if "ERROR" in ligne:
            print(ligne.strip())

# écrire
Path("rapport.txt").write_text("12 fichiers zippés\n", encoding="utf-8")

# JSON <-> dictionnaire
config = json.loads(Path("config.json").read_text(encoding="utf-8"))
Path("resultat.json").write_text(json.dumps(config, indent=2), encoding="utf-8")

# binaire
octets = Path("image.png").read_bytes()
print(len(octets), "octets")
```

> [!abstract]- Comment ça s'écrit (référence à chercher, pas à apprendre par cœur)
> L'idée est la même partout ; seule l'écriture change.
>
> **Python**
> ```python
> with open("notes.txt", encoding="utf-8") as f:
>     texte = f.read()
> with open("sortie.txt", "w", encoding="utf-8") as f:
>     f.write("fini\n")
> ```
>
> **JavaScript (Node)**
> ```js
> import { readFile, writeFile, mkdir } from "node:fs/promises";
> const texte = await readFile("notes.txt", "utf8");
> await mkdir("sortie", { recursive: true });
> await writeFile("sortie/rapport.txt", "fini\n");
> ```
> Préfère la version promesses (`fs/promises` + `await`) : les versions `…Sync` bloquent le programme.
>
> **Bash**
> ```bash
> cat notes.txt                 # lire
> echo "fini" > sortie.txt      # écrire (écrase)
> echo "suite" >> sortie.txt    # ajouter à la fin
> while read -r ligne; do echo "$ligne"; done < notes.txt
> ```

### Cas d'utilisation
- Lire un fichier de configuration JSON
- Écrire un rapport ou un journal de ce que le script a fait
- Lire les octets d'une image pour la renvoyer (dans une réponse HTTP)

> [!warning] À ne pas confondre
> Mode `"w"` (efface le fichier puis écrit) et `"a"` (ajoute à la fin). Et **texte** vs **binaire** : ouvrir une image en mode texte provoque `UnicodeDecodeError`. Préciser `encoding="utf-8"` évite les accents cassés sous Windows.

## 3 · Relier
- **Prérequis** : [[Chemin de fichier]]
- **Complémentaires** : [[JSON]] · [[Exception]]
- **Utilisé par** : [[Archive zip (zipfile)]] · [[Lire et écrire du CSV]]
