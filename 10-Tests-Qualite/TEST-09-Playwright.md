---
created: 2026-10-02
modified: 2026-10-02
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
tags:
  - tests/e2e
  - playwright
aliases:
  - "Playwright de A à Z"
parent: "[[Tests et Qualité]]"
related_theory:
  - "[[TEST-05-Tests-E2E-Playwright|Tests E2E avec Playwright]]"
  - "[[TEST-01-Pyramide-des-Tests|Pyramide des tests]]"
  - "[[TEST-03-Mocks-Stubs-Spies|Mocks]]"
related_projects:
  - "[[02_Projects/CinéTrack|CinéTrack]]"
source: "https://playwright.dev/docs/intro"
---

# Playwright de A à Z

> [!abstract] En bref
> **Playwright** pilote un **vrai navigateur** (Chromium, Firefox, WebKit) comme le ferait un utilisateur : il ouvre une page, clique, remplit un formulaire, puis **vérifie** ce qui s'affiche. On l'utilise pour les **tests de bout en bout** (E2E) : ils prouvent qu'un parcours complet fonctionne (se connecter, chercher un film, l'ajouter aux favoris). Sa force : il **attend tout seul** que les éléments soient prêts, ce qui rend les tests stables.

Vue d'ensemble des tests E2E et de leur place dans la stratégie : [[TEST-05-Tests-E2E-Playwright|Tests E2E]]. Avec Squash TM : [[Playwright|Playwright et Squash]].

## À quoi ça sert

Les tests unitaires vérifient une fonction isolée. Ils ne voient pas qu'un bouton est caché par un autre élément, qu'une route renvoie 404, ou que le front et l'API ne se comprennent plus. Un test Playwright **rejoue un parcours utilisateur entier** dans le navigateur : si ce test passe, le parcours fonctionne vraiment.

On en écrit **peu**, pour les parcours **critiques** (connexion, recherche, paiement…), car ils sont plus lents que les tests unitaires (voir la [[TEST-01-Pyramide-des-Tests|pyramide des tests]]).

## Installer

```bash
npm init playwright@latest
```

L'assistant crée :

```text
playwright.config.ts      ← la configuration
tests/
  example.spec.ts         ← un exemple de test
```

et installe les navigateurs. Pour n'en installer qu'un : `npx playwright install chromium`.

## La configuration utile

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:4200',   // permet d'écrire page.goto('/movies')
    trace: 'on-first-retry',            // enregistre une trace quand un test échoue puis est relancé
  },
  retries: process.env.CI ? 2 : 0,      // relances seulement en CI
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npm start',               // lance l'application avant les tests
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
  },
});
```

| Option | Rôle |
|---|---|
| `baseURL` | l'adresse de l'application, pour écrire des chemins courts |
| `projects` | les navigateurs ou appareils sur lesquels lancer les tests |
| `webServer` | démarre l'application automatiquement |
| `retries` | relance un test échoué (utile en CI, à ne pas utiliser pour masquer un vrai problème) |
| `trace` | enregistre tout ce qui s'est passé, pour comprendre un échec |

## Un premier test : rechercher un film

```ts
// e2e/search.spec.ts
import { test, expect } from '@playwright/test';

