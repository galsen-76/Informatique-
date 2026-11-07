---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Conteneur]]"
tags:
  - exercice
---
# Exercice — Vie et mort d'un conteneur

> [!info] Avant de commencer
> **Notion travaillée :** [[Conteneur]]
> **À voir avant :** [[Image Docker]]
> **Objectif :** Comprendre qu'un conteneur est une instance jetable d'une image : ce qu'on y change disparaît avec lui.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Tu entres dans un conteneur `alpine`, tu crées un fichier `/test.txt`, tu sors. Tu relances `docker run` avec la même image. Le fichier est-il là ?
- [ ] Fait
### 2. 🧪 Vérifier
Essaie. Puis trouve la liste de **tous** les conteneurs, même arrêtés : combien en vois-tu ?
- [ ] Fait
### 3. 🧩 Résoudre
Retrouve ton fichier `/test.txt` : il existe toujours quelque part. Trouve comment redémarrer **ce** conteneur précis et vérifier.
- [ ] Fait
### 4. 🔮 Prédire
Tu lances `docker run nginx` sans rien d'autre. Prédis : le terminal te rend-il la main ? Et `docker run alpine` ? Pourquoi la différence ?
- [ ] Fait
### 5. 💬 Expliquer
Qu'est-ce qui fait qu'un conteneur s'arrête ? Qu'est-ce que l'option qui supprime le conteneur à la fin t'évite ?
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> `docker run` crée **un nouveau** conteneur à chaque fois, à partir de l'image d'origine. Un conteneur vit tant que son programme principal tourne.

> [!question]- Solution et raisonnement
> - Non : le second `docker run` crée un conteneur **neuf** depuis l'image, qui n'a jamais eu ce fichier.
> - `docker ps -a` montre aussi les conteneurs arrêtés : un par `docker run`.
> - `docker start -ai <id>` relance l'ancien conteneur : le fichier y est encore.
> - `nginx` est un serveur, il ne se termine pas : le terminal reste bloqué. `alpine` lance `sh`, sans terminal interactif il se termine aussitôt.
> - Il s'arrête quand son processus principal se termine. `--rm` évite d'accumuler des conteneurs morts.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
