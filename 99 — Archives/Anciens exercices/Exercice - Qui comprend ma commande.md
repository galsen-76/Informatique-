---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Shell]]"
tags:
  - exercice
---
# Exercice — Qui comprend ma commande

> [!info] Avant de commencer
> **Notion travaillée :** [[Shell]]
> **À voir avant :** [[Terminal]]
> **Objectif :** Savoir qu'une commande est d'abord lue par un shell, qui a son propre langage, et deviner ce qui va changer d'un shell à l'autre.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Pour chacune, dis si elle marchera **pareil** dans PowerShell et dans Bash, et pourquoi : `git --version` · `echo $HOME` · `ls -la` · `cd ..`
- [ ] Fait
### 2. 🧪 Vérifier
Teste les quatre dans les deux shells. Note celles où tu t'es trompé.
- [ ] Fait
### 3. 💬 Expliquer
Range-les en deux groupes : « le shell la comprend lui-même » et « le shell lance un programme à part ». Comment le savoir pour une commande que tu ne connais pas ?
- [ ] Fait
### 4. 🧩 Résoudre
Trouve, dans chaque shell, une commande qui te dit ce que cache un nom (alias, commande du shell ou programme). Utilise-la sur `ls` et sur `git`.
- [ ] Fait
### 5. 💬 Expliquer
Un tutoriel Docker écrit sous Linux contient `export TAG=1.0 && docker build -t app:$TAG .`. Quelle partie va poser problème dans PowerShell, et laquelle ne posera aucun problème ?
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Deux familles : ce qui fait partie du **langage du shell** (variables, `cd`, `echo`, alias, `&&`) change d'un shell à l'autre ; un **programme** comme `git` ou `docker` est le même partout.

> [!question]- Solution et raisonnement
> - `git --version` : pareil, c'est un programme.
> - `echo $HOME` : Bash affiche ton dossier ; PowerShell connaît `$HOME` aussi (par chance), mais la syntaxe des variables diffère en général (`$env:X`).
> - `ls -la` : différent, `ls` est un alias de `Get-ChildItem` dans PowerShell.
> - `cd ..` : pareil en apparence, mais c'est une commande intégrée à chaque shell.
> Pour savoir : `type ls` (Bash), `Get-Command ls` ou `Get-Alias ls` (PowerShell).
> Tutoriel : `export` et `$TAG` sont du **Bash** (en PowerShell : `$env:TAG = "1.0"` puis `$env:TAG`). `docker build` est un programme : identique.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
