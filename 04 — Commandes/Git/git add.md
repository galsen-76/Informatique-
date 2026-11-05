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
# git add

> [!info] Git
> Ajoute des modifications à l'index (staging) : elles feront partie du prochain commit.

## Pourquoi l'utiliser
Pour choisir précisément ce qui entre dans un commit, plutôt que tout enregistrer d'un coup.

## Dans quel contexte
Après avoir modifié des fichiers, avant `git commit`.

## Syntaxe
```bash
git add <fichier|dossier|.>
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `fichier` | Un fichier précis |
| `.` | Tout ce qui a changé dans le dossier courant et ses sous-dossiers |
| `-p` | Choisir morceau par morceau (interactif) |

## Exemple concret
```bash
git add server.js
git add .
```

## Résultat attendu
Rien ne s'affiche ; `git status` montre les fichiers en vert (« Changes to be committed »).

> [!warning] Erreurs fréquentes
> - `git add .` ajoute aussi des fichiers indésirables (`node_modules`, `.env`) s'ils ne sont pas dans `.gitignore`.


## Relier
- **Commandes complémentaires** : [[git status]] · [[git commit]]
- **Concepts associés** : [[Commit]] · [[Git]]
