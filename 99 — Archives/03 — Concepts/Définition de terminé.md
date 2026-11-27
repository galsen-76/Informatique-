---
type: concept
module: "[[Module 23 - Gestion de projet]]"
related:
  - "[[Critères d'acceptation]]"
  - "[[Merge request]]"
  - "[[Test automatisé]]"
  - "[[Pipeline GitLab CI]]"
tags:
  - concept
  - projet
---
# Définition de terminé

> [!info] En une phrase
> La définition de terminé (*Definition of Done*, DoD) est la **liste commune de conditions qu'un travail doit remplir pour être déclaré fini**, quelle que soit la fonctionnalité : code relu, tests passés, documentation à jour, déployé…

## 1 · Comprendre
### Définition
**Elle vaut pour tous les tickets**, à la différence des [[Critères d'acceptation|critères d'acceptation]] qui sont propres à chacun.

**Elle est décidée par l'équipe** et affichée (wiki, modèle de ticket ou de merge request).

**Exemple de contenu** :
- les critères d'acceptation de la story sont vérifiés ;
- le code est relu dans une merge request ;
- la pipeline GitLab est verte (lint, tests, construction de l'image) ;
- les tests nécessaires sont écrits ;
- la documentation (README, changelog) est à jour ;
- c'est déployé en environnement de recette.

**« Fini » sans définition**, c'est souvent « ça marche sur ma machine ».

### Pourquoi ça existe
Chaque développeur a sa propre idée de « fini ». Résultat : du travail déclaré terminé qui revient avec des bugs, ou qu'il faut reprendre pour le déployer.

### Le problème résolu
Une qualité minimale garantie, et des estimations honnêtes (fini veut dire vraiment fini).

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  CA[Critères OK] --> RV[Relu]
  RV --> CI[Pipeline verte]
  CI --> DOC[Doc à jour]
  DOC --> F[Terminé]
```

### Exemple concret
```markdown
## Définition de terminé - appli de dépenses
- [ ] Les critères d'acceptation du ticket sont vérifiés
- [ ] Merge request relue et approuvée
- [ ] Pipeline GitLab verte (lint, tests, image construite)
- [ ] Pas de secret dans le code
- [ ] README mis à jour si l'installation change
- [ ] Déployé et testé sur l'environnement de recette
```

### Cas d'utilisation
- Mettre la liste dans le modèle de merge request GitLab
- Savoir si on peut fermer un ticket

> [!warning] À ne pas confondre
> Un POC n'a pas la même définition de terminé qu'un MVP : pour un POC, « terminé » veut dire « on a la réponse à la question », pas « c'est prêt pour la production ».

## 3 · Relier
- **Prérequis** : [[User story]]
- **Complémentaires** : [[Critères d'acceptation]] · [[Merge request]] · [[Test automatisé]] · [[Pipeline GitLab CI]]
