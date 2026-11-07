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
# nano

> [!info] Bash
> Un éditeur de texte simple, directement dans le terminal.

## Pourquoi l'utiliser
Modifier un fichier sans quitter le terminal : la seule solution sur un serveur en SSH ou dans un conteneur.

## Dans quel contexte
Écrire un script, corriger un fichier de configuration (`/etc/...`), écrire un message de commit.

## Syntaxe
```bash
nano fichier
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `fichier` | ouvert s'il existe, **créé à l'enregistrement** sinon |
| `Ctrl+O` puis `Entrée` | enregistrer (*Write Out*) |
| `Ctrl+X` | quitter (propose d'enregistrer si besoin) |
| `Ctrl+K` / `Ctrl+U` | couper / coller une ligne |
| `Ctrl+W` | chercher |
| `Ctrl+G` | aide |

## Exemple concret
```bash
nano ~/labo/archiver.sh
# tu tapes ton script, puis :
# Ctrl+O, Entrée  → enregistré
# Ctrl+X          → retour au terminal
cat ~/labo/archiver.sh
```

## Résultat attendu
Le fichier contient ce que tu as tapé. En bas de l'écran, nano rappelle les raccourcis (`^` veut dire `Ctrl`).

## Variantes utiles
- `code fichier` : ouvre dans VS Code (plus confortable sur ta machine, voir [[code]])
- `vim fichier` : très puissant, mais sortir se fait avec `Échap` puis `:wq` (enregistrer) ou `:q!` (sans enregistrer)
- `sudo nano /etc/hosts` : fichier système, il faut les droits
- Faire de nano l'éditeur de Git : `git config --global core.editor nano`

> [!warning] Erreurs fréquentes
> - Chercher où cliquer : tout se fait au clavier, lis la barre du bas
> - Quitter avec `Ctrl+X` puis répondre `N` : les modifications sont perdues
> - `Permission denied` à l'enregistrement : le fichier appartient à root, relance avec `sudo`

## Relier
- **Commandes complémentaires** : [[echo]] · [[touch]] · [[cat]] · [[code]]
- **Concepts associés** : [[Système de fichiers]]
