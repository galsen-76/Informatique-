---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Typage (Type Hints) Python"
tags:
  - backend/python/typage
parent: "[[Python]]"
children: []
related_theory:
  - "[[PY-01-Fondamentaux|Fondamentaux Python]]"
  - "[[TS-01-Fondamentaux|TypeScript - Fondamentaux]]"
related_snippets:
  - "[[04_Snippets/py-type-hints]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/library/typing.html"
---

# Typage (Type Hints) Python

> [!abstract] Introduction
> Les "type hints" sont des annotations optionnelles qui précisent le type attendu d'une variable, d'un paramètre ou d'un retour de fonction — Python ne les vérifie pas automatiquement à l'exécution, mais des outils externes le font.

---

## Théorie

> [!question]- C'est quoi ?
> ```python
> def additionner(a: int, b: int) -> int:
>     return a + b
> ```
>
> > [!note] Différence majeure avec TypeScript
> > En TypeScript, le compilateur BLOQUE le code si un type ne correspond pas. En Python, les type hints sont purement **indicatifs** : Python les ignore complètement à l'exécution ! Il faut un outil externe (comme `mypy`) pour vérifier réellement ces types avant l'exécution.

> [!question]- Pourquoi l'utiliser ?
> Sans indication de type, il faut lire tout le code d'une fonction pour deviner ce qu'elle attend en entrée et ce qu'elle retourne. Les type hints rendent cette information visible immédiatement, améliorent l'autocomplétion dans l'éditeur, et permettent une vérification automatique optionnelle avec des outils comme `mypy`.

> [!question]- Comment ça marche ?
> **Annoter des variables et fonctions :**
> ```python
> titre: str = "Inception"
> annee: int = 2010
>
> def creer_resume(titre: str, annee: int) -> str:
>     return f"{titre} ({annee})"
> ```
>
> **Types plus complexes (avec le module `typing`) :**
> ```python
> from typing import List, Dict, Optional
>
> def obtenir_titres(films: List[Dict[str, str]]) -> List[str]:
>     return [f["titre"] for f in films]
>
> def trouver_film(titre: str) -> Optional[Dict[str, str]]:
>     # peut retourner un dictionnaire OU None
>     ...
> ```
> > [!note] C'est quoi `Optional` ?
> > `Optional[X]` signifie "soit un `X`, soit `None`". Équivalent du `X | null` ou `X | undefined` en TypeScript.
>
> **Syntaxe moderne (Python 3.9+, sans `typing`) :**
> ```python
> def obtenir_titres(films: list[dict[str, str]]) -> list[str]:
>     return [f["titre"] for f in films]
> ```
> > [!note] Évolution
> > Depuis Python 3.9, on peut utiliser directement `list`, `dict` en minuscules comme types, sans avoir besoin d'importer `List`/`Dict` depuis `typing` — plus proche visuellement de TypeScript.
>
> **Vérifier les types avec `mypy` :**
> ```bash
> pip install mypy
> mypy mon_fichier.py
> ```
> > [!note] Ce que fait `mypy`
> > `mypy` lit tout le fichier et signale les incohérences de type, EXACTEMENT comme le ferait TypeScript — mais c'est une étape séparée, pas intégrée nativement à Python.

> [!question]- Quand l'utiliser ?
> - Sur tout projet de taille moyenne à grande, pour la lisibilité et l'autocomplétion
> - Combiné à `mypy` dans les projets d'entreprise sérieux, pour bénéficier d'une vérification proche de celle de TypeScript
> - Optionnel sur de petits scripts rapides

---

## Points clés

- Les type hints sont purement indicatifs — Python ne bloque JAMAIS l'exécution à cause d'un type incorrect, contrairement à TypeScript
- `mypy` est l'outil externe le plus utilisé pour vérifier réellement ces types
- `Optional[X]` = "X ou None", équivalent du `X | null` en TypeScript
- Depuis Python 3.9, on peut utiliser `list`, `dict` directement, sans passer par `typing.List`/`typing.Dict`

---

## Paramètres / Configuration

| Annotation | Description | Équivalent TypeScript |
|-----------|-------------|------------------------|
| `x: int` | Entier | `x: number` |
| `x: str` | Texte | `x: string` |
| `x: list[int]` | Liste d'entiers | `x: number[]` |
| `x: dict[str, int]` | Dictionnaire | `x: Record<string, number>` |
| `x: Optional[int]` | Entier ou `None` | `x: number \| null` |
| `-> ReturnType` | Type de retour de fonction | `: ReturnType` après les parenthèses |

---

## Exemple minimal

```python
from typing import Optional

def trouver_film(titre: str, films: list[dict[str, str]]) -> Optional[dict[str, str]]:
    for film in films:
        if film["titre"] == titre:
            return film
    return None

films = [{"titre": "Inception", "annee": "2010"}]
resultat = trouver_film("Inception", films)
print(resultat)  # {'titre': 'Inception', 'annee': '2010'}
```

> [!note] Ce que j'en retiens
> Le `-> Optional[dict[str, str]]` prévient immédiatement quiconque lit cette fonction que le résultat peut être `None` si aucun film n'est trouvé — il faudra donc vérifier cette possibilité avant d'utiliser le résultat, exactement comme avec un type `| null` en TypeScript.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[TS-01-Fondamentaux|TypeScript - Fondamentaux]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-type-hints]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Les type hints sont-ils vérifiés à l'exécution ?

---

## Tâches

- [ ] #task Ajouter des type hints à toutes les fonctions d'un script Python existant
- [ ] #task Installer `mypy` et corriger les erreurs de type détectées sur un projet
- [ ] #task Comparer explicitement chaque syntaxe Python avec son équivalent TypeScript déjà connu
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Pourquoi Python n'a-t-il jamais rendu le typage obligatoire et vérifié nativement, contrairement à TypeScript qui l'impose via son compilateur ?
