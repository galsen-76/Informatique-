---
type: notion
statut: a apprendre
resume: "Docker emballe une application avec tout ce dont elle a besoin (système, Node, dépendances) dans une boîte qui tourne pareil partout."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Docker emballe une application **avec tout ce dont elle a besoin** (système, Node, dépendances) dans une boîte qui tourne pareil partout.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour en finir avec « ça marche sur ma machine » : la même boîte tourne sur ton PC, en CI et sur le serveur.

**Qu'est-ce qui se passait sans ça ?**
Il fallait installer à la main la bonne version de Node, de PostgreSQL, des navigateurs… sur chaque machine. Chaque poste était un peu différent, et les bugs d'environnement étaient fréquents.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Deux mots à ne pas confondre :

- **L'image** : le modèle, en lecture seule. Comme une recette ou un moule. Exemple : `node:22`, `postgres:16`, `mcr.microsoft.com/playwright:v1.63.0-noble`. On la construit avec un [[03 Dockerfile|Dockerfile]] ou on la télécharge.
- **Le conteneur** : une image **en train de tourner**. Comme le gâteau sorti du moule. On peut lancer plusieurs conteneurs à partir de la même image.

Un conteneur n'est **pas une machine virtuelle** : il n'a pas son propre noyau, il partage celui de la machine hôte. Il est juste **isolé** (ses fichiers, son réseau, ses processus). C'est pour ça qu'il démarre en une seconde.

| Commande | Rôle |
|---|---|
| `docker run -d --name db -p 5432:5432 postgres:16` | lance un conteneur |
| `docker ps` / `docker ps -a` | conteneurs qui tournent / tous |
| `docker logs db` | voir ce qu'il affiche |
| `docker exec -it db bash` | ouvrir un terminal dedans |
| `docker stop db` / `docker rm db` | arrêter / supprimer |
| `docker images` | images présentes |

## ⚠️ Limites et pièges

- **`Exited (0)`** dans `docker ps -a` : le conteneur s'est arrêté normalement (son programme a fini). Ce n'est pas un plantage. `Exited (1)` = erreur → `docker logs`.
- **Un conteneur supprimé perd ses données** : pour une base de données, il faut un volume (`-v`).
- **Sous Windows**, Docker tourne dans WSL2 (un vrai Linux) : les conteneurs Linux ont besoin de ce noyau.
- **`latest` n'est pas une version** : préciser un tag (`node:22`) pour que ce soit reproductible.

## 🔗 Liens

- **Prérequis :** [[12 NodeJS|NodeJS]]
- **Voir aussi :** [[03 Dockerfile|Dockerfile]], [[09 Ports et réseau Docker|Ports et réseau Docker]]
- **Utilisé dans :** les jobs de CI (`image:`), la base de données locale, l'image Playwright

## 📚 Notes

- 
