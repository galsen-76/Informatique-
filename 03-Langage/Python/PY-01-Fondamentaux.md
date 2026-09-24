---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: Optionnel
aliases:
  - "Fondamentaux Python"
tags:
  - backend/python/fondamentaux
parent: "[[Python]]"
children:
  - "[[PY-02-Structures-de-donnees|Structures de donnees]]"
  - "[[PY-03-Structures-de-controle|Structures de controle]]"
related_theory:
  - "[[TS-01-Fondamentaux|TypeScript - Fondamentaux]]"
related_snippets:
  - "[[04_Snippets/py-fondamentaux]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/"
---

# Fondamentaux Python

> [!abstract] Introduction
> Python est un langage de programmation où le code se lit presque comme de l'anglais simple, sans typage obligatoire, où l'indentation (les espaces en début de ligne) remplace les accolades `{ }` pour délimiter les blocs de code.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] C'est quoi un "langage interprété" ?
> > Un langage interprété est exécuté ligne par ligne directement par un programme (l'interpréteur Python), sans étape de compilation préalable comme TypeScript. On écrit le code, on l'exécute directement.
>
> ```python
> titre = "Inception"
> annee = 2010
> est_favori = True
> ```
>
> > [!note] Pas de `: string` comme en TypeScript ?
> > Par défaut non — Python est "typé dynamiquement" : une variable peut changer de type librement (`titre = "texte"` puis `titre = 5` fonctionne sans erreur). Il existe des "type hints" optionnels pour ajouter des indications de type, vus dans une note dédiée.

> [!question]- Pourquoi l'utiliser ?
> Python a été conçu pour être lisible et rapide à écrire, avec une syntaxe minimaliste. C'est pour ça qu'il est très utilisé en apprentissage, en data science, en scripts d'automatisation, et de plus en plus en backend web (avec des frameworks comme Django ou FastAPI).

> [!question]- Comment ça marche ?
> > [!note] C'est quoi l'indentation en Python ?
> > En JavaScript/TypeScript, un bloc de code est délimité par des accolades `{ }`. En Python, il n'y a PAS d'accolades : c'est l'espacement (indentation) en début de ligne qui indique "ce code appartient à ce bloc".
>
> ```python
> if annee > 2000:
>     print("Film récent")   # indenté = appartient au if
> else:
>     print("Film ancien")
> ```
> > [!note] Attention
> > Une erreur d'indentation en Python (mélanger espaces et tabulations, ou mal aligner) provoque une vraie erreur d'exécution — ce n'est pas juste une question de style comme en JavaScript.
>
> Python utilise aussi des **commentaires** avec `#` (pas `//`) :
> ```python
> # Ceci est un commentaire
> ```

> [!question]- Quand l'utiliser ?
> Python est pertinent pour : scripts d'automatisation, data science / IA, backend web, tests, ou tout projet où la rapidité d'écriture et la lisibilité priment sur la performance brute.

---

## Points clés

- Pas d'accolades : l'indentation définit les blocs de code (4 espaces = convention standard)
- Typage dynamique par défaut : une variable peut changer de type
- Commentaires avec `#`, pas `//`
- Pas de point-virgule obligatoire en fin de ligne (contrairement à JS/TS)
- Types de base : `str` (texte), `int` (entier), `float` (décimal), `bool` (vrai/faux)

---

## Paramètres / Configuration

| Type | Description | Exemple |
|-----------|-------------|---------|
| `str` | Texte | `"Inception"` |
| `int` | Nombre entier | `2010` |
| `float` | Nombre décimal | `3.14` |
| `bool` | Vrai ou faux | `True`, `False` |
| `None` | Absence de valeur | Équivalent de `null`/`undefined` |

---

## Exemple minimal

```python
titre = "Inception"
annee = 2010

if annee > 2000:
    print(f"{titre} est un film récent")
else:
    print(f"{titre} est un film ancien")
```

> [!note] Ce que j'en retiens
> `f"{titre} est..."` est une "f-string" : le `f` avant les guillemets permet d'insérer directement des variables dans le texte avec `{ }` — équivalent des templates littéraux JavaScript (`` `${titre}` ``).

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → [[PY-02-Structures-de-donnees|Structures de donnees]], [[PY-03-Structures-de-controle|Structures de controle]]
- À comparer avec → [[TS-01-Fondamentaux|TypeScript - Fondamentaux]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-fondamentaux]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi l'indentation est-elle obligatoire en Python ?

---

## Tâches

- [ ] #task Écrire un premier script Python simple et volontairement casser l'indentation pour voir l'erreur
- [ ] #task Comparer les types de base Python avec leurs équivalents TypeScript
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Pourquoi Python a-t-il choisi l'indentation plutôt que des accolades, historiquement ?
