---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Environnement virtuel Python]]"
  - "[[pip]]"
  - "[[pytest]]"
tags:
  - exercice
---
# Exercice — Projet Python isolé et testé

> [!info] Objectif
> Monter un projet propre : environnement isolé, dépendances figées, tests automatiques.
> Notions : [[Environnement virtuel Python]] · [[pip]] · [[pytest]]

## Consignes
- [ ] Dans `essai-zip`, crée un venv `.venv`, active-le, vérifie avec `which python` (ou `Get-Command python`)
- [ ] Installe `pytest`, puis génère `requirements.txt`
- [ ] Écris 3 tests pour `outils.py` (dont un qui échoue exprès, puis corrige-le)
- [ ] Écris un test qui utilise `tmp_path` pour créer des fichiers, les zipper et vérifier le contenu
- [ ] Supprime le venv, recrée-le et réinstalle tout depuis `requirements.txt` ; relance les tests
- [ ] Vérifie que `.venv` n'est pas suivi par Git

> [!question]- Indice
> `python -m venv .venv`, `source .venv/bin/activate`, `pip freeze > requirements.txt`, `pytest -v`. Les fonctions de test commencent par `test_`.

> [!question]- Solution
> ```bash
> python3 -m venv .venv && source .venv/bin/activate
> pip install pytest && pip freeze > requirements.txt
> pytest -v
> deactivate && rm -rf .venv
> python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && pytest
> git status --ignored   # .venv apparaît dans les ignorés
> ```
> ```python
> import zipfile
> def test_zip(tmp_path):
>     (tmp_path / "a.png").write_bytes(b"x")
>     with zipfile.ZipFile(tmp_path / "t.zip", "w") as z:
>         z.write(tmp_path / "a.png", arcname="a.png")
>     assert zipfile.ZipFile(tmp_path / "t.zip").namelist() == ["a.png"]
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
