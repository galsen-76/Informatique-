---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Transition VSCode → IntelliJ"
tags:
  - outils/intellij/transition-vscode
parent: "[[IntelliJ IDEA]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.jetbrains.com/help/idea/migrating-from-vscode.html"
---

# Transition VSCode vers IntelliJ

> [!abstract] En bref
> Tu connais VS Code ? Presque tout existe dans IntelliJ, souvent **sans extension**, mais à un autre endroit et avec d'autres raccourcis. Cette table te fait gagner les premières semaines.

## Les équivalences

| VS Code | IntelliJ |
|---|---|
| `Ctrl+P` (ouvrir un fichier) | `Ctrl+Shift+N`, ou `Shift` `Shift` |
| `Ctrl+Shift+P` (commandes) | `Ctrl+Shift+A` |
| `F12` (définition) | `Ctrl+B` |
| `Shift+F12` (utilisations) | `Alt+F7` |
| `F2` (renommer) | `Shift+F6` |
| `Ctrl+.` (corrections rapides) | `Alt+Entrée` |
| `Shift+Alt+F` (formater) | `Ctrl+Alt+L` |
| `Ctrl+D` (occurrence suivante) | `Alt+J` |
| `Shift+Alt+↓` (dupliquer) | `Ctrl+D` |
| `Ctrl+Shift+K` (supprimer la ligne) | `Ctrl+Y` |
| `` Ctrl+` `` (terminal) | `Alt+F12` |
| `Ctrl+B` (panneau latéral) | `Alt+1` |
| Extension GitLens | Git natif + *Annotate with Git Blame* |
| Extension ESLint / Prettier | intégrés (*Settings → Languages & Frameworks → JavaScript*) |
| Extension REST Client | client HTTP natif (fichiers `.http`) |
| Extension Docker / base de données | fenêtres *Services* et *Database* |
| `settings.json` | *Settings* (`Ctrl+Alt+S`) |
| `launch.json` | *Run Configurations* |

## Les différences d'esprit

| | VS Code | IntelliJ |
|---|---|---|
| Philosophie | éditeur léger, enrichi par des extensions | IDE complet, tout inclus |
| Démarrage | instantané | indexation au premier lancement |
| Refactoring | correct | **excellent** (sûr sur tout le projet) |
| Clic droit | peu d'options | beaucoup d'actions contextuelles |
| Prix | gratuit | Ultimate / WebStorm payants (licence entreprise ; WebStorm gratuit pour un usage non commercial) |

## Le plan de transition

1. **Semaine 1** : keymap « VSCode » si besoin (*Settings → Keymap*), et apprends `Shift` `Shift` + `Alt+Entrée`.
2. **Semaines 2-3** : repasse au keymap IntelliJ, avec **Key Promoter X** pour apprendre au fil de l'eau.
3. **Ensuite** : explore le refactoring (`Ctrl+Alt+Shift+T`) et le débogueur : c'est là qu'IntelliJ fait vraiment la différence.

Tous les raccourcis : [[IJ-02-Raccourcis-Clavier|Raccourcis]].

## Pièges

- **Chercher une extension** pour une fonctionnalité déjà présente.
- **Rester sur le keymap VS Code** indéfiniment : certains raccourcis IntelliJ n'y ont pas d'équivalent.
