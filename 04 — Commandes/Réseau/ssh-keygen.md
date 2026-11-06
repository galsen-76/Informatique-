---
type: command
tool: Réseau
level: debutant
concepts:
  - "[[Clé SSH]]"
tags:
  - commande
  - reseau
---
# ssh-keygen

> [!info] Réseau
> Crée (et gère) des paires de clés SSH.

## Pourquoi l'utiliser
Remplacer les mots de passe par des clés.

## Dans quel contexte
Première configuration de Git en SSH ou d'accès serveur.

## Syntaxe
```bash
ssh-keygen -t ed25519 -C "commentaire"
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-t ed25519` | type de clé moderne conseillé |
| `-C` | commentaire (souvent ton nom ou poste) |
| `-f chemin` | nom du fichier |
| `-l -f clé.pub` | affiche l'empreinte |
| `-R hôte` | retire un hôte de known_hosts |

## Exemple concret
```bash
ssh-keygen -t ed25519 -C "oumar@poste"
cat ~/.ssh/id_ed25519.pub
```

## Résultat attendu
Deux fichiers dans `~/.ssh` : la clé privée et la `.pub`.

## Variantes utiles
- `ssh-copy-id user@hôte` : installer la clé publique

> [!warning] Erreurs fréquentes
> - Envoyer la clé privée au lieu de la `.pub`
> - Écraser une clé existante en validant sans lire

## Relier
- **Commandes complémentaires** : [[ssh user@hôte]]
- **Concepts associés** : [[Clé SSH]]
