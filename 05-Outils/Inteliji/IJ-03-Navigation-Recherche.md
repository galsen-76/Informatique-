---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Navigation & Recherche dans IntelliJ"
tags:
  - outils/intellij/navigation
parent: "[[IntelliJ IDEA]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.jetbrains.com/help/idea/searching-everywhere.html"
---

# Navigation et Recherche IntelliJ

> [!abstract] En bref
> Dans un gros projet, on passe plus de temps à **chercher** et **lire** du code qu'à en écrire. IntelliJ connaît tout ton projet et te fait sauter directement au bon endroit : un fichier, une fonction, tous les endroits qui l'utilisent. Plus besoin de dérouler l'arborescence.

## Trouver quelque chose

| Tu cherches… | Raccourci |
|---|---|
| **n'importe quoi** | `Shift` `Shift` |
| un fichier | `Ctrl+Shift+N` (tape `mov-card` pour `movie-card.component.ts`) |
| une classe | `Ctrl+N` |
| une fonction, une variable | `Ctrl+Alt+Shift+N` |
| un texte dans tout le projet | `Ctrl+Shift+F` |
| une action ou un réglage | `Ctrl+Shift+A` |

La recherche est **floue** : les initiales suffisent (`MCC` trouve `MovieCardComponent`).

## Comprendre le code

| Question | Raccourci |
|---|---|
| où est défini ce truc ? | `Ctrl+B` / `Ctrl+clic` |
| qui l'utilise ? | `Alt+F7` (liste) ou `Ctrl+Alt+F7` (popup) |
| quelles méthodes dans ce fichier ? | `Ctrl+F12` |
| qui appelle cette fonction, et qui appelle l'appelant ? | `Ctrl+Alt+H` |
| quelle est son implémentation ? | `Ctrl+Alt+B` |
| qui a écrit cette ligne, dans quel commit ? | clic droit dans la marge → *Annotate with Git Blame* |

## Revenir en arrière

Tu as sauté de définition en définition et tu es perdu ?

| Raccourci | Effet |
|---|---|
| `Ctrl+Alt+←` | revenir à l'endroit précédent |
| `Ctrl+Alt+→` | avancer |
| `Ctrl+E` | fichiers récents |
| `Ctrl+Shift+E` | derniers endroits consultés |
| `Ctrl+Shift+Retour arrière` | dernier endroit modifié |

## Dans l'arborescence

- `Alt+F1` puis `1` : **montrer le fichier courant** dans l'arborescence.
- Dans l'arborescence, **tape directement** un nom : la recherche démarre.

## La méthode pour découvrir un projet inconnu (au travail)

1. Ouvre `package.json` : quelles librairies, quels scripts.
2. Ouvre les routes (`app.routes.ts` ou `router/index.ts`) : quelles pages.
3. Pour une page qui t'intéresse : `Ctrl+B` sur son composant, puis sur les services qu'il utilise.
4. `Alt+F7` sur un service pour voir tous ceux qui en dépendent.

## Pièges

- **Chercher avec `Ctrl+F`** (fichier courant) au lieu de `Ctrl+Shift+F` (tout le projet).
- **Oublier d'exclure `node_modules` et `dist`** : *clic droit sur le dossier → Mark Directory as → Excluded* (souvent automatique).
