---
type: concept
module: "[[Module 16 - Python]]"
related:
  - "[[Variables et types]]"
tags:
  - concept
  - python
---
# Python

> [!info] En une phrase
> Un langage de programmation lisible, très utilisé pour les scripts, l'automatisation, les données et l'IA.

## 1 · Comprendre
### Définition
**Python** est à la fois un **langage** (la façon d'écrire le code) et un **interpréteur** (le programme `python` qui lit ton fichier `.py` et l'exécute ligne par ligne, sans étape de compilation).

### Pourquoi ça existe
Écrire vite des programmes lisibles. Sa grande **bibliothèque standard** (fichiers, zip, réseau, dates…) évite d'installer quoi que ce soit pour les tâches courantes.

### Le problème résolu
Automatiser des tâches répétitives (trier, copier, zipper des fichiers, appeler une API) qu'on faisait à la main ou avec des scripts shell difficiles à lire.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  F[script.py] --> I[Interpréteur]
  I --> R[Résultat]
```
- **Deux façons de lancer** : `python script.py` (un fichier) ou `python` seul (le mode interactif, `>>>`, pour tester une ligne ; `exit()` pour sortir).
- **L'indentation compte** : 4 espaces délimitent un bloc (après `if`, `for`, `def`). Pas d'accolades comme en JavaScript.
- Sous Windows la commande est parfois `py` ; sous Linux et dans Docker, `python3` ou `python`.

### Exemple concret
```python
# bonjour.py
nom = "Oumar"
print(f"Bonjour {nom} !")
```
```bash
python bonjour.py
# Bonjour Oumar !
```

### Cas d'utilisation
- Scripts d'automatisation (ton script de zip)
- Appeler des API ([[Appeler une API HTTP]]), traiter des données ([[Lire et écrire du CSV]])
- Fonctions serverless (une fonction appelée par une plateforme)
- Des back-ends web (Django, FastAPI)

> [!warning] À ne pas confondre
> **Python 2** (abandonné en 2020) et **Python 3** : tout ce que tu apprends est Python 3. Et la **bibliothèque standard** (déjà incluse : `pathlib`, `zipfile`) et les **paquets externes** (à installer avec [[Gestionnaire de paquets]] : `requests`, `pytest`).

## 3 · Relier
- **Prérequis** : [[Terminal]] · [[Système de fichiers]]
- **Complémentaires** : [[Variables et types]]
- **Utilisé par** : [[Fonction]] · [[Module et import]] · [[Environnement virtuel Python]]
- **Commandes** : [[python script.py]]
