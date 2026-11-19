---
type: concept
domain: algorithmique
module: "[[Module 21 - Algorithmique]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Boucle (for, while)]]"
  - "[[Liste et dictionnaire]]"
parents:
  - "[[Algorithme]]"
related:
  - "[[Méthodes de tableau (map, filter, reduce)]]"
next_review: 
method: []
tags:
  - concept
  - algorithmique
---
# Motifs de boucle

> [!info] En une phrase
> La plupart des boucles suivent quelques motifs connus : compter, accumuler, chercher, garder le meilleur, filtrer, transformer, regrouper ; les reconnaître permet d'écrire vite un code juste.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
| Motif | Idée | Variable de départ |
| --- | --- | --- |
| **Compter** | combien d'éléments vérifient une condition | `compte = 0` puis `+= 1` |
| **Accumuler** | somme, produit, concaténation | `total = 0` (ou `1`, ou `""`) |
| **Chercher** | existe-t-il un élément qui… ? on s'arrête dès qu'on trouve | `trouve = False` ou `return` dans la boucle |
| **Meilleur** | minimum, maximum, le plus long | le premier élément, ou `None` |
| **Filtrer** | garder certains éléments | `resultat = []` puis `append` |
| **Transformer** | appliquer une opération à chacun | `resultat = []` |
| **Regrouper / compter par clé** | combien par catégorie | `groupes = {}` |
| **Deux indices** | comparer le début et la fin, ou deux listes triées | `i = 0`, `j = len(l) - 1` |
Pour chacun, trois questions : **valeur de départ** ? **que faire à chaque tour** ? **quand s'arrêter** ?

### Pourquoi ça existe
Devant une boucle à écrire, on hésite sur l'initialisation et la mise à jour, et on fait des erreurs de un (*off-by-one*).

### Le problème résolu
Reconnaître le motif et écrire du premier coup une boucle correcte, dans n'importe quel langage.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
I[Initialiser] --> B{Encore un élément ?}
  B -->|oui| M[Mettre à jour]
  M --> B
  B -->|non| R[Résultat]
```

### Exemple concret
```python
mots = ["zip", "docker", "git", "python", "ci"]
# compter
courts = 0
for m in mots:
    if len(m) <= 3:
        courts += 1                      # 3
# meilleur
plus_long = mots[0]
for m in mots[1:]:
    if len(m) > len(plus_long):
        plus_long = m                    # "docker"
# regrouper
par_longueur = {}
for m in mots:
    par_longueur.setdefault(len(m), []).append(m)   # {3: ['zip', 'git'], 6: [...], 2: ['ci']}
# deux indices : palindrome
def palindrome(s):
    i, j = 0, len(s) - 1
    while i < j:
        if s[i] != s[j]:
            return False
        i, j = i + 1, j - 1
    return True
```
En Python et en JavaScript, plusieurs motifs ont une écriture courte : `sum`, `max(key=…)`, compréhensions, `filter`, `map`, `reduce`. Comprends d'abord la boucle, puis utilise le raccourci.

### Cas d'utilisation
- La majorité des boucles de tes scripts
- Exercices d'algorithmique
- Lire du code plus vite

> [!warning] À ne pas confondre
> Initialiser un maximum à `0` : faux si tous les nombres sont négatifs. Commence par le premier élément. Et modifier une liste pendant qu'on la parcourt : construis plutôt une nouvelle liste.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine cinq petites boucles (compter, accumuler, chercher, garder le meilleur, filtrer) sur la liste des dépenses, avec la variable qui évolue.

> [!example] 🔄 Change de contexte
> Trouve dans ton script de réannotation deux boucles et dessine quel motif chacune suit.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Motifs de boucle » et je l'intègre ici avec `![[Schéma - Motifs de boucle.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Boucle (for, while)]] · [[Liste et dictionnaire]]
- **Complémentaires** : [[Méthodes de tableau (map, filter, reduce)]]

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
