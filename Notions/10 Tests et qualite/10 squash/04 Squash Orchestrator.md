---
type: notion
statut: a apprendre
resume: "Squash Orchestrator (basé sur OpenTestFactory) est le chef d'orchestre qui reçoit une demande d'exécution, la confie à un agent, puis renvoie les résultats à Squash TM."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Squash Orchestrator (basé sur OpenTestFactory) est le **chef d'orchestre** qui reçoit une demande d'exécution, la confie à un agent, puis renvoie les résultats à Squash TM.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour lancer des tests automatisés (Playwright, Cypress, JUnit…) depuis Squash TM ou depuis la CI, sur la bonne machine, et récupérer les résultats automatiquement.

**Qu'est-ce qui se passait sans ça ?**
On lançait les scripts à la main, puis on recopiait « OK / KO » dans Squash TM. Lent, source d'erreurs, et aucun lien avec les vraies traces d'exécution.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Le trajet d'une exécution :

1. Dans **Squash TM**, tu lances une suite de tests automatisés.
2. Squash TM envoie la demande à l'**Orchestrator** (un service sur un serveur).
3. L'Orchestrator cherche un **[[05 Agent Squash|agent]]** qui a les bons **tags** (ex. `linux`, `playwright`).
4. L'agent récupère le dépôt Git des tests, lance la commande (`npx playwright test ...`), et renvoie les rapports.
5. L'Orchestrator **publie les résultats** dans Squash TM : chaque cas de test passe en succès ou échec, avec les rapports en pièce jointe.

Il ressemble beaucoup à GitLab CI : l'Orchestrator joue le rôle de GitLab, l'agent celui du [[03 Runner GitLab|runner]].

## ⚠️ Limites et pièges

- **L'Orchestrator n'exécute pas les tests lui-même** : sans agent connecté avec les bons tags, l'exécution reste en attente.
- **C'est un service d'infrastructure** : son installation et ses jetons d'accès sont gérés par l'équipe (pas à installer dans son coin sur un poste d'entreprise).
- **La machine de l'agent doit pouvoir joindre l'appli testée** : même problème réseau qu'avec un runner (pare-feu, environnement de recette).

## 🔗 Liens

- **Prérequis :** [[02 Squash TM|Squash TM]]
- **Voir aussi :** [[05 Agent Squash|Agent Squash]], [[06 Référence du test automatisé|Référence du test automatisé]], [[03 Runner GitLab|Runner GitLab]]
- **Utilisé dans :** l'exécution des cas de test automatisés depuis Squash TM

## 📚 Notes

- OpenTestFactory : https://opentestfactory.org/
