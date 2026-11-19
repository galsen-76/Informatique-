---
type: concept
domain: linux
module: "[[Module 18 - Linux et serveurs]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Arborescence Linux]]"
parents: []
related:
  - "[[Archive zip (zipfile)]]"
next_review: 
method: []
tags:
  - concept
  - linux
---
# Archive tar et compression

> [!info] En une phrase
> tar regroupe des fichiers en une archive ; gzip ou xz la compressent : le .tar.gz est le zip du monde Linux.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
`tar` met plusieurs fichiers dans un seul (en gardant droits et arborescence). On le compresse souvent : `.tar.gz` (gzip, rapide), `.tar.xz` (plus petit, plus lent). Les images Docker et beaucoup de logiciels sont distribués ainsi.

### Pourquoi ça existe
Sauvegarder ou transférer un dossier entier, avec ses droits Linux (ce que le zip garde mal).

### Le problème résolu
Envoyer des centaines de fichiers un par un, et perdre les droits d'exécution en route.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  D[Dossier] --> T[tar]
  T --> G[gzip]
  G --> A[archive.tar.gz]
```

### Exemple concret
```bash
tar -czf sauvegarde.tar.gz projets/          # c créer, z gzip, f fichier
tar -tzf sauvegarde.tar.gz                   # t lister
tar -xzf sauvegarde.tar.gz -C /tmp/restau    # x extraire, dans un dossier
zip -r archive.zip projets/ ; unzip archive.zip
docker save mon-zipper | gzip > image.tar.gz # une image Docker en archive
```

### Cas d'utilisation
- Sauvegarder un dossier de données avant une manipulation
- Récupérer et installer un outil livré en `.tar.gz`

> [!warning] À ne pas confondre
> `tar -c` (créer) et `tar -x` (extraire) : une lettre de différence. Et extraire une archive inconnue dans le dossier courant peut éparpiller des fichiers : liste d'abord avec `-t`.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] ⚖️ Avant / après
> Avant / après : un dossier, puis `dossier.tar`, puis `dossier.tar.gz`. Dessine ce que fait chaque étape (regrouper, compresser).

> [!example] 🔄 Change de contexte
> Redessine-le à côté d'un `.zip`. Quelle différence dans l'ordre regrouper / compresser ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Archive tar et compression » et je l'intègre ici avec `![[Schéma - Archive tar et compression.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Arborescence Linux]] · [[Permissions Linux]]
- **Complémentaires** : [[Archive zip (zipfile)]]
- **Commandes** : [[tar]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
