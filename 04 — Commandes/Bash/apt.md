---
type: command
tool: Bash
level: debutant
concepts:
  - "[[Gestionnaire de paquets]]"
tags:
  - commande
  - bash
---
# apt

> [!info] Bash
> Installe, met à jour et supprime les logiciels d'Ubuntu et Debian.

## Pourquoi l'utiliser
Ajouter des outils à WSL ou à une image Docker.

## Dans quel contexte
Dans WSL, ou dans un `RUN` de Dockerfile (souvent `apt-get`).

## Syntaxe
```bash
sudo apt <action> [paquets]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `update` | rafraîchit la liste des paquets |
| `upgrade` | met à jour ce qui est installé |
| `install` | installe |
| `remove` | désinstalle |
| `search` | cherche |
| `-y` | répond oui automatiquement |

## Exemple concret
```bash
sudo apt update
sudo apt install -y zip unzip tree
```

## Résultat attendu
Les paquets sont téléchargés et installés ; `zip --version` répond.

## Variantes utiles
- `apt list --installed`
- Dans un Dockerfile : `apt-get update && apt-get install -y --no-install-recommends ...`

> [!warning] Erreurs fréquentes
> - Oublier `apt update` avant : « Unable to locate package »
> - En entreprise : délai dépassé si le proxy ou le miroir n'est pas configuré

## Relier
- **Commandes complémentaires** : [[sudo]]
- **Concepts associés** : [[Gestionnaire de paquets]]
