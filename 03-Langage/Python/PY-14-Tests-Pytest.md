---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Tests Python (pytest)"
tags:
  - backend/python/tests
parent: "[[Python]]"
related_theory:
  - "[[PY-04-Fonctions|Fonctions Python]]"
  - "[[PY-07-Exceptions|Gestion des erreurs Python]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.pytest.org/"
---

# Tests Python (pytest)

> [!abstract] En bref
> **pytest** est le Vitest / Jest de Python (voir [[TEST-02-Tests-Unitaires-Vitest-Jest|Tests unitaires]]), en encore plus simple : un test est une fonction qui commence par `test_`, et on vérifie avec un simple **`assert`**. Pas de `expect(...).toBe(...)`.

## Un premier test

```python
# movies.py
def average(ratings):
    if not ratings:
        return 0
    return round(sum(ratings) / len(ratings), 1)
```

```python
# test_movies.py
from movies import average

def test_average():
    assert average([4, 5, 3]) == 4.0

def test_average_empty():
    assert average([]) == 0
```

```bash
pip install pytest
pytest                  # trouve tous les fichiers test_*.py et les lance
pytest -v               # affiche chaque test
pytest -k average       # seulement les tests dont le nom contient "average"
```

Quand un `assert` échoue, pytest affiche **les deux valeurs comparées** : pas besoin de message.

## Vitest → pytest

| Vitest / Jest | pytest |
|---|---|
| `it('...', () => {})` | `def test_...():` |
| `expect(a).toBe(b)` | `assert a == b` |
| `expect(fn).toThrow()` | `with pytest.raises(ValueError):` |
| `beforeEach` | une **fixture** |
| `it.each([...])` | `@pytest.mark.parametrize` |
| `vi.fn()`, `vi.mock()` | `unittest.mock`, `monkeypatch` |

## Vérifier une erreur

```python
import pytest

def test_invalid_rating():
    with pytest.raises(ValueError):
        add_rating(9)
```

## Plusieurs cas d'un coup

```python
@pytest.mark.parametrize("ratings, expected", [
    ([4, 5, 3], 4.0),
    ([5], 5.0),
    ([], 0),
])
def test_average(ratings, expected):
    assert average(ratings) == expected
```

## Les fixtures : préparer les données

```python
@pytest.fixture
def movies():
    return [{"title": "Dune", "rating": 4.5}, {"title": "Alien", "rating": 4.8}]

def test_best(movies):              # pytest passe la fixture en paramètre, par son nom
    assert best(movies)["title"] == "Alien"
```

## Pièges

- **Oublier le préfixe `test_`** (fichier ou fonction) : le test n'est pas trouvé, sans erreur.
- **Comparer des nombres à virgule avec `==`** : utilise `pytest.approx(0.3)` (voir [[TG-07-Encodage-Unicode-Nombres|Nombres]]).
