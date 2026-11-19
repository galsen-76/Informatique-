---
type: concept
domain: algorithmique
module: "[[Module 21 - Algorithmique]]"
status: a-decouvrir
level: debutant
niveau: 0
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Condition (if)]]"
  - "[[Boucle (for, while)]]"
parents: []
related:
  - "[[Décomposer un problème]]"
  - "[[Pseudo-code et trace d'exécution]]"
next_review: 
method: []
tags:
  - concept
  - algorithmique
---
# Algorithme

> [!info] En une phrase
> Un algorithme est une suite finie d'étapes précises qui, à partir de données d'entrée, produit un résultat ; c'est la solution d'un problème, indépendamment du langage dans lequel on l'écrit.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Une recette de cuisine, un itinéraire, la méthode pour poser une division : ce sont des algorithmes. Ils ont :
- des **entrées** (les ingrédients, le nombre à diviser) ;
- des **étapes** précises, sans ambiguïté, dans un ordre défini ;
- une **sortie** (le plat, le quotient) ;
- une **fin** : on s'arrête toujours.
Avec seulement quatre briques, on écrit n'importe quel algorithme :
1. **séquence** (faire A, puis B) ;
2. **condition** (si… sinon…) ;
3. **répétition** (tant que…, pour chaque…) ;
4. **variables** (se souvenir d'une valeur).
Le **langage** (Python, JavaScript, Bash) n'est qu'une façon d'écrire l'algorithme pour la machine. Celui qui sait trouver l'algorithme apprend un nouveau langage en quelques jours ; celui qui n'a appris que la syntaxe est perdu dès que le problème change.

### Pourquoi ça existe
Un ordinateur ne sait rien deviner : il faut lui dire exactement quoi faire, étape par étape.

### Le problème résolu
Transformer un problème flou (« trier les fichiers ») en une méthode qui marche à tous les coups, pour toutes les entrées possibles.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
E[Entrées] --> A[Étapes]
  A --> S[Sortie]
```

### Exemple concret
Problème : trouver le plus gros fichier d'un dossier.
```
entrée : une liste de fichiers avec leur taille
plus_gros ← aucun
pour chaque fichier f de la liste :
    si plus_gros est aucun ou f.taille > plus_gros.taille :
        plus_gros ← f
sortie : plus_gros
```
Le même algorithme en Python :
```python
def plus_gros(fichiers):
    meilleur = None
    for f in fichiers:
        if meilleur is None or f.taille > meilleur.taille:
            meilleur = f
    return meilleur
```
Et en JavaScript, en Bash… l'idée reste la même.

### Cas d'utilisation
- Tout programme que tu écris
- Résoudre un exercice ou un bug
- Les entretiens techniques

> [!warning] À ne pas confondre
> Un **algorithme** (la méthode) n'est pas un **programme** (la méthode écrite dans un langage précis). Et « ça marche sur mon exemple » ne veut pas dire que l'algorithme est juste : il doit marcher pour **toutes** les entrées, y compris vides ou bizarres.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine en boîtes l'algorithme « calculer le total par catégorie » : entrées, étapes, sortie.

> [!example] 🔄 Change de contexte
> Redessine le même algorithme pour « trouver la plus grosse dépense ». Quelles étapes changent ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Algorithme » et je l'intègre ici avec `![[Schéma - Algorithme.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Dépenses 02 - Classer les dépenses]]

## 4 · Relier
- **Prérequis** : [[Condition (if)]] · [[Boucle (for, while)]]
- **Complémentaires** : [[Décomposer un problème]] · [[Pseudo-code et trace d'exécution]]
- **Utilisé par** : [[Complexité (notation grand O)]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
