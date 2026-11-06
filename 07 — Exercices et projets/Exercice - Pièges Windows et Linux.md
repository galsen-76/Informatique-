---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Fichiers entre Windows et Linux]]"
tags:
  - exercice
---
# Exercice — Pièges Windows et Linux

> [!info] Objectif
> Reproduire puis corriger les trois pièges classiques entre Windows et Linux.
> Notions : [[Fichiers entre Windows et Linux]]

## Consignes
- [ ] Dans un dépôt de test, crée `go.sh` sous Windows avec un éditeur réglé en CRLF, commite, et lance-le dans WSL
- [ ] Lis l'erreur, corrige les fins de ligne, ajoute un `.gitattributes` adapté
- [ ] Vérifie le droit d'exécution du script dans Git avec `git ls-files -s`, puis rends-le exécutable **dans Git**
- [ ] Crée `Outils.py`, importe-le en `import outils` sous Windows puis sous WSL : explique
- [ ] Renomme proprement le fichier avec Git

> [!question]- Indice
> Erreur attendue : `bad interpreter` ou `$'\r': command not found`. `git update-index --chmod=+x`. Pour renommer en changeant seulement la casse : `git mv`.

> [!question]- Solution
> ```bash
> sed -i 's/\r$//' go.sh                    # ou passer en LF dans VS Code
> echo '*.sh text eol=lf' > .gitattributes
> git ls-files -s go.sh                     # 100644 = non exécutable
> git update-index --chmod=+x go.sh
> git mv Outils.py outils.py
> git commit -m "fix: fins de ligne LF, droit d'exécution et casse"
> ```
> Windows ignore la casse (l'import marche), Linux non (`ModuleNotFoundError`).

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
