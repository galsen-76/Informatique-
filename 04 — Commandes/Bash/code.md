---
type: command
tool: Bash
level: debutant
concepts:
  - "[[Système de fichiers]]"
tags:
  - commande
  - bash
---
# code

> [!info] Bash
> Ouvre VS Code sur le dossier courant (ou sur un fichier) depuis le terminal.

## Pourquoi l'utiliser
Passer du terminal à l'éditeur au bon endroit, sans chercher le dossier à la souris.

## Dans quel contexte
Commencer à travailler sur un projet ; depuis WSL, VS Code s'ouvre **connecté à Linux**.

## Syntaxe
```bash
code .            # le dossier courant
code fichier      # un fichier, créé s'il n'existe pas
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `.` | le dossier courant |
| `fichier` | ouvre ce fichier (vide s'il n'existe pas encore) |
| `-r` | réutilise la fenêtre déjà ouverte |

## Exemple concret
```bash
cd ~/projets/zip-script
code .
code notes.md
```

## Résultat attendu
VS Code s'ouvre ; en bas à gauche, `WSL: Ubuntu` si tu l'as lancé depuis WSL.

## Variantes utiles
- `explorer.exe .` : ouvre l'Explorateur Windows sur le dossier WSL
- [[nano]] : éditeur dans le terminal, quand VS Code n'est pas là (serveur, conteneur)

> [!warning] Erreurs fréquentes
> - `code: command not found` dans WSL : installe l'extension **WSL** de VS Code côté Windows, puis rouvre le terminal
> - Lancer `code .` depuis `/mnt/c/...` : ça marche mais c'est lent, garde tes projets dans `~/projets`
> - Fins de ligne : règle VS Code sur `LF` pour les scripts `.sh` (en bas à droite de la fenêtre)

## Relier
- **Commandes complémentaires** : [[nano]] · [[cd]] · [[wsl.exe]]
- **Concepts associés** : [[Système de fichiers]]
