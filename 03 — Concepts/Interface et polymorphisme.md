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
  - "[[Héritage et composition]]"
  - "[[Type et interface TypeScript]]"
parents:
  - "[[Classe et objet]]"
related:
  - "[[Principes SOLID]]"
  - "[[Doublure de test (mock)]]"
next_review: 
method: []
tags:
  - concept
  - architecture
---
# Interface et polymorphisme

> [!info] En une phrase
> Une interface décrit ce qu'un objet sait faire sans dire comment ; le polymorphisme permet d'utiliser de la même façon des objets différents qui respectent cette interface.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Interface** : un contrat, une liste de méthodes. « Tout exporteur a une méthode `exporter(annotations)` qui renvoie des octets. »
**Polymorphisme** (« plusieurs formes ») : le code qui utilise l'interface ne sait pas, et n'a pas besoin de savoir, quelle classe concrète il manipule.
```python
from typing import Protocol

class Exporteur(Protocol):               # l'interface (Python)
    def exporter(self, annotations: list[dict]) -> bytes: ...

class ExporteurCsv:
    def exporter(self, annotations): return "\n".join(a["label"] for a in annotations).encode()

class ExporteurJson:
    def exporter(self, annotations): return json.dumps(annotations).encode()

def sauvegarder(exp: Exporteur, annotations, chemin):   # marche avec N'IMPORTE QUEL exporteur
    Path(chemin).write_bytes(exp.exporter(annotations))
```
En TypeScript : `interface Exporteur { exporter(a: Annotation[]): Uint8Array }` et `class ExporteurCsv implements Exporteur`.
En Python, on parle aussi de **duck typing** : « si ça marche comme un canard et cancane comme un canard, c'est un canard » ; `Protocol` permet à l'éditeur de le vérifier.

### Pourquoi ça existe
Sans contrat commun, le code se remplit de `if format == "csv" … elif format == "json" …` qu'il faut modifier à chaque nouveau cas.

### Le problème résolu
Ajouter un nouveau cas (un format, une source de données, un fournisseur) en écrivant une nouvelle classe, sans toucher au code qui l'utilise. C'est le cœur de presque tous les design patterns.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
U[Code appelant] --> I[Interface Exporteur]
  CSV[ExporteurCsv] -.respecte.-> I
  JSON[ExporteurJson] -.respecte.-> I
  PNG[ExporteurPng] -.respecte.-> I
```

### Exemple concret
Le même principe permet de **tester** sans la vraie API :
```python
class SourceAnnotations(Protocol):
    def annotations(self, tache_id: int) -> list[dict]: ...

class SourceCvat:                       # la vraie, en production
    def __init__(self, client): self.client = client
    def annotations(self, tache_id): return self.client.tasks.retrieve(tache_id).get_annotations()["shapes"]

class SourceFactice:                    # pour les tests
    def annotations(self, tache_id): return [{"label": "voiture", "points": [0, 0, 10, 10]}]
```
Ta fonction Nuclio peut recevoir l'une ou l'autre : elle ne voit que l'interface.

### Cas d'utilisation
- Injection de dépendances (Angular, NestJS)
- Tests avec des doublures
- Brancher plusieurs fournisseurs (stockage local ou S3, CVAT ou fichier)

> [!warning] À ne pas confondre
> Une **interface** (le contrat, sans code) n'est pas une **classe parent** (qui contient du code partagé). Et créer une interface pour une seule implémentation qui n'en aura jamais d'autre : c'est du travail pour rien (YAGNI).

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine une interface `Exporteur` avec une méthode `exporter()`, et trois classes qui la respectent. Montre le code appelant qui ne sait pas laquelle il a.

> [!example] 🔄 Change de contexte
> Redessine la même idée avec un `Protocol` Python (un export PNG ou JSON).

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Interface et polymorphisme » et je l'intègre ici avec `![[Schéma - Interface et polymorphisme.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Héritage et composition]] · [[Type et interface TypeScript]]
- **Complémentaires** : [[Principes SOLID]] · [[Doublure de test (mock)]]

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
