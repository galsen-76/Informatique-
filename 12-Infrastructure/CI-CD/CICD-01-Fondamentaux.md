---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M11
tags:
  - infra/cicd
aliases:
  - "Fondamentaux CI/CD"
parent: "[[Infrastructure]]"
children:
  - "[[CICD-02-Pipeline-Full-Stack|Pipeline CI/CD Full Stack]]"
  - "[[CICD-03-Strategies-Deploiement|Stratégies de Déploiement]]"
related_theory:
  - "[[03-CI-CD|CI/CD GitLab]]"
related_snippets:
  - "[[04_Snippets/cicd-01-fondamentaux]]"
related_projects: []
source: "https://martinfowler.com/articles/continuousIntegration.html"
---

# Fondamentaux CI/CD

> [!abstract] Introduction
> L'intégration continue (CI) vérifie automatiquement chaque changement (build, tests, qualité) ; la livraison/le déploiement continu (CD) automatise la mise en recette puis en production — pour livrer souvent, vite et sans stress.

---

## Théorie

> [!question]- C'est quoi ?
> - **CI** : chaque push/MR → lint, typecheck, tests, build
> - **Continuous Delivery** : toujours prêt à déployer, mise en prod déclenchée par un humain
> - **Continuous Deployment** : chaque changement validé part automatiquement en production
> ```mermaid
> flowchart LR
>   C[Commit] --> L[Lint + types] --> T[Tests] --> B[Build + image Docker] --> R[Registry]
>   R --> ST[Déploiement recette] --> E2E[Tests E2E] --> A{Validation}
>   A -->|manuel ou auto| P[Production]
> ```

> [!example]- Analogie
> Une chaîne de production automobile avec contrôles automatiques à chaque poste : une pièce défectueuse est écartée immédiatement plutôt que découverte chez le client.

> [!question]- Pourquoi l'utiliser ?
> Détecter les erreurs en minutes, déploiements reproductibles (plus de « ça marchait sur ma machine »), mises en production fréquentes et donc petites et peu risquées.

> [!question]- Comment ça marche ?
> Principes :
> - Build une fois, déployer la MÊME image partout (config par environnement)
> - Pipeline rapide (< 10-15 min) sinon personne n'attend le résultat
> - Pipeline rouge = priorité de l'équipe
> - Secrets dans les variables CI protégées
> - Artefacts versionnés (tag = SHA du commit)

> [!question]- Quand l'utiliser ?
> Dès le début de tout projet d'équipe.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un pipeline n'est utile que si les tests sont fiables et significatifs.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| CI | Intégration continue |
| CD | Livraison/déploiement continu |
| Artefact | Produit du build (image, bundle) |
| Environnement | Cible (dev, recette, prod) |

---

## Points clés

- Build once, deploy many
- Pipeline rapide et fiable
- Petites livraisons fréquentes

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Rebuilder différemment pour chaque environnement
> - Ignorer un pipeline rouge « temporairement »

---

## Exemple minimal

```text
Tag d'image : registry.gitlab.com/equipe/cinetrack-api:3f2a91c  (SHA du commit)
→ la même image passe en recette puis en production
```

> [!note] Ce que j'en retiens
> On sait exactement quel code tourne en production.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Mesurer les métriques DORA (fréquence de déploiement, lead time, taux d'échec, temps de restauration)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Infrastructure]]
- Sous-sujets → [[CICD-02-Pipeline-Full-Stack|Pipeline CI/CD Full Stack]], [[CICD-03-Strategies-Deploiement|Stratégies de Déploiement]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/cicd-01-fondamentaux]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre continuous delivery et continuous deployment ?

> [!faq]- Questions d'entretien
> - Décrivez un pipeline CI/CD que vous avez mis en place.

---

## Tâches

- [ ] #task Dessiner le pipeline cible de CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
