---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Variable d'environnement]]"
tags:
  - exercice
---
# Exercice — Configurer avec des variables d'environnement

> [!info] Objectif
> Régler un programme de l'extérieur sans toucher à son code.
> Notions : [[Variable d'environnement]]

## Consignes
- [ ] Écris un script Python `salut.py` qui affiche `Bonjour <NOM>` en lisant la variable `NOM` (valeur par défaut : « inconnu »)
- [ ] Lance-le sans la variable, puis avec, en Bash et en PowerShell
- [ ] En Bash, montre la différence entre `NOM=x` et `export NOM=x`
- [ ] Lance-le dans un conteneur `python:3.12-slim` avec `-e NOM=...`
- [ ] Affiche ton `PATH` un dossier par ligne

> [!question]- Indice
> `os.environ.get("NOM", "inconnu")`. Dans un conteneur, monte le dossier avec `-v` pour que le script soit visible. `echo $PATH | tr ':' '\n'`.

> [!question]- Solution
> ```python
> import os
> print(f"Bonjour {os.environ.get('NOM', 'inconnu')}")
> ```
> ```bash
> python3 salut.py                     # Bonjour inconnu
> NOM=x ; python3 salut.py             # inconnu : pas exportée
> export NOM=Oumar ; python3 salut.py  # Bonjour Oumar
> docker run --rm -e NOM=Oumar -v "$PWD:/app" python:3.12-slim python /app/salut.py
> echo $PATH | tr ':' '\n'
> ```
> ```powershell
> $env:NOM = "Oumar" ; python salut.py
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
