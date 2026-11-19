---
type: concept
domain: git
module: "[[Module 03 - Git et GitHub]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Système de fichiers]]"
parents: []
related:
  - "[[Dépôt Git]]"
  - "[[Commit]]"
  - "[[Branche Git]]"
next_review: 
method: []
tags:
  - concept
  - git
---
# Git

> [!info] En une phrase
> Un outil qui enregistre l'historique de ton code, version par version, pour revenir en arrière et travailler à plusieurs.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Git** est un système de gestion de versions **distribué** : chaque copie du projet contient tout l'historique. On enregistre des « photos » du projet (les [[Commit|commits]]) et on peut développer en parallèle sur des [[Branche Git|branches]].

### Pourquoi ça existe
Créé en 2005 par Linus Torvalds pour développer le noyau Linux : des milliers de personnes modifiaient le même code, il fallait un outil rapide, fiable et sans serveur central obligatoire.

### Le problème résolu
Sans Git : `projet_final_v2_VRAI.zip`, impossible de savoir qui a changé quoi, de revenir à hier, ou de fusionner le travail de deux personnes.

## 2 · Explorer
### Comment ça fonctionne
Les trois zones à comprendre :
```mermaid
flowchart LR
  W[Dossier de travail] -- git add --> S[Index / staging]
  S -- git commit --> R[(Historique du dépôt)]
  R -- git switch / restore --> W
```
- **Dossier de travail** : les fichiers tels que tu les vois.
- **Index (staging)** : ce que tu as choisi d'inclure dans la prochaine photo.
- **Dépôt** : l'historique des commits, dans le dossier caché `.git`.

### Exemple concret
```bash
git init
git add index.js
git commit -m "Premier serveur"
git log --oneline
```

### Cas d'utilisation
- Historiser son travail, même seul
- Collaborer (avec GitHub ou GitLab)
- Tester une idée sur une branche sans casser le reste

> [!warning] À ne pas confondre
> **Git** (l'outil, en local) et **GitHub/GitLab** (des sites qui hébergent des dépôts Git et ajoutent des pull requests, de l'intégration continue…). Git fonctionne très bien sans eux.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] ⚖️ Avant / après
> Avant / après : ton projet sans Git (fichiers `main_v2_final.py`, copies datées), puis avec Git. Dessine où se trouvent les anciennes versions dans chaque cas.

> [!example] 🧠 Dessine de mémoire
> Dessine le cycle de travail Git : modifier, `add`, `commit`, `push`, `pull`, avec les zones (fichiers, index, dépôt local, dépôt distant).

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Git » et je l'intègre ici avec `![[Schéma - Git.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

Pour m'aider :
- [[Fiche - Publier un dépôt sur GitHub]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Terminal]], [[Système de fichiers]]
- **Notions clés** : [[Dépôt Git]] → [[Commit]] → [[Branche Git]] → [[Merge]] → [[Conflit de merge]]
- **Commandes** : [[git init]] · [[git status]] · [[git add]] · [[git commit]] · [[git branch]] · [[git switch]] · [[git merge]]
- **Cours** : [[Cours - Git, les bases]] · [[Cours - Branches et fusion]]

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
