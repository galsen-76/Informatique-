---
type: command
tool: WSL
level: debutant
concepts:
  - "[[WSL]]"
tags:
  - commande
  - wsl
---
# wsl.exe

> [!info] WSL
> Le programme Windows qui installe, liste, lance et arrête les distributions Linux de WSL.

## Pourquoi l'utiliser
Gérer WSL depuis PowerShell, ou lancer une commande Linux depuis Windows.

## Dans quel contexte
Installation, mise à jour, problème de mémoire ou de réseau (redémarrer WSL).

## Syntaxe
```bash
wsl [options] [commande]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| (seul) | entre dans la distribution par défaut |
| `--install` | installe WSL et Ubuntu |
| `-l -v` | liste les distributions, leur état et leur version |
| `-d Ubuntu` | choisit la distribution |
| `--shutdown` | arrête tout WSL |
| `--update` | met à jour WSL |
| `--set-default Ubuntu` | distribution par défaut |

## Exemple concret
```bash
wsl -l -v
wsl
wsl ls -la ~      # lancer une commande Linux sans entrer
```

## Résultat attendu
`wsl -l -v` affiche `Ubuntu  Running  2`.

## Variantes utiles
- `wsl --unregister Ubuntu` : **supprime** la distribution et tous ses fichiers
- `wsl ~` : entrer directement dans le dossier personnel

> [!warning] Erreurs fréquentes
> - Version 1 au lieu de 2 : `wsl --set-version Ubuntu 2`
> - `--unregister` efface tout, sans retour

## Relier
- **Commandes complémentaires** : [[apt]] · [[sudo]]
- **Concepts associés** : [[WSL]]