test('rechercher un film affiche des résultats', async ({ page }) => {
  // Actions
  await page.goto('/');
  await page.getByRole('searchbox', { name: 'Rechercher un film' }).fill('Dune');
  await page.getByRole('button', { name: 'Rechercher' }).click();

  // Vérifications
  await expect(page).toHaveURL(/query=Dune/);
  await expect(page.getByRole('article').first()).toContainText('Dune');
});
```

Un test suit toujours la même logique qu'un cas de test manuel : **aller sur la page → agir → vérifier le résultat attendu**.

## Trouver les éléments : les locators

Un **locator** décrit **comment trouver** un élément. Il est recherché au moment de l'action, pas avant.

| Locator | Trouve | Exemple |
|---|---|---|
| `getByRole` | par rôle et nom accessible | `getByRole('button', { name: 'Se connecter' })` |
| `getByLabel` | un champ par son `<label>` | `getByLabel('Mot de passe')` |
| `getByPlaceholder` | un champ par son placeholder | `getByPlaceholder('Rechercher…')` |
| `getByText` | par texte visible | `getByText('Aucun film trouvé')` |
| `getByAltText` | une image par son `alt` | `getByAltText('Affiche de Dune')` |
| `getByTestId` | par `data-testid` | `getByTestId('favorite-button')` |
| `locator('css')` | par sélecteur CSS | à éviter, en dernier recours |

**L'ordre de préférence :** `getByRole` → `getByLabel` → `getByText` → `getByTestId` → CSS. Les premiers suivent ce que **voit l'utilisateur** : si le test les trouve, un lecteur d'écran aussi.

Affiner une recherche :

```ts
const card = page.getByRole('article').filter({ hasText: 'Dune' });   // la carte qui contient « Dune »
await card.getByRole('button', { name: 'Ajouter aux favoris' }).click();
page.getByRole('listitem').nth(2);                                      // le 3e élément
```

En Angular, ajoute un `data-testid` seulement quand aucun rôle ni texte ne suffit :

```html
<button data-testid="favorite-button" (click)="toggle()">♥</button>
```

## Agir

| Action | Exemple |
|---|---|
| cliquer | `.click()` |
| remplir un champ | `.fill('Dune')` |
| cocher | `.check()` / `.uncheck()` |
| choisir dans une liste | `.selectOption('fr')` |
| appuyer sur une touche | `.press('Enter')` |
| survoler | `.hover()` |
| envoyer un fichier | `.setInputFiles('affiche.png')` |

## Vérifier : les assertions

| Assertion | Vérifie |
|---|---|
| `toBeVisible()` | l'élément est affiché |
| `toHaveText('…')` / `toContainText('…')` | son texte exact / partiel |
| `toHaveValue('…')` | la valeur d'un champ |
| `toBeChecked()`, `toBeDisabled()` | l'état d'une case, d'un bouton |
| `toHaveCount(20)` | le nombre d'éléments |
| `toHaveURL(/favorites/)`, `toHaveTitle(/CinéTrack/)` | l'adresse, le titre de la page |
| `toHaveAttribute('aria-pressed', 'true')` | un attribut |

Toutes ces assertions **réessaient automatiquement** jusqu'à ce qu'elles soient vraies (5 secondes par défaut).

## Organiser ses tests

```ts
test.describe('Favoris', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/movies/438631');
  });

  test('ajouter un film aux favoris', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Ajouter aux favoris' });
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  test('le film apparaît dans « Mes favoris »', async ({ page }) => {
    // …
  });
});
```

Chaque test reçoit une **page neuve** dans un contexte de navigateur isolé (cookies et stockage vides) : les tests ne dépendent pas les uns des autres.

## Simuler l'API

Pour des tests rapides et stables, on peut **intercepter** les appels réseau et renvoyer une réponse préparée (voir [[TEST-03-Mocks-Stubs-Spies|Mocks]]) :

```ts
test('affiche un message si aucun film ne correspond', async ({ page }) => {
  await page.route('**/search/movie**', (route) =>
    route.fulfill({ json: { page: 1, results: [], total_pages: 0, total_results: 0 } }),
  );

  await page.goto('/search?query=zzzz');
  await expect(page.getByText('Aucun film trouvé')).toBeVisible();
});
```

On peut aussi simuler une **erreur** : `route.fulfill({ status: 500 })`.

## Se connecter une seule fois

Se reconnecter dans chaque test est lent. On se connecte **une fois** dans un projet de préparation, et on **enregistre l'état** (cookies, localStorage) dans un fichier réutilisé par les autres tests :

```ts
// e2e/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

setup('connexion', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('E-mail').fill(process.env.E2E_EMAIL!);
  await page.getByLabel('Mot de passe').fill(process.env.E2E_PASSWORD!);
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await expect(page.getByRole('button', { name: 'Se déconnecter' })).toBeVisible();
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
```

```ts
// playwright.config.ts (extrait)
projects: [
  { name: 'setup', testMatch: /.*\.setup\.ts/ },
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
    dependencies: ['setup'],
  },
],
```

Ajoute `playwright/.auth/` au `.gitignore` : ce fichier contient une session.

## Le Page Object : ne pas se répéter

Quand plusieurs tests utilisent la même page, on regroupe ses locators et ses actions dans une classe :

```ts
// e2e/pages/search.page.ts
import { type Page, type Locator } from '@playwright/test';

export class SearchPage {
  readonly searchbox: Locator;
  readonly results: Locator;

  constructor(private page: Page) {
    this.searchbox = page.getByRole('searchbox', { name: 'Rechercher un film' });
    this.results = page.getByRole('article');
  }

