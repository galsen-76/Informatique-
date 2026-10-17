---
type: notion
statut: a apprendre
resume: "Les hooks sont des fonctions qui s'exécutent automatiquement avant ou après les tests, pour préparer ou nettoyer."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Les hooks sont des fonctions qui s'exécutent **automatiquement avant ou après** les tests, pour préparer ou nettoyer.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour ne pas réécrire la même préparation (aller sur la page, se connecter) au début de chaque test.

**Qu'est-ce qui se passait sans ça ?**
On copiait-collait les mêmes lignes au début de 20 tests. Le jour où l'URL de connexion changeait, il fallait modifier 20 endroits.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Il en existe quatre :

| Hook | Quand | Usage typique |
|---|---|---|
| `test.beforeEach` | avant **chaque** test | ouvrir la page de départ |
| `test.afterEach` | après **chaque** test | nettoyer, faire une capture |
| `test.beforeAll` | une fois avant les tests du fichier/groupe | créer une donnée partagée |
| `test.afterAll` | une fois après | supprimer cette donnée |

```ts
test.describe('Panier', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/boutique');
  });

  test('ajouter un article', async ({ page }) => { /* ... */ });
  test('vider le panier', async ({ page }) => { /* ... */ });
});
```

Placés dans un `test.describe`, ils ne s'appliquent qu'aux tests de ce groupe.

## ⚠️ Limites et pièges

- **`beforeAll` tourne une fois par worker**, pas une fois au total : avec 4 workers en parallèle, il peut s'exécuter 4 fois.
- **Pas de `page` dans `beforeAll`** par défaut : chaque test a sa propre page. Pour se connecter une seule fois, on utilise plutôt un *setup* + `storageState` (on sauvegarde la session et on la réutilise).
- **Un `beforeEach` trop chargé** cache ce que fait le test : garde-le court.
- **Pour du réutilisable entre fichiers**, Playwright préfère les *fixtures* aux hooks.

## 🔗 Liens

- **Prérequis :** [[02 Playwright|Playwright]]
- **Voir aussi :** [[06 Configuration Playwright|Configuration Playwright]]
- **Utilisé dans :** les fichiers `*.spec.ts` qui partagent la même préparation

## 📚 Notes

- 
