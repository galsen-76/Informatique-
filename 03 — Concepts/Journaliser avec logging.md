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
  - "[[Module et import]]"
parents: []
related:
  - "[[Exception]]"
  - "[[Redirection et pipe]]"
next_review: 
tags:
  - concept
  - python
---
# Journaliser avec logging

> [!info] En une phrase
> Le module logging remplace les print de débogage par des messages datés, avec un niveau (INFO, WARNING, ERROR) qu'on peut filtrer et envoyer vers un fichier.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un **journal** (*log*) raconte ce que fait le programme. `logging` ajoute à chaque message une date, un **niveau** et sa source. On règle une fois le niveau minimum affiché et la destination (écran, fichier).

| Niveau | Pour |
| --- | --- |
| `DEBUG` | détails pour déboguer |
| `INFO` | étapes normales (« 12 fichiers zippés ») |
| `WARNING` | anormal mais pas bloquant |
| `ERROR` | une opération a échoué |
| `CRITICAL` | le programme ne peut pas continuer |

### Pourquoi ça existe
Comprendre après coup ce qui s'est passé, surtout quand le script tourne sans toi (Docker, CI, serveur).

### Le problème résolu
Des `print` partout, qu'on ajoute et retire à la main, sans date ni gravité, impossibles à filtrer.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  C[Code] --> L[logger]
  L --> F{Niveau ?}
  F --> E[Écran]
  F --> X[Fichier]
```

### Exemple concret
```python
import logging, os

logging.basicConfig(
    level=os.environ.get("NIVEAU_LOG", "INFO"),
    format="%(asctime)s %(levelname)s %(message)s",
)
log = logging.getLogger(__name__)

log.debug("affiché seulement si NIVEAU_LOG=DEBUG")
log.info("Début du traitement de %s", "photos")
log.warning("Fichier vide ignoré : %s", "c.png")
try:
    1 / 0
except ZeroDivisionError:
    log.exception("Échec du calcul")      # ERROR + le traceback
```
```text
2026-11-06 21:50:01,123 INFO Début du traitement de photos
```

### Cas d'utilisation
- Les logs d'un conteneur (`docker logs`) ou d'un job de CI
- Un script lancé chaque nuit : écrire aussi dans un fichier (`filename="script.log"`)

> [!warning] À ne pas confondre
> `print` (sortie du programme, pour l'utilisateur) et `logging` (journal, sur stderr par défaut). Et ne journalise jamais un mot de passe ou un jeton.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine un message `logger.warning(...)` : le logger, le niveau, le handler, l'endroit où il est affiché (console, fichier).

> [!example] ⚖️ Avant / après
> Avant / après : des `print` partout, puis des messages `logging`. Dessine ce que tu peux filtrer et retrouver dans le second cas.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Journaliser avec logging » et je l'intègre ici avec `![[Schéma - Journaliser avec logging.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Dépenses 09 - Un vrai outil en ligne de commande]]
- [[MesDépenses 03 - Un client Python pour l'API]]
- [[MesDépenses 13 - Sauvegarder la base avec un script]]

## 4 · Relier
- **Prérequis** : [[Module et import]] · [[Variable d'environnement]]
- **Complémentaires** : [[Exception]] · [[Redirection et pipe]]

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
