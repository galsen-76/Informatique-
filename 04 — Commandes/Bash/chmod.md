---
type: command
tool: Bash
level: debutant
concepts:
  - "[[Permissions Linux]]"
  - "[[Fichiers entre Windows et Linux]]"
tags:
  - commande
  - bash
---
# chmod

> [!info] Bash
> Change les droits d'un fichier (lire, écrire, exécuter).

## Pourquoi l'utiliser
Rendre un script exécutable, protéger un fichier.

## Dans quel contexte
Un `Permission denied` en lançant `./script.sh`.

## Syntaxe
```bash
chmod [qui][+-][rwx] fichier
chmod 755 fichier
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `+x` | ajoute l'exécution pour tous |
| `u+x` | seulement pour le propriétaire |
| `755` | rwxr-xr-x |
| `644` | rw-r--r-- |
| `-R` | récursif |

## Exemple concret
```bash
chmod +x entrypoint.sh
ls -l entrypoint.sh
```

## Résultat attendu
`ls -l` affiche un `x` : `-rwxr-xr-x`.

## Variantes utiles
- Pour que Git le retienne : `git update-index --chmod=+x fichier`

> [!warning] Erreurs fréquentes
> - `chmod 777` : n'importe qui peut modifier
> - Changer le droit sur le disque sans le commiter : la CI ne le voit pas

## Relier
- **Commandes complémentaires** : [[sudo]] · [[ls]]
- **Concepts associés** : [[Permissions Linux]] · [[Fichiers entre Windows et Linux]]
