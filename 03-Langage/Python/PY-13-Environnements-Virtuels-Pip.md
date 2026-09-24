---
created: 2026-09-14
modified: 2026-09-17
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Environnements Virtuels & pip"
tags:
  - backend/python/environnements
parent: "[[Python]]"
children: []
related_theory:
  - "[[PY-06-Modules-Packages|Modules et Packages Python]]"
related_snippets:
  - "[[04_Snippets/py-venv]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: https://docs.python.org/3/library/venv.html
---
	
# Environnements Virtuels & pip

> [!abstract] Introduction
> Un environnement virtuel est un espace isolé où on installe les librairies Python d'un projet précis, pour éviter que les projets se marchent dessus en réclamant des versions différentes d'une même librairie.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] C'est quoi une "librairie" ?
> > Une librairie est du code écrit par quelqu'un d'autre, qu'on peut réutiliser dans son propre projet (ex : `requests` pour faire des appels réseau, `pandas` pour manipuler des données).
>
> Si toutes les librairies Python étaient installées "globalement" sur l'ordinateur, deux projets différents pourraient entrer en conflit s'ils ont besoin de deux versions différentes de la même librairie. Un **environnement virtuel** crée un dossier isolé, propre à UN SEUL projet, avec ses propres versions de librairies.

> [!question]- Pourquoi l'utiliser ?
> Sans environnement virtuel, installer une librairie pour un projet peut casser un AUTRE projet qui utilisait une version différente de cette même librairie. L'isolation évite ce problème complètement.

> [!question]- Comment ça marche ?
> **Créer un environnement virtuel :**
> ```bash
> python -m venv mon_env
> ```
> > [!note] Ce que ça fait
> > Crée un dossier `mon_env/` contenant une copie isolée de Python et de ses outils, prête à recevoir des librairies spécifiques à ce projet uniquement.
>
> **Activer l'environnement (avant de l'utiliser) :**
> ```bash
> # Sur Mac/Linux
> source mon_env/bin/activate
>
> # Sur Windows
> mon_env\Scripts\activate
> ```
> > [!note] Que se passe-t-il quand on "active" ?
> > Le terminal utilise désormais le Python et les librairies DE CET environnement précis, et non plus ceux installés globalement sur la machine. Le nom de l'environnement apparaît généralement entre parenthèses dans le terminal, pour le rappeler.
>
> **Installer des librairies dans l'environnement actif :**
> ```bash
> pip install requests pandas
> ```
>
> **Sauvegarder la liste des librairies utilisées (pour les partager avec quelqu'un d'autre) :**
> ```bash
> pip freeze > requirements.txt
> ```
> > [!note] C'est quoi `requirements.txt` ?
> > Un fichier texte listant toutes les librairies (et leurs versions précises) utilisées par le projet — équivalent Python du `package.json` en JavaScript/TypeScript.
>
> **Recréer le même environnement ailleurs (autre machine, collègue) :**
> ```bash
> pip install -r requirements.txt
> ```
>
> **Désactiver l'environnement :**
> ```bash
> deactivate
> ```

> [!question]- Quand l'utiliser ?
> Systématiquement, pour CHAQUE projet Python — c'est une pratique standard, même pour un petit script, dès qu'une librairie externe est utilisée.

---

## Points clés

- Un environnement virtuel = un dossier isolé avec son propre Python et ses propres librairies
- Toujours l'activer avant d'installer quoi que ce soit ou de lancer le projet
- `requirements.txt` liste les librairies du projet, à partager avec l'équipe (équivalent `package.json`)
- Ne JAMAIS committer le dossier de l'environnement virtuel dans Git — seulement `requirements.txt`

---

## Paramètres / Configuration

| Commande | Description | Notes |
|-----------|-------------|-------|
| `python -m venv nom` | Crée un environnement virtuel | Génère un dossier `nom/` |
| `source nom/bin/activate` | Active l'environnement (Mac/Linux) | — |
| `nom\Scripts\activate` | Active l'environnement (Windows) | — |
| `pip install lib` | Installe une librairie dans l'environnement actif | — |
| `pip freeze > requirements.txt` | Sauvegarde la liste des librairies installées | — |
| `pip install -r requirements.txt` | Réinstalle toutes les librairies listées | Pour recréer l'environnement ailleurs |
| `deactivate` | Quitte l'environnement virtuel actif | — |

---

## Exemple minimal

```bash
# 1. Créer et activer l'environnement
python -m venv env
source env/bin/activate

# 2. Installer les librairies nécessaires
pip install requests

# 3. Sauvegarder pour partager avec l'équipe
pip freeze > requirements.txt

# 4. Plus tard, sur une autre machine :
python -m venv env
source env/bin/activate
pip install -r requirements.txt
```

> [!note] Ce que j'en retiens
> `requirements.txt` permet à n'importe qui (collègue, futur toi sur une autre machine) de recréer EXACTEMENT le même environnement, avec les mêmes versions de librairies — évite le fameux "ça marche sur ma machine, pas sur la tienne".

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[PY-06-Modules-Packages|Modules et Packages Python]], [[NODE-01-Node-npm|npm - node_modules et package.json]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-venv]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un environnement virtuel par projet ?

---

## Tâches

- [ ] #task Créer un environnement virtuel pour un premier projet Python et y installer une librairie
- [ ] #task Générer un `requirements.txt` et le recréer depuis zéro sur un nouvel environnement
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Quelle est la différence pratique entre `venv` (intégré à Python) et des outils comme `poetry` ou `pipenv` ?
