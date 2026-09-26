---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/git/conflits
aliases:
  - "Résoudre les Conflits Git"
parent: "[[Git]]"
related_theory:
  - "[[GIT-02-Branches-Merge-Rebase|Branches Merge et Rebase]]"
related_projects: []
source: "https://git-scm.com/book/fr/v2/Les-branches-avec-Git-Branches-et-fusions%C2%A0%3A-les-bases"
---

# Conflits Git

> [!abstract] En bref
> Un **conflit** arrive quand deux branches ont modifié **les mêmes lignes** d'un fichier. Git ne peut pas deviner quelle version garder : il te montre les deux et te laisse choisir. Ce n'est pas une erreur, c'est une question. Pas de panique.

## À quoi ça ressemble

```text
CONFLICT (content): Merge conflict in src/app/header.component.ts
```

Dans le fichier :

```ts
<<<<<<< HEAD
const titre = 'Mon portfolio';
=======
const titre = 'Portfolio de Ton Nom';
>>>>>>> feature/header
```

| Marqueur | Signification |
|---|---|
| `<<<<<<< HEAD` | début de **ta** version (la branche où tu es) |
| `=======` | séparation |
| `>>>>>>> feature/header` | fin de la version **qui arrive** |

## Résoudre en 4 étapes

1. **Ouvrir** chaque fichier en conflit (`git status` les liste).
2. **Choisir** : garder l'une, l'autre, ou un mélange des deux. **Supprimer les marqueurs.**
3. **Vérifier** que ça compile et que les tests passent.
4. **Terminer** :

```bash
git add src/app/header.component.ts
git commit                  # pour un merge
git rebase --continue       # pour un rebase
```

Pour tout annuler et revenir à l'état d'avant : `git merge --abort` ou `git rebase --abort`.

## Utilise ton éditeur

IntelliJ et VS Code affichent les conflits **en trois colonnes** (ta version, le résultat, l'autre version) avec des boutons « accepter à gauche / à droite ». Beaucoup plus confortable que les marqueurs. Voir [[IJ-06-Git-Controle-Version|Git dans IntelliJ]].

## Moins de conflits

- **Petites branches, fusionnées vite.**
- **`git pull --rebase` souvent** sur ta branche pour suivre `main`.
- **Prettier** : tout le monde formate pareil, pas de conflits d'espaces ou de guillemets.
- **Se parler** : si deux personnes modifient le même fichier, prévenez-vous.

## Cas particulier : le `package-lock.json`

Ne le résous pas à la main. Garde une version, puis régénère :

```bash
git checkout --theirs package-lock.json   # (ou --ours)
npm install
git add package-lock.json
```

## Pièges

- **Commiter avec des marqueurs `<<<<<<<` oubliés** : le code ne compile plus. Cherche `<<<<<<<` avant de commiter.
- **Garder « ma version » partout** sans regarder : tu effaces le travail d'un collègue.
- **Résoudre sans relancer l'application** : deux versions correctes séparément peuvent être incompatibles ensemble.
