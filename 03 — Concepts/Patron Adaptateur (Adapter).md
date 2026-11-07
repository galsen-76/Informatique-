---
type: concept
domain: architecture
module: "[[Module 22 - Design patterns]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Interface et polymorphisme]]"
parents:
  - "[[Design pattern]]"
related:
  - "[[Patron Façade (Facade)]]"
  - "[[Architecture hexagonale]]"
next_review: 
method: []
tags:
  - concept
  - architecture
---
# Patron Adaptateur (Adapter)

> [!info] En une phrase
> L'adaptateur enveloppe un objet dont l'interface ne convient pas pour lui donner l'interface attendue par ton code, comme un adaptateur de prise électrique.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Famille :** structurel (comment assembler les objets)

**Le problème typique :** une bibliothèque, un SDK ou un ancien code a une interface différente de celle que ton code attend.

**L'idée :** une petite classe qui implémente **ton** interface et traduit chaque appel vers celle de la bibliothèque.

### Pourquoi ça existe
Sans ce patron : ton code dépend directement du SDK partout : changer de bibliothèque ou de version oblige à tout modifier, et les tests demandent le vrai service.

### Quand l'utiliser
**Quand l'utiliser :** une interface externe ne correspond pas à la tienne, ou tu veux isoler ton code d'une dépendance.

**Quand ne pas l'utiliser :** l'interface convient déjà : une enveloppe de plus n'apporte rien.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
T[Ton code] --> I[Ton interface]
  A[Adaptateur] -.respecte.-> I
  A -->|traduit| L[SDK externe]
```

### Exemple concret
```python
class SourceAnnotations(Protocol):
    def annotations(self, tache_id: int) -> list[Annotation]: ...

class AdaptateurCvat:                                  # adapte le SDK de CVAT à TON besoin
    def __init__(self, client):
        self._client = client
    def annotations(self, tache_id: int) -> list[Annotation]:
        brut = self._client.tasks.retrieve(tache_id).get_annotations()
        return [Annotation(label=s["label_id"], points=s["points"]) for s in brut["shapes"]]

class AdaptateurXml:                                   # adapte ton ancien script qui lisait du XML
    def __init__(self, chemin): self._chemin = chemin
    def annotations(self, tache_id): return lire_xml(self._chemin)
```
Le reste de ta fonction Nuclio ne manipule que des `Annotation`, quelle que soit la source.

### Cas d'utilisation
- Envelopper le SDK de CVAT ou une API externe
- Faire cohabiter un ancien script et un nouveau code
- Changer de bibliothèque sans tout réécrire

> [!warning] À ne pas confondre
> L'**adaptateur** (change l'interface) n'est pas le **décorateur** (garde la même interface et ajoute un comportement) ni la **façade** (simplifie plusieurs interfaces en une).

## 3 · Pratiquer
- Écris un adaptateur qui donne à `requests` l'interface `get_json(url) -> dict` utilisée par ton code, puis un adaptateur factice pour les tests

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Interface et polymorphisme]]
- **Complémentaires** : [[Patron Façade (Facade)]] · [[Architecture hexagonale]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
