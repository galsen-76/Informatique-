---
type: concept
module: "[[Module 22 - Design patterns]]"
related:
  - "[[Patron Fabrique (Factory)]]"
  - "[[Patron État (State)]]"
  - "[[Principes SOLID]]"
tags:
  - concept
  - architecture
---
# Patron Stratégie (Strategy)

> [!info] En une phrase
> La stratégie met chaque variante d'un algorithme (un format, un calcul, une règle) dans son propre objet ou sa propre fonction, interchangeable à l'exécution.

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
- `sorted(key=…)`, `Array.sort(comparateur)`
- Stratégies d'authentification (Passport.js), de nouvel essai, de tarification

> [!warning] À ne pas confondre
> La **stratégie** (le client choisit la variante) n'est pas l'**état** (l'objet change lui-même de comportement quand son état change).

## 3 · Relier
- **Au travail** : [Patron Stratégie (Strategy) au travail](obsidian://open?vault=Travail&file=Patron%20Strat%C3%A9gie%20%28Strategy%29%20au%20travail)
- **Prérequis** : [[Interface et polymorphisme]]
- **Complémentaires** : [[Patron Fabrique (Factory)]] · [[Patron État (State)]] · [[Principes SOLID]]
