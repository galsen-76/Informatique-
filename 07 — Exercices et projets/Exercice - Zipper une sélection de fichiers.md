---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Archive zip (zipfile)]]"
  - "[[Copier et déplacer des fichiers (shutil)]]"
tags:
  - exercice
---
# Exercice — Zipper une sélection de fichiers

> [!info] Objectif
> Créer une archive contrôlée, la vérifier, puis ranger les originaux.
> Notions : [[Archive zip (zipfile)]] · [[Copier et déplacer des fichiers (shutil)]]

## Consignes
- [ ] Avec `shutil.make_archive`, zippe tout le dossier de test et ouvre l'archive
- [ ] Avec `zipfile`, zippe **seulement** les `.png`, en gardant les sous-dossiers mais pas le nom du dossier racine
- [ ] Compare la taille avec et sans `ZIP_DEFLATED`
- [ ] Relis l'archive (`namelist()`) et vérifie qu'elle contient exactement les fichiers attendus
- [ ] Seulement si la vérification réussit, déplace les originaux dans `traites/` avec `shutil.move`
- [ ] Ajoute une option `--dry-run` qui affiche ce qui serait fait sans rien toucher

> [!question]- Indice
> `z.write(f, arcname=f.relative_to(source))`. Compare deux ensembles : `set(z.namelist()) == attendus`. N'écris pas l'archive dans le dossier source.

> [!question]- Solution
> ```python
> import shutil, zipfile
> from pathlib import Path
>
> source, sortie = Path("donnees"), Path("images.zip")
> fichiers = [f for f in source.rglob("*.png") if f.is_file()]
> attendus = {f.relative_to(source).as_posix() for f in fichiers}
>
> with zipfile.ZipFile(sortie, "w", zipfile.ZIP_DEFLATED) as z:
>     for f in fichiers:
>         z.write(f, arcname=f.relative_to(source))
>
> with zipfile.ZipFile(sortie) as z:
>     assert set(z.namelist()) == attendus, "archive incomplète"
>
> traites = Path("traites")
> for f in fichiers:
>     dest = traites / f.relative_to(source)
>     dest.parent.mkdir(parents=True, exist_ok=True)
>     shutil.move(f, dest)
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
