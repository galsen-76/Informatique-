---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Distribution Linux]]"
tags:
  - exercice
---
# Exercice — Moteur et carrosserie

> [!info] Avant de commencer
> **Notion travaillée :** [[Distribution Linux]]
> **À voir avant :** [[Système d'exploitation et noyau]]
> **Objectif :** Distinguer le noyau (partagé) de la distribution (les outils), et le vérifier avec des conteneurs.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Tu vas lancer deux conteneurs, un `alpine` et un `python:3.12-slim`, et ta WSL Ubuntu. Pour chacun, prédis : version du **noyau** identique ou différente ? Nom de la **distribution** identique ou différent ?
- [ ] Fait
### 2. 🧪 Vérifier
Affiche le noyau et la distribution dans les trois. Compare à ta prédiction.
- [ ] Fait
### 3. 💬 Expliquer
Pourquoi le noyau est le même partout alors que la distribution change ? Utilise l'image du moteur et de la voiture.
- [ ] Fait
### 4. 🔧 Réparer
Dans le conteneur `alpine`, essaie d'installer `curl` comme tu le ferais sur Ubuntu. Lis l'erreur, puis trouve comment faire sur Alpine.
- [ ] Fait
### 5. 💬 Expliquer
Un collègue dit : « mon image Docker contient Debian, donc elle contient un noyau Debian ». Corrige-le en deux phrases.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Une image contient les **outils** d'une distribution, jamais de noyau. Le conteneur emprunte celui de la machine. Et chaque distribution a son gestionnaire de paquets.

> [!question]- Solution et raisonnement
> - Noyau : **identique** dans les trois (`…microsoft-standard-WSL2`), car les conteneurs empruntent celui de WSL.
> - Distribution : **différente** (Ubuntu, Alpine, Debian), car ce sont les outils contenus dans chaque image.
> - Sur Alpine, `apt` n'existe pas : c'est `apk add curl`.
> - Correction : « l'image contient les **outils** de Debian, pas de noyau ; le conteneur utilise le noyau de la machine qui le fait tourner ».

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
