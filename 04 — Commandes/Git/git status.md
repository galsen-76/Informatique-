---
type: command
tool: Git
level: debutant
concepts:
  - "[[Git]]"
  - "[[Commit]]"
tags:
  - commande
  - git
---
# git status

> [!info] Git
> Affiche l'état du dépôt : branche courante, fichiers modifiés, fichiers prêts à être commités.

## Pourquoi l'utiliser
C'est la commande « où en suis-je ? ». À lancer avant et après chaque action Git.

## Dans quel contexte
En permanence : avant un `add`, avant un `commit`, pendant un merge.

## Syntaxe
```bash
git status [-s]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-s` | Format court : une ligne par fichier (`M` modifié, `A` ajouté, `??` non suivi) |

## Exemple concret
```bash
git status -s
```

## Résultat attendu
```text
 M server.js
?? notes.json
```
`server.js` modifié mais pas encore dans l'index ; `notes.json` jamais suivi.



## Relier
- **Commandes complémentaires** : [[git add]] · [[git commit]]
- **Concepts associés** : [[Git]] · [[Commit]]
