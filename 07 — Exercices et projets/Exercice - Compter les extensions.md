---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Liste et dictionnaire]]"
  - "[[Fonction]]"
  - "[[Module et import Python]]"
tags:
  - exercice
---
# Exercice — Compter les extensions

> [!info] Objectif
> Ranger des données dans une liste et un dictionnaire, et découper le code en fonctions importables.
> Notions : [[Liste et dictionnaire]] · [[Fonction]] · [[Module et import Python]]

## Consignes
- [ ] Écris une fonction `extension(nom)` qui renvoie l'extension en minuscules
- [ ] Écris une fonction `compter(noms)` qui renvoie un dictionnaire `{extension: nombre}`
- [ ] Écris une fonction `afficher(compte)` qui affiche le résultat trié du plus fréquent au moins fréquent
- [ ] Déplace `extension` et `compter` dans `outils.py`, et importe-les depuis `main.py`
- [ ] Protège le lancement de `main.py` avec `if __name__ == "__main__":` et explique à quoi ça sert

> [!question]- Indice
> `nom.rsplit(".", 1)[-1].lower()`, `compte.get(ext, 0) + 1`, `sorted(compte.items(), key=lambda x: x[1], reverse=True)`.

> [!question]- Solution
> ```python
> # outils.py
> def extension(nom: str) -> str:
>     return nom.rsplit(".", 1)[-1].lower()
>
> def compter(noms: list[str]) -> dict[str, int]:
>     compte = {}
>     for nom in noms:
>         ext = extension(nom)
>         compte[ext] = compte.get(ext, 0) + 1
>     return compte
> ```
> ```python
> # main.py
> from outils import compter
>
> def afficher(compte):
>     for ext, nb in sorted(compte.items(), key=lambda x: x[1], reverse=True):
>         print(f"{ext} : {nb}")
>
> if __name__ == "__main__":
>     afficher(compter(["a.PNG", "b.png", "c.txt"]))
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
