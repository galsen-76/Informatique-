---
tags:
  - index
---
# Parcours - Python, Docker et CI

> [!info] À quoi sert ce parcours
> L'ordre conseillé pour construire des bases solides avant le projet CVAT : écrire un script Python qui manipule et zippe des fichiers, le faire tourner dans Docker, puis le construire et le tester dans GitLab CI. Chaque étape s'appuie sur la précédente. Pour chaque fiche : lire, pratiquer, écrire **avec mes mots**, puis demander à Claude de m'interroger.

```mermaid
flowchart TD
  T[Terminal] --> E0[0 · Prérequis]
  E0 --> E1[1 · Python bases]
  E1 --> E2[2 · Fichiers]
  E2 --> E3[3 · Outillage]
  E3 --> E4[4 · Docker]
  E4 --> E5[5 · Réseau]
  E5 --> E6[6 · Git]
  E6 --> E7[7 · GitLab CI]
  E7 --> E8[8 · Outils CVAT]
```

## Avant tout · Maîtriser le terminal
**Cours**, dans l'ordre : [[Cours - Terminal, shell et système]] → [[Cours - WSL, Linux dans Windows]] → [[Cours - Bash, les commandes essentielles]] → [[Cours - Linux, utilisateurs, permissions et paquets]] → [[Cours - Écrire un script shell]] → [[Cours - PowerShell et Bash côte à côte]]
1. [[Terminal]] et [[Shell]]
2. [[Système d'exploitation et noyau]] · [[Distribution Linux]] · [[Variable PATH]]
3. [[PowerShell]] et [[Bash]]
4. [[WSL]] · commande [[wsl.exe]]
5. Commandes : [[pwd]] · [[ls]] · [[cd]] · [[mkdir]] · [[cp]] · [[mv]] · [[rm]] · [[cat]] · [[grep]]
6. [[Redirection et pipe]]
7. [[Processus]]
8. [[Permissions Linux]] · [[chmod]] · [[sudo]]
9. [[Gestionnaire de paquets]] · [[apt]]
10. [[Script shell]]

**Exercice** : [[Exercice - Prendre en main WSL et Bash]]

## Étape 0 · Prérequis
**Cours** : [[Cours - Ce que tout programme reçoit et renvoie]]
1. [[Système de fichiers]]
2. [[Variable d'environnement]]
3. [[Code de sortie]]
4. [[JSON]] puis [[YAML]]
5. [[Fichiers entre Windows et Linux]]

## Étape 1 · Python, les bases
**Cours** : [[Cours - Python, premiers pas]] puis [[Cours - Fonctions, modules et erreurs]]
1. [[Python]] · commande [[python script.py]]
2. [[Variables et types en Python]]
3. [[Condition (if)]]
4. [[Boucle (for, while)]]
5. [[Liste et dictionnaire]]
6. [[Fonction]]
7. [[Module et import Python]]
8. [[Exception]]

## Étape 2 · Python et les fichiers
**Cours** : [[Cours - Manipuler des fichiers et des archives]]
1. [[Chemin de fichier en Python (pathlib)]]
2. [[Lire et écrire un fichier]]
3. [[Copier et déplacer des fichiers (shutil)]]
4. [[Archive zip (zipfile)]]
5. [[Arguments de ligne de commande]]

## Étape 3 · Outillage Python
**Cours** : [[Cours - Installer des dépendances et tester]]
1. [[Environnement virtuel Python]]
2. [[pip]] · commande [[pip install]]
3. [[pytest]]

**Cours** : [[Cours - Python au quotidien]]
4. [[Appeler une API HTTP (requests)]]
5. [[Lire et écrire du CSV]]
6. [[Dates et heures (datetime)]]
7. [[Journaliser avec logging]]
8. [[Lancer une commande (subprocess)]]
9. [[Expressions régulières (re)]]

## Étape 4 · Docker
**Cours** : [[Cours - Docker, les bases solides]] puis [[Cours - Faire tourner un script Python dans Docker]]
1. [[Docker]] et [[Démon Docker]]
2. [[Dockerfile]] et [[Image Docker]] (couches, cache, image dérivée)
3. [[Conteneur]]
4. [[Volume Docker]]
5. [[Python dans Docker]]
6. [[Docker Compose]] · commande [[docker compose up]]
7. [[Registre Docker]] (Docker Hub, ghcr.io, miroirs) et [[Nexus]]

## Étape 5 · Réseau
**Cours** : [[Cours - Ports, proxy et reverse proxy]]
1. [[Port]]
2. [[Proxy]]
3. [[Reverse proxy]] (Traefik et `CVAT_HOST`)

## Étape 6 · Git dans un vrai projet
**Cours** : [[Cours - Git propre dans un vrai projet]]
1. [[Convention de commit]] (`fix`, `ci`…)
2. [[Tag Git]] · commande [[git tag]]
3. Commandes [[git diff]] et [[git grep]]
4. [[Changelog]]

## Étape 7 · GitLab CI
**Cours** : [[Cours - Maîtriser le fichier de pipeline GitLab]] puis [[Cours - Construire et publier les images d'un projet avec GitLab CI]]
1. [[Pipeline GitLab CI]] (jobs, stages, `needs`, états)
2. [[Variables CI-CD GitLab]]
3. [[Règles d'un job GitLab (rules)]] (manuel, `allow_failure`, skipped)
4. [[Artefacts GitLab CI]]
5. [[extends GitLab CI]]
6. [[Construire une image dans la CI]] (Docker-in-Docker) et [[Kaniko]]
7. [[Tester l'image, pas le dépôt]]

## Étape 8 · Outils du projet CVAT
1. [[OpenAPI]]
2. [[SDK]]

## Les réflexes, à relire avant chaque séance de débogage
[[Fiche - Réflexes pour déboguer une pipeline]] : lire le log depuis la première erreur, partir des fichiers de ta version, un changement = un commit = un pipeline, vérifier ce qu'un test teste avant de le débloquer.

> [!tip] Le fil rouge
> Le même petit projet traverse tout le parcours : ton script de zip. Écrit en étape 2, testé en étape 3, conteneurisé en étape 4, versionné proprement en étape 6, construit et testé par la CI en étape 7.
