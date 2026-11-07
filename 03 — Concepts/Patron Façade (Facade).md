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
  - "[[Patron Adaptateur (Adapter)]]"
  - "[[Architecture en couches]]"
next_review: 
method: []
tags:
  - concept
  - architecture
---
# Patron Façade (Facade)

> [!info] En une phrase
> La façade offre une interface simple qui cache un ensemble compliqué de classes ou d'appels derrière quelques méthodes claires.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Famille :** structurel

**Le problème typique :** pour faire une action, il faut enchaîner beaucoup d'appels à plusieurs objets dans le bon ordre.

**L'idée :** une classe ou un module qui expose une méthode par besoin réel (`exporter_tache_en_png(12)`) et orchestre les sous-systèmes à l'intérieur.

### Pourquoi ça existe
Sans ce patron : chaque partie du code répète le même enchaînement compliqué, et un changement interne oblige à tout modifier.

### Quand l'utiliser
**Quand l'utiliser :** un enchaînement compliqué est répété, ou il faut protéger le reste du code des détails internes.

**Quand ne pas l'utiliser :** la façade devient une énorme classe qui fait tout (« objet dieu ») : découpe-la par besoin.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
B[Bouton CVAT] --> F[Façade export]
  F --> C[Client CVAT]
  F --> D[Dessin]
  F --> S[Stockage]
```

### Exemple concret
```python
class ServiceExportPng:                     # la façade
    def __init__(self, source, dessinateur, stockage):
        self._source, self._dessin, self._stockage = source, dessinateur, stockage

    def exporter(self, tache_id: int) -> str:
        annotations = self._source.annotations(tache_id)
        image = self._dessin.dessiner(annotations, taille=(2000, 1500))
        chemin = self._stockage.enregistrer(f"tache-{tache_id}.png", image)
        return chemin

# le handler Nuclio ne voit que la façade
def handler(context, event):
    return service.exporter(event.body["tache_id"])
```
Exemples connus : le module `shutil` (une ligne pour `make_archive` au lieu de manipuler `zipfile` et `os`), `requests` par rapport à `http.client`, la commande `docker compose up` par rapport à une suite de `docker network create`, `docker run`…

### Cas d'utilisation
- Le point d'entrée de ta fonction Nuclio
- Un service qui orchestre plusieurs appels
- Une bibliothèque qui simplifie une autre

> [!warning] À ne pas confondre
> La **façade** (simplifie et orchestre plusieurs objets) n'est pas l'**adaptateur** (traduit l'interface d'un seul objet).

## 3 · Pratiquer
- Écris une façade `archiver_dossier(dossier, format)` qui enchaîne : lister, filtrer, créer l'archive, écrire le rapport

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Interface et polymorphisme]]
- **Complémentaires** : [[Patron Adaptateur (Adapter)]] · [[Architecture en couches]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
