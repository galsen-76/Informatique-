---
type: concept
domain: git
module: "[[Module 03 - Git et GitHub]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Merge]]"
parents:
  - "[[Git]]"
related: []
next_review: 
method: []
tags:
  - concept
  - git
---
# Conflit de merge

> [!info] En une phrase
> Ce qui arrive quand deux branches ont modifié les mêmes lignes : Git ne peut pas choisir à ta place.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

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

## 3 · Pratiquer
- Les exercices de cette notion sont listés en haut de la fiche et dans *Validation de la maîtrise*.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Merge]]
- **Erreur documentée** : [[Erreur - CONFLICT lors d'un git merge]]
- **Commandes** : [[git merge]] · [[git status]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
