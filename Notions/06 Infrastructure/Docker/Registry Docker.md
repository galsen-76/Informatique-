---
type: notion
statut: a apprendre
resume: "Un registry est un entrepôt d'images en ligne : on y pousse (push) ses images et on les récupère (pull) ailleurs."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Un registry est un **entrepôt d'images** en ligne : on y **pousse** (`push`) ses images et on les **récupère** (`pull`) ailleurs.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour partager une image construite une fois entre ton PC, la CI et les serveurs, sans la reconstruire partout.

**Qu'est-ce qui se passait sans ça ?**
Il fallait reconstruire l'image sur chaque machine, avec le risque d'obtenir des résultats différents.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Les plus connus : **Docker Hub** (public, d'où viennent `node`, `postgres`…) et le **GitLab Container Registry** (privé, lié à ton projet).

Le nom d'une image indique où elle est rangée :
```
registry.gitlab.com/equipe/projet/api:1.2.0
└────── registry ──────┘└── chemin ──┘└tag┘
```

Le cycle :
```bash
docker login registry.gitlab.com
docker build -t registry.gitlab.com/equipe/projet/api:1.2.0 .
docker push registry.gitlab.com/equipe/projet/api:1.2.0

# sur une autre machine
docker pull registry.gitlab.com/equipe/projet/api:1.2.0
```

Quand tu écris `postgres:16` sans registry, Docker va chercher sur Docker Hub par défaut.

## ⚠️ Limites et pièges

- **`latest` n'est pas une version** : utiliser des tags précis (`1.2.0`, ou le hash du commit).
- **Docker Hub limite le nombre de `pull`** sans compte : en CI, ça peut bloquer les builds.
- **Derrière un proxy d'entreprise**, `docker pull` peut échouer : il faut configurer le proxy pour Docker.
- **Une image publique est visible par tous** : jamais de secret dedans.

## 🔗 Liens

- **Prérequis :** [[Docker]]
- **Voir aussi :** [[Docker dans la CI]]
- **Utilisé dans :** les images de l'équipe, les images de base de la CI

## 📚 Notes

- 
