---
type: concept
domain: python
module: "[[Module 16 - Python]]"
status: a-decouvrir
level: debutant
niveau: 0
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Python]]"
parents:
  - "[[Python]]"
related:
  - "[[Liste et dictionnaire]]"
next_review: 
method: []
tags:
  - concept
  - python
---
# Variables et types

> [!info] En une phrase
> Une variable est un nom posé sur une valeur ; le type de la valeur (texte, nombre, booléen…) dit ce qu'on peut en faire.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Une **variable** se crée en lui donnant une valeur : `taille = 42`. Pas de mot-clé comme `let` en JavaScript. Chaque valeur a un **type** :

| Type | Exemple | Sert à |
| --- | --- | --- |
| `str` (texte) | `"rapport.pdf"` | noms, chemins, messages |
| `int` (entier) | `42` | compter |
| `float` (décimal) | `3.5` | mesures |
| `bool` | `True`, `False` | oui ou non |
| `None` | `None` | « pas de valeur » |

### Pourquoi ça existe
Le programme doit retenir des informations (un nom de fichier, un compteur) et savoir quelles opérations ont un sens : on additionne des nombres, on met des textes bout à bout.

### Le problème résolu
Sans type, `"2" + 2` serait ambigu. Python refuse et t'oblige à dire ce que tu veux : `int("2") + 2` ou `"2" + str(2)`.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  N[Nom] --> V[Valeur]
  V --> T[Type]
```
- `type(x)` affiche le type d'une valeur.
- Conversions : `int("42")`, `str(42)`, `float("3.5")`.
- **f-string** pour construire un texte : `f"{nb} fichiers dans {dossier}"`.

### Exemple concret
```python
dossier = "photos"          # str
nb_fichiers = 12            # int
compresser = True           # bool

print(f"{nb_fichiers} fichiers dans {dossier}")
print(type(nb_fichiers))    # <class 'int'>

nom = "rapport.PDF"
print(nom.lower())          # rapport.pdf
print(nom.endswith(".PDF")) # True
print(len(nom))             # 11
```

> [!abstract]- Comment ça s'écrit (référence à chercher, pas à apprendre par cœur)
> L'idée est la même partout ; seule l'écriture change.
>
> **Python**
> ```python
> nom = "photos"     # str
> total = 0          # int
> actif = True       # bool
> rien = None
> ```
> Pas de mot-clé. `type(x)` donne le type, `==` compare.
>
> **JavaScript / TypeScript**
> ```js
> const nom = "photos";   // ne sera pas réaffectée
> let total = 0;           // pourra changer
> const actif = true;
> let rien = null;         // undefined = jamais rempli
> // TypeScript : let total: number = 0;
> ```
> `const` par défaut, `let` si la valeur change, jamais `var`. Compare avec `===` (strict) : `==` convertit les types (`"0" == 0` vaut `true`). `const liste = []` peut quand même recevoir `push` : seule la réaffectation est interdite.
>
> **Bash**
> ```bash
> NOM="photos"        # pas d'espace autour du =
> echo "$NOM"         # $ pour lire la valeur
> TOTAL=$((TOTAL + 1)) # calcul entier
> ```
> En Bash tout est du texte ; les guillemets autour de `"$NOM"` évitent les surprises avec les espaces.

### Cas d'utilisation
- Retenir le dossier à traiter, le nom de l'archive, un compteur
- Construire des noms de fichiers : `f"export_{date}.zip"`

> [!warning] À ne pas confondre
> `=` (je range une valeur) et `==` (je compare deux valeurs). Et `"42"` (texte) ≠ `42` (nombre) : ce que tu lis dans un fichier ou une variable d'environnement est **toujours du texte**.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine des étiquettes (noms) posées sur des valeurs : un `int`, un `str`, une `list`. Montre ce qui arrive quand deux noms pointent la même liste.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   I[input 42] --> N[Nombre 42]
>   N --> A[Addition OK]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Variables et types » et je l'intègre ici avec `![[Schéma - Variables et types.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Dépenses 01 - Lire les dépenses]]

## 4 · Relier
- **Prérequis** : [[Python]]
- **Complémentaires** : [[Liste et dictionnaire]]
- **Utilisé par** : [[Condition (if)]] · [[Boucle (for, while)]] · [[Fonction]]

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
