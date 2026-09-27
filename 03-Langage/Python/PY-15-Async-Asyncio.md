---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Async en Python (asyncio)"
tags:
  - backend/python/async
parent: "[[Python]]"
related_theory:
  - "[[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/library/asyncio.html"
---

# Async en Python (asyncio)

> [!abstract] En bref
> Python a aussi `async` / `await`, avec le même principe qu'en JavaScript (voir [[TG-04-Synchrone-vs-Asynchrone|Synchrone et asynchrone]]) : lancer des opérations lentes (réseau, base) sans bloquer. Grosse différence : en JavaScript, l'event loop tourne toute seule ; en Python, il faut la **démarrer** avec `asyncio.run()`. Utile surtout avec FastAPI ou pour faire beaucoup d'appels réseau.

## JavaScript → Python

| JavaScript | Python |
|---|---|
| `async function f()` | `async def f():` |
| `await promise` | `await coroutine` |
| `Promise.all([a, b])` | `await asyncio.gather(a, b)` |
| `setTimeout` / attente | `await asyncio.sleep(1)` |
| l'event loop est déjà là | `asyncio.run(main())` pour la lancer |
| `fetch` | la bibliothèque `httpx` (en mode async) |

## Exemple : plusieurs appels en même temps

```python
import asyncio
import httpx

async def fetch_movie(client, movie_id):
    response = await client.get(f"https://api.example.com/movies/{movie_id}")
    return response.json()

async def main():
    async with httpx.AsyncClient() as client:
        movies = await asyncio.gather(          # les 3 requêtes partent ensemble
            fetch_movie(client, 1),
            fetch_movie(client, 2),
            fetch_movie(client, 3),
        )
    print(movies)

asyncio.run(main())
```

Comme `Promise.all` : ~1 requête de temps au lieu de 3.

## Dans FastAPI

```python
@app.get("/movies/{movie_id}")
async def get_movie(movie_id: int):
    return await movies_repository.find(movie_id)
```

## Pièges

- **Appeler une fonction `async` sans `await`** : tu obtiens un objet « coroutine » au lieu du résultat (et un avertissement).
- **Utiliser une bibliothèque bloquante** (`requests`, `time.sleep`) dans du code async : tout se bloque. Prends les versions async (`httpx`, `asyncio.sleep`).
- **Croire que l'async accélère les calculs** : il n'aide que pour **attendre** (réseau, disque).

## Exercices

### Exercice 1 · Traduire du JavaScript

Traduis ce code en Python avec `asyncio` (on simule l'attente avec `asyncio.sleep`) :

```js
async function wait(ms, label) {
  await new Promise((r) => setTimeout(r, ms));
  return label;
}
const results = await Promise.all([wait(500, 'A'), wait(500, 'B')]);
console.log(results);
```

> [!success]- Solution
> ```python
> import asyncio
>
> async def wait(seconds, label):
>     await asyncio.sleep(seconds)
>     return label
>
> async def main():
>     results = await asyncio.gather(wait(0.5, "A"), wait(0.5, "B"))
>     print(results)   # ['A', 'B'] après ~0,5 s
>
> asyncio.run(main())
> ```

### Exercice 2 · Le bug de l'appel oublié

Qu'affiche ce code, et pourquoi ?

```python
async def get_title():
    return "Dune"

print(get_title())
```

> [!success]- Solution
> Il affiche `<coroutine object get_title at 0x...>` (et un avertissement), pas `"Dune"`.
>
> Appeler une fonction `async` ne l'exécute pas : il faut l'**attendre** avec `await` dans une autre fonction async, ou la lancer avec `asyncio.run(get_title())`.
