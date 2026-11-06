---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Algorithme]]"
  - "[[Décomposer un problème]]"
  - "[[Pseudo-code et trace d'exécution]]"
  - "[[Motifs de boucle]]"
tags:
  - exercice
---
# Exercice — Résoudre des problèmes pas à pas

> [!info] Objectif
> S'entraîner à la méthode complète sur des petits problèmes : comprendre, exemples, pseudo-code, trace, code, tests.
> Notions : [[Algorithme]] · [[Décomposer un problème]] · [[Pseudo-code et trace d'exécution]] · [[Motifs de boucle]]

## Consignes
- [ ] Pour **chaque** problème ci-dessous : écris entrées, sortie et trois exemples dont un cas limite ; écris le pseudo-code ; fais la trace sur un exemple ; puis code en Python avec des `assert`
- [ ] Problème 1 : renvoyer le deuxième plus grand nombre d'une liste (sans trier)
- [ ] Problème 2 : compter les mots d'une phrase et renvoyer le plus fréquent
- [ ] Problème 3 : dire si une chaîne est un palindrome en ignorant espaces et majuscules (« Esope reste ici et se repose »)
- [ ] Problème 4 : à partir d'une liste de noms de fichiers, renvoyer un dictionnaire extension → nombre
- [ ] Problème 5 : renvoyer les nombres de 1 à n, mais « Zip » pour les multiples de 3, « Tar » pour ceux de 5, « ZipTar » pour les deux
- [ ] Pour chaque problème, note le motif de boucle utilisé

> [!question]- Indice
> Problème 1 : deux variables, `premier` et `second`. Que faire quand un nombre est plus grand que `premier` ? Entre les deux ? Et si la liste contient des doublons, ou moins de deux valeurs différentes ?

> [!question]- Solution
> ```python
> def deuxieme_plus_grand(l):
>     premier = second = None
>     for x in l:
>         if premier is None or x > premier:
>             premier, second = x, premier
>         elif x != premier and (second is None or x > second):
>             second = x
>     return second
> assert deuxieme_plus_grand([3, 8, 5, 8]) == 5
> assert deuxieme_plus_grand([4]) is None
>
> def mot_frequent(phrase):
>     compte = {}
>     for m in phrase.lower().split():
>         compte[m] = compte.get(m, 0) + 1
>     return max(compte, key=compte.get) if compte else None
> assert mot_frequent("le zip et le tar") == "le"
>
> def palindrome(s):
>     t = "".join(c for c in s.lower() if c.isalnum())
>     i, j = 0, len(t) - 1
>     while i < j:
>         if t[i] != t[j]:
>             return False
>         i, j = i + 1, j - 1
>     return True
> assert palindrome("Esope reste ici et se repose")
>
> def par_extension(noms):
>     res = {}
>     for n in noms:
>         ext = n.rsplit(".", 1)[-1].lower() if "." in n else ""
>         res[ext] = res.get(ext, 0) + 1
>     return res
> assert par_extension(["a.PNG", "b.png", "c.txt", "Makefile"]) == {"png": 2, "txt": 1, "": 1}
>
> def zip_tar(n):
>     res = []
>     for i in range(1, n + 1):
>         mot = ("Zip" if i % 3 == 0 else "") + ("Tar" if i % 5 == 0 else "")
>         res.append(mot or str(i))
>     return res
> assert zip_tar(15)[-1] == "ZipTar"
> ```
> Motifs : meilleur (1), regrouper puis meilleur (2), deux indices (3), regrouper (4), transformer (5).

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
