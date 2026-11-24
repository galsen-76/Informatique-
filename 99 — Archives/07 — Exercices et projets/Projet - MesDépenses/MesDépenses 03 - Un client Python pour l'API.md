---
type: exercise
status: a-faire
niveau: 1
difficulty: moyen
concepts:
  - "[[Appeler une API HTTP]]"
  - "[[Code de statut HTTP]]"
  - "[[JSON]]"
  - "[[Exception]]"
  - "[[Journaliser avec logging]]"
  - "[[Secret et fichier .env]]"
  - "[[Arguments de ligne de commande]]"
  - "[[Charger un fichier .env (python-dotenv)]]"
  - "[[SDK]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 03 - Un client Python pour l'API

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Niveau :** 1 · **Étape précédente :** [[MesDépenses 02 - Suivre une requête sur le réseau]]
> **Notions :** [[Appeler une API HTTP]] · [[Code de statut HTTP]] · [[JSON]] · [[Exception]] · [[Journaliser avec logging]] · [[Secret et fichier .env]] · [[Arguments de ligne de commande]] · [[Charger un fichier .env (python-dotenv)]] · [[SDK]]

## Le but
Un petit script en ligne de commande qui parle à l'API : lister, ajouter, afficher le total. C'est le genre d'outil qu'on écrit au travail pour automatiser une tâche sur une API (export, import, nettoyage).

> [!tip] Au travail
> Garde ce script : la même structure (configuration par variables, appels, erreurs gérées, logs) se réutilise pour n'importe quelle API de ton travail.

## Ce que tu fais
- [ ] Crée `client/depenses_cli.py`. L'adresse de l'API vient d'une variable d'environnement (ou d'un `.env`), jamais écrite dans le code
- [ ] Commande `lister` : affiche les dépenses en tableau lisible
- [ ] Commande `ajouter` : prend le montant, la catégorie et le libellé en arguments, envoie la dépense et affiche ce que l'API a créé
- [ ] Commande `total` : affiche le total par catégorie
- [ ] Gère les erreurs : API arrêtée, catégorie refusée par l'API (lis le message qu'elle renvoie), délai dépassé. Le script ne doit jamais afficher une trace Python brute
- [ ] Remplace tes print de debug par des logs, avec un niveau réglable
- [ ] Ouvre la description OpenAPI de l'API : dis ce qu'un SDK généré à partir d'elle t'aurait épargné d'écrire

> [!warning] Les pièges
> - Une requête sans délai maximal peut attendre indéfiniment.
> - Un code 422 ou 404 n'est pas une exception Python : il faut le vérifier toi-même.

> [!success] Ça marche si…
> Les trois commandes marchent, l'API arrêtée donne un message clair en une ligne, et `git grep localhost client/` ne trouve rien.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> `argparse` pour les commandes, `requests` avec `timeout=`, `raise_for_status()` ou le test de `status_code`. Les fiches [[Appeler une API HTTP]] et [[Exception]] ont tout.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mon script
