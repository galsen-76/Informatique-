---
type: command
tool: Linux
level: debutant
concepts:
  - "[[Journaux système]]"
tags:
  - commande
  - linux
---
# tail

> [!info] Linux
> Affiche la fin d'un fichier, et peut le suivre en direct.

## Pourquoi l'utiliser
Lire les dernières lignes d'un log.

## Dans quel contexte
Suivre un service ou un script pendant qu'il tourne.

## Syntaxe
```bash
tail [options] fichier
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-n 50` | les 50 dernières lignes |
| `-f` | suit le fichier en direct (Ctrl+C pour arrêter) |

## Exemple concret
```bash
tail -n 50 /var/log/syslog
tail -f zip.log
```

## Résultat attendu
Les dernières lignes, puis les nouvelles au fil de l'eau avec `-f`.

## Variantes utiles
- `head -n 20 fichier` : le début
- PowerShell : `Get-Content f -Wait -Tail 20`

> [!warning] Erreurs fréquentes
> - Oublier `sudo` pour les logs système

## Relier
- **Commandes complémentaires** : [[less]] · [[journalctl]]
- **Concepts associés** : [[Journaux système]]
