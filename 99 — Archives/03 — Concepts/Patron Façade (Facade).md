---
type: concept
module: "[[Module 22 - Design patterns]]"
related:
  - "[[Patron Adaptateur (Adapter)]]"
  - "[[Architecture en couches]]"
tags:
  - concept
  - architecture
---
# Patron Façade (Facade)

> [!info] En une phrase
> La façade offre une interface simple qui cache un ensemble compliqué de classes ou d'appels derrière quelques méthodes claires.

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
B[Bouton export] --> F[Façade export]
  F --> C[Client API]
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

# le handler ne voit que la façade
def handler(context, event):
    return service.exporter(event.body["tache_id"])
```
Exemples connus : le module `shutil` (une ligne pour `make_archive` au lieu de manipuler `zipfile` et `os`), `requests` par rapport à `http.client`, la commande `docker compose up` par rapport à une suite de `docker network create`, `docker run`…

### Cas d'utilisation
- Un service qui orchestre plusieurs appels
- Une bibliothèque qui simplifie une autre

> [!warning] À ne pas confondre
> La **façade** (simplifie et orchestre plusieurs objets) n'est pas l'**adaptateur** (traduit l'interface d'un seul objet).

## 3 · Relier
- **Au travail** : [Patron Façade (Facade) au travail](obsidian://open?vault=Travail&file=Patron%20Fa%C3%A7ade%20%28Facade%29%20au%20travail)
- **Prérequis** : [[Interface et polymorphisme]]
- **Complémentaires** : [[Patron Adaptateur (Adapter)]] · [[Architecture en couches]]
