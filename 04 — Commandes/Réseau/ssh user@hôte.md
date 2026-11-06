---
type: command
tool: Réseau
level: debutant
concepts:
  - "[[SSH]]"
tags:
  - commande
  - reseau
---
# ssh user@hôte

> [!info] Réseau
> Ouvre un terminal sécurisé sur une machine distante, ou y lance une commande.

## Pourquoi l'utiliser
Administrer un serveur, déployer.

## Dans quel contexte
Serveurs Linux, Git en SSH.

## Syntaxe
```bash
ssh [options] utilisateur@hôte [commande]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-p 2222` | autre port |
| `-i clé` | clé privée à utiliser |
| `-L 8080:localhost:80` | tunnel : un port local vers le serveur |
| `-v` | détaille la connexion (débogage) |

## Exemple concret
```bash
ssh oumar@serveur.entreprise.local
ssh cvat "docker ps"
```

## Résultat attendu
L'invite devient `oumar@serveur:~$` ; `exit` pour revenir.

## Variantes utiles
- `~/.ssh/config` pour les raccourcis
- `ssh -T git@gitlab.com` : tester GitLab

> [!warning] Erreurs fréquentes
> - `Permission denied (publickey)` : clé absente du serveur ou mauvaise clé
> - Oublier qu'on est sur le serveur

## Relier
- **Commandes complémentaires** : [[scp]] · [[ssh-keygen]]
- **Concepts associés** : [[SSH]]
