---
type: concept
domain: algorithmique
module: "[[Module 21 - Algorithmique]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Liste et dictionnaire]]"
  - "[[Récursivité]]"
parents:
  - "[[Algorithme]]"
related:
  - "[[Parcours en largeur et en profondeur]]"
next_review: 
method: []
tags:
  - concept
  - algorithmique
---
# Arbre et graphe

> [!info] En une phrase
> Un graphe est un ensemble de nœuds reliés par des liens ; un arbre est un graphe sans cycle, avec une racine, où chaque nœud a un seul parent.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Graphe** : des **nœuds** (sommets) et des **arêtes** (liens). Les liens peuvent avoir un **sens** (A dépend de B) et un **poids** (une distance, un coût).
**Arbre** : une **racine**, des **enfants**, des **feuilles** (sans enfant), pas de boucle.
Tu en manipules déjà partout :
| Arbre | Graphe |
| --- | --- |
| le [[Système de fichiers]] (dossiers et fichiers) | les modules de ce parcours et leurs prérequis |
| le [[DOM]] d'une page | les commits Git (un commit a un ou deux parents) |
| un JSON imbriqué | les jobs d'une pipeline et leurs `needs` |
| les composants React | le réseau, Internet, les routes entre villes |
Représenter un graphe en code : une **liste d'adjacence**, un dictionnaire nœud → voisins.
```python
prerequis = {
    "Python": ["Fondamentaux", "Terminal"],
    "Docker": ["Terminal", "Python"],
    "DevOps": ["Git", "Docker", "Tests"],
}
```

### Pourquoi ça existe
Beaucoup de données ne sont ni des listes ni des tableaux : ce sont des relations (dépendances, hiérarchies, chemins).

### Le problème résolu
Disposer d'un modèle unique pour des problèmes très différents : ordre de dépendances, plus court chemin, hiérarchies.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
R[Racine] --> A[Nœud]
  R --> B[Nœud]
  A --> F1[Feuille]
  A --> F2[Feuille]
```

### Exemple concret
Un arbre en Python (une annotation avec des sous-éléments) :
```python
arbre = {"nom": "projet", "enfants": [
    {"nom": "tâche 1", "enfants": [{"nom": "job 1", "enfants": []}]},
    {"nom": "tâche 2", "enfants": []},
]}
def afficher(n, profondeur=0):
    print("  " * profondeur + n["nom"])
    for e in n["enfants"]:
        afficher(e, profondeur + 1)       # la récursivité suit l'arbre
```
L'ordre dans lequel on peut suivre les modules d'un parcours en respectant les prérequis s'appelle un **tri topologique** (c'est aussi ce que fait la CI avec `needs`, ou npm avec les dépendances).

### Cas d'utilisation
- Dépendances (paquets, jobs de CI, modules)
- Hiérarchies (dossiers, DOM, organisation)
- Chemins (réseau, cartes)

> [!warning] À ne pas confondre
> Un **arbre** n'a pas de cycle : si A dépend de B et B de A, c'est un graphe avec cycle, et un tri topologique est impossible (c'est l'erreur « dépendance circulaire »).

## 3 · Pratiquer
- Dessine le graphe des prérequis des modules de ton coffre, puis donne à la main un ordre qui les respecte

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Liste et dictionnaire]] · [[Récursivité]]
- **Complémentaires** : [[Parcours en largeur et en profondeur]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
