---
type: concept
domain: backend
module: "[[Module 07 - Node.js]]"
status: a-decouvrir
level: debutant
niveau: 2
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[package.json]]"
parents:
  - "[[Gestionnaire de paquets]]"
related:
  - "[[Tag Git]]"
  - "[[Changelog]]"
next_review: 
tags:
  - concept
  - backend
---
# Version sémantique (semver)

> [!info] En une phrase
> Une version s'écrit MAJEURE.MINEURE.CORRECTIF (2.5.1) : la majeure change quand on casse la compatibilité, la mineure pour un ajout, le correctif pour une réparation.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**SemVer** : `MAJEURE.MINEURE.CORRECTIF`
- **Correctif** (2.5.**1** → 2.5.**2**) : corrige un bug, rien ne casse.
- **Mineure** (2.**5**.2 → 2.**6**.0) : ajoute une fonctionnalité, compatible.
- **Majeure** (**2**.6.0 → **3**.0.0) : change ou retire quelque chose, **peut casser** ton code.

Plages dans `package.json` :
| Écriture | Accepte |
| --- | --- |
| `4.19.2` | exactement cette version |
| `^4.19.2` | `>=4.19.2 <5.0.0` (mineures et correctifs) : la valeur par défaut de npm |
| `~4.19.2` | `>=4.19.2 <4.20.0` (correctifs seulement) |
| `*` ou `latest` | n'importe laquelle (à éviter) |
Une version `0.x` est considérée instable : `^0.3.1` n'accepte que `0.3.x`.

### Pourquoi ça existe
Avec des centaines de dépendances, il faut savoir si une mise à jour est sans risque.

### Le problème résolu
Recevoir les correctifs automatiquement sans risquer une rupture majeure.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
V[2.5.1] -->|bug corrigé| C[2.5.2]
  C -->|ajout| Mi[2.6.0]
  Mi -->|rupture| Ma[3.0.0]
```

### Exemple concret
```bash
npm outdated
# Package  Current  Wanted  Latest
# express   4.18.2  4.21.1  5.0.1
```
*Wanted* : la plus récente permise par la plage ; *Latest* : la dernière publiée (ici une majeure, à lire avant de passer). Le même schéma sert aux images Docker (`node:20.11`), aux tags Git et aux versions de ton propre projet (voir [[Changelog]]).

### Cas d'utilisation
- Mettre à jour des dépendances
- Choisir le tag d'une image Docker

> [!warning] À ne pas confondre
> `^` et `~` : `^` accepte les nouvelles mineures, `~` seulement les correctifs. Et la promesse SemVer est tenue par les humains : un correctif peut quand même casser, d'où le lock et les tests.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine trois versions 2.5.1, 2.6.0, 3.0.0 et écris sous chacune ce qui a changé pour l'utilisateur de la bibliothèque.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   V[^2.5.1 demandé] --> A[2.9.0 accepté]
>   V --> B[3.0.0 accepté]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Version sémantique (semver) » et je l'intègre ici avec `![[Schéma - Version sémantique (semver).excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Au travail** : [[Version sémantique (semver) au travail]]
- **Prérequis** : [[package.json]]
- **Complémentaires** : [[Tag Git]] · [[Changelog]]

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
