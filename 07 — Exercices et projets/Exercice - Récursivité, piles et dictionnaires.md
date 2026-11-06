---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Récursivité]]"
  - "[[Pile et file]]"
  - "[[Table de hachage]]"
tags:
  - exercice
---
# Exercice — Récursivité, piles et dictionnaires

> [!info] Objectif
> Résoudre des problèmes classiques avec la bonne structure, et appliquer la récursivité à des dossiers réels.
> Notions : [[Récursivité]] · [[Pile et file]] · [[Table de hachage]]

## Consignes
- [ ] Écris récursivement `somme(l)`, `inverser(s)` et `puissance(x, n)` ; pour chacune, nomme le cas de base
- [ ] Écris `compter_fichiers(dossier, extension)` récursive avec pathlib, et vérifie le résultat avec `find dossier -name "*.png" | wc -l`
- [ ] Écris `profondeur_max(objet)` qui donne la profondeur d'un JSON imbriqué (dictionnaires et listes)
- [ ] Écris `equilibre(texte)` avec une pile (parenthèses, crochets, accolades)
- [ ] Simule une file de jobs de CI avec `deque` : ajoute 5 jobs, traite-les dans l'ordre en affichant chacun
- [ ] Avec un dict ou un set, en O(n) : `deux_sommes(nombres, cible)`, `premier_non_repete(chaine)`, `grouper_anagrammes(mots)`
- [ ] Écris Fibonacci naïf récursif, mesure `fib(32)`, puis ajoute `@functools.cache` et compare

> [!question]- Indice
> Profondeur d'un JSON : si c'est un dict, 1 + le maximum des profondeurs de ses valeurs ; si c'est une liste, pareil avec ses éléments ; sinon 0. Attention au dictionnaire ou à la liste vides.

> [!question]- Solution
> ```python
> from pathlib import Path
> from collections import deque, Counter
> from functools import cache
>
> def somme(l): return 0 if not l else l[0] + somme(l[1:])
> def inverser(s): return s if len(s) <= 1 else inverser(s[1:]) + s[0]
> def puissance(x, n): return 1 if n == 0 else x * puissance(x, n - 1)
>
> def compter_fichiers(d: Path, ext: str) -> int:
>     n = 0
>     for p in d.iterdir():
>         if p.is_dir(): n += compter_fichiers(p, ext)
>         elif p.suffix.lower() == ext: n += 1
>     return n
>
> def profondeur_max(o):
>     if isinstance(o, dict): return 1 + max((profondeur_max(v) for v in o.values()), default=0)
>     if isinstance(o, list): return 1 + max((profondeur_max(v) for v in o), default=0)
>     return 0
>
> def equilibre(t):
>     paires, pile = {")": "(", "]": "[", "}": "{"}, []
>     for c in t:
>         if c in "([{": pile.append(c)
>         elif c in paires and (not pile or pile.pop() != paires[c]): return False
>     return not pile
>
> jobs = deque(["lint", "test", "build", "push", "deploy"])
> while jobs: print("traite", jobs.popleft())
>
> def deux_sommes(l, cible):
>     vus = {}
>     for i, n in enumerate(l):
>         if cible - n in vus: return vus[cible - n], i
>         vus[n] = i
> def premier_non_repete(s):
>     c = Counter(s)
>     return next((x for x in s if c[x] == 1), None)
> def grouper_anagrammes(mots):
>     g = {}
>     for m in mots: g.setdefault("".join(sorted(m)), []).append(m)
>     return list(g.values())
>
> def fib(n): return n if n < 2 else fib(n - 1) + fib(n - 2)      # exponentiel
> @cache
> def fib_rapide(n): return n if n < 2 else fib_rapide(n - 1) + fib_rapide(n - 2)   # linéaire
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
