---
type: knowledge
category: apprentissages
source: "https://docs.gitlab.com/ee/user/project/repository/mirror/"
created: 2026-11-05
tags:
  - knowledge
  - git
  - gitlab
---
# Reprendre un dépôt GitHub sur GitLab

> [!tip] À retenir
> Reprendre un projet open source de GitHub sur GitLab, c'est en garder une copie chez soi (origin) tout en pouvant récupérer les nouvelles versions du projet d'origine (upstream).

## Le problème
**Pourquoi ça existe ?**
Pour adapter un logiciel open source (ajouter un bouton, changer la CI) sur le GitLab de l'entreprise, sans perdre ses mises à jour.

**Qu'est-ce qui se passait sans ça ?**
On téléchargeait une archive du code et on la modifiait : impossible ensuite de savoir ce qu'on avait changé, ni d'intégrer la version suivante sans tout refaire.

## Points clés
Deux dépôts distants :

```text
upstream  → github.com/<projet d'origine>   (on lit seulement)
origin    → GitLab de l'entreprise          (on pousse ses modifications)
```

- **Une seule fois** : importer le projet dans GitLab (*New project > Import project*, ou cloner puis pousser), puis déclarer `upstream`.
- **À chaque nouvelle version** du projet d'origine : `fetch` depuis `upstream`, fusionner le tag voulu, pousser sur `origin`.
- GitLab propose aussi le **mirroring** (*Settings > Repository > Mirroring repositories*), qui copie un dépôt automatiquement. Le *pull mirroring* dépend de l'édition de GitLab, et sur un miroir pur on ne fait pas ses propres modifications.

## Exemple
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

## Points d'attention
- **Suivre des tags de version** plutôt que la branche de développement du projet d'origine : moins de surprises.
- **Garder ses modifications petites et regroupées** : chaque mise à jour du projet d'origine risque des conflits.
- **Vérifier la licence** du projet avant de le modifier et de le redistribuer.

## Avec mes mots
*Explique avec tes mots, comme à un collègue : ce que tu as compris, et ce qui reste flou.*


## Liens
- Prérequis : 
- Voir aussi : [[Pipeline GitLab CI]]
- Utilisé dans : projet CVAT (CI GitLab + Nexus)
