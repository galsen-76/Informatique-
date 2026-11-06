---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Exception]]"
  - "[[Arguments de ligne de commande]]"
  - "[[Code de sortie]]"
tags:
  - exercice
---
# Exercice — Gérer les erreurs d'un script

> [!info] Objectif
> Un script qui reçoit ses paramètres, refuse proprement les mauvaises entrées et sort avec le bon code.
> Notions : [[Exception]] · [[Arguments de ligne de commande]] · [[Code de sortie]]

## Consignes
- [ ] Écris `lister.py` qui reçoit un dossier en argument avec `argparse`, et une option `--extension` (défaut `.png`)
- [ ] Si le dossier n'existe pas : message sur stderr et code de sortie 1
- [ ] Affiche `--help` et lance le script sans argument : note le code de sortie
- [ ] Provoque trois exceptions différentes (fichier absent, clé absente, mauvais type) et lis chaque traceback en partant de la fin
- [ ] Attrape seulement `PermissionError` lors de la lecture d'un fichier, et explique pourquoi `except Exception: pass` est dangereux

> [!question]- Indice
> Structure conseillée : une fonction `main() -> int` et `sys.exit(main())`. `print(..., file=sys.stderr)`.

> [!question]- Solution
> ```python
> import argparse, sys
> from pathlib import Path
>
> def main() -> int:
>     p = argparse.ArgumentParser()
>     p.add_argument("dossier", type=Path)
>     p.add_argument("--extension", default=".png")
>     args = p.parse_args()
>     if not args.dossier.is_dir():
>         print(f"Dossier introuvable : {args.dossier}", file=sys.stderr)
>         return 1
>     for f in args.dossier.glob(f"*{args.extension}"):
>         print(f.name)
>     return 0
>
> if __name__ == "__main__":
>     sys.exit(main())
> ```
> Sans argument, `argparse` affiche l'usage et sort avec le code 2.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
