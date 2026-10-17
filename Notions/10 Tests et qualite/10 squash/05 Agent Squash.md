---
type: notion
statut: a apprendre
resume: "L'agent (opentf-agent) est un petit programme installé sur une machine d'exécution qui demande régulièrement du travail à l'Orchestrator et lance les tests."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** L'agent (`opentf-agent`) est un **petit programme installé sur une machine d'exécution** qui demande régulièrement du travail à l'Orchestrator et lance les tests.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour que les tests tournent sur une machine qui a ce qu'il faut (Node, navigateurs, accès réseau à l'appli), sans ouvrir cette machine aux connexions entrantes.

**Qu'est-ce qui se passait sans ça ?**
L'Orchestrator aurait dû se connecter lui-même à chaque machine (en SSH par exemple) : il fallait ouvrir des accès réseau dans l'autre sens, ce qui pose des problèmes de sécurité en entreprise.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

L'agent fonctionne en **interrogation régulière** (*polling*), exactement comme un runner GitLab :

- Il est installé avec `pip` (c'est un programme Python) sur la machine d'exécution.
- Au démarrage, on lui donne l'adresse de l'Orchestrator, un **jeton** et des **tags** :

```bash
opentf-agent --host https://orchestrator.mon-entreprise.com --token "$TOKEN" --tags linux,playwright
```

- Ensuite, il demande toutes les quelques secondes : « Tu as du travail pour moi ? ». C'est **lui qui sort** vers l'Orchestrator, donc pas besoin d'ouvrir de port sur sa machine.
- Quand il reçoit un travail, il exécute les commandes et renvoie les fichiers de résultat.

## ⚠️ Limites et pièges

- **Installer Playwright n'installe pas l'agent** : ce sont deux choses différentes.
- **La machine de l'agent doit avoir tout l'outillage** : Node, `npm ci`, les navigateurs Playwright… sinon le test échoue avant de commencer.
- **Les tags doivent correspondre** à ceux demandés par l'exécution, sinon l'agent ne reçoit rien.
- **Le jeton est un secret** : jamais dans un fichier versionné.
- **En entreprise** : où l'agent tourne (serveur, VM, conteneur) se décide avec l'équipe infra, pas tout seul.

## 🔗 Liens

- **Prérequis :** [[04 Squash Orchestrator|Squash Orchestrator]]
- **Voir aussi :** [[03 Runner GitLab|Runner GitLab]], [[06 Variables d'environnement|Variables d'environnement]]
- **Utilisé dans :** la machine qui exécute les tests lancés depuis Squash TM

## 📚 Notes

- 
