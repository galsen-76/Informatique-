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
# ps

> [!info] Linux
> Liste les processus en cours.

## Pourquoi l'utiliser
Trouver un programme qui tourne et son PID.

## Dans quel contexte
Programme bloqué, port occupé, consommation anormale.

## Syntaxe
```bash
ps aux
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `aux` | tous les processus, avec utilisateur, CPU, mémoire |
| `--sort=-%mem` | trier par mémoire |

## Exemple concret
```bash
ps aux | grep python
ps aux --sort=-%cpu | head
```

## Résultat attendu
Une ligne par processus : utilisateur, PID, %CPU, %MEM, commande.

## Variantes utiles
- `pgrep -a python` : PID et commande
- `top` / `htop` : en direct

> [!warning] Erreurs fréquentes
> - La ligne `grep python` elle-même apparaît dans le résultat

## Relier
- **Commandes complémentaires** : [[kill]] · [[ss]]
- **Concepts associés** : [[Processus]]
