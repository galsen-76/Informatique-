---
type: notion
statut: a apprendre
resume: "La scalabilité, c'est la capacité d'une application à supporter plus d'utilisateurs sans s'effondrer."
revu:
sources:
  - "https://en.wikipedia.org/wiki/Scalability"
---
# Scalabilité

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : La **scalabilité**, c'est la capacité d'une application à supporter **plus d'utilisateurs** sans s'effondrer.

## Le problème

**Pourquoi c'est utile ?**
Pour qu'une application supporte plus d'utilisateurs sans s'effondrer.

**Qu'est-ce qui se passait sans ça ?**
Le jour où le trafic augmentait, le serveur unique saturait et l'application tombait.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Deux façons : une **machine plus puissante** (verticale) ou **plus de machines** (horizontale). Pour ajouter des machines, l'API doit être **sans état** : n'importe quelle instance doit pouvoir traiter n'importe quelle requête.

### Les deux directions

| | Verticale (*scale up*) | Horizontale (*scale out*) |
|---|---|---|
| Principe | un serveur plus gros (CPU, RAM) | plus de serveurs identiques |
| Image | un camion plus grand | plus de camions |
| Simplicité | **très simple** | demande une architecture adaptée |
| Limite | la plus grosse machine disponible, et un seul point de panne | presque aucune |

```mermaid
flowchart LR
  U["Utilisateurs"] --> LB["Load balancer"]
  LB --> A1["API #1"]
  LB --> A2["API #2"]
  LB --> A3["API #3"]
  A1 & A2 & A3 --> DB[("PostgreSQL")]
  A1 & A2 & A3 --> R[("Redis")]
```

### La condition : une API sans état (*stateless*)

Si l'instance #1 garde en mémoire la session d'un utilisateur, et que sa requête suivante arrive sur l'instance #2, la session est perdue.

| Ne pas garder dans l'API | Mettre à la place |
|---|---|
| les sessions en mémoire | un JWT, ou les sessions dans Redis |
| les fichiers envoyés sur le disque local | un stockage objet (S3 et équivalents) |
| un cache en mémoire | Redis |
| les tâches planifiées lancées par chaque instance | une file de tâches, ou une seule instance dédiée |

NestJS avec JWT, Prisma et Redis est déjà sans état : CinéTrack-API peut être multiplié tel quel.

### Où ça coince vraiment

Presque toujours, la limite n'est pas l'API mais **la base de données**. Dans l'ordre :

1. **Optimiser les requêtes** : index, N+1, pagination (voir [[Clés index et performance|Index]]).
2. **Mettre en cache** ce qui est lu souvent (voir [[Cache et performance|Cache]]).
3. **Déporter les traitements longs** dans des files de tâches.
4. **Des copies en lecture** de la base (*read replicas*).
5. Seulement ensuite : découper la base, les microservices…

### Mesurer avant d'agir

- **Tests de charge** (k6, Artillery) : simuler 500 utilisateurs et regarder où ça casse.
- **Monitoring** : temps de réponse, CPU, mémoire, requêtes lentes (voir [[Métriques et alerting|Métriques]]).

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Optimiser pour un million d'utilisateurs** quand il y en a 50 : complexité inutile.
- **Multiplier les instances de l'API** alors que c'est la base qui sature : aucun effet, voire pire.
- **Garder des états en mémoire** « parce que ça marche en local » : ça casse dès la deuxième instance.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux de l'architecture logicielle]]
- **Voir aussi :** [[Monolithe vs microservices]], [[Synchrone vs asynchrone]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://en.wikipedia.org/wiki/Scalability
