---
type: concept
domain: git
module: "[[Module 03 - Git et GitHub]]"
status: a-decouvrir
level: intermediaire
niveau: 3
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Merge]]"
parents:
  - "[[Git]]"
related: []
next_review: 
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

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine deux branches qui modifient la même ligne de `main.py`, puis le merge. Montre l'endroit exact où Git s'arrête et ce que tu dois choisir.

> [!example] ⚖️ Avant / après
> Avant / après : le fichier avec les marqueurs `<<<<<<<`, puis le fichier résolu. Dessine ce que tu as gardé.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Conflit de merge » et je l'intègre ici avec `![[Schéma - Conflit de merge.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Merge]]
- **Erreur documentée** : [[Erreur - CONFLICT lors d'un git merge]]
- **Commandes** : [[git merge]] · [[git status]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
