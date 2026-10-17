---
type: notion
statut: a apprendre
resume: "Un test flaky (instable) est un test qui passe ou échoue au hasard, sans que le code ait changé."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Un test flaky (instable) est un test qui **passe ou échoue au hasard**, sans que le code ait changé.

## ❓ Le problème

**Pourquoi ça existe ?**
Le mot existe parce que c'est le problème n°1 des tests E2E : il faut savoir le reconnaître et le corriger.

**Qu'est-ce qui se passait sans ça ?**
On relançait le pipeline jusqu'à ce qu'il passe. Au bout d'un moment, plus personne ne croyait les tests rouges… et les vrais bugs passaient aussi.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Un test est flaky quand son résultat dépend de quelque chose qu'il ne contrôle pas. Les causes classiques :

| Cause | Exemple | Solution |
|---|---|---|
| Le temps | `waitForTimeout(2000)`, vérification trop tôt | [[04 Assertions web-first|Assertions web-first]] |
| Les données | deux tests modifient le même utilisateur | une donnée par test |
| L'ordre | le test B a besoin de ce que A a créé | tests indépendants |
| L'environnement | serveur de recette lent, réseau | `webServer` local, mocks (`page.route`) |
| Le sélecteur | élément qui bouge, animation | meilleur [[03 Locators Playwright\|locator]] |

Pour enquêter : la **trace** (`trace: 'retain-on-failure'`) montre chaque étape, capture et requête réseau au moment de l'échec : `npx playwright show-trace trace.zip`.

## ⚠️ Limites et pièges

- **Ajouter des `retries` ne corrige rien** : ça cache le problème.
- **« Ça passe chez moi »** : en CI la machine est plus lente et partagée, les problèmes de timing ressortent.
- **Lancer un test 20 fois** pour vérifier qu'il est stable : `npx playwright test mon.spec.ts --repeat-each=20`.

## 🔗 Liens

- **Prérequis :** [[02 Playwright|Playwright]], [[04 Assertions web-first|Assertions web-first]]
- **Voir aussi :** [[01 Pyramide des tests|Pyramide des tests]], [[06 Configuration Playwright|Configuration Playwright]]
- **Utilisé dans :** l'analyse des rapports de CI

## 📚 Notes

- 
