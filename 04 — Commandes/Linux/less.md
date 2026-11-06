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
# less

> [!info] Linux
> Ouvre un fichier (ou une sortie) page par page, avec recherche.

## Pourquoi l'utiliser
Lire un long fichier sans tout afficher d'un coup.

## Dans quel contexte
Logs, fichiers de configuration, sortie d'une commande longue.

## Syntaxe
```bash
less fichier
commande | less
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `Espace` / `b` | page suivante / précédente |
| `/mot` | chercher (n : suivant) |
| `G` / `g` | fin / début |
| `q` | quitter |
| `F` | suivre en direct comme `tail -f` |

## Exemple concret
```bash
less /var/log/syslog
journalctl -u docker | less
```

## Résultat attendu
Le fichier s'affiche plein écran ; `q` pour revenir.

## Variantes utiles
- `less +F fichier` : ouvre directement en mode suivi

> [!warning] Erreurs fréquentes
> - Rester bloqué : `q` pour sortir

## Relier
- **Commandes complémentaires** : [[tail]] · [[cat]]
- **Concepts associés** : [[Journaux système]]
