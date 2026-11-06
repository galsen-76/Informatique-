---
type: command
tool: Bash
level: debutant
concepts:
  - "[[Permissions Linux]]"
tags:
  - commande
  - bash
---
# sudo

> [!info] Bash
> Lance une commande avec les droits d'administrateur (root).

## Pourquoi l'utiliser
Installer des paquets, modifier la configuration du système.

## Dans quel contexte
`apt install`, fichiers de `/etc`, réparer des droits.

## Syntaxe
```bash
sudo commande
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `commande` | la commande à lancer en root |
| `-i` | ouvrir un shell root (à éviter) |

## Exemple concret
```bash
sudo apt install tree
```

## Résultat attendu
Ton mot de passe est demandé (il ne s'affiche pas), puis la commande s'exécute.

## Variantes utiles
- `sudo !!` : relancer la commande précédente avec sudo

> [!warning] Erreurs fréquentes
> - Utiliser sudo pour ses propres fichiers dans `~`
> - Lancer un `pip install` avec sudo : casse le Python du système

## Relier
- **Commandes complémentaires** : [[apt]] · [[chmod]]
- **Concepts associés** : [[Permissions Linux]]
