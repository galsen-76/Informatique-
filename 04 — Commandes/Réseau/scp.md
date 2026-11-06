---
type: command
tool: Réseau
level: debutant
concepts:
  - "[[SSH]]"
tags:
  - commande
  - reseau
---
# scp

> [!info] Réseau
> Copie des fichiers entre ta machine et un serveur, par SSH.

## Pourquoi l'utiliser
Envoyer ou récupérer un fichier sur un serveur.

## Dans quel contexte
Déploiement manuel, récupération de logs.

## Syntaxe
```bash
scp [options] source destination
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-r` | copie un dossier |
| `-P 2222` | autre port (P majuscule) |
| `hôte:chemin` | côté distant |

## Exemple concret
```bash
scp archive.zip oumar@serveur:/tmp/
scp -r oumar@serveur:/var/log/app ./logs
```

## Résultat attendu
Une barre de progression par fichier.

## Variantes utiles
- `rsync -av` : synchronise (ne recopie que ce qui a changé)

> [!warning] Erreurs fréquentes
> - Oublier les `:` : sans eux, la copie reste locale

## Relier
- **Commandes complémentaires** : [[ssh user@hôte]]
- **Concepts associés** : [[SSH]]