  async search(query: string) {
    await this.searchbox.fill(query);
    await this.searchbox.press('Enter');
  }
}
```

```ts
test('rechercher Dune', async ({ page }) => {
  const search = new SearchPage(page);
  await page.goto('/');
  await search.search('Dune');
  await expect(search.results.first()).toContainText('Dune');
});
```

Si le libellé du champ change, on ne corrige qu'un seul fichier.

## Les outils

| Commande | Rôle |
|---|---|
| `npx playwright test` | lancer tous les tests |
| `npx playwright test search.spec.ts` | un seul fichier |
| `npx playwright test -g "favoris"` | les tests dont le nom contient « favoris » |
| `npx playwright test --ui` | interface visuelle : lancer, voir chaque étape, relancer |
| `npx playwright test --debug` | pas à pas, avec l'inspecteur |
| `npx playwright codegen http://localhost:4200` | enregistre tes clics et génère le code |
| `npx playwright show-report` | le rapport HTML du dernier lancement |
| `npx playwright show-trace trace.zip` | rejouer une trace : captures, DOM, réseau, console à chaque étape |

Le code généré par `codegen` est un **brouillon** : renomme, remplace les locators fragiles et ajoute les vérifications (`expect`).

## En CI (GitLab)

```yaml
e2e:
  stage: test
  image: mcr.microsoft.com/playwright:v1.55.0-noble   # même version que @playwright/test dans package.json
  script:
    - npm ci
    - npx playwright test
  artifacts:
    when: always
    paths: [playwright-report/, test-results/]
    expire_in: 7 days
```

L'image officielle contient déjà les navigateurs. Les **artefacts** gardent le rapport et les traces : en cas d'échec, tu les télécharges depuis GitLab pour comprendre. Voir [[CICD-02-Pipeline-Full-Stack|Pipeline full stack]].

## Pourquoi ça marche

**L'attente automatique.** Avant chaque action, Playwright attend que l'élément soit **présent, visible, stable** (plus en mouvement), **activé**, et qu'il reçoive bien le clic (pas caché par un autre élément). Les assertions `expect(locator)` **réessaient** jusqu'à être vraies ou jusqu'au délai maximal. C'est ce qui supprime la plupart des tests « instables » : on ne devine pas combien de temps attendre, Playwright attend exactement ce qu'il faut.

**Le locator est paresseux.** `page.getByRole('button')` ne cherche rien au moment où on l'écrit : la recherche a lieu à chaque action. Si Angular redessine la page entre deux étapes, le locator retrouve le **nouvel** élément.

**L'isolation.** Chaque test démarre dans un contexte de navigateur neuf : un test ne peut pas « hériter » d'un cookie ou d'un favori laissé par un autre. Les tests peuvent donc tourner dans n'importe quel ordre, et en parallèle.

## Contre-exemple

**Intuition fausse : « pour être sûr que la page a chargé, j'ajoute une pause ».**

```ts
await page.getByRole('button', { name: 'Rechercher' }).click();
await page.waitForTimeout(3000);                                   // ❌ pause fixe
expect(await page.getByText('Dune').isVisible()).toBe(true);       // ❌ vérifie une seule fois
```

- Si l'API répond en 4 secondes, le test échoue ; si elle répond en 200 ms, il perd 2,8 secondes.
- `isVisible()` est lu **une seule fois**, sans réessayer.

```ts
await page.getByRole('button', { name: 'Rechercher' }).click();
await expect(page.getByText('Dune')).toBeVisible();   // ✅ attend jusqu'à ce que ce soit vrai
```

## Pièges

- **Oublier `await`** : l'action part sans être attendue, le test devient aléatoire.
- **Des locators fragiles** (`.card > div:nth-child(3) span`) : ils cassent au moindre changement de mise en page. Préfère `getByRole`, `getByLabel`, `data-testid`.
- **Des tests qui dépendent les uns des autres** (le test 2 a besoin du favori créé par le test 1) : chaque test doit préparer ses propres données.
- **Tester la vraie API TMDB** en CI : lent et instable. Simule-la avec `page.route`.
- **Des identifiants en dur** dans le code : utilise des variables d'environnement.
- **Augmenter les `retries`** pour faire passer un test instable : cherche la vraie cause (souvent une pause fixe ou un locator ambigu).
- **Tout tester en E2E** : garde-les pour les parcours critiques ; la logique se teste en unitaire.

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d'ouvrir la réponse.

**1. Pourquoi un test Playwright n'a-t-il pas besoin de pauses (`waitForTimeout`) ?**

> [!check]- Réponse
> Avant chaque action, Playwright attend que l'élément soit prêt (visible, stable, activé), et les assertions `expect(locator)` réessaient jusqu'à être vraies.

**2. Quel locator privilégier en premier, et pourquoi ?**

