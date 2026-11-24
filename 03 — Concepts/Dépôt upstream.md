---
type: concept
module: "[[Module 03 - Git et GitHub]]"
related:
  - "[[Merge]]"
  - "[[Conflit de merge]]"
tags:
  - concept
  - git
---
# Dépôt upstream

> [!info] En une phrase
> Le dépôt d'origine d'un projet que l'on a repris : on garde sa copie (origin) et on récupère les nouvelles versions de l'original (upstream).

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

> [!warning] À ne pas confondre
> `origin` (ta copie, tu y pousses) et `upstream` (l'original, tu ne fais qu'y lire).

## 3 · Relier
- **Au travail** : [Dépôt upstream au travail](obsidian://open?vault=Travail&file=D%C3%A9p%C3%B4t%20upstream%20au%20travail)
- **Prérequis** : [[Dépôt Git]]
- **Notion parente** : [[Dépôt Git]]
- **Complémentaires** : [[Merge]] · [[Conflit de merge]]
- **Commandes** : [[git merge]]
