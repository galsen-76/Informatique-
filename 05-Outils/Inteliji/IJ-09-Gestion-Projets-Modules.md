---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Gestion de Projets & Modules IntelliJ"
tags:
  - outils/intellij/projets
parent: "[[IntelliJ IDEA]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.jetbrains.com/help/idea/creating-and-managing-projects.html"
---

# Gestion de Projets et Modules IntelliJ

> [!abstract] En bref
> Deux réglages évitent 90 % des soucis dans IntelliJ : la **version de Node / TypeScript** utilisée par le projet (sinon de fausses erreurs apparaissent), et les **configurations de lancement** (*Run Configurations*) pour démarrer ton front, ton API ou tes tests en un clic.

## Le bon Node et le bon TypeScript

*Settings (`Ctrl+Alt+S`) → Languages & Frameworks* :

| Réglage | Valeur |
|---|---|
| **Node.js → Node interpreter** | la version du projet (celle de WSL si tu travailles dans WSL) |
| **Node.js → Package manager** | npm |
| **TypeScript → TypeScript** | celui du projet : `node_modules/typescript` |

**Symptôme d'un mauvais réglage :** du code rouge partout alors que `npm run build` fonctionne. Vérifie ces réglages avant de chercher plus loin.

## Les configurations de lancement

Au lieu de retaper les commandes : *Run → Edit Configurations → +*.

| Configuration | Type | Contenu |
|---|---|---|
| Front Vue | npm | script `dev` |
| Front Angular | npm | script `start` (ou Angular CLI Server) |
| API NestJS | npm | script `start:debug` |
| Tests | Vitest | fichier ou dossier de tests |
| Débogage navigateur | JavaScript Debug | `http://localhost:5173` |

Ensuite : le menu déroulant en haut à droite, ▶ pour lancer, 🐞 pour déboguer (voir [[IJ-05-Debogage|Débogage]]).

**Compound** : une configuration qui lance **plusieurs** autres d'un coup (front + API).

Coche *Store as project file* pour partager une configuration avec l'équipe (dans `.run/`).

## Plusieurs projets ensemble

Pour travailler sur le front et l'API en même temps :
- un **monorepo** (un seul dépôt `apps/web` + `apps/api`) s'ouvre comme un projet unique ;
- sinon, *File → Open* le second projet et choisis *Attach* pour l'ajouter à la même fenêtre.

## La base de données dans l'IDE

Fenêtre **Database** → *+ → Data Source → PostgreSQL* → hôte `localhost`, port `5432`, base, utilisateur, mot de passe. Tu peux ensuite parcourir les tables et écrire du SQL avec autocomplétion (voir [[BDD-09-PostgreSQL-Pratique|PostgreSQL en pratique]]).

## Pièges

- **Ignorer des erreurs rouges** qui viennent d'un mauvais interpréteur, ou au contraire **perdre une heure** sur de fausses erreurs.
- **Un « module » IntelliJ** n'a rien à voir avec un module TypeScript ou NestJS : c'est une sous-partie d'un projet dans l'IDE.
