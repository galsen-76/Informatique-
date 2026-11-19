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

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🛣️ Suis le trajet
> Dessine deux branches qui modifient la même ligne de `main.py`, puis le merge. Montre l'endroit exact où Git s'arrête et ce que tu dois choisir.

> [!example] ⚖️ Avant / après
> Avant / après : le fichier avec les marqueurs `<<<<<<<`, puis le fichier résolu. Dessine ce que tu as gardé.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Conflit de merge » et je l'intègre ici avec `![[Schéma - Conflit de merge.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Merge]]
- **Erreur documentée** : [[Erreur - CONFLICT lors d'un git merge]]
- **Commandes** : [[git merge]] · [[git status]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
