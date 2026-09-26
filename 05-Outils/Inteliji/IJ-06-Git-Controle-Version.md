---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Git & Contrôle de Version dans IntelliJ"
tags:
  - outils/intellij/git
parent: "[[IntelliJ IDEA]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.jetbrains.com/help/idea/version-control-integration.html"
---

# Git et Contrôle de Version IntelliJ

> [!abstract] En bref
> IntelliJ intègre Git de façon très visuelle : voir ce que tu as modifié, commiter une partie seulement d'un fichier, résoudre un conflit en trois colonnes, parcourir l'historique. Pratique au quotidien, à condition de **connaître les commandes Git** derrière (voir [[GIT-01-Fondamentaux|Git]]).

## Où c'est

| Élément | Où |
|---|---|
| Branche actuelle, changer de branche | en haut à gauche (nom de la branche) |
| Modifications en cours, commit | fenêtre **Commit** (`Alt+0`) ou `Ctrl+K` |
| Historique, branches | fenêtre **Git** (`Alt+9`) → onglet *Log* |
| Lignes modifiées | couleurs dans la marge (vert = ajout, bleu = modifié, gris = supprimé) |

## Commiter proprement

1. `Ctrl+K` : la liste des fichiers modifiés s'affiche.
2. **Double-clic sur un fichier** : le diff avant / après.
3. Coche seulement les fichiers — ou même seulement **certaines lignes** — qui vont ensemble.
4. Message au format `feat: …` (voir [[GIT-07-Conventions-Commits-SemVer|Conventions]]).
5. Options utiles avant le commit : *Reformat code*, *Optimize imports*, *Analyze code*.
6. **Commit** ou **Commit and Push** (`Ctrl+Shift+K` pour pousser ensuite).

**Changelists** : ranger des modifications dans des « paniers » séparés pour les commiter à des moments différents.

## Résoudre un conflit

Quand un conflit apparaît, IntelliJ propose **Resolve** :

```text
┌──────────────┬──────────────┬──────────────┐
│  Ta version  │   Résultat   │ L'autre      │
│   (gauche)   │   (milieu)   │ (droite)     │
└──────────────┴──────────────┴──────────────┘
```

Clique sur `>>` ou `<<` pour prendre un morceau d'un côté, modifie le résultat au milieu si besoin, puis **Apply**. Beaucoup plus clair que les marqueurs `<<<<<<<` (voir [[GIT-04-Conflits|Conflits]]).

## Les autres outils utiles

| Besoin | Où |
|---|---|
| historique d'un fichier | clic droit → *Git → Show History* |
| qui a écrit cette ligne | clic droit dans la marge → *Annotate with Git Blame* |
| comparer avec une autre branche | clic droit → *Git → Compare with Branch* |
| mettre de côté (stash) | *Git → Uncommitted Changes → Stash* |
| rebase interactif | onglet *Log* → clic droit sur un commit → *Interactively Rebase from Here* |
| annuler un commit poussé | onglet *Log* → clic droit → *Revert Commit* |
| retrouver des modifications perdues | clic droit → *Local History* (même hors Git !) |

**Local History** garde toutes tes modifications de fichiers, même non commitées : un filet de sécurité précieux.

## Pièges

- **Tout cocher sans regarder** : un `console.log` ou un fichier de configuration personnel part dans le commit.
- **Utiliser l'interface sans comprendre Git** : le jour où ça coince, tu ne sais pas quoi faire. Garde le terminal comme référence.
