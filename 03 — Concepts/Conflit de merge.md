---
type: concept
module: "[[Module 03 - Git et GitHub]]"
related: []
tags:
  - concept
  - git
---
# Conflit de merge

> [!info] En une phrase
> Ce qui arrive quand deux branches ont modifié les mêmes lignes : Git ne peut pas choisir à ta place.

## 1 · Comprendre
### Définition
Git marque les zones en conflit dans le fichier avec `<<<<<<<`, `=======` et `>>>>>>>`. Tu choisis le bon contenu, supprimes les marqueurs, puis `git add` et `git commit`.

### Pourquoi ça existe
Git ne peut pas deviner quelle version garder quand deux personnes ont modifié les mêmes lignes.

### Le problème résolu
Écraser silencieusement le travail de quelqu'un.

## 2 · Explorer
### Comment ça fonctionne
```text
<<<<<<< HEAD
const PORT = 3000;
=======
const PORT = 8080;
>>>>>>> feature/config
```

### Exemple concret
```bash
git merge feat/config        # CONFLICT (content): Merge conflict in config.js
git status                   # liste les fichiers en conflit
# éditer le fichier : garder la bonne version, supprimer <<<<<<< ======= >>>>>>>
git add config.js
git commit                   # ou git rebase --continue pendant un rebase
git merge --abort            # tout annuler si besoin
```
VS Code propose *Accept Current / Incoming / Both* au-dessus de chaque conflit.

### Cas d'utilisation
- Après un `git pull`, un `merge` ou un `rebase`
- Voir [[Erreur - CONFLICT lors d'un git merge]]

> [!warning] À ne pas confondre
> Un conflit n'est **pas une erreur** ni une perte de données : c'est Git qui te demande d'arbitrer.

## 3 · Relier
- **Prérequis** : [[Merge]]
- **Erreur documentée** : [[Erreur - CONFLICT lors d'un git merge]]
- **Commandes** : [[git merge]] · [[git status]]
