---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/terminal
aliases:
  - "Terminal et Bash"
parent: "[[Outils]]"
related_theory:
  - "[[LNX-01-Linux-Essentiels|Linux Essentiels]]"
related_projects: []
source: "https://www.gnu.org/software/bash/manual/"
---

# Terminal et Bash

> [!abstract] En bref
> Le **terminal** est l'endroit où tu tapes des commandes au lieu de cliquer : lancer ton projet, utiliser Git, npm, Docker. **Bash** est le langage de ces commandes sous Linux. Sur Windows, on travaille dans **WSL2** (un vrai Linux intégré) pour avoir le même environnement que les serveurs et la CI.

## Pourquoi WSL2 sur Windows

Les serveurs, Docker et la CI GitLab tournent sous **Linux**. Travailler dans WSL2 évite les surprises :

| Problème sous Windows | Avec WSL2 |
|---|---|
| `rm -rf`, `NODE_ENV=production node …` ne marchent pas dans cmd / PowerShell | ✅ |
| `import './Header.vue'` au lieu de `header.vue` passe sur Windows, casse sur la CI | l'erreur apparaît tout de suite |
| scripts `.sh` avec des fins de ligne Windows : `/bin/bash^M: bad interpreter` | ✅ |
| `npm install` lent (des milliers de petits fichiers) | 2 à 3 fois plus rapide |
| paquets natifs (`argon2`, Prisma) difficiles à compiler | ✅ |

Installation (PowerShell administrateur) : `wsl --install`, puis Ubuntu. **Range tes projets dans `~/projets`**, pas dans `/mnt/c/…`. Ouvre-les avec `code .` (VS Code + extension WSL) ou via `\\wsl$` dans IntelliJ.

Terminal conseillé : **Windows Terminal** avec Ubuntu comme profil par défaut.

## Se déplacer et manipuler des fichiers

| Commande | Rôle |
|---|---|
| `pwd` | où suis-je ? |
| `ls -la` | lister (y compris les fichiers cachés) |
| `cd projets/portfolio` | aller dans un dossier |
| `cd ..` / `cd ~` / `cd -` | dossier parent / dossier personnel / dossier précédent |
| `mkdir -p src/app/core` | créer un dossier (et ses parents) |
| `touch fichier.ts` | créer un fichier vide |
| `cp a b` / `mv a b` | copier / déplacer ou renommer |
| `rm fichier` / `rm -rf dossier` | supprimer ⚠️ sans corbeille |
| `cat fichier` / `less fichier` | afficher / lire page par page |
| `code .` / `explorer.exe .` | ouvrir le dossier dans VS Code / l'explorateur Windows |

## Chercher

| Commande | Rôle |
|---|---|
| `grep -rn "useProjects" src/` | chercher un texte dans les fichiers |
| `rg "useProjects"` | pareil, en beaucoup plus rapide (ripgrep) |
| `find . -name "*.spec.ts"` | chercher des fichiers par nom |
| `history \| grep docker` | retrouver une ancienne commande (ou `Ctrl+R`) |

## Enchaîner les commandes

```bash
npm run lint && npm test          # && : la 2e seulement si la 1re réussit
npm run build || echo "échec"     # || : la 2e seulement si la 1re échoue
cat app.log | grep ERROR | wc -l  # | : la sortie de l'une va dans l'autre
npm test > resultat.txt 2>&1      # > : écrire dans un fichier (erreurs comprises)
```

## Les raccourcis qui changent tout

| Raccourci | Effet |
|---|---|
| `Tab` | compléter un nom de fichier ou de commande |
| `↑` | commande précédente |
| `Ctrl+R` | rechercher dans l'historique |
| `Ctrl+C` | arrêter la commande en cours |
| `Ctrl+L` | effacer l'écran |
| `Ctrl+A` / `Ctrl+E` | début / fin de ligne |

## Variables d'environnement

```bash
export API_URL=http://localhost:3000   # pour la session
echo $API_URL
```

Pour qu'elles soient permanentes : dans `~/.bashrc`, avec tes alias :

```bash
alias ll='ls -lah'
alias gs='git status'
alias gl='git log --oneline --graph -15'
```

Puis `source ~/.bashrc`.

## Pour aller plus vite

**Starship** (prompt qui affiche la branche Git et la version de Node), **fzf** (recherche floue), **zoxide** (`z portfolio` pour sauter dans un dossier), **fnm** (versions de Node). Voir aussi les commandes Linux de [[LNX-01-Linux-Essentiels|Linux essentiels]].

## Pièges

- **`rm -rf` avec une variable vide** (`rm -rf $DOSSIER/`) : peut effacer bien plus que prévu. Vérifie avant.
- **Un projet dans `/mnt/c/`** depuis WSL : très lent.
- **Copier-coller une commande trouvée en ligne sans la comprendre**, surtout avec `sudo` ou `curl … | bash`.
