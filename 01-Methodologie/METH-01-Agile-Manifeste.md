---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - methodologie/agile
aliases:
  - "Agile et Manifeste Agile"
parent: "[[Méthodologie]]"
children:
  - "[[METH-02-Scrum|Scrum]]"
  - "[[METH-03-Kanban|Kanban]]"
related_theory:
  - "[[CONC-01-Recueil-des-Besoins|Recueil des Besoins et Cahier des Charges]]"
related_snippets:
  - "[[04_Snippets/meth-01-agile-manifeste]]"
related_projects: []
source: "https://agilemanifesto.org/iso/fr/manifesto.html"
---

# Agile et Manifeste Agile

> [!abstract] Introduction
> L'agilité est une approche du développement par petites itérations, avec des retours fréquents du client, qui privilégie l'adaptation au changement plutôt que le suivi rigide d'un plan initial.

---

## Théorie

> [!question]- C'est quoi ?
> Les 4 valeurs du Manifeste Agile (2001) :
> 1. Les **individus et leurs interactions** plus que les processus et les outils
> 2. Des **logiciels opérationnels** plus qu'une documentation exhaustive
> 3. La **collaboration avec les clients** plus que la négociation contractuelle
> 4. L'**adaptation au changement** plus que le suivi d'un plan
> (« plus que » : les éléments de droite ont de la valeur, ceux de gauche en ont davantage.)

> [!example]- Analogie
> Le cycle en V, c'est construire un pont d'après des plans figés ; l'agile, c'est cuisiner pour des invités en goûtant et en ajustant l'assaisonnement à chaque étape.

> [!question]- Pourquoi l'utiliser ?
> Les besoins changent et se précisent en voyant le produit : livrer souvent permet de corriger le tir tôt, de réduire le risque et de livrer de la valeur plus vite.

> [!question]- Comment ça marche ?
> ```mermaid
> flowchart LR
>   B[Backlog priorisé] --> P[Planifier l'itération] --> D[Développer + tester] --> L[Livrer un incrément] --> R[Retour client + rétro] --> B
> ```
> Pratiques associées : Scrum, Kanban, XP (TDD, pair programming, intégration continue), SAFe à grande échelle.

> [!question]- Quand l'utiliser ?
> La majorité des projets logiciels en entreprise (souvent en version hybride).

> [!danger]- Quand NE PAS l'utiliser / Limites
> « Agile » mal appliqué = réunions sans fin, pas de documentation, absence de vision. L'agile ne dispense ni de conception ni de qualité.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Itération | Cycle court de développement |
| Incrément | Version livrable du produit |
| Backlog | Liste priorisée du travail |
| Cycle en V | Méthode séquentielle traditionnelle |

---

## Points clés

- Petites livraisons fréquentes
- Retours clients réguliers
- Équipe auto-organisée
- Qualité technique = condition de l'agilité (tests, CI)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Confondre agile et absence de rigueur

---

## Exemple minimal

```text
Sprint 1 : recherche de films (MVP) → démo → le client veut filtrer par genre
Sprint 2 : filtres genres + favoris
```

> [!note] Ce que j'en retiens
> Le retour du sprint 1 a changé la priorité du sprint 2 : c'est l'agilité.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Relier pratiques techniques (CI/CD, tests, trunk-based) et capacité à livrer souvent

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Méthodologie]]
- Sous-sujets → [[METH-02-Scrum|Scrum]], [[METH-03-Kanban|Kanban]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/meth-01-agile-manifeste]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Cite les 4 valeurs du manifeste.

---

## Tâches

- [ ] #task Lire les 12 principes du manifeste agile
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
