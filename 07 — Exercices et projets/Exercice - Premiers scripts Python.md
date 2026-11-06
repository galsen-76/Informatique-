---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Python]]"
  - "[[Variables et types en Python]]"
  - "[[Condition (if)]]"
  - "[[Boucle (for, while)]]"
tags:
  - exercice
---
# Exercice — Premiers scripts Python

> [!info] Objectif
> Écrire et lancer ses premiers scripts, sans copier-coller.
> Notions : [[Python]] · [[Variables et types en Python]] · [[Condition (if)]] · [[Boucle (for, while)]]

## Consignes
- [ ] Vérifie ta version de Python et ouvre le mode interactif ; calcule `7 * 6` puis quitte
- [ ] Écris `bonjour.py` qui affiche une phrase construite avec une f-string à partir de trois variables (texte, nombre, booléen)
- [ ] Affiche le type de chaque variable
- [ ] Écris `pair.py` qui affiche les nombres de 1 à 20 avec « pair » ou « impair »
- [ ] Écris `extension.py` qui affiche « image », « document » ou « autre » pour chaque nom d'une liste de fichiers
- [ ] Provoque `"2" + 2`, lis l'erreur et corrige-la de deux façons

> [!question]- Indice
> `range(1, 21)`, l'opérateur `%` (reste de la division), `nom.endswith((".png", ".jpg"))`, `int()` et `str()`.

> [!question]- Solution
> ```python
> for n in range(1, 21):
>     print(n, "pair" if n % 2 == 0 else "impair")
>
> for nom in ["a.png", "b.pdf", "c.mp3"]:
>     if nom.endswith((".png", ".jpg")):
>         print(nom, "image")
>     elif nom.endswith((".pdf", ".docx")):
>         print(nom, "document")
>     else:
>         print(nom, "autre")
>
> print(int("2") + 2, "2" + str(2))   # 4 22
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
