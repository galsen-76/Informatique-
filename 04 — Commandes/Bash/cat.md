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
# cat

> [!info] Bash
> Affiche le contenu d'un fichier (ou en colle plusieurs bout à bout).

## Pourquoi l'utiliser
Lire rapidement un petit fichier.

## Dans quel contexte
Vérifier un fichier de configuration, un `requirements.txt`, un `.gitlab-ci.yml`.

## Syntaxe
```bash
cat fichier...
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-n` | numérote les lignes |

## Exemple concret
```bash
cat requirements.txt
cat -n Dockerfile
```

## Résultat attendu
Le contenu s'affiche dans le terminal.

## Variantes utiles
- `less fichier` pour les longs fichiers
- `head` / `tail` pour le début ou la fin
- PowerShell : `Get-Content`

> [!warning] Erreurs fréquentes
> - Faire `cat` sur un énorme log : utiliser `less` ou `tail`

## Relier
- **Commandes complémentaires** : [[grep]]
- **Concepts associés** : [[Bash]] · [[Redirection et pipe]]
