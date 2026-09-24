---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Async en Python (asyncio)"
tags:
  - backend/python/async
parent: "[[Python]]"
children: []
related_theory:
  - "[[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]]"
related_snippets:
  - "[[04_Snippets/py-asyncio]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/library/asyncio.html"
---

# Async en Python (asyncio)

> [!abstract] Introduction
> `asyncio` est le système Python qui permet d'exécuter plusieurs tâches "en attente" (requêtes réseau, délais) en même temps, sans bloquer le programme, en utilisant les mots-clés `async` et `await`.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] Rappel : synchrone vs asynchrone
> > Synchrone = chaque instruction attend que la précédente soit terminée. Asynchrone = une instruction lancée n'empêche pas la suite du programme de continuer pendant qu'on attend son résultat (voir [[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]]).
>
> ```python
> import asyncio
>
> async def dire_bonjour():
>     print("Début")
>     await asyncio.sleep(1)  # attend 1 seconde SANS bloquer tout le programme
>     print("Fin")
>
> asyncio.run(dire_bonjour())
> ```
>
> > [!note] C'est quoi `async` et `await` ?
> > - `async def` : marque une fonction comme "asynchrone" — elle peut contenir des pauses sans bloquer le reste
> > - `await` : "attends que ceci se termine, mais laisse le reste du programme continuer entre-temps"

> [!question]- Pourquoi l'utiliser ?
> Si un programme doit faire 10 requêtes réseau, les faire une par une (façon synchrone) prendrait 10x le temps d'une seule requête. Avec `asyncio`, on peut lancer les 10 requêtes "en même temps" (en réalité, en alternant intelligemment pendant les temps d'attente), pour un résultat global beaucoup plus rapide.

> [!question]- Comment ça marche ?
> **Lancer plusieurs tâches asynchrones en parallèle :**
> ```python
> import asyncio
>
> async def telecharger(nom):
>     print(f"Début du téléchargement de {nom}")
>     await asyncio.sleep(2)  # simule un temps d'attente réseau
>     print(f"{nom} téléchargé")
>
> async def main():
>     await asyncio.gather(
>         telecharger("Film 1"),
>         telecharger("Film 2"),
>         telecharger("Film 3")
>     )
>
> asyncio.run(main())
> ```
> > [!note] C'est quoi `asyncio.gather` ?
> > `gather` lance plusieurs fonctions asynchrones EN MÊME TEMPS et attend qu'elles soient TOUTES terminées. Résultat : les 3 téléchargements de 2 secondes chacun prennent environ 2 secondes AU TOTAL (pas 6), car ils s'exécutent en parallèle pendant les temps d'attente.
>
> **Requête HTTP asynchrone (avec une librairie compatible, ex : `aiohttp`) :**
> ```python
> import aiohttp
> import asyncio
>
> async def recuperer_films():
>     async with aiohttp.ClientSession() as session:
>         async with session.get("https://api.example.com/films") as reponse:
>             return await reponse.json()
>
> asyncio.run(recuperer_films())
> ```
> > [!note] Attention
> > La librairie classique `requests` ne fonctionne PAS avec `asyncio` (elle est synchrone/bloquante par nature) — il faut utiliser une librairie compatible asynchrone comme `aiohttp`.

> [!question]- Quand l'utiliser ?
> - Faire plusieurs requêtes réseau simultanément (API, base de données) plutôt qu'une par une
> - Applications qui gèrent beaucoup de connexions en même temps (serveurs web comme FastAPI, qui est nativement asynchrone)
> - Pour du calcul pur (sans attente réseau/disque), `asyncio` n'apporte AUCUN gain — il faut d'autres outils (multiprocessing)

---

## Points clés

- `async def` déclare une fonction asynchrone (une "coroutine")
- `await` attend le résultat d'une opération asynchrone sans bloquer le reste du programme
- `asyncio.gather(...)` lance plusieurs tâches asynchrones en parallèle
- `asyncio.run(main())` est le point d'entrée qui démarre tout le système asynchrone
- `asyncio` n'accélère PAS les calculs purs (CPU) — seulement les opérations d'attente (réseau, fichiers, délais)

---

## Paramètres / Configuration

| Élément | Description | Notes |
|-----------|-------------|-------|
| `async def` | Déclare une fonction asynchrone | Aussi appelée "coroutine" |
| `await` | Attend le résultat sans bloquer le reste | Utilisable uniquement dans une fonction `async` |
| `asyncio.run(fn)` | Démarre l'exécution asynchrone | Point d'entrée du programme |
| `asyncio.gather(...)` | Exécute plusieurs coroutines en parallèle | Attend que toutes soient terminées |
| `asyncio.sleep(s)` | Pause asynchrone (n'occupe pas le CPU pendant l'attente) | Équivalent asynchrone de `time.sleep` |

---

## Exemple minimal

```python
import asyncio

async def recuperer_note(titre):
    await asyncio.sleep(1)  # simule un appel réseau
    return f"{titre}: 8.5/10"

async def main():
    resultats = await asyncio.gather(
        recuperer_note("Inception"),
        recuperer_note("Dunkirk")
    )
    print(resultats)

asyncio.run(main())
# ['Inception: 8.5/10', 'Dunkirk: 8.5/10']  -- après environ 1 seconde, pas 2
```

> [!note] Ce que j'en retiens
> Les deux appels à `recuperer_note` (chacun avec 1 seconde d'attente simulée) s'exécutent EN PARALLÈLE grâce à `asyncio.gather` — le résultat complet arrive après environ 1 seconde, pas 2, car l'attente est partagée plutôt qu'additionnée.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]], [[ANG-08-RxJS|Programmation Reactive RxJS]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-asyncio]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre concurrence (asyncio) et parallélisme (multiprocessing) ?

---

## Tâches

- [ ] #task Écrire un script qui télécharge plusieurs "ressources" simulées en parallèle avec `asyncio.gather`
- [ ] #task Comparer le temps d'exécution entre une version synchrone et asynchrone du même script
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Pourquoi `requests` (synchrone) ne fonctionne pas dans une fonction `async`, techniquement ?
