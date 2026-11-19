---
type: concept
domain: backend
module: "[[Module 08 - Backend et API REST]]"
status: a-decouvrir
level: intermediaire
niveau: 1
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[API REST]]"
  - "[[Gestionnaire de paquets]]"
parents: []
related:
  - "[[OpenAPI]]"
  - "[[Appeler une API HTTP]]"
next_review: 
tags:
  - concept
  - backend
---
# SDK

> [!info] En une phrase
> Une bibliothèque fournie pour utiliser une API depuis un langage, sans écrire soi-même les requêtes HTTP.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un **SDK** (*Software Development Kit*) emballe les appels à une API dans des fonctions et des objets du langage. Au lieu de construire l'URL, les en-têtes et de décoder le JSON, on appelle `client.tasks.retrieve(12)`. Beaucoup de SDK sont **générés** à partir du fichier [[OpenAPI]].

### Pourquoi ça existe
Gagner du temps et éviter les erreurs (URL, authentification, format) en utilisant une API.

### Le problème résolu
Réécrire dans chaque script la même plomberie HTTP, et la casser quand l'API évolue.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  S[Ton script] --> K[SDK]
  K --> A[API HTTP]
```

### Exemple concret
Sans SDK (avec `requests`) :
```python
import requests
r = requests.get("http://localhost:8080/api/tasks/12/annotations", auth=("user", "motdepasse"))
r.raise_for_status()
annotations = r.json()
```
Avec le SDK du service (même version que le serveur) :
```python
from cvat_sdk import make_client
with make_client("http://localhost:8080", credentials=("user", "motdepasse")) as client:
    tache = client.tasks.retrieve(12)
    annotations = tache.get_annotations()
```

### Cas d'utilisation
- Automatiser la création de tâches

> [!warning] À ne pas confondre
> **SDK** (bibliothèque côté client) et **API** (le service côté serveur). La version du SDK doit correspondre à celle du serveur, sinon des champs manquent ou changent.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] ⚖️ Avant / après
> Avant / après : récupérer des données d'une API avec requests, puis avec le SDK de cette API. Dessine ce que le SDK fait à ta place.

> [!example] 🧠 Dessine de mémoire
> Dessine les trois couches : ton script, le SDK, l'API HTTP. Place où vivent l'adresse du serveur et l'authentification.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - SDK » et je l'intègre ici avec `![[Schéma - SDK.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Au travail** : [[SDK au travail]]
- **Prérequis** : [[API REST]] · [[Gestionnaire de paquets]] · [[Liste et dictionnaire]]
- **Complémentaires** : [[OpenAPI]] · [[JSON]]
- **Complémentaires** : [[Appeler une API HTTP]] (le même appel, sans SDK)

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
