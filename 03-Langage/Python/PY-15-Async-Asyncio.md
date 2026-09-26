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
