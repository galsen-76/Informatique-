---
type: command
tool: Linux
level: debutant
concepts:
  - "[[Arborescence Linux]]"
tags:
  - commande
  - linux
---
# du

> [!info] Linux
> Affiche la taille des fichiers et dossiers.

## Pourquoi l'utiliser
Trouver ce qui remplit un disque.

## Dans quel contexte
Après un `df` qui montre un disque plein.

## Syntaxe
```bash
du -sh chemin
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-s` | total seulement |
| `-h` | tailles lisibles |
| `-d 1` | un niveau de profondeur |

## Exemple concret
```bash
du -sh ~/projets/*
sudo du -h -d 1 /var | sort -h
```

## Résultat attendu
La taille de chaque élément.

## Variantes utiles
- `ncdu` (à installer) : explorateur interactif

> [!warning] Erreurs fréquentes
> - Lent sur de très gros dossiers

## Relier
- **Commandes complémentaires** : [[df]] · [[find]]
- **Concepts associés** : [[Arborescence Linux]]
