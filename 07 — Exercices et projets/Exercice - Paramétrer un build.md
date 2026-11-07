---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Variable de build Docker (ARG)]]"
tags:
  - exercice
---
# Exercice — Paramétrer un build

> [!info] Avant de commencer
> **Notion travaillée :** [[Variable de build Docker (ARG)]]
> **À voir avant :** [[Dockerfile]]
> **Objectif :** Comprendre la différence entre une variable qui existe au build (`ARG`) et une variable qui existe au lancement (`ENV`).

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Un Dockerfile déclare `ARG VERSION=1.0` et un `RUN echo $VERSION`. Tu construis sans rien préciser, puis en donnant `2.0`. Prédis les deux affichages.
- [ ] Fait
### 2. 🧪 Vérifier
Fais-le (cherche l'option de `docker build` qui donne une valeur à un `ARG`).
- [ ] Fait
### 3. 🔮 Prédire
Tu lances un conteneur de cette image et tu affiches `$VERSION`. Prédis : vide ou pas ? Et si c'était un `ENV` ?
- [ ] Fait
### 4. 🧩 Résoudre
Fais en sorte que la version choisie au build soit lisible **dans le conteneur** au lancement.
- [ ] Fait
### 5. 💬 Expliquer
Pourquoi ne faut-il **jamais** passer un mot de passe par un `ARG` ? (Pense à ce que montre l'historique d'une image.)
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> `ARG` n'existe que **pendant le build**. `ENV` est inscrit dans l'image et existe au lancement. On peut recopier un `ARG` dans un `ENV`.

> [!question]- Solution et raisonnement
> - `1.0`, puis `2.0` avec `docker build --build-arg VERSION=2.0 .`.
> - Vide : l'`ARG` a disparu après le build. Avec `ENV`, la valeur serait là.
> - `ARG VERSION=1.0` puis `ENV VERSION=$VERSION`.
> - Les valeurs des `ARG` utilisés restent visibles dans `docker history` : n'importe qui ayant l'image peut les lire. On passe les secrets au lancement (variables, fichiers montés) ou avec les secrets de build.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
