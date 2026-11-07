---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[PowerShell]]"
tags:
  - exercice
---
# Exercice — Penser comme PowerShell

> [!info] Avant de commencer
> **Notion travaillée :** [[PowerShell]]
> **À voir avant :** [[Shell]]
> **Objectif :** Comprendre la logique de PowerShell : des commandes au nom verbe-nom, qui renvoient des objets et pas du texte.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Les commandes PowerShell s'appellent toutes `Verbe-Nom`. Sans chercher, devine le nom de la commande qui : liste les processus · arrête un processus · lit le contenu d'un fichier · crée un fichier.
- [ ] Fait
### 2. 🧪 Vérifier
Vérifie tes quatre devinettes avec la commande qui liste les commandes disponibles (elle aussi suit la règle).
- [ ] Fait
### 3. 🔮 Prédire
`Get-ChildItem` affiche un tableau avec `Length` et `Name`. Prédis : peux-tu demander seulement les fichiers de plus de 1 Mo, **sans** découper le texte du tableau ?
- [ ] Fait
### 4. 🧩 Résoudre
Trouve comment afficher seulement le **nom** des fichiers d'un dossier, triés par **taille**. Tu peux utiliser `Get-Member` pour voir ce que contient chaque objet.
- [ ] Fait
### 5. 💬 Expliquer
En Bash, on ferait ça avec `ls -lS | awk …` en découpant du texte. Quelle est la différence de fond avec PowerShell ? Laquelle est la plus fragile, et pourquoi ?
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> PowerShell = verbes standard (`Get`, `Set`, `New`, `Remove`, `Stop`) + un nom. Et ce qui passe dans le `|` est un **objet** avec des propriétés, pas des lignes de texte.

> [!question]- Solution et raisonnement
> - `Get-Process`, `Stop-Process`, `Get-Content`, `New-Item` ; `Get-Command` liste les commandes (`Get-Command *-Process`).
> - Oui : `Get-ChildItem | Where-Object Length -gt 1MB`. On filtre sur une **propriété**, pas sur du texte.
> - `Get-ChildItem | Sort-Object Length | Select-Object Name`.
> - Bash fait passer du **texte** : si le format d'affichage change (colonnes, espaces dans un nom), le découpage casse. PowerShell fait passer des **objets** : plus robuste, mais plus verbeux et propre à Windows.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
