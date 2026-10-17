---
type: notion
statut: a apprendre
resume: "Un conteneur a son propre réseau : pour l'atteindre depuis ta machine il faut publier un port (-p), et entre conteneurs on se parle par nom."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Un conteneur a **son propre réseau** : pour l'atteindre depuis ta machine il faut **publier un port** (`-p`), et entre conteneurs on se parle **par nom**.

## ❓ Le problème

**Pourquoi ça existe ?**
Parce que l'isolation réseau protège les conteneurs, mais il faut bien pouvoir y accéder et les relier entre eux (API ↔ base de données).

**Qu'est-ce qui se passait sans ça ?**
Sans réseau dédié, on reliait les conteneurs avec leurs adresses IP, qui changent à chaque redémarrage : la connexion cassait sans arrêt.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

**1. De ta machine vers un conteneur : `-p hôte:conteneur`**

```bash
docker run -p 5433:5432 postgres:16
```
Ce qui arrive sur le port **5433 de ta machine** est envoyé au port **5432 du conteneur**. Deux PostgreSQL ? Même port dedans (5432), ports différents dehors (5432 et 5433).

**2. D'un conteneur vers un autre : par le nom**

```bash
docker network create cinetrack
docker run -d --name db  --network cinetrack postgres:16
docker run -d --name api --network cinetrack -e DB_HOST=db mon-api
```
Dans l'API, l'adresse de la base est simplement `db` : Docker fait office de [[06 DNS|DNS]] sur le réseau et traduit `db` en adresse IP. Et le port est **5432** (celui du conteneur), pas celui publié.

**3. D'un conteneur vers Internet** : ça passe par la machine hôte, donc par son réseau, son [[13 Proxy|Proxy]] et son [[12 Pare-feu|Pare-feu]].

## ⚠️ Limites et pièges

- **`localhost` dans un conteneur = le conteneur lui-même**, pas ta machine ni les autres conteneurs.
- **L'appli doit écouter sur `0.0.0.0`** dans le conteneur, pas sur `127.0.0.1`, sinon `-p` ne sert à rien.
- **« port is already allocated »** : un autre programme ou conteneur utilise déjà ce port de ta machine → changer le port côté hôte.
- **La résolution par nom ne marche que sur un réseau créé** (`docker network create`) ou avec Docker Compose, pas sur le réseau par défaut.

## 🔗 Liens

- **Prérequis :** [[01 Docker|Docker]], [[03 Adresse IP|Adresse IP]], [[04 Port|Port]]
- **Voir aussi :** [[06 DNS|DNS]], [[01 Client et serveur|Client et serveur]]
- **Utilisé dans :** API + PostgreSQL en local, les `services:` de GitLab CI

## 📚 Notes

- 
