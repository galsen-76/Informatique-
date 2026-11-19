---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Redirection et pipe]]"
tags:
  - exercice
---
# Exercice — Où va la sortie

> [!info] Avant de commencer
> **Notion travaillée :** [[Redirection et pipe]]
> **À voir avant :** [[Bash]]
> **Objectif :** Comprendre les trois flux d'un programme (entrée, sortie, erreurs) et où `>`, `>>`, `2>` et `|` les envoient.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Pour chaque ligne, prédis ce qui s'affiche à l'écran et ce que contient `out.txt` : `ls / > out.txt` · `ls /nexistepas > out.txt` · `ls /nexistepas 2> out.txt` · `ls / /nexistepas > out.txt 2>&1`
- [ ] Fait
### 2. 🧪 Vérifier
Teste les quatre, en affichant `out.txt` après chacune. Pourquoi la deuxième affiche quand même quelque chose à l'écran ?
- [ ] Fait
### 3. 🔮 Prédire
`echo un > f.txt`, puis `echo deux > f.txt`, puis `echo trois >> f.txt`. Que contient `f.txt` à la fin ?
- [ ] Fait
### 4. 🧩 Résoudre
Sans créer de fichier intermédiaire, compte combien de fichiers `.conf` se trouvent directement dans `/etc`.
- [ ] Fait
### 5. 💬 Expliquer
Quelle est la différence entre `cmd1 | cmd2` et `cmd1 && cmd2` ? Donne un exemple où remplacer l'un par l'autre change complètement le résultat.
- [ ] Fait
### 6. 🔧 Réparer
Un job de CI fait `pytest > rapport.txt` et le log du job est vide alors que des tests échouent. Où est passée l'information, et comment la garder **et** l'afficher ?
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Un programme a 3 flux : 0 l'entrée, 1 la sortie normale, 2 les erreurs. `>` ne déplace que le 1. `2>` déplace le 2. `|` branche la sortie de gauche sur l'entrée de droite.

> [!question]- Solution et raisonnement
> - `ls / > out.txt` : rien à l'écran, la liste dans le fichier. `ls /nexistepas > out.txt` : l'erreur s'affiche (flux 2), fichier vide. `2> out.txt` : rien à l'écran, l'erreur dans le fichier. `> out.txt 2>&1` : tout dans le fichier.
> - `f.txt` contient `deux` puis `trois` : le second `>` a écrasé `un`.
> - `ls /etc/*.conf | wc -l`.
> - `|` : les deux tournent ensemble, la sortie de gauche nourrit la droite. `&&` : la droite tourne après, seulement si la gauche a réussi, rien ne passe entre elles. `ls | wc -l` compte ; `ls && wc -l` lance `wc` qui attend du texte au clavier.
> - La sortie est partie dans le fichier, pas dans le log. Avec `pytest | tee rapport.txt`, elle va aux deux endroits.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
