---
type: notion
statut: a apprendre
resume: "Un pipeline est une suite de tâches automatiques (installer, tester, construire) que GitLab lance à chaque push, décrite dans .gitlab-ci.yml."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Un pipeline est une **suite de tâches automatiques** (installer, tester, construire) que GitLab lance à chaque push, décrite dans `.gitlab-ci.yml`.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour vérifier automatiquement chaque modification avant qu'elle n'arrive sur la branche principale.

**Qu'est-ce qui se passait sans ça ?**
Chacun lançait (ou oubliait de lancer) les tests sur son poste. Du code cassé arrivait sur `main`, et on le découvrait plus tard.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Le fichier `.gitlab-ci.yml`, **à la racine du dépôt** :

```yaml
stages: [test]

e2e:
  stage: test
  image: mcr.microsoft.com/playwright:v1.63.0-noble   # le job tourne dans ce conteneur
  script:
    - cd appTest
    - npm ci
    - npx playwright test
  artifacts:
    when: always
    paths:
      - appTest/playwright-report/
    reports:
      junit: appTest/results.xml
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

- **stages** : les étapes, dans l'ordre. Les jobs d'une même étape tournent en parallèle.
- **job** : une tâche (`e2e`). Toutes les lignes de son `script` tournent **dans le même conteneur**, l'une après l'autre.
- **image** : le conteneur dans lequel le job tourne.
- **rules** : quand lancer le job. **Sans `rules`**, il est lancé à chaque push, sur toutes les branches.

Avec « Pipelines must succeed » et une branche `main` protégée, une merge request ne peut être fusionnée que si le pipeline est vert.

## ⚠️ Limites et pièges

- **Les chemins partent de la racine du dépôt**, même après un `cd` dans le script (pour `artifacts`, `reports`…).
- **Chaque job repart de zéro** : rien n'est gardé d'un job à l'autre, sauf `artifacts` et `cache`.
- **YAML et indentation** : une espace en trop et le fichier est invalide. Le *Pipeline editor* de GitLab le vérifie.
- **`echo` affiche, il ne télécharge rien** : pour tester l'accès à une URL, c'est `curl`.

## 🔗 Liens

- **Prérequis :** [[Docker]], [[Notions/13 Outils/npm/npm install vs npm ci]]
- **Voir aussi :** [[Runner GitLab]], [[Artifacts GitLab]]
- **Utilisé dans :** le dépôt `exploration-tests`

## 📚 Notes

- 
