---
type: error
tool: Python
date: 2026-11-12
concepts:
  - "[[Exception]]"
  - "[[pip]]"
tags:
  - erreur
---
# Erreur — NameError après un collage dans un .py

> [!bug] Message
> ```text
>   File "/opt/nuclio/main.py", line 10, in <module>
>     from sdk_cvat import extract_folio_data, get_annotations, get_result
>   File "/opt/nuclio/sdk_cvat.py", line 17, in <module>
>     python-dotenv
>     ^^^^^^
> NameError: name 'python' is not defined
> ```

## Contexte
En ajoutant `python-dotenv` aux dépendances, la ligne a été collée dans le mauvais fichier.

## Lecture
- **Dernière ligne** : `NameError`, Python ne connaît pas le mot `python`.
- **Ma ligne** : `sdk_cvat.py`, ligne 17, et la trace **montre la ligne** : `python-dotenv`.
- Python lit ça comme du code : `python` **moins** `dotenv`. Les `^^^^^^` pointent sur `python`, le premier mot inconnu.
- **Qui corriger** : mon code.

## Cause
Un nom de paquet (`python-dotenv`) collé dans un fichier `.py` au lieu de `requirements.txt`.

## Solution
1. Supprimer la ligne 17 de `sdk_cvat.py`.
2. Vérifier que `python-dotenv` est dans `requirements.txt`.

> [!tip] Prévenir
> `python -c "import main"` avant de déployer. Et relire `git diff` avant de pousser.

## Ce que j'ai appris
-

Méthode : [[Fiche - Lire un message d'erreur]]
