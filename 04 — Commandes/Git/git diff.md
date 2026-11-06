---
type: command
tool: Git
level: debutant
concepts:
  - "[[Commit]]"
  - "[[Convention de commit]]"
tags:
  - commande
  - git
---
# git diff

> [!info] Git
> Montre les différences ligne par ligne : ce qui a changé et n'est pas encore commité, ou entre deux commits.

## Pourquoi l'utiliser
Relire exactement ce qu'on s'apprête à committer.

## Dans quel contexte
Avant chaque `git add` et chaque `git commit` ; pour comparer deux versions.

## Syntaxe
```bash
git diff [--staged] [commit1] [commit2] [-- chemin]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| (sans option) | modifié mais **pas encore** ajouté avec `git add` |
| `--staged` | ce qui est ajouté et **partira** au prochain commit |
| `A B` | différences entre deux commits, tags ou branches |
| `--stat` | seulement la liste des fichiers et le nombre de lignes |
| `-- chemin` | limite à un fichier ou un dossier |

## Exemple concret
```bash
git add .gitlab-ci.yml
git diff --staged
```

## Résultat attendu
Les lignes retirées sont précédées de `-` (rouge), les lignes ajoutées de `+` (vert).

## Variantes utiles
- `git diff v2.19.0 v2.20.0 --stat` : ce qui change entre deux versions
- `git diff main -- Dockerfile` : un fichier par rapport à `main`
- `git diff --name-only` : seulement les noms

> [!warning] Erreurs fréquentes
> - `git diff` vide alors qu'on a modifié : les changements sont déjà ajoutés, utiliser `--staged`
> - Tout le fichier apparaît modifié : souvent les fins de ligne CRLF/LF, voir [[Fichiers entre Windows et Linux]]

## Relier
- **Commandes complémentaires** : [[git status]] · [[git add]] · [[git commit]] · [[git grep]]
- **Concepts associés** : [[Commit]] · [[Convention de commit]]
