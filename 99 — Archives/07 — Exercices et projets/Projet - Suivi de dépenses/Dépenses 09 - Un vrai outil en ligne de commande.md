---
type: exercise
status: a-faire
niveau: 0
difficulty: moyen
concepts:
  - "[[Arguments de ligne de commande]]"
  - "[[Journaliser avec logging]]"
  - "[[Variable d'environnement]]"
  - "[[Variable PATH]]"
  - "[[Script shell]]"
  - "[[Permissions Linux]]"
tags:
  - exercice
  - mini-projet
---
# Dépenses 09 - Un vrai outil en ligne de commande

> [!info] Où tu en es
> **Projet :** [[Projet - Suivre ses dépenses en Python]] · **Niveau :** 0
> **Étape précédente :** [[Dépenses 08 - Lire un vrai fichier]]
> **Notions appliquées ici :** [[Arguments de ligne de commande]] · [[Journaliser avec logging]] · [[Variable d'environnement]] · [[Variable PATH]] · [[Script shell]] · [[Permissions Linux]]
> **Ordre :** pour chaque notion, je lis la fiche, je fais son dessin et ses exercices visuels, puis je fais le morceau de cette étape qui l'utilise.

## Le but
Le script devient un outil : on lui donne le fichier et la catégorie à filtrer en arguments, il écrit ses messages de suivi avec `logging`, et on peut le lancer de n'importe où avec une simple commande `depenses`.

## Ce que tu fais
- [ ] Ajoute des arguments : le fichier CSV (obligatoire) et `--categorie` (facultatif). `--help` doit afficher une aide lisible
- [ ] Remplace les `print` de suivi par `logging`. Le niveau (INFO ou DEBUG) se choisit avec une variable d'environnement `DEPENSES_LOG`
- [ ] Écris un script shell `depenses` qui lance ton programme Python avec les arguments reçus
- [ ] Rends-le exécutable et lance-le depuis un autre dossier en tapant seulement `depenses data/depenses.csv`
- [ ] Piège : lance `./depenses` sans les droits d'exécution, puis `depenses` sans l'avoir mis dans un dossier du PATH. Lis les deux messages d'erreur
- [ ] Commit

> [!success] Ça marche si…
> Depuis n'importe quel dossier, `depenses ~/projets/depenses/data/depenses.csv --categorie courses` affiche le total des courses, et `DEPENSES_LOG=DEBUG depenses …` affiche aussi les détails.

## Est-ce que j'ai compris ?
Demande à Claude de t'interroger, ou réponds en dessous.
1. Que contient le PATH, et pourquoi `./depenses` marche alors que `depenses` non ?
2. Que veulent dire les lettres `rwx` sur ton script ?
3. Pourquoi une variable d'environnement plutôt qu'un argument pour le niveau des logs ?

> [!question]- Indice
> `argparse` pour les arguments, `os.environ.get(...)` pour la variable. Dans le script shell, `"$@"` transmet tous les arguments. `~/.local/bin` est souvent déjà dans le PATH.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Les notions de l'étape ont leurs trois cases (schéma, exercices visuels, fil rouge)
- [ ] J'ai répondu aux questions et Claude les a vérifiées
