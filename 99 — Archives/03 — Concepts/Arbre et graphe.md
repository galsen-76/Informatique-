---
type: concept
module: "[[Module 21 - Algorithmique]]"
related:
  - "[[Parcours en largeur et en profondeur]]"
tags:
  - concept
  - algorithmique
---
# Arbre et graphe

> [!info] En une phrase
> Un graphe est un ensemble de nœuds reliés par des liens ; un arbre est un graphe sans cycle, avec une racine, où chaque nœud a un seul parent.

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

## 3 · Relier
- **Prérequis** : [[Liste et dictionnaire]] · [[Récursivité]]
- **Complémentaires** : [[Parcours en largeur et en profondeur]]
