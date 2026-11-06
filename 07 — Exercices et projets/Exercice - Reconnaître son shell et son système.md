---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Shell]]"
  - "[[PowerShell]]"
  - "[[Système d'exploitation et noyau]]"
tags:
  - exercice
---
# Exercice — Reconnaître son shell et son système

> [!info] Objectif
> Savoir à tout moment dans quel shell et quel système je travaille.
> Notions : [[Shell]] · [[PowerShell]] · [[Système d'exploitation et noyau]]

## Consignes
- [ ] Ouvre trois onglets dans Windows Terminal : PowerShell, cmd et Ubuntu
- [ ] Dans chacun, affiche le dossier courant et une variable d'environnement
- [ ] Dans PowerShell, lance `Get-Alias ls`, `Get-Alias rm` et `ls -la` : explique le résultat
- [ ] Dans Ubuntu, affiche le noyau et la distribution
- [ ] Prends trois commandes d'un tutoriel Docker ou Git et dis pour chacune si c'est un programme (identique partout) ou une commande du shell

> [!question]- Indice
> Noyau : `uname -a` ; distribution : `cat /etc/os-release`. Dans PowerShell, `ls` est un alias de `Get-ChildItem`, qui ne connaît pas `-la`.

> [!question]- Solution
> ```powershell
> Get-Location ; $env:USERNAME
> Get-Alias ls     # ls -> Get-ChildItem : « -la » n'est pas une option connue
> ```
> ```bat
> cd & echo %USERNAME%
> ```
> ```bash
> pwd ; echo $USER ; uname -a ; cat /etc/os-release
> ```
> `git`, `docker`, `python` sont des programmes ; `cd`, `ls`, `export` dépendent du shell.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
