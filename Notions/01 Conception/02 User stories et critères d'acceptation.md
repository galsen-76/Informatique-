---
type: notion
statut: a apprendre
resume: "Une user story décrit une fonctionnalité du point de vue de l'utilisateur : « En tant que…, je veux…, afin de… »."
revu:
sources:
  - "https://www.atlassian.com/fr/agile/project-management/user-stories"
---
# User stories et critères d'acceptation

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une **user story** décrit une fonctionnalité **du point de vue de l'utilisateur** : « En tant que…, je veux…, afin de… ».

## Le problème

**Pourquoi c'est utile ?**
Pour décrire une fonctionnalité du point de vue de l'utilisateur et savoir précisément quand elle est terminée.

**Qu'est-ce qui se passait sans ça ?**
Les tâches étaient écrites en jargon technique (« ajouter une table reviews »). Personne ne savait à quoi elles servaient, ni quand on pouvait les considérer comme finies.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Ses **critères d'acceptation** disent **précisément** quand elle est terminée. Bien écrits, ces critères deviennent presque mot pour mot tes **tests**.

### Le format

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

### Les critères d'acceptation (Étant donné / Quand / Alors)

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

### Du critère au test

```ts
// Playwright
test('un visiteur est redirigé vers la connexion', async ({ page }) => {
  await page.goto('/movies/438631');
  await page.getByRole('button', { name: 'Ajouter aux favoris' }).click();
  await expect(page).toHaveURL(/\/login/);
});
```

Voir [[05 Tests end-to-end|Tests E2E]].

### Une bonne story est…

| Critère | Mauvais exemple | Bon exemple |
|---|---|---|
| **Petite** (quelques jours max) | « gérer les utilisateurs » | « se connecter avec e-mail et mot de passe » |
| **Testable** | « ça doit être rapide » | « la recherche répond en moins de 500 ms » |
| **Utile** seule | « créer la table favoris » | « ajouter un favori » (front + back + base) |
| **Indépendante** | dépend de 3 autres stories | livrable seule |

On découpe **verticalement** : une petite fonctionnalité complète (écran + API + base), pas « tout le back puis tout le front ».

### Vocabulaire d'équipe

- **Epic** : une grosse fonctionnalité (« Favoris ») découpée en plusieurs stories.
- **Definition of Ready** : ce qu'il faut pour commencer une story (critères écrits, maquette disponible).
- **Definition of Done** : ce qu'il faut pour la dire finie (code relu, tests verts, déployée en recette).

## 🧪 Exemple

### Sur tes projets

Une story = un **ticket** GitLab (voir [[03 Issues et boards|Issues et Boards]]), avec les critères dans la description. Tu codes, tu coches les critères, tu fermes.

## ⚠️ Limites et pièges

- **Des stories trop grosses** : on ne sait jamais quand elles finissent.
- **Des critères vagues** : impossible de savoir si c'est terminé.
- **Oublier les cas d'erreur** : ils reviennent sous forme de bugs.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[02 Scrum|Scrum]], [[09 Estimation et planification|Estimation et planification]], [[07 TDD|TDD]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.atlassian.com/fr/agile/project-management/user-stories
