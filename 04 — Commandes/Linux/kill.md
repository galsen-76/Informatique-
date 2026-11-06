---
type: command
tool: Linux
level: debutant
concepts:
  - "[[Processus]]"
tags:
  - commande
  - linux
---
# kill

> [!info] Linux
> Envoie un signal à un processus, en général pour l'arrêter.

## Pourquoi l'utiliser
Arrêter un programme qui ne répond plus ou tourne en arrière-plan.

## Dans quel contexte
Après avoir trouvé le PID avec `ps` ou `ss`.

## Syntaxe
```bash
kill [-signal] PID
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| (seul) | SIGTERM : demande poliment de s'arrêter |
| `-9` | SIGKILL : arrêt forcé immédiat (dernier recours) |
| `pkill nom` | par nom |

## Exemple concret
```bash
kill 1234
pkill -f http.server
```

## Résultat attendu
Le processus disparaît de `ps`.

## Variantes utiles
- `killall nom`
- PowerShell : `Stop-Process -Id 1234`

> [!warning] Erreurs fréquentes
> - Utiliser `-9` d'emblée : le programme ne peut pas nettoyer (fichiers à moitié écrits)

## Relier
- **Commandes complémentaires** : [[ps]]
- **Concepts associés** : [[Processus]]
