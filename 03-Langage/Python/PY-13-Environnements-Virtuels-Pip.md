---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Environnements Virtuels & pip"
tags:
  - backend/python/environnements
parent: "[[Python]]"
related_theory:
  - "[[PY-06-Modules-Packages|Modules et Packages Python]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: https://docs.python.org/3/library/venv.html
---

# Environnements Virtuels & pip

> [!abstract] En bref
> **pip** est le npm de Python : il installe des bibliothèques. Mais par défaut, pip installe **pour tout l'ordinateur**, et deux projets qui veulent des versions différentes se marchent dessus. La solution : un **environnement virtuel** (`.venv`) par projet, l'équivalent du dossier `node_modules`. Réflexe : **toujours** créer un `.venv` avant d'installer quoi que ce soit.

## Node → Python

| Node.js | Python |
|---|---|
| `npm` | `pip` |
| `node_modules/` (automatique) | `.venv/` (à créer et **activer**) |
| `package.json` | `requirements.txt` ou `pyproject.toml` |
| `npm install` | `pip install -r requirements.txt` |
| `npx` | `python -m` |

## Le déroulé (Linux / WSL / macOS)

```bash
cd mon-projet
python3 -m venv .venv                 # 1. créer l'environnement (une fois)
source .venv/bin/activate             # 2. l'activer : (.venv) apparaît dans le terminal
pip install requests fastapi          # 3. installer, uniquement pour ce projet
pip freeze > requirements.txt         # 4. noter les versions installées
deactivate                            # sortir de l'environnement
```

Sous Windows PowerShell, l'activation est `.venv\Scripts\Activate.ps1` (mais tu travailles dans WSL).

## Récupérer un projet existant

```bash
git clone …
cd projet
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt       # comme npm install
```

## `.gitignore`

```text
.venv/
__pycache__/
```

Comme `node_modules/`, l'environnement ne se commite **jamais** : il se recrée depuis `requirements.txt`.

## L'outil moderne : uv

**uv** fait tout ça en beaucoup plus rapide, avec un fichier `pyproject.toml` et un fichier de verrouillage (comme `package-lock.json`) :

```bash
uv init mon-projet
uv add fastapi              # installe et note la dépendance
uv run main.py              # lance dans l'environnement du projet
```

## Pièges

- **Installer sans environnement activé** : la bibliothèque part dans le Python du système.
- **Oublier d'activer** le `.venv` en rouvrant le terminal : « ModuleNotFoundError ».
- **Commiter `.venv/`.**
