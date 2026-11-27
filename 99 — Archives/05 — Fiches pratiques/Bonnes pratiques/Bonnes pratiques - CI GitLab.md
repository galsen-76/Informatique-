---
type: bonnes-pratiques
sujet: "CI GitLab"
concepts:
  - "[[Pipeline GitLab CI]]"
  - "[[Variables CI-CD GitLab]]"
  - "[[Règles d'un job GitLab (rules)]]"
  - "[[extends GitLab CI]]"
  - "[[Artefacts GitLab CI]]"
  - "[[Kaniko]]"
  - "[[Intégration et déploiement continus (CI-CD)]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - CI GitLab

> [!info] À quoi sert cette fiche
> Des pipelines rapides, lisibles et sûres, qui bloquent ce qui doit l'être.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Des étapes dans l'ordre : vérifier, construire, déployer
Le lint et les tests rapides d'abord : on échoue vite. Voir [[Intégration et déploiement continus (CI-CD)]].

### 2. Factoriser avec extends et des modèles cachés
Un `.modele` réutilisé plutôt que des jobs copiés-collés. Voir [[extends GitLab CI]].

### 3. Des règles claires pour chaque job
`rules:` pour dire quand il tourne (branche principale, tag, merge request). Voir [[Règles d'un job GitLab (rules)]].

### 4. Des images de job à version fixe
`python:3.12-slim`, pas `latest` : la pipeline ne casse pas toute seule.

### 5. Les secrets en variables masquées et protégées
Jamais dans `.gitlab-ci.yml`. Voir [[Variables CI-CD GitLab]].

### 6. Construire l'image une fois, la tester, puis la publier et la déployer
La même image partout. Voir [[Tester l'image, pas le dépôt]].

### 7. Le cache pour les dépendances, les artefacts pour les résultats
Voir [[Artefacts GitLab CI]].

### 8. La production en déploiement manuel
`when: manual` et `environment:` : un humain décide, et GitLab garde l'historique.

## À éviter

### 1. Une pipeline de 30 minutes
**Pourquoi c'est un problème :** plus personne ne l'attend ni ne la regarde.
**À la place :** jobs en parallèle, cache, tests lents à part.

### 2. `allow_failure: true` pour faire passer
**Pourquoi c'est un problème :** les erreurs deviennent invisibles.
**À la place :** corriger, ou retirer le job.

### 3. Des secrets affichés dans les logs (`echo $TOKEN`, `set -x`)
**Pourquoi c'est un problème :** lisibles par tous ceux qui voient la pipeline.
**À la place :** variables masquées, pas d'affichage.

### 4. Copier-coller les mêmes lignes dans dix jobs
**Pourquoi c'est un problème :** une correction oubliée quelque part.
**À la place :** `extends`, `!reference`, `include`.

### 5. Déployer sans avoir testé l'image construite
**Pourquoi c'est un problème :** ce qui part n'a jamais été vérifié.
**À la place :** un job de test sur l'image avant le push et le déploiement.

### 6. Utiliser Docker-in-Docker privilégié sans besoin
**Pourquoi c'est un problème :** risque de sécurité sur les runners partagés.
**À la place :** Kaniko ou Buildah. Voir [[Kaniko]].

## Avant de valider mon travail
- [ ] La pipeline passe en moins de dix minutes
- [ ] Aucun secret dans le fichier ni dans les logs
- [ ] Les images de jobs ont une version fixe
- [ ] Les jobs répétés sont factorisés
- [ ] La production demande une action manuelle

## Notions liées
[[Pipeline GitLab CI]] · [[Variables CI-CD GitLab]] · [[Règles d'un job GitLab (rules)]] · [[extends GitLab CI]] · [[Artefacts GitLab CI]] · [[Kaniko]] · [[Intégration et déploiement continus (CI-CD)]]
