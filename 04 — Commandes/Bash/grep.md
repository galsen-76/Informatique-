---
type: command
tool: Bash
level: debutant
concepts:
  - "[[Bash]]"
  - "[[Redirection et pipe]]"
tags:
  - commande
  - bash
---
# grep

> [!info] Bash
> Cherche les lignes qui contiennent un texte, dans des fichiers ou dans la sortie d'une autre commande.

## Pourquoi l'utiliser
Fouiller un code ou un log sans l'ouvrir.

## Dans quel contexte
Trouver où une variable est utilisée, filtrer les erreurs d'un log.

## Syntaxe
```bash
grep [options] "motif" [fichiers...]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-r` | dans tous les fichiers d'un dossier |
| `-n` | numéros de ligne |
| `-i` | ignore la casse |
| `-v` | les lignes qui **ne** contiennent **pas** |
| `-l` | seulement les noms de fichiers |
| `-E` | expressions régulières étendues |

## Exemple concret
```bash
grep -rn "CVAT_HOST" .
docker logs api 2>&1 | grep -i error
```

## Résultat attendu
Chaque résultat : `fichier:ligne:contenu`.

## Variantes utiles
- `grep -c` : compter
- `grep -rn --include="*.py" "zipfile" .`
- Dans un dépôt : `git grep` (plus rapide)
- PowerShell : `Select-String`

> [!warning] Erreurs fréquentes
> - Oublier les guillemets autour d'un motif avec des espaces
> - Chercher dans `node_modules` ou `.venv` : très lent, utiliser `git grep`

## Relier
- **Commandes complémentaires** : [[git grep]] · [[cat]]
- **Concepts associés** : [[Bash]] · [[Redirection et pipe]]
