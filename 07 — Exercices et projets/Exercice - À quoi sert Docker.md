---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Docker]]"
tags:
  - exercice
---
# Exercice — À quoi sert Docker

> [!info] Avant de commencer
> **Notion travaillée :** [[Docker]]
> **À voir avant :** [[Système d'exploitation et noyau]]
> **Objectif :** Comprendre quel problème Docker résout : faire tourner un programme avec tout ce dont il a besoin, pareil partout.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 💬 Expliquer
Ton script marche sur ton PC mais pas sur celui d'un collègue : « il me manque Python 3.12 », « j'ai pas `zip` », « chez moi c'est Windows ». Liste ce qui diffère entre les deux machines.
- [ ] Fait
### 2. 🔮 Prédire
Tu lances `docker run --rm alpine echo bonjour` alors que tu n'as **jamais** téléchargé `alpine`. Prédis, étape par étape, ce que Docker va faire.
- [ ] Fait
### 3. 🧪 Vérifier
Lance-le, lis chaque ligne affichée et compare à ta prédiction. Relance-le une deuxième fois : qu'est-ce qui change, et pourquoi ?
- [ ] Fait
### 4. 🔮 Prédire
Tu lances `python --version` sur ta WSL, puis dans un conteneur `python:3.11-slim`, puis dans un `python:3.13-slim`. Trois résultats différents ou un seul ?
- [ ] Fait
### 5. 💬 Expliquer
Avec tes mots : en quoi Docker règle le problème de l'étape 1 ? Et qu'est-ce qu'il ne règle **pas** (pense au noyau) ?
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Docker emballe le programme **avec** ses outils (une distribution, Python, les bibliothèques). Ce paquet, l'image, se lance pareil sur toute machine qui a Docker et un noyau Linux.

> [!question]- Solution et raisonnement
> - Les différences : système, version de Python, outils installés, bibliothèques, variables, chemins.
> - Docker ne trouve pas `alpine` en local → il le **télécharge** depuis un registre → crée un conteneur → lance `echo bonjour` → le conteneur s'arrête (et `--rm` le supprime).
> - La deuxième fois, pas de téléchargement : l'image est déjà là.
> - Trois versions différentes : chaque image apporte **sa** version de Python, indépendamment de ta machine.
> - Docker fixe tout ce qui est **au-dessus** du noyau. Il ne change pas le noyau : un conteneur Linux a besoin d'un noyau Linux (WSL sous Windows).

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
