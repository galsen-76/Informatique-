---
type: notion
statut: a apprendre
resume: "La Definition of Done est la liste de vérifications que toute tâche doit passer avant d'être déclarée terminée, la même pour toute l'équipe."
revu:
sources:
  - "https://scrumguides.org/scrum-guide.html"
---
# Definition of Done

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : La *Definition of Done* (DoD) est la **liste de vérifications** que toute tâche doit passer avant d'être déclarée « terminée », la même pour toute l'équipe.

## Le problème

**Pourquoi c'est utile ?**
Pour que « fini » veuille dire la même chose pour tout le monde, et qu'une tâche terminée soit vraiment livrable.

**Qu'est-ce qui se passait sans ça ?**
Un développeur disait « c'est fini » alors que le code n'était ni testé, ni relu, ni déployé. Le travail caché s'accumulait et explosait en fin de sprint.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

L'équipe écrit **une fois** la liste, et l'applique à **chaque** tâche. Exemple de DoD :

- [ ] le code est sur une branche avec une Merge Request ;
- [ ] la MR est relue et approuvée ;
- [ ] le pipeline est vert (lint, types, tests) ;
- [ ] les tests de la nouvelle fonctionnalité sont écrits ;
- [ ] la documentation (README, API) est à jour ;
- [ ] c'est déployé en recette et vérifié.

À ne pas confondre :

| | Definition of Done | Critères d'acceptation |
|---|---|---|
| Porte sur | **toutes** les tâches | **une** user story précise |
| Dit | « c'est fait proprement » | « ça fait ce qui était demandé » |
| Exemple | « testé, relu, déployé en recette » | « le film apparaît dans les favoris après le clic » |

Une tâche est terminée quand **ses critères d'acceptation** sont remplis **et** qu'elle respecte **la DoD**.

## 🧪 Exemple

La DoD de ton équipe peut tenir dans le modèle de Merge Request GitLab : chaque case cochée avant de demander la fusion.

```markdown
## Avant de fusionner
- [ ] Tests ajoutés ou mis à jour
- [ ] Pipeline vert
- [ ] Doc mise à jour
- [ ] Testé en recette
```

## ⚠️ Limites et pièges

- **Une DoD trop longue** n'est jamais respectée : commencer court, l'enrichir en rétrospective.
- **Une DoD que personne ne relit** ne sert à rien : la mettre là où on travaille (modèle de MR, colonne du board).
- **« Presque fini » n'existe pas** : si une case manque, la tâche n'est pas terminée et ne compte pas dans le sprint.

## 🔗 Liens

- **Prérequis :** [[02 Scrum|Scrum]]
- **Voir aussi :** [[02 User stories et critères d'acceptation|User stories et critères d'acceptation]], [[02 Merge requests|Merge requests]], [[08 Code review|Code review]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://scrumguides.org/scrum-guide.html
