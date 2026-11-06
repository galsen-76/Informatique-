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
# ping

> [!info] Réseau
> Envoie de petits paquets à une machine et mesure si et en combien de temps elle répond.

## Pourquoi l'utiliser
Vérifier vite qu'une machine est joignable et mesurer la latence.

## Dans quel contexte
Premier test réseau ; attention, beaucoup de serveurs ignorent le ping.

## Syntaxe
```bash
ping [options] hôte
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-c 4` | Linux : 4 envois puis arrêt (sinon infini, Ctrl+C) |
| `-n 4` | Windows : 4 envois (défaut) |

## Exemple concret
```bash
ping -c 4 gitlab.com
```

## Résultat attendu
Des lignes `time=12 ms` ; à la fin, le pourcentage de paquets perdus.

## Variantes utiles
- `ping 8.8.8.8` : tester Internet sans DNS
- `ping nom` : teste aussi la résolution DNS

> [!warning] Erreurs fréquentes
> - Conclure qu'un serveur est éteint parce que le ping ne répond pas (souvent filtré)

## Relier
- **Commandes complémentaires** : [[traceroute]] · [[nslookup]]
- **Concepts associés** : [[Adresse IP]] · [[Routage et NAT]]
