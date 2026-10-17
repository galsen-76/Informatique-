---
type: notion
statut: a apprendre
resume: "pytest est le Vitest / Jest de Python (voir Tests unitaires), en encore plus simple : un test est une fonction qui commence par test_, et on vérifie avec un simple assert."
revu:
sources:
  - "https://docs.pytest.org/"
---
# Tests Python avec pytest

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : **pytest** est le Vitest / Jest de Python (voir [[02 Tests unitaires|Tests unitaires]]), en encore plus simple : un test est une fonction qui commence par `test_`, et on vérifie avec un simple **`assert`**.

## Le problème

**Pourquoi c'est utile ?**
Pour tester du code Python simplement, avec de simples fonctions et assert.

**Qu'est-ce qui se passait sans ça ?**
On testait à la main avec des print, ou avec unittest, plus verbeux.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Pas de `expect(...).toBe(...)`.

### Un premier test

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

### Vitest → pytest

| Vitest / Jest | pytest |
|---|---|
| `it('...', () => {})` | `def test_...():` |
| `expect(a).toBe(b)` | `assert a == b` |
| `expect(fn).toThrow()` | `with pytest.raises(ValueError):` |
| `beforeEach` | une **fixture** |
| `it.each([...])` | `@pytest.mark.parametrize` |
| `vi.fn()`, `vi.mock()` | `unittest.mock`, `monkeypatch` |

### Les fixtures : préparer les données

```python
@pytest.fixture
def movies():
    return [{"title": "Dune", "rating": 4.5}, {"title": "Alien", "rating": 4.8}]

def test_best(movies):              # pytest passe la fixture en paramètre, par son nom
    assert best(movies)["title"] == "Alien"
```

## 🧪 Exemple

### Plusieurs cas d'un coup

```python
@pytest.mark.parametrize("ratings, expected", [
    ([4, 5, 3], 4.0),
    ([5], 5.0),
    ([], 0),
])
def test_average(ratings, expected):
    assert average(ratings) == expected
```

## ⚠️ Limites et pièges

- **Oublier le préfixe `test_`** (fichier ou fonction) : le test n'est pas trouvé, sans erreur.
- **Comparer des nombres à virgule avec `==`** : utilise `pytest.approx(0.3)` (voir [[07 Encodage Unicode et nombres|Nombres]]).

## 🏋️ S'entraîner

### Vérifier une erreur

```python
import pytest

def test_invalid_rating():
    with pytest.raises(ValueError):
        add_rating(9)
```

### Exercices

#### Exercice 1 · Écrire des tests

Écris 2 tests pytest pour `average(ratings)` : un cas normal et une liste vide (qui doit renvoyer 0).

> [!success]- Solution
> ```python
> # test_ratings.py
> from ratings import average
>
> def test_average():
>     assert average([4, 5, 3]) == 4.0
>
> def test_average_empty():
>     assert average([]) == 0
> ```
>
> Lancer : `pytest -v`.

#### Exercice 2 · Tester une erreur et plusieurs cas

1. Teste que `check_rating(9)` lève une `ValueError`.
2. Teste `label(rating)` sur les cas `(5, "Excellent")`, `(3, "Correct")`, `(1, "À éviter")` en un seul test paramétré.

> [!success]- Solution
> ```python
> import pytest
>
> def test_invalid_rating():
>     with pytest.raises(ValueError):
>         check_rating(9)
>
> @pytest.mark.parametrize("rating, expected", [
>     (5, "Excellent"),
>     (3, "Correct"),
>     (1, "À éviter"),
> ])
> def test_label(rating, expected):
>     assert label(rating) == expected
> ```

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Python|Fondamentaux Python]]
- **Voir aussi :** [[04 Fonctions Python|Fonctions Python]], [[05 Exceptions Python|Exceptions Python]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.pytest.org/
