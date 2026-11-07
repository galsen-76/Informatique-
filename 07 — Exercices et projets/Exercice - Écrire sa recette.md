---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Dockerfile]]"
tags:
  - exercice
---
# Exercice — Écrire sa recette

> [!info] Avant de commencer
> **Notion travaillée :** [[Dockerfile]]
> **À voir avant :** [[Docker]]
> **Objectif :** Savoir lire et écrire un Dockerfile instruction par instruction, en comprenant ce que fait chacune.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 💬 Expliquer
Pour chaque instruction, dis à quel moment elle agit (pendant le **build** ou au **lancement**) : `FROM`, `WORKDIR`, `COPY`, `RUN`, `ENV`, `CMD`.
- [ ] Fait
### 2. 🧩 Résoudre
Écris un Dockerfile pour une image qui, lancée sans argument, affiche la date et le nom de la machine. Construis-la et lance-la.
- [ ] Fait
### 3. 🔮 Prédire
Tu lances cette image avec une commande à la fin (`docker run monimage echo salut`). Prédis ce qui s'affiche. Que s'est-il passé avec le `CMD` ?
- [ ] Fait
### 4. 🔧 Réparer
Ce Dockerfile ne marche pas : `RUN cd /app` puis `RUN ls` n'affiche pas le contenu de `/app`. Pourquoi ? Quelle instruction faut-il à la place ?
- [ ] Fait
### 5. 💬 Expliquer
Tu lances `docker build .` depuis ton dossier personnel, qui contient des gigaoctets. Le build est très lent avant même de commencer. Pourquoi, et quel fichier règle ça ?
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Tout sauf `CMD` et `ENTRYPOINT` s'exécute **pendant le build**. Chaque `RUN` tourne dans un shell neuf. Le dossier donné à `docker build` (le contexte) est envoyé entier au démon.

> [!question]- Solution et raisonnement
> - Build : `FROM`, `WORKDIR`, `COPY`, `RUN`, `ENV` (l'`ENV` reste aussi valable au lancement). Lancement : `CMD`.
> - Exemple :
> ```dockerfile
> FROM alpine:3.20
> CMD ["sh", "-c", "date; hostname"]
> ```
> `docker build -t monimage .` puis `docker run --rm monimage`.
> - `salut` : la commande donnée à `docker run` **remplace** le `CMD`.
> - Chaque `RUN` est un nouveau shell : le `cd` est oublié. Utiliser `WORKDIR /app`.
> - Tout le contexte est envoyé au démon. Un `.dockerignore` (ou un dossier de build dédié) exclut le superflu.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
