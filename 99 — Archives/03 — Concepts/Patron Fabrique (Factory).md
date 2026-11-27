---
type: concept
module: "[[Module 22 - Design patterns]]"
related:
  - "[[Patron Stratégie (Strategy)]]"
  - "[[Patron Monteur (Builder)]]"
tags:
  - concept
  - architecture
---
# Patron Fabrique (Factory)

> [!info] En une phrase
> La fabrique est une fonction ou une méthode qui crée le bon objet à ta place selon un paramètre, pour que le reste du code n'ait pas à connaître les classes concrètes.

## 1 · Comprendre
### Définition
**Famille :** créationnel (comment créer les objets)

**Le problème typique :** le code doit créer un objet dont la classe dépend d'une donnée (un format, une configuration, un environnement).

**L'idée :** rassembler la décision « quelle classe créer ? » en un seul endroit qui renvoie un objet respectant l'interface attendue.

### Pourquoi ça existe
Sans ce patron : des `if … elif …` de création dispersés partout, à modifier à chaque nouveau type.

### Quand l'utiliser
**Quand l'utiliser :** plusieurs classes concrètes possibles, choisies à l'exécution, ou une création compliquée à cacher.

**Quand ne pas l'utiliser :** une seule classe possible : un simple appel au constructeur suffit.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
A[Appelant] -->|format png| F[Fabrique]
  F --> P[ExporteurPng]
  F --> C[ExporteurCsv]
```

### Exemple concret
```python
EXPORTEURS = {"png": ExporteurPng, "csv": ExporteurCsv, "json": ExporteurJson}

def creer_exporteur(format: str, **options) -> Exporteur:
    try:
        return EXPORTEURS[format](**options)
    except KeyError:
        raise ValueError(f"format inconnu : {format} (possibles : {', '.join(EXPORTEURS)})")

exp = creer_exporteur(requete["format"], legende=True)   # l'appelant ne connaît que l'interface
```
Variante : une fabrique qui choisit selon l'environnement :
```python
def creer_stockage():
    return StockageS3(os.environ["BUCKET"]) if os.environ.get("ENV") == "prod" else StockageLocal("/tmp/exports")
```

### Cas d'utilisation
- `logging.getLogger(nom)`
- `document.createElement("li")`

> [!warning] À ne pas confondre
> La **Fabrique** (choisir **quelle** classe créer) n'est pas le **Monteur** (construire **pas à pas** un objet compliqué).

## 3 · Relier
- **Au travail** : [Patron Fabrique (Factory) au travail](obsidian://open?vault=Travail&file=Patron%20Fabrique%20%28Factory%29%20au%20travail)
- **Prérequis** : [[Interface et polymorphisme]]
- **Complémentaires** : [[Patron Stratégie (Strategy)]] · [[Patron Monteur (Builder)]]
