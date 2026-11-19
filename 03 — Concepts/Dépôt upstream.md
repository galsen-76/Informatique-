---
type: concept
domain: git
module: "[[Module 03 - Git et GitHub]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Dépôt Git]]"
parents:
  - "[[Dépôt Git]]"
related:
  - "[[Merge]]"
  - "[[Conflit de merge]]"
next_review: 
method: []
tags:
  - concept
  - git
---
# Dépôt upstream

> [!info] En une phrase
> Le dépôt d'origine d'un projet que l'on a repris : on garde sa copie (origin) et on récupère les nouvelles versions de l'original (upstream).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un dépôt local peut avoir **plusieurs remotes**. Par convention, `origin` est ta copie (là où tu pousses) et `upstream` est le projet d'origine (que tu lis seulement).

### Pourquoi ça existe
Adapter un logiciel open source sur le GitLab de l'entreprise sans perdre ses mises à jour.

### Le problème résolu
Télécharger une archive du code et la modifier : impossible ensuite de savoir ce qu'on a changé, ni d'intégrer la version suivante.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart LR
  U[(upstream : GitHub)] -- git fetch --> L[Dépôt local]
  L -- git push --> O[(origin : GitLab)]
```

### Exemple concret
```bash
git clone <url-gitlab-du-projet>
cd projet
git remote add upstream https://github.com/<organisation>/<projet>.git
git remote -v

# plus tard, nouvelle version du projet d'origine
git fetch upstream --tags
git merge v2.x.y
git push origin
```
GitLab propose aussi le **mirroring** (*Settings > Repository > Mirroring repositories*) ; le *pull mirroring* dépend de l'édition de GitLab, et un miroir pur ne reçoit pas tes propres modifications.

### Cas d'utilisation
- Reprendre un projet open source et le personnaliser
- Projet CVAT : partie 1 (reprendre CVAT sur GitLab, construire ses images en CI via le Nexus)

> [!warning] À ne pas confondre
> `origin` (ta copie, tu y pousses) et `upstream` (l'original, tu ne fais qu'y lire).

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine trois dépôts : CVAT officiel (upstream), ton miroir GitLab (origin), ton dépôt local. Relie-les avec les bonnes commandes.

> [!example] 🛣️ Suis le trajet
> Suis l'arrivée d'une nouvelle version de CVAT jusqu'à ton dépôt local, en gardant tes ajouts (le plugin, l'alias).

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Dépôt upstream » et je l'intègre ici avec `![[Schéma - Dépôt upstream.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Dépôt Git]]
- **Notion parente** : [[Dépôt Git]]
- **Complémentaires** : [[Merge]] · [[Conflit de merge]]
- **Commandes** : [[git merge]]

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
