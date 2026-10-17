---
type: notion
statut: a apprendre
resume: "Le runner est la machine (ou le programme) qui exécute vraiment les jobs : GitLab décide quoi faire, le runner le fait."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Le runner est la **machine (ou le programme) qui exécute vraiment les jobs** : GitLab décide quoi faire, le runner le fait.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour que les jobs tournent sur des machines dédiées, avec le bon outillage, et pas sur le serveur GitLab lui-même.

**Qu'est-ce qui se passait sans ça ?**
Il fallait une machine de build configurée à la main, partagée, souvent en panne ou encombrée des restes des builds précédents.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

- Le runner **demande régulièrement du travail** à GitLab (il va le chercher lui-même : pas de connexion entrante à ouvrir).
- Avec l'**exécuteur Docker** (le plus courant), chaque job démarre un **conteneur neuf** à partir de l'`image:` du job, y lance le `script`, puis le jette. C'est son propre environnement d'exécution.
- Les **tags** permettent de choisir un runner précis (`tags: [docker, interne]`).

**Ce que le runner peut joindre dépend de l'endroit où il est installé**, pas de ton poste :
- un runner partagé dans le cloud **ne voit pas** les applis internes ni `localhost` de ton PC ;
- un runner de l'entreprise voit le réseau interne, mais passe par son [[12 Pare-feu|Pare-feu]] et son [[13 Proxy|Proxy]] pour Internet.

C'est pour ça qu'on démarre souvent l'appli **dans le job** (`webServer` de Playwright) : elle est alors sur la même machine que les tests.

## ⚠️ Limites et pièges

- **« Ça marche en local, pas en CI »** : autre machine, autre réseau, autres droits.
- **Un job en attente (*pending*)** : aucun runner disponible avec les bons tags.
- **Ne pas installer un runner sur une machine de l'entreprise sans l'équipe** : il exécute du code venu du dépôt.

## 🔗 Liens

- **Prérequis :** [[02 Pipeline GitLab CI|Pipeline GitLab CI]], [[01 Docker|Docker]]
- **Voir aussi :** [[12 Pare-feu|Pare-feu]], [[05 Agent Squash|Agent Squash]]
- **Utilisé dans :** chaque job de CI

## 📚 Notes

- 
