---
type: exercise
status: a-faire
niveau: 0
difficulty: moyen
concepts:
  - "[[Lire et écrire un fichier]]"
  - "[[Lire et écrire du CSV]]"
  - "[[Chemin de fichier en Python (pathlib)]]"
  - "[[Encodage des caractères]]"
  - "[[Dates et heures (datetime)]]"
  - "[[Fichiers entre Windows et Linux]]"
  - "[[Classe et objet]]"
tags:
  - exercice
  - mini-projet
---
# Dépenses 08 - Lire un vrai fichier

> [!info] Où tu en es
> **Projet :** [[Projet - Suivre ses dépenses en Python]] · **Niveau :** 0
> **Étape précédente :** [[Dépenses 07 - Le projet dans Git]]
> **Notions appliquées ici :** [[Lire et écrire un fichier]] · [[Lire et écrire du CSV]] · [[Chemin de fichier en Python (pathlib)]] · [[Encodage des caractères]] · [[Dates et heures (datetime)]] · [[Fichiers entre Windows et Linux]] · [[Classe et objet]]
> **Ordre :** pour chaque notion, je lis la fiche, je fais son dessin et ses exercices visuels, puis je fais le morceau de cette étape qui l'utilise.

## Le but
Les dépenses ne sont plus écrites dans le code : elles arrivent dans un fichier `depenses.csv`, parfois créé sous Windows avec Excel. Le script le lit, transforme chaque ligne en objet `Depense`, et écrit un fichier de totaux.

## Ce que tu fais
- [ ] Crée `data/depenses.csv` (une ligne d'en-tête, puis les dépenses du projet) et lis-le avec le module `csv`. Le chemin du fichier se construit avec `pathlib`, à partir du dossier du script
- [ ] Transforme chaque ligne en objet d'une classe `Depense` (date, catégorie, montant, description), avec une méthode qui dit si la dépense est « grosse »
- [ ] Les dates deviennent de vraies dates : affiche la dépense la plus ancienne et le nombre de jours entre la première et la dernière
- [ ] Écris les totaux par catégorie dans `sortie/totaux.csv`. Le dossier `sortie` doit être créé s'il n'existe pas
- [ ] Piège : enregistre le CSV depuis Windows (Bloc-notes, encodage ANSI) avec une description « Café crème ». Lance le script dans WSL : que vois-tu ? Corrige sans toucher au fichier
- [ ] Commit

> [!success] Ça marche si…
> `python3 depenses.py` lit `data/depenses.csv`, affiche les totaux, la plus ancienne dépense et l'écart en jours, et crée `sortie/totaux.csv`. Les accents s'affichent correctement.

## Est-ce que j'ai compris ?
Demande à Claude de t'interroger, ou réponds en dessous.
1. Pourquoi construire le chemin à partir du dossier du script plutôt que du dossier courant ?
2. Qu'est-ce qui a cassé les accents, et qui doit dire l'encodage : le fichier ou le programme ?
3. Qu'apporte la classe `Depense` par rapport à un dictionnaire ?

> [!question]- Indice
> `Path(__file__).parent` donne le dossier du script. `open(..., encoding=...)` règle l'encodage. `datetime.date.fromisoformat` lit une date `2026-11-01`.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Les notions de l'étape ont leurs trois cases (schéma, exercices visuels, fil rouge)
- [ ] J'ai répondu aux questions et Claude les a vérifiées
