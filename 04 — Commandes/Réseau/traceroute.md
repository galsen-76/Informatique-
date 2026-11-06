---
type: command
tool: Réseau
level: debutant
concepts:
  - "[[Routage et NAT]]"
tags:
  - commande
  - reseau
---
# traceroute

> [!info] Réseau
> Montre chaque routeur traversé jusqu'à une destination.

## Pourquoi l'utiliser
Voir où une connexion se perd ou ralentit.

## Dans quel contexte
Réseau lent ou injoignable au-delà de ton réseau.

## Syntaxe
```bash
traceroute hôte
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-n` | pas de résolution des noms (plus rapide) |

## Exemple concret
```bash
traceroute -n gitlab.com
```

## Résultat attendu
Une ligne par saut avec les temps ; `* * *` = ce routeur ne répond pas.

## Variantes utiles
- Windows : `tracert hôte`
- Linux : `sudo apt install traceroute`

> [!warning] Erreurs fréquentes
> - Croire que `* * *` est forcément une panne (beaucoup de routeurs ne répondent pas)

## Relier
- **Commandes complémentaires** : [[ping]]
- **Concepts associés** : [[Routage et NAT]]
