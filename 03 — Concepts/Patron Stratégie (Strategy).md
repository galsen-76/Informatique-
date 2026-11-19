---
type: concept
domain: architecture
module: "[[Module 22 - Design patterns]]"
status: a-decouvrir
level: intermediaire
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Interface et polymorphisme]]"
parents:
  - "[[Design pattern]]"
related:
  - "[[Patron Fabrique (Factory)]]"
  - "[[Patron État (State)]]"
  - "[[Principes SOLID]]"
next_review: 
method: []
tags:
  - concept
  - architecture
---
# Patron Stratégie (Strategy)

> [!info] En une phrase
> La stratégie met chaque variante d'un algorithme (un format, un calcul, une règle) dans son propre objet ou sa propre fonction, interchangeable à l'exécution.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Famille :** comportemental (comment les objets collaborent)

**Le problème typique :** un même traitement existe en plusieurs variantes (export PNG, CSV, JSON ; tri par date ou par taille ; tarif normal ou réduit).

**L'idée :** une interface commune, une classe (ou une simple fonction) par variante, et le code principal reçoit la variante à utiliser.

### Pourquoi ça existe
Sans ce patron : un long `if … elif …` qui grossit à chaque variante, dans une fonction que tout le monde modifie.

### Quand l'utiliser
**Quand l'utiliser :** plusieurs variantes d'un traitement, choisies à l'exécution, et d'autres viendront.

**Quand ne pas l'utiliser :** deux cas stables : un `if` est plus simple.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
C[Contexte] --> I[Interface]
  S1[Variante PNG] -.-> I
  S2[Variante CSV] -.-> I
  S3[Variante JSON] -.-> I
```

### Exemple concret
Avant :
```python
def exporter(annotations, format):
    if format == "csv": ...
    elif format == "json": ...
    elif format == "png": ...      # chaque nouveau format modifie cette fonction
```
Après :
```python
STRATEGIES: dict[str, Callable[[list[dict]], bytes]] = {
    "csv":  exporter_csv,
    "json": exporter_json,
    "png":  exporter_png,
}
def exporter(annotations, format):
    return STRATEGIES[format](annotations)
```
En Python et en JavaScript, une **fonction** suffit souvent comme stratégie ; une classe quand la variante a de la configuration ou plusieurs méthodes. `sorted(liste, key=…)` est une stratégie : tu donnes la règle de tri.

### Cas d'utilisation
- Formats d'export de ta fonction Nuclio
- `sorted(key=…)`, `Array.sort(comparateur)`
- Stratégies d'authentification (Passport.js), de nouvel essai, de tarification

> [!warning] À ne pas confondre
> La **stratégie** (le client choisit la variante) n'est pas l'**état** (l'objet change lui-même de comportement quand son état change).

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] ⚖️ Avant / après
> Avant / après : un gros `if format == ...` dans l'export, puis une stratégie par format. Dessine ce qu'il faut ajouter pour un nouveau format.

> [!example] 🛣️ Suis le trajet
> Dessine le code appelant qui reçoit une stratégie et l'utilise sans savoir laquelle c'est.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Patron Stratégie (Strategy) » et je l'intègre ici avec `![[Schéma - Patron Stratégie (Strategy).excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Interface et polymorphisme]]
- **Complémentaires** : [[Patron Fabrique (Factory)]] · [[Patron État (State)]] · [[Principes SOLID]]

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
