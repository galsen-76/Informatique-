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

> [!tip] `apt` ou `apt-get` ?
> Même gestionnaire de paquets, publics différents.
> - **`apt`** : pour toi dans le terminal (barre de progression, couleurs). Son affichage peut changer d'une version à l'autre ; dans un script il prévient : `WARNING: apt does not have a stable CLI interface`.
> - **`apt-get`** : pour les **scripts** (Dockerfile, CI), parce que son comportement et sa sortie restent stables.
>
> Dans un `RUN` de Dockerfile : pas de `sudo` (on est déjà `root`), `-y` (personne pour répondre), `--no-install-recommends` et `rm -rf /var/lib/apt/lists/*` (image plus légère), et `update` + `install` dans le **même** `RUN` (sinon le cache de Docker peut garder une vieille liste). Sur une image Alpine, c'est `apk add --no-cache`.

> [!warning] Erreurs fréquentes
> - Oublier `apt update` avant : « Unable to locate package »
> - En entreprise : délai dépassé si le proxy ou le miroir n'est pas configuré

## Relier
- **Commandes complémentaires** : [[sudo]]
- **Concepts associés** : [[Gestionnaire de paquets]]
