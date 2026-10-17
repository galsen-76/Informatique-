---
type: notion
statut: a apprendre
resume: "Un test automatisé est un programme qui vérifie un autre programme : il fait une action, puis compare le résultat obtenu au résultat attendu."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Un test automatisé est un **programme qui vérifie un autre programme** : il fait une action, puis compare le résultat obtenu au résultat attendu.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour vérifier en quelques secondes, et à chaque modification, que l'appli fait toujours ce qu'elle doit faire.

**Qu'est-ce qui se passait sans ça ?**
On refaisait les mêmes vérifications à la main avant chaque livraison. C'était long, on en oubliait, et une modification pouvait casser une ancienne fonctionnalité sans que personne ne le voie (une **régression**).

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Un test, c'est toujours le même schéma en trois temps (**AAA**) :

1. **Arrange** : je prépare (j'ouvre la page, je crée un utilisateur de test).
2. **Act** : je fais l'action (je clique sur « Se connecter »).
3. **Assert** : je vérifie le résultat (« Bonjour Oumar » est affiché).

```ts
test('connexion valide', async ({ page }) => {
  await page.goto('/login');                                     // Arrange
  await page.getByLabel('Email').fill('test@exemple.fr');        // Act
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await expect(page.getByText('Bonjour')).toBeVisible();         // Assert
});
```

C'est le même découpage qu'un **cas de test Squash** : des actions, puis un résultat attendu. Le test automatisé, c'est le cas de test écrit pour qu'une machine le rejoue.

## ⚠️ Limites et pièges

- **Un test qui ne vérifie rien** (pas d'`expect`) passe toujours : il ne sert à rien.
- **Un test qui dépend d'un autre** (ordre d'exécution, données laissées par le précédent) finit par casser au hasard.
- **Tout automatiser n'est pas rentable** : un test lancé une fois par an coûte plus cher à maintenir qu'à faire à la main.
- **Vert ne veut pas dire sans bug** : le test ne vérifie que ce que tu lui as demandé de vérifier.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Pyramide des tests]], [[Playwright]], [[Squash TM]]
- **Utilisé dans :** tous les tests Playwright, la CI, l'exécution depuis Squash TM

## 📚 Notes

- 
