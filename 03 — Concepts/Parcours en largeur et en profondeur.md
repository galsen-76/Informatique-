---
type: concept
domain: algorithmique
module: "[[Module 21 - Algorithmique]]"
status: a-decouvrir
level: avance
prerequisites:
  - "[[Arbre et graphe]]"
  - "[[Pile et file]]"
parents:
  - "[[Arbre et graphe]]"
related:
  - "[[Récursivité]]"
next_review: 
method: []
tags:
  - concept
  - algorithmique
---
# Parcours en largeur et en profondeur

> [!info] En une phrase
> Parcourir un graphe ou un arbre, c'est visiter tous ses nœuds : en profondeur (DFS), on va le plus loin possible avant de revenir ; en largeur (BFS), on visite niveau par niveau, ce qui donne le plus court chemin.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
| | Profondeur (DFS) | Largeur (BFS) |
| --- | --- | --- |
| Idée | suivre un chemin jusqu'au bout, puis revenir en arrière | visiter tous les voisins, puis les voisins des voisins |
| Structure | [[Pile et file|pile]] (ou récursivité) | [[Pile et file|file]] |
| Donne | l'exploration complète, l'ordre des dépendances, la détection de cycles | le **plus court chemin** en nombre d'étapes |
| Exemple | `find`, `os.walk`, tri topologique | labyrinthe, « à combien de liens de… » |
Dans les deux cas, on garde un ensemble **`vus`** pour ne pas visiter deux fois le même nœud (sinon, boucle infinie sur un graphe avec cycle).

### Pourquoi ça existe
Il faut une méthode systématique pour explorer une structure dont on ne connaît pas la forme à l'avance.

### Le problème résolu
Trouver un chemin, tout explorer, ou ordonner des dépendances, avec deux algorithmes courts.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
S[Départ] --> V[Voisins]
  V --> Q{File ou pile ?}
  Q -->|file| L[Largeur]
  Q -->|pile| P[Profondeur]
```

### Exemple concret
```python
from collections import deque
def plus_court_chemin(graphe, depart, arrivee):        # BFS
    file = deque([[depart]])
    vus = {depart}
    while file:
        chemin = file.popleft()
        noeud = chemin[-1]
        if noeud == arrivee:
            return chemin
        for voisin in graphe.get(noeud, []):
            if voisin not in vus:
                vus.add(voisin)
                file.append(chemin + [voisin])
    return None

def ordre(graphe):                                      # DFS : tri topologique
    vus, resultat = set(), []
    def visiter(n):
        if n in vus:
            return
        vus.add(n)
        for pre in graphe.get(n, []):
            visiter(pre)
        resultat.append(n)        # ajouté après ses prérequis
    for n in graphe:
        visiter(n)
    return resultat
```

### Cas d'utilisation
- Plus court chemin (labyrinthe, réseau)
- Ordre d'installation ou d'exécution de dépendances
- Explorer un dossier ou un site

> [!warning] À ne pas confondre
> Oublier l'ensemble `vus` : boucle infinie dès qu'il y a un cycle. Et utiliser une pile en croyant faire un BFS : le chemin trouvé n'est plus le plus court.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🛣️ Suis le trajet
> Sur un petit graphe de 6 nœuds, numérote l'ordre de visite en largeur, puis en profondeur. Dessine la file et la pile à côté.

> [!example] 🔄 Change de contexte
> Redessine le parcours sur le graphe des tuyaux de CVAT pour trouver tous les tuyaux reliés à un point. Lequel des deux choisirais-tu ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Parcours en largeur et en profondeur » et je l'intègre ici avec `![[Schéma - Parcours en largeur et en profondeur.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Arbre et graphe]] · [[Pile et file]]
- **Complémentaires** : [[Récursivité]]

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
