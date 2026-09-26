---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - conception/user-stories
aliases:
  - "User Stories et Critères d'Acceptation"
parent: "[[Conception]]"
related_theory:
  - "[[METH-02-Scrum|Scrum]]"
  - "[[CONC-09-Estimation-Planification|Estimation et Planification]]"
  - "[[TEST-06-TDD|TDD]]"
related_projects: []
source: "https://www.atlassian.com/fr/agile/project-management/user-stories"
---

# User Stories et Critères d'Acceptation

> [!abstract] En bref
> Une **user story** décrit une fonctionnalité **du point de vue de l'utilisateur** : « En tant que…, je veux…, afin de… ». Ses **critères d'acceptation** disent **précisément** quand elle est terminée. Bien écrits, ces critères deviennent presque mot pour mot tes **tests**.

## Le format

```text
En tant qu'utilisateur connecté,
je veux ajouter un film à mes favoris,
afin de le retrouver rapidement plus tard.
```

| Partie | Répond à |
|---|---|
| En tant que… | **qui** ? |
| je veux… | **quoi** ? |
| afin de… | **pourquoi** ? (la valeur) |

## Les critères d'acceptation (Étant donné / Quand / Alors)

```text
Scénario : ajout d'un favori
  Étant donné que je suis connecté et sur la fiche de « Dune »
  Quand je clique sur « Ajouter aux favoris »
  Alors le bouton affiche « Retirer des favoris »
  Et « Dune » apparaît dans ma page Favoris

Scénario : visiteur non connecté
  Étant donné que je ne suis pas connecté
  Quand je clique sur « Ajouter aux favoris »
  Alors je suis redirigé vers la page de connexion
```

Toujours au moins : le **cas normal** et les **cas d'erreur** (non connecté, déjà en favori, API en panne).

Cette syntaxe s'appelle **Gherkin** (*Given / When / Then* en anglais).

## Du critère au test

```ts
// Playwright
test('un visiteur est redirigé vers la connexion', async ({ page }) => {
  await page.goto('/movies/438631');
  await page.getByRole('button', { name: 'Ajouter aux favoris' }).click();
  await expect(page).toHaveURL(/\/login/);
});
```

Voir [[TEST-05-Tests-E2E-Playwright|Tests E2E]].

## Une bonne story est…

| Critère | Mauvais exemple | Bon exemple |
|---|---|---|
| **Petite** (quelques jours max) | « gérer les utilisateurs » | « se connecter avec e-mail et mot de passe » |
| **Testable** | « ça doit être rapide » | « la recherche répond en moins de 500 ms » |
| **Utile** seule | « créer la table favoris » | « ajouter un favori » (front + back + base) |
| **Indépendante** | dépend de 3 autres stories | livrable seule |

On découpe **verticalement** : une petite fonctionnalité complète (écran + API + base), pas « tout le back puis tout le front ».

## Vocabulaire d'équipe

- **Epic** : une grosse fonctionnalité (« Favoris ») découpée en plusieurs stories.
- **Definition of Ready** : ce qu'il faut pour commencer une story (critères écrits, maquette disponible).
- **Definition of Done** : ce qu'il faut pour la dire finie (code relu, tests verts, déployée en recette).

## Sur tes projets

Une story = un **ticket** GitLab (voir [[04-Issues-Boards|Issues et Boards]]), avec les critères dans la description. Tu codes, tu coches les critères, tu fermes.

## Pièges

- **Des stories trop grosses** : on ne sait jamais quand elles finissent.
- **Des critères vagues** : impossible de savoir si c'est terminé.
- **Oublier les cas d'erreur** : ils reviennent sous forme de bugs.
