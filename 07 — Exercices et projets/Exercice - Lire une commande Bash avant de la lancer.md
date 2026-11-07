---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Bash]]"
tags:
  - exercice
---
# Exercice — Lire une commande Bash avant de la lancer

> [!info] Avant de commencer
> **Notion travaillée :** [[Bash]]
> **À voir avant :** [[Shell]]
> **Objectif :** Savoir décomposer une ligne Bash (programme, options, arguments, caractères spéciaux) avant de l'exécuter.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 💬 Expliquer
Pour `ls -l --sort=size ~/projets`, identifie : le programme, les options courtes, les options longues, l'argument. À quoi reconnais-tu chaque partie ?
- [ ] Fait
### 2. 🔮 Prédire
Dans un dossier qui contient `a.png`, `b.png` et `notes.txt`, prédis ce que Bash transmet réellement à `echo` dans : `echo *.png` · `echo "*.png"` · `echo ~` · `echo '$HOME'` · `echo "$HOME"`
- [ ] Fait
### 3. 🧪 Vérifier
Teste les cinq. Qui remplace `*` par les noms de fichiers : `echo` ou Bash ?
- [ ] Fait
### 4. 🔧 Réparer
Tu as un dossier `mes photos` (avec un espace). `cd mes photos` échoue. Explique ce que Bash a compris, puis trouve deux façons de corriger.
- [ ] Fait
### 5. 🧩 Résoudre
Retrouve la dernière commande `git` que tu as tapée **sans** remonter avec les flèches une par une.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Avant de lancer le programme, Bash **transforme** la ligne : il coupe aux espaces, remplace `*`, `~` et `$VARIABLE`. Les guillemets doubles bloquent le découpage et `*`, les simples bloquent tout.

> [!question]- Solution et raisonnement
> - `ls` = programme, `-l` = option courte, `--sort=size` = option longue, `~/projets` = argument.
> - `echo *.png` → `a.png b.png` (Bash remplace avant). `"*.png"` → `*.png`. `~` → `/home/oumar`. `'$HOME'` → `$HOME` tel quel. `"$HOME"` → `/home/oumar`.
> - C'est **Bash** qui remplace : `echo` reçoit déjà la liste.
> - `cd mes photos` : Bash coupe à l'espace et donne **deux** arguments à `cd`. Corrections : `cd "mes photos"` ou `cd mes\ photos` (ou Tab pour compléter).
> - `Ctrl+R` puis tape `git` : recherche dans l'historique (ou `history | grep git`).

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
