---
type: course
order: 4
module: "[[Module 16 - Python]]"
concepts:
  - "[[Environnement virtuel Python]]"
  - "[[pip]]"
  - "[[pytest]]"
  - "[[Pillow]]"
tags:
  - cours
---
# Cours - Installer des dépendances et tester

> [!abstract] Objectifs
> - Isoler les dépendances d'un projet dans un venv
> - Installer et figer des paquets avec pip et requirements.txt
> - Écrire et lancer des tests avec pytest
> - Utiliser une bibliothèque externe : Pillow

**Prérequis :** [[Cours - Fonctions, modules et erreurs]]

## 1. Bibliothèque standard ou paquet externe
`pathlib`, `zipfile`, `json` sont livrés avec Python. Pillow, requests ou pytest sont des **paquets externes** : il faut les installer avec [[pip]].

## 2. Schéma
```mermaid
flowchart TD
  V[venv] --> P[pip install]
  P --> R[requirements.txt]
  R --> T[pytest]
```

## 3. Un environnement par projet
On crée un [[Environnement virtuel Python]] dans le dossier du projet (`python -m venv .venv`), on l'active, puis on installe. Le dossier `.venv` va dans `.gitignore`.

## 4. Décrire ses dépendances
`requirements.txt` liste les paquets et leurs versions. Il est commité ; c'est lui que lira le [[Dockerfile]] (`RUN pip install -r requirements.txt`). En entreprise, pip passe par le [[Nexus]] ou un [[Proxy]].

## 5. Tester
[[pytest]] lance les fonctions `test_…` et vérifie les `assert`. Un bon test : un nom qui dit ce qu'il vérifie, une préparation, une action, une vérification.
```python
def test_zip_ne_contient_que_les_png(tmp_path):
    (tmp_path / "a.png").write_bytes(b"x")
    (tmp_path / "b.txt").write_text("x")
    # action : appeler ta fonction de zip
    # vérification : assert sur la liste des noms dans l'archive
```

## 6. Une bibliothèque externe : Pillow
[[Pillow]] crée et dessine des images. C'est la brique de la fonction « annotations → PNG » du projet CVAT.

## Mise en pratique
- Crée un projet `essai-zip/` avec un venv, installe pytest et Pillow, génère `requirements.txt`.
- Écris trois tests pour tes fonctions du cours précédent, dont un avec `tmp_path`.
- Avec Pillow, dessine un rectangle et un polygone et enregistre le PNG.

> [!warning] Erreurs fréquentes
> - Installer les paquets sans activer le venv : ils partent dans le Python de la machine
> - Commiter le dossier `.venv`
> - Oublier de mettre à jour `requirements.txt` après un `pip install` : l'image Docker n'aura pas le paquet
> - Croire qu'un test `skipped` est un test réussi

## Résumé
En 3 phrases, avec mes mots.

## Concepts du cours
[[Environnement virtuel Python]] · [[pip]] · [[pytest]] · [[Pillow]]
