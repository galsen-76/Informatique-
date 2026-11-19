---
type: exercise
status: a-faire
niveau: 1
difficulty: facile
concepts:
  - "[[API REST]]"
  - "[[Méthode HTTP]]"
  - "[[Code de statut HTTP]]"
  - "[[Environnement virtuel Python]]"
  - "[[OpenAPI]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 01 - Prendre l'API en main

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Étape précédente :** rien, c'est le début
> **Cours :** [[Cours - Qu'est-ce qu'une API et comment HTTP la porte]]
> **Notions :** [[API REST]] · [[Méthode HTTP]] · [[Code de statut HTTP]] · [[JSON]] · [[Environnement virtuel Python]] · [[Gestionnaire de paquets]] · [[OpenAPI]]
> **À créer :** fiche Bruno (client HTTP)

## Le but
L'API tourne sur ta machine, tu sais l'appeler de trois façons (navigateur, curl, Bruno), et tu as vu de tes yeux les codes 200, 201, 204, 404 et 422.

## Ce que tu fais
- [ ] Crée `~/projets/mes-depenses/`, fais-en un dépôt Git, et copie le dossier `api/` dedans
- [ ] Lance l'API en suivant son `README.md`. Lis les logs du démarrage : que s'est-il passé dans la base ?
- [ ] Ouvre `/docs`. Liste toutes les routes et, pour chacune, la méthode et le code de réponse attendu
- [ ] Ajoute une dépense avec curl, puis supprime-la avec Bruno. Vérifie à chaque fois avec `GET /depenses`
- [ ] Provoque volontairement : un 404, un 422 sur le montant, un 422 sur la catégorie, un 422 sur la date. Lis le corps de chaque réponse : où est écrit le champ fautif ?
- [ ] Arrête l'API, relance-la : tes dépenses sont-elles toujours là ? Dans quel fichier ?
- [ ] Ajoute au `.gitignore` de la racine ce qui ne doit pas aller dans Git, puis fais ton premier commit

> [!warning] Le piège
> `pip install` derrière le proxy de l'entreprise peut échouer. Lis l'erreur avant de chercher : est-ce le réseau, le certificat, ou le paquet ?

> [!success] Ça marche si…
> Tu as obtenu chacun des 5 codes (200, 201, 204, 404, 422), et le premier commit ne contient ni `.venv/` ni `depenses.db`.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> `uvicorn app.main:app` veut dire : dans le module `app/main.py`, prends la variable `app`. Il faut donc le lancer depuis le dossier `api/`. Pour curl, `-i` affiche le code de statut et les en-têtes, `-X` choisit la méthode, `-d` envoie un corps.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mes notes
