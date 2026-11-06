---
type: command
tool: Linux
level: debutant
concepts:
  - "[[Bash]]"
tags:
  - commande
  - linux
---
# man

> [!info] Linux
> Ouvre le manuel d'une commande.

## Pourquoi l'utiliser
Connaître toutes les options d'une commande, sans Internet.

## Dans quel contexte
Dès qu'une option te manque.

## Syntaxe
```bash
man commande
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `/mot` | chercher dans la page |
| `q` | quitter |

## Exemple concret
```bash
man tar
man 5 crontab     # la section 5 : format des fichiers
```

## Résultat attendu
La documentation complète, page par page.

## Variantes utiles
- `commande --help` : version courte
- `tldr commande` (à installer) : exemples

> [!warning] Erreurs fréquentes
> - Pas de manuel dans un conteneur minimal : utiliser `--help`

## Relier
- **Commandes complémentaires** : [[less]]
- **Concepts associés** : [[Bash]]
