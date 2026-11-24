---
type: concept
module: "[[Module 14 - DevOps et déploiement]]"
related:
  - "[[Registre Docker]]"
tags:
  - concept
  - devops
---
# Artefacts GitLab CI

> [!info] En une phrase
> Les fichiers qu'un job garde à la fin pour les transmettre aux jobs suivants ou les rendre téléchargeables.

## 1 · Comprendre
### Définition
Chaque job démarre dans un environnement **neuf** : ce qu'un job a créé disparaît à sa fin. `artifacts: paths:` liste les fichiers à **conserver** ; GitLab les envoie au serveur, les fournit aux jobs suivants et les affiche dans l'interface (bouton *Download*).

### Pourquoi ça existe
Passer un résultat d'un job à l'autre (un rapport, un fichier construit) et le récupérer après la pipeline.

### Le problème résolu
Refaire le même travail dans chaque job, ou perdre les rapports de tests à la fin du job.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  A[Job A] --> F[artifacts]
  F --> B[Job B]
  F --> U[Téléchargement]
```

### Exemple concret
```yaml
zipper:
  stage: build
  image: python:3.12-slim
  script:
    - python zipper.py donnees --sortie export.zip
  artifacts:
    paths:
      - export.zip
    expire_in: 1 week
    when: always            # garder même si le job échoue (utile pour des logs)

verifier:
  stage: test
  needs: [zipper]           # récupère aussi les artefacts de zipper
  script:
    - python -m zipfile -l export.zip
```
Rapport de tests affiché dans GitLab : `pytest --junitxml=rapport.xml` et `artifacts: reports: junit: rapport.xml`.

### Cas d'utilisation
- Garder les logs ou rapports de tests
- Transmettre un fichier généré à un job suivant

> [!warning] À ne pas confondre
> **Artefacts** (résultats d'un job, transmis aux suivants) et **cache** (`cache:`, accélère des jobs en gardant par exemple les téléchargements pip, sans garantie). Et une **image Docker** ne passe pas par les artefacts : elle passe par un [[Registre Docker]].

## 3 · Relier
- **Prérequis** : [[Pipeline GitLab CI]]
- **Complémentaires** : [[Registre Docker]]
