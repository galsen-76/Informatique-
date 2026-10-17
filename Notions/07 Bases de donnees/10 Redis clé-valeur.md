---
type: notion
statut: a apprendre
resume: "Redis est une base de données en mémoire ultra-rapide : on range une valeur sous une clé (popular:page:1 → la liste des films), et on la récupère en moins d'une milliseconde."
revu:
sources:
  - "https://redis.io/docs/latest/"
---
# Redis clé-valeur

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : **Redis** est une base de données **en mémoire** ultra-rapide : on range une valeur sous une clé (`popular:page:1` → la liste des films), et on la récupère en moins d'une milliseconde.

## Le problème

**Pourquoi c'est utile ?**
Pour garder des données en mémoire et les relire en moins d'une milliseconde (cache, sessions).

**Qu'est-ce qui se passait sans ça ?**
Chaque page refaisait les mêmes requêtes coûteuses à la base ou à une API externe.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

On l'utilise **à côté** de PostgreSQL, surtout comme **cache**, et aussi pour les sessions, les compteurs et les files de tâches.

### L'image

PostgreSQL est l'**entrepôt** : tout y est rangé de façon sûre, mais il faut un peu de temps pour aller chercher. Redis est le **comptoir** à côté de la caisse : peu de place, mais ce qu'on demande souvent est à portée de main.

### Les usages

| Usage | Comment | CinéTrack |
|---|---|---|
| **Cache** | garder un résultat coûteux quelques minutes | films populaires de TMDB (voir Cache NestJS) |
| **Compteurs** | `INCR`, atomique même avec plusieurs serveurs | nombre de vues d'une fiche |
| **Limitation de débit** | compter les requêtes par IP et par minute | max 5 tentatives de connexion |
| **Sessions / jetons** | stocker la session ou la liste des jetons révoqués | déconnexion |
| **Files de tâches** | BullMQ s'appuie sur Redis | e-mails en arrière-plan |
| **Temps réel** | publication / abonnement entre serveurs | WebSockets sur plusieurs serveurs |

### Nommer les clés

Convention : `type:identifiant:détail`, séparé par `:`.

```text
movie:27205
movie:27205:reviews:page:1
user:42:favorites
ratelimit:login:203.0.113.5
```

## 🧪 Exemple

### Les commandes de base

```bash
docker run -d --name redis -p 6379:6379 redis:7
docker exec -it redis redis-cli
```

```text
SET popular:1 "[…json…]" EX 600     # stocke pendant 600 secondes
GET popular:1                        # récupère (nil si expiré)
DEL popular:1                        # supprime
INCR views:movie:27205               # compteur +1 (atomique)
TTL popular:1                        # temps restant
KEYS popular:*                       # ⚠️ jamais en production (bloque Redis)
```

`EX 600` = **expiration** : la clé disparaît toute seule après 10 minutes. Presque toutes les clés de cache ont une expiration.

## ⚠️ Limites et pièges

- **Utiliser Redis comme base principale** : les données sont en mémoire ; selon la configuration, un redémarrage peut les perdre. La vérité reste dans PostgreSQL.
- **Oublier l'expiration** : la mémoire se remplit et les données en cache deviennent obsolètes.
- **Oublier de vider le cache** quand la donnée change : l'utilisateur voit une ancienne version.
- **Une clé de cache sans l'identifiant de l'utilisateur** pour des données personnelles : un utilisateur voit celles d'un autre.

## 🔗 Liens

- **Prérequis :** [[01 Modèle relationnel et SGBD|Modèle relationnel et SGBD]]
- **Voir aussi :** [[13 Cache et performance|Cache et performance]], [[13 Cache queues et tâches NestJS|Cache queues et tâches NestJS]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://redis.io/docs/latest/
