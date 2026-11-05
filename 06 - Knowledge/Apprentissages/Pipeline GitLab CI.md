---
type: knowledge
category: apprentissages
source: "https://docs.gitlab.com/ee/ci/"
created: 2026-11-05
tags:
  - knowledge
  - gitlab-ci
---
# Pipeline GitLab CI

> [!tip] À retenir
> Une pipeline est une suite de tâches automatiques (tester, construire, publier) que GitLab lance à chaque push, décrite dans .gitlab-ci.yml à la racine du dépôt.

## Le problème
**Pourquoi ça existe ?**
Pour vérifier et construire automatiquement chaque modification, toujours de la même façon.

**Qu'est-ce qui se passait sans ça ?**
Chacun lançait (ou oubliait de lancer) les tests et les builds sur son poste. Du code cassé arrivait sur `main` et on le découvrait plus tard.

## Points clés
| Terme | Définition |
| --- | --- |
| **pipeline** | l'ensemble des jobs lancés pour un commit |
| **stage** | une étape ; les stages s'exécutent dans l'ordre, les jobs d'un même stage en parallèle |
| **job** | une tâche : une liste de commandes shell sous `script:` |
| **runner** | la machine qui exécute les jobs, souvent dans un conteneur dont l'image est donnée par `image:` |
| **rules** | quand un job est lancé ; sans `rules`, à chaque push sur toutes les branches |

- `before_script:` s'exécute avant `script:` (souvent la connexion à un registre).
- `variables:` déclare des valeurs non secrètes, voir [[Variables CI CD GitLab]].
- Le projet d'origine sur GitHub a souvent sa CI dans `.github/workflows/` : GitLab l'ignore.

## Exemple
```yaml
stages:
  - test
  - build

tests:
  stage: test
  image: python:3.11-slim        # le job tourne dans ce conteneur
  script:
    - pip install -r requirements.txt
    - pytest

premier-job:
  stage: build
  image: docker:24
  script:
    - docker version
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

## Points d'attention
- **YAML et indentation** : une espace en trop et le fichier est invalide. *Build > Pipeline editor* le vérifie avant le push.
- **Chaque job repart de zéro** : rien n'est gardé d'un job à l'autre, sauf `artifacts` et `cache`.
- **L'`image:` d'un job vient elle aussi d'un registre** : derrière un Nexus, elle doit souvent passer par lui.
- **Lire le log du job rouge** : l'erreur est presque toujours dans les dernières lignes. Commencer petit, une étape à la fois.

## Avec mes mots
*Explique avec tes mots, comme à un collègue : ce que tu as compris, et ce qui reste flou.*


## Liens
- Prérequis : 
- Voir aussi : [[Construire une image Docker dans GitLab CI]], [[Variables CI CD GitLab]]
- Utilisé dans : projet CVAT (CI GitLab + Nexus)
