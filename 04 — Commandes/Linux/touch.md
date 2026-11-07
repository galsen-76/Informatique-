---
type: command
tool: Linux
level: debutant
concepts:
  - "[[Système de fichiers]]"
tags:
  - commande
  - linux
---
# touch

> [!info] Linux
> Crée un fichier vide, ou met à jour la date d'un fichier existant.

## Pourquoi l'utiliser
Créer vite un ou plusieurs fichiers vides, par exemple pour préparer un exercice ou un fichier qu'on remplira ensuite.

## Dans quel contexte
Préparer un exercice, déclencher un outil qui surveille les dates.

## Syntaxe
```bash
touch fichier...
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `fichier` | créé s'il n'existe pas |

## Exemple concret
```bash
touch a.png b.png notes.txt
```

## Résultat attendu
Les fichiers existent (taille 0).

## Variantes utiles
- PowerShell : [[New-Item]] `fichier`
- Créer **avec** du contenu : `echo "texte" > fichier` (voir [[echo]])
- Créer et écrire dans un éditeur : [[nano]] `fichier` ou [[code]] `fichier`

> [!warning] Erreurs fréquentes
> - Croire que `touch` vide un fichier existant (il ne change que sa date)

## Relier
- **Commandes complémentaires** : [[mkdir]] · [[ls]] · [[echo]] · [[nano]] · [[New-Item]]
- **Concepts associés** : [[Système de fichiers]]
