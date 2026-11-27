---
type: concept
module: "[[Module 03 - Git et GitHub]]"
related:
  - "[[Commit]]"
tags:
  - concept
  - git
---
# Index Git (staging)

> [!info] En une phrase
> La zone de préparation entre tes fichiers modifiés et le prochain commit : git add y met ce qui partira, et seulement ça.

## 1 · Comprendre
### Définition
Git a trois zones :
1. le **répertoire de travail** : tes fichiers tels qu'ils sont sur le disque ;
2. l'**index** (*staging area*) : ce que tu as préparé avec `git add` ;
3. l'**historique** : les commits.
`git commit` enregistre **l'index**, pas le répertoire de travail.

### Pourquoi ça existe
Choisir précisément ce qui entre dans un commit, même si tu as modifié plusieurs choses à la fois.

### Le problème résolu
Committer d'un coup des changements qui n'ont rien à voir, ou des fichiers de test oubliés.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  W[Travail] -- git add --> I[Index]
  I -- git commit --> H[Historique]
  I -- git restore --staged --> W
```

### Exemple concret
```bash
git status                  # rouge : modifié non indexé ; vert : indexé
git add zipper.py           # un fichier
git add -p                  # morceau par morceau (choix interactif)
git diff                    # travail vs index
git diff --staged           # index vs dernier commit : ce qui va partir
git restore --staged a.py   # retirer de l'index sans perdre la modification
```

### Cas d'utilisation
- Faire deux commits propres à partir de modifications mélangées
- Relire exactement ce qui part avant chaque commit

> [!warning] À ne pas confondre
> `git add` ne sauvegarde rien dans l'historique : il **prépare**. Et un fichier modifié **après** `git add` doit être ré-ajouté, sinon c'est l'ancienne version qui part.

## 3 · Relier
- **Prérequis** : [[Dépôt Git]]
- **Mène à** : [[Commit]]
- **Commandes** : [[git add]] · [[git status]] · [[git diff]] · [[git restore]]
