---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - conception/user-stories
aliases:
  - "User Stories et Critères d'Acceptation"
parent: "[[Conception]]"
children: []
related_theory:
  - "[[METH-02-Scrum|Scrum]]"
  - "[[CONC-09-Estimation-Planification|Estimation et Planification]]"
  - "[[TEST-06-TDD|TDD]]"
related_snippets:
  - "[[04_Snippets/conc-02-user-stories-criteres-acceptation]]"
related_projects: []
source: "https://www.atlassian.com/fr/agile/project-management/user-stories"
---

# User Stories et Critères d'Acceptation

> [!abstract] Introduction
> Une user story décrit un besoin du point de vue de l'utilisateur (« En tant que…, je veux…, afin de… ») ; ses critères d'acceptation, souvent en Gherkin (Étant donné / Quand / Alors), définissent précisément quand elle est terminée.

> [!warning]- Prérequis
> [[CONC-01-Recueil-des-Besoins|Recueil des Besoins et Cahier des Charges]]

---

## Théorie

> [!question]- C'est quoi ?
> ```text
> En tant qu'utilisateur connecté,
> je veux ajouter un film à mes favoris,
> afin de le retrouver rapidement plus tard.
>
> Critères d'acceptation :
> Scénario : ajout d'un favori
>   Étant donné que je suis connecté et sur la fiche de « Dune »
>   Quand je clique sur « Ajouter aux favoris »
>   Alors le bouton affiche « Retirer des favoris »
>   Et « Dune » apparaît dans ma page Favoris
>
> Scénario : visiteur non connecté
>   Étant donné que je ne suis pas connecté
>   Quand je clique sur « Ajouter aux favoris »
>   Alors je suis redirigé vers la page de connexion
> ```

> [!example]- Analogie
> La user story est la commande du client (« une pizza végétarienne pour 4 ») ; les critères d'acceptation sont la liste de contrôle du livreur avant de partir.

> [!question]- Pourquoi l'utiliser ?
> Centrer le travail sur la valeur utilisateur, partager une compréhension commune (PO, dev, testeur), écrire des tests directement à partir des critères.

> [!question]- Comment ça marche ?
> Critères **INVEST** : Indépendante, Négociable, Valuable (apporte de la valeur), Estimable, Small (petite), Testable.
> **Definition of Ready** (prête à être prise) et **Definition of Done** (terminée : code, tests, revue, doc, déployée en recette…).

> [!question]- Quand l'utiliser ?
> Chaque élément du backlog fonctionnel.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les tâches purement techniques (migration, dette) ne se forcent pas toujours en user story : on les formule en « enabler » avec leur valeur.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| User story | Besoin exprimé du point de vue utilisateur |
| Critère d'acceptation | Condition vérifiable de fin |
| Gherkin | Syntaxe Given/When/Then |
| DoR / DoD | Definition of Ready / Done |
| Epic | Grosse fonctionnalité découpée en stories |

---

## Points clés

- Format « En tant que / je veux / afin de »
- Critères testables, cas nominal ET cas d'erreur
- INVEST
- Les critères deviennent des tests E2E

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Story trop grosse (« gérer les utilisateurs »)
> - Critères vagues (« ça doit être rapide »)

---

## Exemple minimal

```typescript
// Le critère devient un test Playwright
test('un visiteur est redirigé vers la connexion', async ({ page }) => {
  await page.goto('/films/42');
  await page.getByRole('button', { name: 'Ajouter aux favoris' }).click();
  await expect(page).toHaveURL(/\/login/);
});
```

> [!note] Ce que j'en retiens
> Critère d'acceptation = test automatisé presque mot pour mot.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Découper un epic en stories livrables verticalement (front + back + BDD pour une petite valeur)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Conception]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/conc-02-user-stories-criteres-acceptation]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Que signifie le « S » d'INVEST et pourquoi est-ce important ?

---

## Tâches

- [ ] #task Écrire 5 user stories + critères pour le MVP de CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
