---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Docker Compose]]"
tags:
  - exercice
---
# Exercice — Plusieurs conteneurs, un seul fichier

> [!info] Avant de commencer
> **Notion travaillée :** [[Docker Compose]]
> **À voir avant :** [[Conteneur]] · [[YAML]]
> **Objectif :** Comprendre ce que Compose apporte : décrire plusieurs conteneurs, leurs ports, volumes et liens dans un fichier, et les lancer ensemble.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 💬 Expliquer
Tu lances aujourd'hui un serveur web et une base de données avec deux longues commandes `docker run`. Quels problèmes ça pose au quotidien, ou pour un collègue qui reprend le projet ?
- [ ] Fait
### 2. 🧩 Résoudre
Écris un `compose.yaml` avec un service web (`nginx`) accessible depuis ton navigateur et un service `redis`. Lance l'ensemble, ouvre le site, puis arrête tout.
- [ ] Fait
### 3. 🔮 Prédire
Depuis le conteneur web, tu essaies de joindre l'autre service par son **nom de service**, sans adresse IP. Prédis : ça marche ?
- [ ] Fait
### 4. 🧪 Vérifier
Vérifie en entrant dans le conteneur web et en tentant de joindre l'autre par son nom.
- [ ] Fait
### 5. 🔮 Prédire
Tu arrêtes et supprimes tout avec la commande d'arrêt de Compose, puis tu relances. Les données de Redis sont-elles encore là ? Et si tu avais déclaré un volume nommé ?
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Compose = un fichier YAML qui remplace tes `docker run`. Chaque service peut joindre les autres **par leur nom**, sur un réseau créé pour le projet. `down` supprime les conteneurs, pas les volumes nommés.

> [!question]- Solution et raisonnement
> - Commandes longues, faciles à oublier ou à mal retaper, lancement dans le bon ordre, rien de partageable : Compose met tout dans un fichier versionné.
> - Exemple :
> ```yaml
> services:
>   web:
>     image: nginx
>     ports: ["8080:80"]
>   cache:
>     image: redis
> ```
> `docker compose up -d`, `http://localhost:8080`, `docker compose down`.
> - Oui : Compose crée un réseau où `cache` est un nom résolu automatiquement.
> - Sans volume : données perdues après `down`. Avec un volume nommé : elles restent (sauf `down -v`).

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
