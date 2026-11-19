---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Chemin de fichier en Python (pathlib)]]"
  - "[[Lire et écrire un fichier]]"
tags:
  - exercice
---
# Exercice — Explorer un dossier avec pathlib

> [!info] Objectif
> Parcourir une arborescence et produire un rapport dans un fichier.
> Notions : [[Chemin de fichier en Python (pathlib)]] · [[Lire et écrire un fichier]]

## Consignes
- [ ] Prépare un dossier de test : 3 `.png`, 2 `.txt`, un sous-dossier avec 1 `.png`, un fichier vide
- [ ] Affiche pour chaque fichier (sous-dossiers compris) : chemin relatif, extension, taille
- [ ] Écris ce rapport dans `rapport.txt` (UTF-8), puis relis-le ligne par ligne
- [ ] Écris aussi le rapport en JSON (`rapport.json`) et recharge-le en dictionnaire
- [ ] Lance le script depuis deux dossiers différents et explique la différence ; corrige avec `Path(__file__).parent`

> [!question]- Indice
> `rglob("*")`, `.is_file()`, `.relative_to(source)`, `.suffix`, `.stat().st_size`, `json.dumps(..., indent=2)`.

> [!question]- Solution
> ```python
> import json
> from pathlib import Path
>
> source = Path(__file__).parent / "donnees"
> lignes, data = [], []
> for f in source.rglob("*"):
>     if f.is_file():
>         rel = f.relative_to(source)
>         lignes.append(f"{rel}\t{f.suffix}\t{f.stat().st_size}")
>         data.append({"chemin": str(rel), "ext": f.suffix, "taille": f.stat().st_size})
>
> Path("rapport.txt").write_text("\n".join(lignes) + "\n", encoding="utf-8")
> Path("rapport.json").write_text(json.dumps(data, indent=2), encoding="utf-8")
> print(json.loads(Path("rapport.json").read_text(encoding="utf-8")))
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
