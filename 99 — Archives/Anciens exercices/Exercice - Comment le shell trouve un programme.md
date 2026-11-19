---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Variable PATH]]"
tags:
  - exercice
---
# Exercice — Comment le shell trouve un programme

> [!info] Avant de commencer
> **Notion travaillée :** [[Variable PATH]]
> **À voir avant :** [[Variable d'environnement]]
> **Objectif :** Comprendre où le shell cherche un programme quand tu tapes son nom, et pourquoi il faut parfois écrire un chemin.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Tu crées dans `~/outils` un petit script exécutable nommé `bonjour`. Tu es dans `~/outils` et tu tapes `bonjour`. Prédis la réponse, et pourquoi.
- [ ] Fait
### 2. 🧪 Vérifier
Crée-le (il affiche juste « Bonjour ») et essaie. Puis trouve **deux façons** différentes de le lancer depuis ce dossier.
- [ ] Fait
### 3. 🧩 Résoudre
Fais en sorte que `bonjour` marche depuis **n'importe quel dossier**, par son nom seul. Puis ouvre un nouveau terminal : marche-t-il encore ? Rends-le permanent.
- [ ] Fait
### 4. 🔮 Prédire
Tu crées maintenant un script `ls` dans `~/outils` et tu mets `~/outils` **en tête** du PATH. Que va faire `ls` ? Et si `~/outils` était **en fin** de PATH ?
- [ ] Fait
### 5. 💬 Expliquer
Pourquoi Linux ne met pas le dossier courant dans le PATH ? Relie ta réponse au point précédent.
- [ ] Fait
### 6. 🔧 Réparer
Un job de CI échoue avec `mon-outil: command not found` alors que l'outil marche sur ta machine. Donne deux causes possibles liées au PATH.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Le PATH est une **liste ordonnée de dossiers**. Un nom seul → le shell parcourt la liste et prend le premier trouvé. Un nom avec un `/` → pas de recherche.

> [!question]- Solution et raisonnement
> 1. `command not found` : `~/outils` n'est pas dans le PATH, et le dossier courant n'y est jamais.
> 2. `./bonjour` ou `~/outils/bonjour` (un chemin : pas de recherche).
> 3. `export PATH="$HOME/outils:$PATH"` ; perdu dans un nouveau terminal ; permanent en ajoutant la ligne à `~/.bashrc`.
> 4. En tête : **ton** `ls` est lancé à la place du vrai. En fin : le vrai `/usr/bin/ls` est trouvé avant.
> 5. Sécurité : un fichier piégé nommé `ls` dans un dossier se lancerait à ta place dès que tu y entres.
> 6. L'outil n'est pas installé dans l'image du job, ou il est installé dans un dossier que le PATH du job ne contient pas.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
