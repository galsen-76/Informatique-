---
type: concept
domain: architecture
module: "[[Module 15 - Architecture logicielle]]"
status: a-decouvrir
level: intermediaire
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Fonction]]"
parents: []
related:
  - "[[Patron Proxy]]"
  - "[[Patron Décorateur (Decorator)]]"
  - "[[En-tête HTTP]]"
next_review: 
tags:
  - concept
  - architecture
---
# Cache applicatif

> [!info] En une phrase
> Un cache garde le résultat d'un calcul ou d'une requête coûteuse pour le resservir tout de suite la fois suivante, au lieu de tout refaire.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Succès (hit)** : la valeur est en cache, on la renvoie. **Défaut (miss)** : on calcule, puis on range le résultat.

**Où mettre le cache :**
- en mémoire du programme (`functools.lru_cache`, un dictionnaire)
- dans un service partagé (**Redis**, Memcached) quand il y a plusieurs copies
- côté HTTP (en-têtes `Cache-Control`, navigateur, CDN)

**Invalidation** : quand la donnée d'origine change, il faut retirer ou mettre à jour la copie. Méthodes : durée de vie (TTL), suppression explicite, clé qui inclut une version.

### Pourquoi ça existe
Recalculer la même image PNG ou relire les mêmes annotations à chaque requête : lent, et ça charge l'API ou la base pour rien.

### Le problème résolu
Répondre plus vite et soulager les services lents ou payants.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
RQ[Requête] --> CA{En cache ?}
  CA -->|oui| RE[Réponse]
  CA -->|non| CALC[Calcul]
  CALC --> ST[Ranger]
  ST --> RE
```

### Exemple concret
```python
from functools import lru_cache

@lru_cache(maxsize=128)            # cache en mémoire, décorateur
def annotations(tache_id: int) -> tuple:
    return tuple(appeler_cvat(tache_id))

# avec Redis et une durée de vie
def png_export(tache_id, version):
    cle = f"export:{tache_id}:{version}"     # la version invalide d'elle-même
    if (png := redis.get(cle)) is not None:
        return png
    png = exporter_png(tache_id)
    redis.set(cle, png, ex=3600)             # expire dans une heure
    return png
```

### Cas d'utilisation
- Résultats d'API externes
- Images ou exports générés
- Pages ou réponses très demandées

> [!warning] À ne pas confondre
> « Il n'y a que deux choses difficiles en informatique : l'invalidation de cache et nommer les choses. » Un cache mal invalidé sert des données périmées : on ne cache que ce qu'on sait rafraîchir, et on mesure avant d'en ajouter.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine deux appels à `/totaux` : le premier calcule et range le résultat dans le cache, le second le reprend. Montre quand le cache doit être vidé.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   A[Ajout dépense] --> B[Base modifiée]
>   C[Cache totaux] --> R[Réponse servie]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Cache applicatif » et je l'intègre ici avec `![[Schéma - Cache applicatif.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Fonction]]
- **Complémentaires** : [[Patron Proxy]] · [[Patron Décorateur (Decorator)]] · [[En-tête HTTP]]

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