> [!check]- Réponse
> `getByRole` (puis `getByLabel`) : il suit ce que voit l'utilisateur et ce que lit un lecteur d'écran, et casse moins quand la mise en page change.

**3. À quoi servent `page.route` et `storageState` ?**

> [!check]- Réponse
> `page.route` intercepte un appel réseau pour renvoyer une réponse préparée ; `storageState` enregistre une session de connexion pour la réutiliser dans les autres tests.

## Exercices

> [!info] Comment t'entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l'**indice 1**, puis l'**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l'exercice sans regarder**.

### Exercice 1 · Le test de connexion

Écris un test qui : va sur `/login`, remplit « E-mail » avec `awa@test.fr` et « Mot de passe » avec `secret123`, clique sur « Se connecter », puis vérifie que l'URL contient `/movies` et que le bouton « Se déconnecter » est visible.

> [!tip]- Indice 1
> Trois parties : aller sur la page, agir (2 champs + 1 bouton), vérifier (URL + bouton).

> [!tip]- Indice 2
> Les champs se trouvent avec `getByLabel`, les boutons avec `getByRole('button', { name: … })`, l'URL se vérifie avec `toHaveURL`.

> [!success]- Solution
> ```ts
> import { test, expect } from '@playwright/test';
>
> test('connexion avec un compte valide', async ({ page }) => {
>   await page.goto('/login');
>   await page.getByLabel('E-mail').fill('awa@test.fr');
>   await page.getByLabel('Mot de passe').fill('secret123');
>   await page.getByRole('button', { name: 'Se connecter' }).click();
>
>   await expect(page).toHaveURL(/\/movies/);
>   await expect(page.getByRole('button', { name: 'Se déconnecter' })).toBeVisible();
> });
> ```

### Exercice 2 · Remplacer les mauvais locators

Réécris ce test avec de meilleurs locators et sans pause fixe.

```ts
test('ajouter aux favoris', async ({ page }) => {
  await page.goto('/movies/438631');
  await page.locator('div.actions > button:nth-child(2)').click();
  await page.waitForTimeout(2000);
  expect(await page.locator('.fav-count').textContent()).toBe('1');
});
```

> [!tip]- Indice 1
> Quel est le rôle et le nom visible du bouton ? Le compteur peut-il avoir un `data-testid` ?

> [!tip]- Indice 2
> Remplace la pause et la lecture unique par une assertion qui réessaie : `await expect(locator).toHaveText('1')`.

> [!success]- Solution
> ```ts
> test('ajouter aux favoris', async ({ page }) => {
>   await page.goto('/movies/438631');
>   await page.getByRole('button', { name: 'Ajouter aux favoris' }).click();
>   await expect(page.getByTestId('favorites-count')).toHaveText('1');
> });
> ```
>
> Le locator ne dépend plus de la mise en page, et l'assertion attend que le compteur change.

### Transfert · Tester un message d'erreur sans casser l'API

Un problème différent : il vérifie que tu as compris le principe, pas seulement l'exemple.

Tu veux vérifier que la page `/movies` affiche « Impossible de charger les films » quand l'API TMDB répond une erreur 500. Tu ne peux évidemment pas mettre TMDB en panne. Écris le test.

> [!tip]- Indice 1
> Il faut intercepter l'appel à l'API **avant** d'ouvrir la page, et renvoyer une fausse réponse.

> [!tip]- Indice 2
> `page.route('**/movie/popular**', (route) => route.fulfill({ status: 500 }))`, puis `goto` et une assertion sur le texte.

> [!success]- Solution
> ```ts
> test('affiche un message si l’API est en erreur', async ({ page }) => {
>   await page.route('**/movie/popular**', (route) => route.fulfill({ status: 500 }));
>
>   await page.goto('/movies');
>   await expect(page.getByText('Impossible de charger les films')).toBeVisible();
> });
> ```
>
> `page.route` doit être appelé **avant** `goto`, sinon la requête est déjà partie.

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n'est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : à quoi sert un test E2E et pourquoi Playwright n'a pas besoin de pauses
- [ ] **Rappeler** : l'ordre de préférence des locators, les actions et les assertions courantes
- [ ] **Utiliser** : écrire un test de parcours complet (aller, agir, vérifier) sans modèle
- [ ] **Résoudre un problème nouveau** : simuler l'API, réutiliser une session, tester un cas d'erreur
- [ ] **Repérer les erreurs** : diagnostiquer un test instable avec `--ui`, le rapport et la trace
- [ ] **Savoir quand ne pas l'utiliser** : la logique d'une fonction ou d'un composant se teste en unitaire, plus vite
