---
type: command
tool: Git
level: debutant
concepts:
  - "[[Commit]]"
  - "[[Git]]"
tags:
  - commande
  - git
---
# git commit

> [!info] Git
> Enregistre le contenu de l'index comme un nouveau commit dans l'historique.

## Pourquoi l'utiliser
C'est la seule action qui ajoute réellement une version à l'historique.

## Dans quel contexte
Quand un petit ensemble cohérent de changements est prêt (une fonction, une correction).

## Syntaxe
```bash
git commit -m "message"
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-m` | Message du commit |
| `-a` | Ajoute automatiquement les fichiers *déjà suivis* modifiés (pas les nouveaux) |
| `--amend` | Corrige le dernier commit (à éviter s'il a déjà été poussé) |

## Exemple concret
```bash
git commit -m "Ajoute la route POST /notes"
```

## Résultat attendu
```text
[main 3f2a1c4] Ajoute la route POST /notes
 1 file changed, 12 insertions(+)
```

> [!warning] Erreurs fréquentes
> - `nothing to commit` : tu as oublié `git add`.
> - Message vide ou « fix » : dans trois semaines tu ne sauras plus ce que fait ce commit.


## Relier
- **Commandes complémentaires** : [[git add]] · [[git status]]
- **Concepts associés** : [[Commit]] · [[Git]]
