---
type: command
tool: Réseau
level: debutant
concepts:
  - "[[DNS]]"
tags:
  - commande
  - reseau
---
# nslookup

> [!info] Réseau
> Demande au DNS l'adresse IP d'un nom (ou l'inverse).

## Pourquoi l'utiliser
Vérifier qu'un nom se résout, et vers quelle IP.

## Dans quel contexte
`Could not resolve host`, nom interne d'entreprise, après un changement DNS.

## Syntaxe
```bash
nslookup nom [serveur_dns]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `nom` | le nom à résoudre |
| `serveur_dns` | interroger un DNS précis, ex. `8.8.8.8` |
| `-type=MX` | un autre type d'enregistrement |

## Exemple concret
```bash
nslookup gitlab.com
nslookup nexus.entreprise.local 10.0.0.53
```

## Résultat attendu
`Address: 172.65.251.78` ; ou `NXDOMAIN` si le nom n'existe pas.

## Variantes utiles
- Linux : `dig +short nom` (paquet dnsutils)
- PowerShell : `Resolve-DnsName nom`

> [!warning] Erreurs fréquentes
> - Oublier que le fichier hosts peut répondre avant le DNS

## Relier
- **Commandes complémentaires** : [[ping]] · [[curl]]
- **Concepts associés** : [[DNS]]
