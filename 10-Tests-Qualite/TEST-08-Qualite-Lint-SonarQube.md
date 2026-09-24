---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - tests/qualite
aliases:
  - "Qualité Linting et Analyse Statique"
parent: "[[Tests et Qualité]]"
children: []
related_theory:
  - "[[OUT-03-ESLint-Prettier-Qualite|ESLint Prettier et Hooks]]"
  - "[[03-CI-CD|CI/CD GitLab]]"
related_snippets:
  - "[[04_Snippets/test-08-qualite-lint-sonarqube]]"
related_projects: []
source: "https://docs.sonarsource.com/sonarqube-server/latest/"
---

# Qualité Linting et Analyse Statique

> [!abstract] Introduction
> La qualité se mesure et s'automatise : typage strict, linting, analyse statique (SonarQube), couverture de tests, audits de dépendances et budgets de performance, vérifiés dans la CI à chaque MR.

> [!warning]- Prérequis
> [[OUT-03-ESLint-Prettier-Qualite|ESLint Prettier et Hooks]]

---

## Théorie

> [!question]- C'est quoi ?
> Outils : TypeScript `strict`, ESLint, Prettier, SonarQube/SonarCloud (bugs, code smells, duplication, dette, failles, couverture), `npm audit`/Renovate, Lighthouse CI, budgets Angular.
> **Quality gate** : seuils bloquants (ex. couverture du nouveau code ≥ 80 %, 0 bug bloquant, duplication < 3 %).

> [!example]- Analogie
> Le contrôle technique automatique : il ne rend pas la voiture parfaite, mais il empêche de rouler avec des freins défectueux.

> [!question]- Pourquoi l'utiliser ?
> Rendre la qualité objective et continue plutôt que dépendante de la vigilance de chacun ; beaucoup d'ESN et grands comptes imposent SonarQube.

> [!question]- Comment ça marche ?
> Principe « clean as you code » : exiger la qualité sur le NOUVEAU code, sans bloquer sur l'historique.
> Pipeline type : lint → typecheck → tests + couverture → build → analyse Sonar → quality gate.

> [!question]- Quand l'utiliser ?
> À chaque MR, automatiquement.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Optimiser la métrique plutôt que la qualité (tests vides pour la couverture) ; les outils ne jugent pas la pertinence fonctionnelle.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Analyse statique | Examen du code sans l'exécuter |
| Quality gate | Seuils bloquants de qualité |
| Dette technique | Effort estimé pour corriger les défauts |
| Duplication | Code copié-collé |

---

## Points clés

- Automatiser dans la CI
- Seuils sur le nouveau code
- Lire les rapports, pas seulement le statut

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Désactiver des règles pour passer la gate

---

## Exemple minimal

```yaml
sonarqube-check:
  stage: test
  image: sonarsource/sonar-scanner-cli:latest
  script: [sonar-scanner -Dsonar.qualitygate.wait=true]
  rules: [{ if: $CI_PIPELINE_SOURCE == "merge_request_event" }]
```

> [!note] Ce que j'en retiens
> La MR est bloquée si la quality gate échoue.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Définir des quality gates réalistes avec l'équipe et suivre la dette dans le temps

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Tests et Qualité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/test-08-qualite-lint-sonarqube]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi appliquer les seuils uniquement au nouveau code ?

---

## Tâches

- [ ] #task Demander si SonarQube est utilisé au travail et consulter le rapport d'un projet
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
