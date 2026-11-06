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

## 2 · Explorer
### Comment ça fonctionne
```text
<<<<<<< HEAD
const PORT = 3000;
=======
const PORT = 8080;
>>>>>>> feature/config
```

> [!warning] À ne pas confondre
> Un conflit n'est **pas une erreur** ni une perte de données : c'est Git qui te demande d'arbitrer.

## 3 · Pratiquer
- _Pas encore d’exercice : en créer un avec le template **Exercice**._

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
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
