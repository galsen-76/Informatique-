---
type: notion
statut: a apprendre
resume: "Un volume est un espace de stockage en dehors du conteneur : les données survivent quand le conteneur est supprimé."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Un volume est un **espace de stockage en dehors du conteneur** : les données survivent quand le conteneur est supprimé.

## ❓ Le problème

**Pourquoi ça existe ?**
Parce qu'un conteneur est jetable : quand on le supprime, tout ce qu'il contenait disparaît. Une base de données ne peut pas perdre ses données à chaque redémarrage.

**Qu'est-ce qui se passait sans ça ?**
On perdait la base à chaque `docker rm`, ou on n'osait jamais supprimer un conteneur. Et pour modifier du code, il fallait reconstruire l'image à chaque fois.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Deux façons de brancher un stockage :

**1. Volume nommé** : Docker gère l'emplacement. Idéal pour une base de données.
```bash
docker volume create pgdata
docker run -d --name db -v pgdata:/var/lib/postgresql/data postgres:16
```
`pgdata` (sur ta machine, géré par Docker) est branché sur `/var/lib/postgresql/data` (dans le conteneur). Tu supprimes le conteneur, tu en relances un avec le même volume : les données sont toujours là.

**2. Bind mount** : tu branches **un dossier précis de ta machine**. Idéal en développement.
```bash
docker run -v $(pwd)/src:/app/src mon-api
```
Tu modifies un fichier dans ton éditeur, le conteneur voit le changement tout de suite.

| Commande | Rôle |
|---|---|
| `docker volume ls` | lister les volumes |
| `docker volume rm pgdata` | supprimer un volume (et ses données) |
| `docker volume prune` | supprimer les volumes inutilisés |

## ⚠️ Limites et pièges

- **`docker compose down -v`** supprime aussi les volumes : tu perds la base. Sans `-v`, ils sont gardés.
- **Un bind mount écrase le dossier du conteneur** : monter tout `/app` cache le `node_modules/` installé dans l'image.
- **Sous WSL**, un bind mount depuis `/mnt/c/...` (disque Windows) est très lent. Garde ton projet dans ton dossier Linux (`~`).
- **Un volume n'est pas une sauvegarde** : il reste sur la même machine.

## 🔗 Liens

- **Prérequis :** [[01 Docker|Docker]]
- **Voir aussi :** [[10 Docker Compose|Docker Compose]]
- **Utilisé dans :** la base PostgreSQL locale, le rechargement du code en développement

## 📚 Notes

- 
