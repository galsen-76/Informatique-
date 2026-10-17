---
type: notion
statut: a apprendre
resume: "La pyramide dit combien écrire de chaque type de test : beaucoup de tests unitaires, moins de tests d'intégration, quelques tests end-to-end."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** La pyramide dit **combien** écrire de chaque type de test : beaucoup de tests unitaires, moins de tests d'intégration, quelques tests end-to-end.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour savoir combien écrire de chaque type de test, et avoir confiance dans son code sans y passer des heures.

**Qu'est-ce qui se passait sans ça ?**
On testait surtout à la main ou avec des tests E2E (qui lancent toute l'appli). Résultat : les tests prenaient des heures, cassaient souvent, et quand ils échouaient on ne savait pas où était le bug. Les bugs étaient trouvés tard, et on avait peur de toucher au code.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Il y a trois étages :

- **En bas, les tests unitaires** : tu testes une fonction toute seule. Ça tourne en quelques millisecondes, et si ça casse, tu sais exactement où est le problème.
- **Au milieu, les tests d'intégration** : tu vérifies que deux ou trois morceaux marchent ensemble (ton API + la base de données, par exemple). C'est un peu plus lent.
- **En haut, les tests end-to-end (E2E)** : tu lances toute l'appli dans un vrai navigateur et tu fais un parcours comme un utilisateur. C'est le plus réaliste, mais c'est lent, ça casse plus souvent, et c'est plus dur de trouver d'où vient l'erreur.

> L'idée : **plein de petits tests unitaires en bas, et juste quelques gros tests en haut** pour les parcours vraiment importants (connexion, paiement…). La majorité des bugs est attrapée tout de suite, pour pas cher, et les E2E vérifient juste que l'ensemble tient debout.

| Étage | Vitesse | Combien | Outil |
|---|---|---|---|
| Unitaire | millisecondes | beaucoup | Vitest, Jest |
| Intégration | secondes | moyen | Supertest, Testcontainers |
| E2E | dizaines de secondes | peu | [[02 Playwright|Playwright]] |

## ⚠️ Limites et pièges

- **La pyramide inversée (le « cornet de glace »)** : presque que des E2E et des tests manuels. Lent, fragile, cher. C'est exactement ce que la pyramide veut éviter.
- **Ce n'est pas une règle de pourcentages.** Pas de « 70 / 20 / 10 » obligatoire : c'est une **forme**. Une appli qui est surtout de l'affichage aura peut-être plus de tests d'intégration.
- **Beaucoup de tests unitaires ≠ appli qui marche.** Chaque pièce peut marcher seule et l'ensemble planter. C'est pour ça qu'il faut quand même quelques E2E.
- **Tester l'implémentation au lieu du comportement** : si un test casse dès que tu renommes une variable interne, il teste le *comment* et pas le *quoi*.
- **Quand tu écris des tests Playwright, tu es en haut** : choisis les parcours critiques, ne cherche pas à tout couvrir en Playwright.

## 🔗 Liens

- **Prérequis :** [[01 Test automatisé|Test automatisé]]
- **Voir aussi :** [[02 Playwright|Playwright]], [[07 Test flaky|Test flaky]]
- **Utilisé dans :** le choix de ce qui est testé en Playwright (E2E) et de ce qui est laissé aux devs (unitaires)

## 📚 Notes

- Mike Cohn a popularisé la pyramide (livre *Succeeding with Agile*, 2009).
- Variante connue : le « trophée des tests » (Kent C. Dodds), qui met plus de poids sur l'intégration.
