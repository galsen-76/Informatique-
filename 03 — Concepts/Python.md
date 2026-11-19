---
type: concept
domain: python
module: "[[Module 16 - Python]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Terminal]]"
  - "[[Système de fichiers]]"
parents: []
related:
  - "[[Variables et types en Python]]"
next_review: 
method: []
tags:
  - concept
  - python
---
# Python

> [!info] En une phrase
> Un langage de programmation lisible, très utilisé pour les scripts, l'automatisation, les données et l'IA.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

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
- Appeler des API ([[Appeler une API HTTP (requests)]]), traiter des données ([[Lire et écrire du CSV]])
- Fonctions Nuclio
- Le back-end de CVAT est écrit en Python (Django)

> [!warning] À ne pas confondre
> **Python 2** (abandonné en 2020) et **Python 3** : tout ce que tu apprends est Python 3. Et la **bibliothèque standard** (déjà incluse : `pathlib`, `zipfile`) et les **paquets externes** (à installer avec [[pip]] : `requests`, `pytest`).

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine la place de Python dans ton travail : scripts, API MesDépenses, fonction Nuclio, tests. Relie chaque usage aux bibliothèques qu'il utilise.

> [!example] 🛣️ Suis le trajet
> Dessine ce qui se passe entre `python main.py` et le résultat : l'interpréteur, la lecture du fichier, l'exécution ligne par ligne.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Python » et je l'intègre ici avec `![[Schéma - Python.excalidraw]]`._

### Appliquer dans le fil rouge
- [[Dépenses 01 - Lire les dépenses]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Terminal]] · [[Système de fichiers]]
- **Complémentaires** : [[Variables et types en Python]]
- **Utilisé par** : [[Fonction]] · [[Module et import Python]] · [[Environnement virtuel Python]]
- **Commandes** : [[python script.py]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
