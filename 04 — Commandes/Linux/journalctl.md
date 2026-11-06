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
# journalctl

> [!info] Linux
> Lit le journal de systemd : logs du système et des services.

## Pourquoi l'utiliser
Comprendre pourquoi un service a échoué.

## Dans quel contexte
Juste après un `systemctl status` en échec.

## Syntaxe
```bash
journalctl [options]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-u service` | un service |
| `-f` | suivre en direct |
| `-n 50` | les 50 dernières lignes |
| `--since "1 hour ago"` | depuis |
| `-p err` | seulement les erreurs |
| `-b` | depuis le dernier démarrage |

## Exemple concret
```bash
journalctl -u docker -n 50
journalctl -u nginx -f
```

## Résultat attendu
Les lignes du journal, datées.

## Variantes utiles
- `journalctl --disk-usage` : place occupée

> [!warning] Erreurs fréquentes
> - Lire la dernière erreur au lieu de la première

## Relier
- **Commandes complémentaires** : [[systemctl]] · [[tail]]
- **Concepts associés** : [[Journaux système]]
