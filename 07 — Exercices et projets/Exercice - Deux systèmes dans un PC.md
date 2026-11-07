---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[WSL]]"
tags:
  - exercice
---
# Exercice — Deux systèmes dans un PC

> [!info] Avant de commencer
> **Notion travaillée :** [[WSL]]
> **À voir avant :** [[Système d'exploitation et noyau]] · [[Shell]]
> **Objectif :** Comprendre que WSL est un vrai Linux séparé de Windows, avec ses fichiers et ses outils, relié par quelques ponts.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Tu as installé Git et Python **sous Windows**. Prédis ce que répond Ubuntu si tu lui demandes leur version. Puis l'inverse : un outil installé avec `apt` dans Ubuntu, existe-t-il dans PowerShell ?
- [ ] Fait
### 2. 🧪 Vérifier
Vérifie dans les deux sens.
- [ ] Fait
### 3. 🧩 Résoudre
Depuis Ubuntu, trouve où se trouve ton dossier `Documents` de Windows. Depuis l'Explorateur Windows, trouve ton dossier personnel Ubuntu.
- [ ] Fait
### 4. 🔮 Prédire
Tu copies un projet de quelques milliers de fichiers dans `/mnt/c/…` et une copie dans `~/projets`. Prédis où `git status` sera le plus rapide, et pourquoi.
- [ ] Fait
### 5. 🧪 Vérifier
Mesure-le en mettant le mot `time` devant la commande, dans les deux dossiers.
- [ ] Fait
### 6. 💬 Expliquer
Lance un petit serveur web dans Ubuntu et ouvre-le depuis ton navigateur Windows. Explique, avec ce que tu sais du réseau de WSL, pourquoi ça marche.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Deux systèmes, deux jeux d'outils, deux disques. Les ponts : `/mnt/c` (Windows vu depuis Linux), `\\wsl$` (Linux vu depuis Windows), et `localhost`. Le pont des fichiers est lent.

> [!question]- Solution et raisonnement
> - Ubuntu ne trouve pas Git ni Python de Windows : ce sont des programmes Windows, rangés ailleurs. Et inversement.
> - `/mnt/c/Users/<toi>/Documents` ; dans l'Explorateur : `\\wsl$\Ubuntu\home\<toi>`.
> - `~/projets` est nettement plus rapide : `/mnt/c` traverse le pont entre les deux systèmes à chaque fichier lu.
> - `python3 -m http.server 8000` puis `http://localhost:8000` : Windows relie son `localhost` au réseau virtuel de WSL.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
