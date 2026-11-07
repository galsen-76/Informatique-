---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Registre Docker]]"
tags:
  - exercice
---
# Exercice — Où vivent les images

> [!info] Avant de commencer
> **Notion travaillée :** [[Registre Docker]]
> **À voir avant :** [[Image Docker]]
> **Objectif :** Comprendre ce qu'est un registre, comment se lit le nom complet d'une image, et ce qu'est un tag.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 💬 Expliquer
Découpe ces noms en registre, chemin, nom et tag : `python:3.12-slim` · `ghcr.io/cvat-ai/cvat-server:v2.20.0` · `nexus.entreprise.fr:8443/docker/outils:latest`. Pour le premier, quel registre est sous-entendu ?
- [ ] Fait
### 2. 🔮 Prédire
Tu donnes à une image locale un second nom (un nouveau tag). Prédis : est-ce une copie (deux fois la place) ou un autre nom pour la même chose ?
- [ ] Fait
### 3. 🧪 Vérifier
Fais-le et compare les identifiants (`IMAGE ID`) des deux lignes.
- [ ] Fait
### 4. 🔮 Prédire
Le tag `latest` veut-il dire « la version la plus récente » ? Prédis, puis vérifie en cherchant ce qu'en dit la documentation Docker.
- [ ] Fait
### 5. 💬 Expliquer
Pourquoi une équipe utilise-t-elle son propre registre (comme Nexus) au lieu de tout prendre sur Docker Hub ? Donne deux raisons.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Nom complet = `registre/chemin/nom:tag`. Sans registre, c'est Docker Hub. Un tag n'est qu'une **étiquette** posée sur une image, qu'on peut déplacer.

> [!question]- Solution et raisonnement
> - `python:3.12-slim` = `docker.io/library/python:3.12-slim` (Docker Hub). `ghcr.io` / `cvat-ai/cvat-server` / `v2.20.0`. `nexus.entreprise.fr:8443` / `docker/outils` / `latest`.
> - Même `IMAGE ID` : un tag est un **autre nom**, pas une copie.
> - Non : `latest` est juste le tag par défaut. Il pointe vers ce que le dernier `push` a étiqueté ainsi, pas forcément la version la plus récente. D'où l'intérêt de tags précis.
> - Raisons : limites de téléchargement de Docker Hub, accès Internet filtré, contrôle et sécurité des images, images internes privées.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
