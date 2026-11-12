---
type: error
tool: Python / Nuclio
date: 2026-11-12
concepts:
  - "[[Module et import Python]]"
  - "[[pip]]"
  - "[[Charger un fichier .env (python-dotenv)]]"
tags:
  - erreur
---
# Erreur — ModuleNotFoundError dans une fonction Nuclio

> [!bug] Message
> ```text
>   File "/opt/nuclio/main.py", line 7, in <module>
>     from config import CVAT_URL, PASSWORD, USERNAME
>   File "/opt/nuclio/config.py", line 3, in <module>
>     from dotenv import load_dotenv
> ModuleNotFoundError: No module named 'dotenv'
> ```

## Contexte
Redéploiement de la fonction `convert-graph` après avoir supprimé le venv. La fonction restait bloquée en `building`. Message trouvé dans `docker logs`.

## Lecture
- **Dernière ligne** : `ModuleNotFoundError`, le paquet `dotenv` est introuvable.
- **Ma ligne** : `config.py`, ligne 3 (`from dotenv import load_dotenv`).
- **Qui corriger** : pas le code, l'**environnement**. L'image Nuclio n'utilise jamais le venv du PC : elle installe seulement ce que liste `requirements.txt`.

## Cause
`python-dotenv` n'était pas dans `requirements.txt`, donc pas installé dans l'image.

## Solution
1. Ajouter `python-dotenv` dans `requirements.txt` (nom pip ≠ nom importé : on installe `python-dotenv`, on importe `dotenv`).
2. Ou rendre l'import facultatif dans `config.py` (`try: … except ImportError: pass`), car la fonction reçoit ses variables par `nuctl --env`.
3. Redéployer.

> [!tip] Prévenir
> Tester les imports avant de déployer : `python -c "import main"` dans un venv neuf installé **seulement** depuis `requirements.txt`.

## Ce que j'ai appris
-

Méthode : [[Fiche - Lire un message d'erreur]]
