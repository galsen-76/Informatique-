---
type: exercise
status: a-faire
niveau: 2
difficulty: moyen
concepts:
  - "[[Conteneur]]"
  - "[[Image Docker]]"
  - "[[Démon Docker]]"
  - "[[Volume Docker]]"
  - "[[Processus]]"
  - "[[Code de sortie]]"
  - "[[Docker Compose]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 06 - Dépanner un conteneur

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Niveau :** 2 · **Étape précédente :** [[MesDépenses 05 - L'API et PostgreSQL avec compose]]
> **Notions :** [[Conteneur]] · [[Image Docker]] · [[Démon Docker]] · [[Volume Docker]] · [[Processus]] · [[Code de sortie]] · [[Docker Compose]]

## Le but
Savoir trouver tout seul pourquoi un conteneur ne démarre pas ou ne répond pas. Au travail, tu passeras plus de temps à dépanner des conteneurs qu'à en écrire.

> [!tip] Au travail
> Ta fiche de dépannage est le livrable le plus utile de ce niveau : garde-la dans « 05 — Fiches pratiques ».

## Ce que tu fais
- [ ] Casse ton installation de cinq façons, une à la fois, et retrouve la cause **sans relire ton compose** : mauvais mot de passe de la base, port déjà pris, variable manquante, commande de démarrage fausse, volume monté au mauvais endroit
- [ ] Pour chaque panne, note la commande qui t'a donné l'indice (logs, état, code de sortie, inspection, entrer dans le conteneur)
- [ ] Trouve combien de place prennent tes images et volumes, et fais le ménage sans perdre les données de la base
- [ ] Écris ta propre fiche « Dépanner un conteneur » : les questions à se poser dans l'ordre, et la commande pour chacune

> [!warning] Les pièges
> - Un conteneur qui s'arrête tout de suite n'affiche rien avec `docker ps` : il faut `-a`.
> - Le code de sortie dit souvent déjà si c'est une erreur du programme ou un arrêt forcé.

> [!success] Ça marche si…
> Tu as retrouvé les cinq pannes, chacune avec sa commande d'indice, et ta fiche de dépannage est dans le coffre.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> Les commandes à chercher dans [[Commandes]] : `docker compose ps -a`, `docker compose logs`, `docker inspect`, `docker compose exec`, `docker system df`. La fiche [[Fiche - Lire un message d'erreur]] aide à lire les logs.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude m'a cassé une installation sans me dire comment et j'ai trouvé
