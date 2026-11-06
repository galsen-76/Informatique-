---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Complexité (notation grand O)]]"
  - "[[Recherche linéaire et dichotomique]]"
  - "[[Algorithmes de tri]]"
tags:
  - exercice
---
# Exercice — Mesurer, chercher et trier

> [!info] Objectif
> Voir de ses yeux la différence entre O(n), O(log n), O(n²) et O(n log n), et écrire ses propres recherche et tri.
> Notions : [[Complexité (notation grand O)]] · [[Recherche linéaire et dichotomique]] · [[Algorithmes de tri]]

## Consignes
- [ ] Écris `contient_doublon_lent` (deux boucles) et `contient_doublon_rapide` (un set) ; mesure avec `time.perf_counter()` pour n = 1 000, 5 000, 20 000 ; explique comment le temps évolue
- [ ] Écris la recherche dichotomique ; trace-la à la main pour une cible présente, absente, et une liste vide
- [ ] Compare le temps de `cible in liste`, de ta dichotomie et de `cible in ensemble` sur un million de nombres
- [ ] Écris le tri par insertion ; trace-le sur `[5, 2, 4, 1]` ; compare son temps avec `sorted` sur 10 000 nombres
- [ ] Trie une liste de fichiers (nom, taille, date) par taille décroissante, puis par extension puis par nom
- [ ] Donne la complexité de chacune de tes fonctions

> [!question]- Indice
> Pour mesurer : `t0 = time.perf_counter(); f(donnees); print(time.perf_counter() - t0)`. Génère les données avec `random.sample(range(10 * n), n)`.

> [!question]- Solution
> ```python
> import random, time
> def contient_doublon_lent(l):                       # O(n²)
>     return any(l[i] == l[j] for i in range(len(l)) for j in range(i + 1, len(l)))
> def contient_doublon_rapide(l):                     # O(n)
>     vus = set()
>     for x in l:
>         if x in vus: return True
>         vus.add(x)
>     return False
> for n in (1_000, 5_000, 20_000):
>     d = random.sample(range(10 * n), n)
>     for f in (contient_doublon_lent, contient_doublon_rapide):
>         t0 = time.perf_counter(); f(d); print(n, f.__name__, round(time.perf_counter() - t0, 4))
> # ×4 sur n → environ ×16 pour la version lente, ×4 pour la rapide
>
> def dicho(l, c):                                    # O(log n)
>     g, d = 0, len(l) - 1
>     while g <= d:
>         m = (g + d) // 2
>         if l[m] == c: return m
>         g, d = (m + 1, d) if l[m] < c else (g, m - 1)
>     return -1
>
> def tri_insertion(l):                               # O(n²)
>     l = l[:]
>     for i in range(1, len(l)):
>         x, j = l[i], i - 1
>         while j >= 0 and l[j] > x:
>             l[j + 1] = l[j]; j -= 1
>         l[j + 1] = x
>     return l
>
> fichiers = [("b.png", 300, "2026-11-01"), ("a.txt", 5, "2026-11-03"), ("c.png", 120, "2026-10-30")]
> par_taille = sorted(fichiers, key=lambda f: f[1], reverse=True)
> par_ext_nom = sorted(fichiers, key=lambda f: (f[0].rsplit(".", 1)[-1], f[0]))
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
