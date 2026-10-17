---
type: notion
statut: a apprendre
resume: "Un locator est la façon de trouver un élément dans la page, comme le ferait un utilisateur : par son rôle, son libellé, son texte."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Un locator est la **façon de trouver un élément** dans la page, comme le ferait un utilisateur : par son rôle, son libellé, son texte.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour viser le bon bouton ou le bon champ, et que le test continue de marcher quand le design change.

**Qu'est-ce qui se passait sans ça ?**
On visait les éléments par des sélecteurs CSS ou XPath (`div > div:nth-child(3) > button`). Au moindre changement de mise en page, le test cassait alors que l'appli marchait très bien.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Un locator ne cherche pas l'élément tout de suite : il garde la **recette** pour le trouver, et il la rejoue au moment de l'action (c'est ce qui permet l'auto-wait).

Dans l'ordre de préférence :

| Locator | Quand | Exemple |
|---|---|---|
| `getByRole` | presque toujours | `getByRole('button', { name: 'Se connecter' })` |
| `getByLabel` | champs de formulaire | `getByLabel('Mot de passe')` |
| `getByText` | un texte affiché | `getByText('Bienvenue')` |
| `getByPlaceholder` | champ sans label | `getByPlaceholder('Rechercher')` |
| `getByTestId` | quand rien d'autre ne marche | `getByTestId('panier-total')` → `data-testid="panier-total"` |
| `locator('css')` | en dernier recours | `locator('.carte')` |

On peut affiner : `page.getByRole('listitem').filter({ hasText: 'Dune' })`, ou chaîner : `carte.getByRole('button', { name: 'Supprimer' })`.

## ⚠️ Limites et pièges

- **Mode strict** : si le locator trouve **plusieurs** éléments et que tu fais une action dessus, Playwright lève une erreur. Il faut être plus précis (`name`, `filter`) plutôt que d'ajouter `.first()` partout.
- **`getByRole` utilise le nom accessible** : si le bouton n'a qu'une icône sans `aria-label`, il n'a pas de nom → c'est aussi un bug d'accessibilité à remonter.
- **Les `data-testid` doivent être ajoutés par les devs** : demande-les plutôt que d'écrire un sélecteur CSS fragile.
- **Le texte change avec la langue** : un test basé sur `getByText` casse si l'appli est traduite.

## 🔗 Liens

- **Prérequis :** [[02 Playwright|Playwright]]
- **Voir aussi :** [[04 Assertions web-first|Assertions web-first]]
- **Utilisé dans :** chaque ligne d'action des tests Playwright

## 📚 Notes

- Astuce : dans `npx playwright test --ui` ou `codegen`, l'outil « Pick locator » propose le meilleur locator pour un élément.
