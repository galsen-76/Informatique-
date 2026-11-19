---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Script shell]]"
tags:
  - exercice
---
# Exercice — Un script qui sait dire non

> [!info] Avant de commencer
> **Notion travaillée :** [[Script shell]]
> **À voir avant :** [[Bash]] · [[Code de sortie]]
> **Objectif :** Écrire un petit script qui reçoit un argument, vérifie ce qu'on lui donne et signale l'échec correctement.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Un script `salut.sh` contient seulement : `echo "Salut $1"`. Prédis la sortie de `./salut.sh Oumar`, de `./salut.sh` (sans rien), et de `./salut.sh Oumar Sall`.
- [ ] Fait
### 2. 🧪 Vérifier
Crée-le et vérifie. Pourquoi « Sall » disparaît-il ? Comment faire pour l'avoir ?
- [ ] Fait
### 3. 🧩 Résoudre
Écris `compter.sh` : il reçoit un dossier, affiche combien de fichiers il contient, et s'il n'existe pas, affiche un message **sur la sortie d'erreur** et se termine en échec. Sans copier un exemple : pars du but.
- [ ] Fait
### 4. 🧪 Vérifier
Lance-le sur un dossier qui existe et sur un qui n'existe pas, et affiche à chaque fois le code de sortie. Est-ce bien `0` et autre chose que `0` ?
- [ ] Fait
### 5. 🔧 Réparer
Retire la ligne qui fait échouer le script. Que vaut maintenant le code de sortie quand le dossier n'existe pas ? Pourquoi c'est dangereux dans une CI ?
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> `$1`, `$2`… sont les arguments, `$#` leur nombre. On teste avec `[ -d … ]`, on écrit une erreur avec `>&2`, on échoue avec `exit 1`.

> [!question]- Solution et raisonnement
> - `Salut Oumar` · `Salut ` (vide) · `Salut Oumar` : « Sall » est dans `$2`. Avec `"$*"` ou `"$@"`, ou en appelant `./salut.sh "Oumar Sall"`.
> - Une solution :
> ```bash
> #!/usr/bin/env bash
> DOSSIER="$1"
> if [ ! -d "$DOSSIER" ]; then
>   echo "Dossier introuvable : $DOSSIER" >&2
>   exit 1
> fi
> ls "$DOSSIER" | wc -l
> ```
> - Sans `exit 1`, le code de sortie est celui de la **dernière commande**, souvent `0` : la CI croit que tout va bien alors que rien n'a été compté.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
