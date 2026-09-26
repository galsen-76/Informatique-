---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: Optionnel
aliases:
  - "Gestion des Erreurs (Exceptions) Python"
tags:
  - backend/python/exceptions
parent: "[[Python]]"
related_theory:
  - "[[PY-04-Fonctions|Fonctions Python]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: https://docs.python.org/3/tutorial/errors.html
---

# Gestion des Erreurs (Exceptions) Python

> [!abstract] En bref
> C'est le `try / catch` de JavaScript, avec d'autres mots : `try / except`. En plus, on peut attraper **un type d'erreur précis** (`except KeyError`), ce qui évite de masquer les autres bugs. Et `raise` remplace `throw`.

## JavaScript → Python

| JavaScript | Python |
|---|---|
| `try { } catch (e) { }` | `try: … except Exception as e: …` |
| `finally` | `finally` |
| `throw new Error('…')` | `raise ValueError("…")` |
| `class NotFoundError extends Error` | `class NotFoundError(Exception)` |

## Attraper une erreur précise

```python
try:
    rating = int(user_input)          # peut échouer si ce n'est pas un nombre
except ValueError:
    print("Ce n'est pas un nombre")
except Exception as e:                # toute autre erreur
    print(f"Erreur inattendue : {e}")
else:
    print("Aucune erreur")            # seulement si tout s'est bien passé
finally:
    print("Toujours exécuté")
```

## Les erreurs courantes

| Erreur | Quand |
|---|---|
| `ValueError` | valeur invalide : `int("abc")` |
| `KeyError` | clé absente d'un dictionnaire |
| `IndexError` | index hors de la liste |
| `TypeError` | mauvais type : `"5" + 1` |
| `AttributeError` | attribut inexistant (souvent sur `None`) |
| `FileNotFoundError` | fichier introuvable |

## Lever ses propres erreurs

```python
class MovieNotFoundError(Exception):
    pass

def find_movie(movie_id):
    movie = movies.get(movie_id)
    if movie is None:
        raise MovieNotFoundError(f"Film {movie_id} introuvable")
    return movie
```

## Lire une erreur Python

La cause est **en bas** du message (*traceback*), contrairement à JavaScript :

```text
Traceback (most recent call last):
  File "main.py", line 12, in <module>
    find_movie(99)
  File "main.py", line 7, in find_movie
    raise MovieNotFoundError(...)
MovieNotFoundError: Film 99 introuvable      ← lire ici en premier
```

## Pièges

- **`except:` tout seul** ou `except Exception: pass` : l'erreur disparaît, le bug devient invisible.
- **Lire le traceback par le haut** : la vraie erreur est à la dernière ligne.
