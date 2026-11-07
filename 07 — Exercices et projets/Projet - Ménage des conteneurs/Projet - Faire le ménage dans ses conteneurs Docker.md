---
type: project
status: a-faire
tags:
  - projet
  - mini-projet
---
# Projet - Faire le ménage dans ses conteneurs Docker

> [!info] Le principe
> Un vrai petit outil, utile tout de suite : un script Python qui lit la liste de tes conteneurs Docker et te prépare le ménage (ceux qui ne tournent plus, et de quelles images ils viennent).
> Chaque étape ajoute **une notion** de Python et la valide, à la place des exercices. Tu n'as besoin que des cours de l'étape 1 du parcours, et de savoir utiliser `<` et `|` dans le terminal.

```mermaid
flowchart TD
  A[Lire le texte] --> B[Trier]
  B --> C[Préparer le ménage]
  C --> D[Fonctions]
  D --> E[Module]
  E --> F[Erreurs]
```

## Les étapes
| # | Étape | Notions validées |
| --- | --- | --- |
| 1 | [[Ménage 01 - Lire la liste des conteneurs]] | Python, Variables et types en Python |
| 2 | [[Ménage 02 - Trier les conteneurs]] | Condition (if), Boucle (for, while) |
| 3 | [[Ménage 03 - Préparer le ménage]] | Liste et dictionnaire |
| 4 | [[Ménage 04 - Ranger en fonctions]] | Fonction |
| 5 | [[Ménage 05 - Un module réutilisable]] | Module et import Python |
| 6 | [[Ménage 06 - Un script qui ne plante pas]] | Exception |

## Pour démarrer
Dans WSL :
```bash
mkdir -p ~/projets/conteneurs
cd ~/projets/conteneurs
```
Tu vas faire lire au script la liste de tes conteneurs, dans un format facile à découper (un `;` entre chaque information) :
```bash
docker ps -a --format "{{.ID}};{{.Image}};{{.Status}};{{.Names}}"
```

`exemple.txt`, pour travailler même sans conteneurs sur ta machine :
```text
3f2a9c1b7d10;script-py:1.4;Exited (0) 2 hours ago;gallant_hopper
a81c44e0f2b3;script-py:1.3;Exited (0) 3 hours ago;vibrant_curie
c09d2e7a5b11;script-py:1.3;Exited (1) 3 hours ago;eager_turing
7be1f0c3d9a4;nginx:1.27-alpine;Up 25 minutes;rapport-web
5d6a3b2e8c70;postgres:16;Up 2 days;pg-notes
e4f7a1c2b3d5;script-py:1.2;Created;quirky_lamport
9a0b1c2d3e4f;python:3.12-slim;Exited (137) 1 day ago;test_python
```

`exemple-abime.txt`, pour l'étape 06 :
```text
3f2a9c1b7d10;script-py:1.4;Exited (0) 2 hours ago;gallant_hopper
ligne cassée sans séparateur

7be1f0c3d9a4;nginx:1.27-alpine;Up 25 minutes;rapport-web
```

Pas de bibliothèque à installer : tout est livré avec Python.

## Les règles du projet
- Chaque étape donne le **but**, pas le code : tu le cherches dans les cours et les fiches des notions.
- Tu vas tomber sur de vraies erreurs : c'est voulu. Lis le message, cherche, corrige. Si tu bloques, l'**indice** donne l'idée, puis demande à Claude.
- « Ça marche si… » te dit comment vérifier toi-même.
- L'étape passe en `reussi` quand le projet marche **et** que tu sais répondre aux questions.
