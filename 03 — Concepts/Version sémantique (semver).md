---
type: concept
module: "[[Module 07 - Node.js]]"
related:
  - "[[Tag Git]]"
  - "[[Changelog]]"
tags:
  - concept
  - backend
---
# Version sémantique (semver)

> [!info] En une phrase
> Une version s'écrit MAJEURE.MINEURE.CORRECTIF (2.5.1) : la majeure change quand on casse la compatibilité, la mineure pour un ajout, le correctif pour une réparation.

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

## 3 · Relier
- **Au travail** : [Version sémantique (semver) au travail](obsidian://open?vault=Travail&file=Version%20s%C3%A9mantique%20%28semver%29%20au%20travail)
- **Prérequis** : [[package.json]]
- **Complémentaires** : [[Tag Git]] · [[Changelog]]
