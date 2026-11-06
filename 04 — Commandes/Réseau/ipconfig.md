---
type: command
tool: Réseau
level: debutant
concepts:
  - "[[Adresse IP]]"
tags:
  - commande
  - reseau
---
# ipconfig

> [!info] Réseau
> Affiche la configuration réseau de Windows (IP, masque, passerelle, DNS).

## Pourquoi l'utiliser
Connaître son IP et sa passerelle sous Windows.

## Dans quel contexte
PowerShell ou cmd.

## Syntaxe
```bash
ipconfig [/all]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| (seul) | IP, masque, passerelle par interface |
| `/all` | tout, dont les serveurs DNS |
| `/flushdns` | vide le cache DNS |

## Exemple concret
```bash
ipconfig /all
```

## Résultat attendu
Une section par interface : Wi-Fi, Ethernet, `vEthernet (WSL)`.

## Variantes utiles
- PowerShell : `Get-NetIPAddress`

> [!warning] Erreurs fréquentes
> - Confondre l'interface de WSL avec celle du réseau réel

## Relier
- **Commandes complémentaires** : [[ip]] · [[Test-NetConnection]]
- **Concepts associés** : [[Adresse IP]]
