---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Application douze facteurs]]"
  - "[[Cache applicatif]]"
  - "[[Serverless et FaaS]]"
tags:
  - exercice
---
# Exercice — Rendre une application déployable et rapide

> [!info] Objectif
> Appliquer les douze facteurs et un cache à ton script de zip (ou à la fonction d'export).
> Notions : [[Application douze facteurs]] · [[Cache applicatif]] · [[Serverless et FaaS]]

## Consignes
- [ ] Liste ce qui est écrit « en dur » dans ton script (chemins, adresses, mots de passe) et remplace-le par des variables d'environnement avec `os.environ`
- [ ] Fais écrire les logs sur la sortie standard avec `logging` au lieu d'un fichier local
- [ ] Vérifie que le script peut tourner deux fois en même temps sans se marcher dessus (pas de fichier temporaire au nom fixe)
- [ ] Ajoute `functools.lru_cache` à une fonction lente et mesure le temps avant et après
- [ ] Explique pourquoi ce cache en mémoire ne serait pas partagé entre deux copies d'une fonction serverless, et ce qu'on utiliserait à la place

> [!question]- Indice
> `tempfile.TemporaryDirectory()` donne un dossier unique à chaque exécution.
> Pour mesurer : `time.perf_counter()` avant et après l'appel.

> [!question]- Solution
> ```python
> import os, sys, logging, tempfile, time
> from functools import lru_cache
>
> DOSSIER = os.environ.get("DOSSIER_SOURCE", "./fichiers")   # facteur 3
> logging.basicConfig(stream=sys.stdout, level=logging.INFO)  # facteur 11
>
> @lru_cache(maxsize=64)
> def lister(dossier: str) -> tuple[str, ...]:
>     time.sleep(1)                       # simule une opération lente
>     return tuple(sorted(os.listdir(dossier)))
>
> t = time.perf_counter(); lister(DOSSIER); print(time.perf_counter() - t)   # ~1 s
> t = time.perf_counter(); lister(DOSSIER); print(time.perf_counter() - t)   # ~0 s
>
> with tempfile.TemporaryDirectory() as tmp:    # facteur 6 : rien de fixe sur le disque
>     ...
> ```
> Chaque copie serverless a sa propre mémoire et peut être arrêtée à tout moment : le cache doit vivre dans un service partagé comme **Redis**.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
