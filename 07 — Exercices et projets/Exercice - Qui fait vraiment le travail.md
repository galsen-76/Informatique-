---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Démon Docker]]"
tags:
  - exercice
---
# Exercice — Qui fait vraiment le travail

> [!info] Avant de commencer
> **Notion travaillée :** [[Démon Docker]]
> **À voir avant :** [[Docker]]
> **Objectif :** Comprendre que la commande `docker` n'est qu'un client qui envoie des ordres à un programme en arrière-plan, le démon.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Tu quittes Docker Desktop (ou tu arrêtes le moteur) puis tu tapes `docker ps`. Prédis le message.
- [ ] Fait
### 2. 🧪 Vérifier
Essaie, lis le message : de quoi parle-t-il ? Relance Docker Desktop et réessaie.
- [ ] Fait
### 3. 🧩 Résoudre
Trouve la commande qui affiche à la fois la version du **client** et celle du **serveur**. Pourquoi y a-t-il deux parties ?
- [ ] Fait
### 4. 🔮 Prédire
Tu lances un conteneur depuis PowerShell, puis tu tapes `docker ps` dans Ubuntu. Le vois-tu ? Pourquoi ?
- [ ] Fait
### 5. 💬 Expliquer
Dessine (papier ou Mermaid) le chemin d'un `docker run` : qui le tape, qui le reçoit, qui crée le conteneur, qui fournit le noyau.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> `docker` est une télécommande. Le démon (`dockerd`) est la machine qu'elle pilote : c'est lui qui télécharge, construit et lance. Sans démon, la télécommande ne sert à rien.

> [!question]- Solution et raisonnement
> - `Cannot connect to the Docker daemon … Is the docker daemon running?` : le client n'a personne à qui parler.
> - `docker version` montre `Client` et `Server` : deux programmes, qui peuvent même être sur deux machines.
> - Oui : PowerShell et Ubuntu parlent au **même** démon (celui de Docker Desktop, dans WSL), donc ils voient les mêmes conteneurs.
> - Toi → client `docker` → démon `dockerd` → crée le conteneur → qui tourne sur le noyau Linux de WSL.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
