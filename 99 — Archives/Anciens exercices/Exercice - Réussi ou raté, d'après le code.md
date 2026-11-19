---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Code de sortie]]"
tags:
  - exercice
---
# Exercice — Réussi ou raté, d'après le code

> [!info] Avant de commencer
> **Notion travaillée :** [[Code de sortie]]
> **À voir avant :** [[Terminal]]
> **Objectif :** Comprendre que chaque commande renvoie un nombre, et que c'est ce nombre, pas le texte affiché, qui décide de la suite.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Prédis le code de sortie de : une commande qui réussit · `ls` sur un dossier qui n'existe pas · un nom de commande inventé · `grep` qui ne trouve rien.
- [ ] Fait
### 2. 🧪 Vérifier
Vérifie les quatre. Lequel t'a surpris ?
- [ ] Fait
### 3. 🔮 Prédire
Prédis ce qu'affichent : `false && echo A` · `false || echo B` · `true && echo C || echo D`
- [ ] Fait
### 4. 🔧 Réparer
Un script affiche « ERREUR : fichier manquant » mais le job de CI passe au vert. Explique pourquoi, et ce qu'il faut changer dans le script.
- [ ] Fait
### 5. 💬 Expliquer
Pourquoi `grep` renvoie-t-il un code d'échec quand il ne trouve rien, alors qu'il n'y a pas vraiment d'erreur ? En quoi c'est utile dans un script ?
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> `0` = réussi, tout le reste = échec, et chaque programme choisit son nombre. Le shell le garde dans `$?`. `&&` et `||` décident en regardant ce nombre.

> [!question]- Solution et raisonnement
> - Réussite : `0`. `ls` dossier absent : `2`. Commande inventée : `127`. `grep` sans résultat : `1`.
> - `false && echo A` → rien. `false || echo B` → `B`. `true && echo C || echo D` → `C`.
> - Le texte « ERREUR » n'est que de l'affichage : le script se termine avec `0`. Il faut `exit 1` après le message (ou `set -e`).
> - Pour `grep`, `1` veut dire « pas trouvé », ce qui permet d'écrire `if grep -q motif fichier; then …` : on teste la présence sans lire la sortie.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
