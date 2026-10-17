---
type: notion
statut: a apprendre
resume: "La référence est l'adresse du script qu'un cas de test Squash doit lancer : dépôt, dossier, fichier et nom du test."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** La référence est l'**adresse du script** qu'un cas de test Squash doit lancer : dépôt, dossier, fichier et nom du test.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour faire le lien entre un cas de test écrit dans Squash TM et le vrai test Playwright dans Git.

**Qu'est-ce qui se passait sans ça ?**
Rien ne reliait les deux mondes : on ne savait pas quel script correspondait à quel cas de test, et les résultats ne remontaient pas.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Dans le cas de test, bloc **Automatisation**, champ **« Référence du test automatisé »** :

```
[dépôt]/[dossier]#[fichier_de_test]#[cas_de_test]
```

Exemple :

```
exploration-tests/e2e#connexion.spec.ts#connexion valide
```

- **dépôt** : le nom du dépôt Git déclaré dans Squash ;
- **dossier** : optionnel ;
- **fichier** : le nom du fichier (ou un motif) ;
- **cas de test** : le titre du `test('...')`, optionnel (motif accepté).

L'agent clone le dépôt et lance uniquement les tests qui correspondent.

## ⚠️ Limites et pièges

- **Elle doit correspondre exactement** (majuscules, espaces) au titre du test, sinon aucun résultat ne remonte.
- **Si la référence sélectionne plusieurs tests**, un seul échec suffit pour mettre le cas de test en échec.
- **Renommer un test dans le code** casse le lien : pense à mettre à jour Squash.
- **Plusieurs cas de test peuvent avoir la même référence** : ils lanceront le même script.
- **Le format exact peut varier selon la version** : vérifier la page « Automatisation avec Playwright » de la doc Squash.

## 🔗 Liens

- **Prérequis :** [[Squash TM]], [[Playwright]]
- **Voir aussi :** [[Squash Orchestrator]]
- **Utilisé dans :** chaque cas de test automatisé de Squash TM

## 📚 Notes

- 
