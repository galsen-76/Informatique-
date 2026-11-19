---
type: exercise
status: a-faire
niveau: 4
difficulty: difficile
concepts:
  - "[[Intégration et déploiement continus (CI-CD)]]"
  - "[[Environnement de déploiement]]"
  - "[[Variables CI-CD GitLab]]"
  - "[[Clé SSH]]"
  - "[[Supervision et observabilité]]"
  - "[[Règles d'un job GitLab (rules)]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 14 - Déployer depuis la CI

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Niveau :** 4 · **Étape précédente :** [[MesDépenses 13 - Sauvegarder la base avec un script]]
> **Notions :** [[Intégration et déploiement continus (CI-CD)]] · [[Environnement de déploiement]] · [[Variables CI-CD GitLab]] · [[Clé SSH]] · [[Supervision et observabilité]] · [[Règles d'un job GitLab (rules)]]

## Le but
Un tag poussé suffit pour que la nouvelle version arrive sur le serveur, et tu sais vérifier qu'elle va bien. C'est la boucle complète du travail : code, test, image, déploiement.

> [!tip] Au travail
> Le retour à la version précédente est le geste le plus important : au travail, on te demandera d'abord « peut-on revenir en arrière ? ».

## Ce que tu fais
- [ ] Ajoute un job de déploiement qui ne se lance que sur un tag, et seulement si les tests et le build ont réussi
- [ ] Le job se connecte au serveur par SSH avec une clé rangée dans une variable protégée, récupère l'image de la version et relance l'API
- [ ] Déclare un environnement « test » dans GitLab : tu dois voir quelle version y tourne
- [ ] Après le déploiement, le job vérifie que `/health` répond. Sinon il échoue
- [ ] Déploie exprès une version cassée, puis reviens à la précédente en relançant l'ancien déploiement

> [!warning] Les pièges
> - Si le runner ne peut pas joindre ton serveur, installe un runner sur le serveur lui-même.
> - Une clé SSH dans le dépôt, même un instant, est une clé à jeter.

> [!success] Ça marche si…
> Un tag poussé met la version sur le serveur, la page d'environnement GitLab montre la bonne version, et le retour arrière remet l'ancienne en moins de deux minutes.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> `environment: name: test`, une variable de type fichier pour la clé, `ssh-agent` dans le job, `docker compose pull` puis `up -d` sur le serveur.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mon job de déploiement
