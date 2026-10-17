---
type: notion
statut: a apprendre
resume: "Une assertion web-first (await expect(locator)...) réessaie toute seule jusqu'à ce que la condition soit vraie, ou jusqu'au délai maximum."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Une assertion web-first (`await expect(locator)...`) **réessaie toute seule** jusqu'à ce que la condition soit vraie, ou jusqu'au délai maximum.

## ❓ Le problème

**Pourquoi ça existe ?**
Parce qu'une page web change dans le temps : un texte s'affiche après une requête, un bouton s'active après un chargement. Il faut vérifier « au bon moment ».

**Qu'est-ce qui se passait sans ça ?**
On vérifiait l'état une seule fois, tout de suite. Si la page n'était pas encore prête, le test échouait alors que l'appli marchait : des tests rouges au hasard.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Compare les deux :

```ts
// ✅ Web-first : réessaie pendant 5 s (par défaut) jusqu'à ce que ce soit visible
await expect(page.getByText('Commande validée')).toBeVisible();

// ❌ Vérifie une seule fois, tout de suite : échoue si le texte arrive 200 ms plus tard
expect(await page.getByText('Commande validée').isVisible()).toBe(true);
```

La différence : dans la première, on donne le **locator** à `expect`, donc Playwright peut le rechercher en boucle. Dans la deuxième, on lui donne un simple `true`/`false` déjà calculé.

Les plus utilisées : `toBeVisible()`, `toHaveText()`, `toContainText()`, `toHaveValue()`, `toBeChecked()`, `toBeEnabled()`, `toHaveCount()`, et sur la page `toHaveURL()`, `toHaveTitle()`.

## ⚠️ Limites et pièges

- **Oublier le `await`** devant `expect(...)` : le test continue sans attendre, et passe ou casse au hasard.
- **Délai par défaut : 5 secondes** pour les assertions (réglable avec `expect: { timeout }` dans la config). Différent du timeout d'un test entier (30 s par défaut).
- **`toHaveText` compare tout le texte**, `toContainText` cherche une partie : prendre le mauvais donne des échecs incompréhensibles.
- **`.not.toBeVisible()`** attend aussi : pratique pour vérifier qu'un chargement a disparu.

## 🔗 Liens

- **Prérequis :** [[Playwright]], [[Locators Playwright]]
- **Voir aussi :** [[Test flaky]]
- **Utilisé dans :** la partie « résultat attendu » de chaque test (le *Assert* de AAA)

## 📚 Notes

- 
