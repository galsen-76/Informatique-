---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Image Docker]]"
tags:
  - exercice
---
# Exercice — Une image, c'est un empilement

> [!info] Avant de commencer
> **Notion travaillée :** [[Image Docker]]
> **À voir avant :** [[Docker]]
> **Objectif :** Comprendre qu'une image est un modèle en lecture seule fait de couches, et pourquoi l'ordre des couches change la vitesse des builds.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Tu télécharges `python:3.12-slim`, puis `python:3.12`. Prédis : le deuxième téléchargement va-t-il tout retélécharger ? Regarde les lignes affichées pendant le `pull`.
- [ ] Fait
### 2. 🧪 Vérifier
Fais les deux `pull` et compare. Puis affiche l'**historique** de l'image `python:3.12-slim` : à quoi correspond chaque ligne ?
- [ ] Fait
### 3. 🔮 Prédire
Un Dockerfile fait `COPY . .` **puis** `RUN pip install -r requirements.txt`. Tu changes une ligne de ton script et tu reconstruis. Prédis quelles étapes sont refaites.
- [ ] Fait
### 4. 🧩 Résoudre
Réordonne ce Dockerfile pour que modifier ton script ne réinstalle plus les dépendances. Explique pourquoi ça marche.
- [ ] Fait
### 5. 💬 Expliquer
Une image et un conteneur, c'est comme une classe et un objet, ou une recette et un plat. Choisis une image et explique-la.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Chaque instruction du Dockerfile crée une **couche**. Docker garde en cache les couches inchangées, mais dès qu'une couche change, **toutes celles du dessous** sont refaites.

> [!question]- Solution et raisonnement
> - Les couches communes (la base Debian) sont réutilisées : « Already exists ».
> - `docker history python:3.12-slim` : une ligne par couche, avec la commande qui l'a créée et sa taille.
> - `COPY . .` change dès qu'un fichier change → cette couche et **toutes les suivantes**, dont `pip install`, sont refaites.
> - Copier d'abord `requirements.txt`, faire `pip install`, **puis** `COPY . .` : modifier le script ne touche que la dernière couche.
> - Image = recette (figée, réutilisable) ; conteneur = un plat cuisiné à partir d'elle (on peut en faire plusieurs).

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
