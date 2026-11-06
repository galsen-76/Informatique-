---
type: command
tool: Réseau
level: debutant
concepts:
  - "[[Adresse IP]]"
  - "[[Routage et NAT]]"
tags:
  - commande
  - reseau
---
# ip

> [!info] Réseau
> Affiche et règle les adresses, interfaces et routes réseau sous Linux.

## Pourquoi l'utiliser
Connaître son IP, sa passerelle, ses interfaces.

## Dans quel contexte
Dans WSL, un conteneur ou un serveur Linux.

## Syntaxe
```bash
ip addr | ip route
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `addr` (ou `a`) | adresses de chaque interface |
| `route` (ou `r`) | table de routage, dont la passerelle `default via` |
| `link` | état des interfaces |

## Exemple concret
```bash
ip -br addr
ip route
```

## Résultat attendu
`eth0 UP 172.24.10.5/20` ; `default via 172.24.0.1 dev eth0`.

## Variantes utiles
- `hostname -I` : seulement les IP
- Ancienne commande : `ifconfig`

> [!warning] Erreurs fréquentes
> - Lire l'adresse de `lo` (127.0.0.1) au lieu de la vraie interface

## Relier
- **Commandes complémentaires** : [[ipconfig]] · [[ss]]
- **Concepts associés** : [[Adresse IP]] · [[Routage et NAT]]
