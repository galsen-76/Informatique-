---
type: command
tool: PowerShell
level: debutant
concepts:
  - "[[TCP et UDP]]"
  - "[[Port]]"
tags:
  - commande
  - powershell
---
# Test-NetConnection

> [!info] PowerShell
> Teste depuis Windows si un port d'une machine est joignable.

## Pourquoi l'utiliser
Savoir si une connexion TCP passe, sans installer d'outil.

## Dans quel contexte
Base de données, API ou serveur qui « ne répond pas ».

## Syntaxe
```bash
Test-NetConnection hôte -Port numéro
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-Port` | le port TCP à tester |
| `-TraceRoute` | affiche aussi le chemin |

## Exemple concret
```bash
Test-NetConnection gitlab.com -Port 443
```

## Résultat attendu
`TcpTestSucceeded : True` si la connexion passe.

## Variantes utiles
- `Resolve-DnsName nom` : résolution DNS

> [!warning] Erreurs fréquentes
> - `False` ne dit pas pourquoi : vérifier DNS, puis pare-feu, puis service

## Relier
- **Commandes complémentaires** : [[ipconfig]] · [[curl]]
- **Concepts associés** : [[TCP et UDP]] · [[Port]]
