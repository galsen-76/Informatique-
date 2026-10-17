---
type: notion
statut: a apprendre
resume: "Squash TM est l'outil où l'on écrit, organise et suit les tests : les exigences, les cas de test, les campagnes et leurs résultats."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Squash TM est l'outil où l'on **écrit, organise et suit les tests** : les exigences, les cas de test, les campagnes et leurs résultats.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour savoir ce qui doit être testé, ce qui a été testé, et avec quel résultat, en un seul endroit partagé par toute l'équipe.

**Qu'est-ce qui se passait sans ça ?**
Les cas de test étaient dans des fichiers Excel éparpillés. On ne savait pas quelle exigence était couverte, ni quelle version avait été testée, ni par qui.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Squash TM s'organise en **espaces** qui se suivent :

1. **Exigences** : ce que l'appli doit faire (« l'utilisateur peut se connecter »).
2. **Cas de test** : comment on le vérifie (étapes : action → résultat attendu). Chaque cas est **lié** à une ou plusieurs exigences : c'est la **traçabilité**.
3. **Campagnes** : on regroupe des cas de test à exécuter pour une version (« Recette v2.3 »), découpées en **itérations**.
4. **Exécutions** : on joue les tests et on note le résultat (succès, échec, bloqué…).

Un cas de test peut être **manuel** (quelqu'un le joue) ou **automatisé** : il pointe alors vers un script (Playwright…) grâce à sa [[Référence du test automatisé]], et c'est [[Squash Orchestrator]] qui le lance.

## ⚠️ Limites et pièges

- **Squash TM ne lance pas les tests automatisés lui-même** : il demande à l'Orchestrator, qui passe par un agent.
- **L'automatisation se règle d'abord côté administration** (serveur, dépôt Git, technologie du projet). Si la liste affiche « Aucun », c'est un réglage admin, pas ton erreur.
- **Un cas de test mal découpé** (10 vérifications dans une seule étape) rend le résultat inutilisable : quand il échoue, on ne sait pas quoi.

## 🔗 Liens

- **Prérequis :** [[Test automatisé]]
- **Voir aussi :** [[Squash Orchestrator]], [[Référence du test automatisé]]
- **Utilisé dans :** la recette et le suivi des campagnes de test

## 📚 Notes

- Doc : https://tm-fr.doc.squashtest.com/
