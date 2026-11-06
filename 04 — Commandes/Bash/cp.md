---
type: command
tool: Bash
level: debutant
concepts:
  - "[[Bash]]"
  - "[[Système de fichiers]]"
tags:
  - commande
  - bash
---
# cp

> [!info] Bash
> Copie des fichiers ou des dossiers.

## Pourquoi l'utiliser
Garder une copie avant de modifier, dupliquer un fichier de configuration.

## Dans quel contexte
Préparer des données de test, sauvegarder un fichier.

## Syntaxe
```bash
cp [options] source destination
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-r` | copie un dossier et tout son contenu |
| `-i` | demande avant d'écraser |
| `-v` | affiche ce qui est copié |

## Exemple concret
```bash
cp config.yml config.yml.bak
cp -r donnees/ donnees-test/
```

## Résultat attendu
Les copies existent ; rien ne s'affiche si tout va bien (sauf avec `-v`).

## Variantes utiles
- `cp *.png images/` : plusieurs fichiers vers un dossier
- PowerShell : `Copy-Item -Recurse`

> [!warning] Erreurs fréquentes
> - Oublier `-r` pour un dossier
> - Écraser un fichier existant sans prévenir (utiliser `-i`)

## Relier
- **Commandes complémentaires** : [[mv]] · [[rm]]
- **Concepts associés** : [[Bash]] · [[Système de fichiers]]
