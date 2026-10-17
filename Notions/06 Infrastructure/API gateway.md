---
type: notion
statut: a apprendre
resume: "Une API gateway est la porte d'entrée unique de plusieurs API : elle reçoit toutes les requêtes et applique les règles communes avant de les transmettre."
revu:
sources:
  - "https://apisix.apache.org/docs/apisix/getting-started/README/"
---
# API gateway

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une API gateway est la **porte d'entrée unique** de plusieurs API : elle reçoit toutes les requêtes et applique les règles communes (authentification, limites, logs) avant de les transmettre au bon service.

## Le problème

**Pourquoi c'est utile ?**
Pour gérer à un seul endroit ce que toutes les API doivent faire : vérifier les jetons, limiter le nombre d'appels, journaliser, router vers la bonne version.

**Qu'est-ce qui se passait sans ça ?**
Chaque API recodait sa propre authentification, ses limites et ses logs, chacune un peu différemment. Les clients devaient connaître l'adresse de chaque service, et changer un service cassait les clients.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

La gateway est un [[Reverse proxy et load balancer|reverse proxy]] spécialisé pour les API. Le client ne parle qu'à elle :

```
client ──► API gateway ──► service films   (/api/films/*)
                     └───► service users   (/api/users/*)
```

À chaque requête, elle passe par une série de **plugins** (APISIX, Kong) ou de **filtres** :

| Rôle | Exemple |
|---|---|
| **Routage** | `/api/films/*` → service films, `/api/v2/*` → nouvelle version |
| **Authentification** | vérifier le JWT ou la clé d'API une seule fois, ici |
| **Limitation** (*rate limiting*) | 100 requêtes par minute et par client |
| **Transformation** | ajouter un en-tête, réécrire un chemin |
| **Observabilité** | logs et métriques de toutes les API au même endroit |
| **CORS, HTTPS** | réglés une fois pour toutes |

**Reverse proxy ou API gateway ?** Un reverse proxy (Nginx) sait router et gérer le HTTPS. Une API gateway (APISIX, Kong, Gravitee) ajoute tout ce qui est propre aux API : jetons, quotas, versions, configuration dynamique sans redémarrage.

## 🧪 Exemple

Une route APISIX (via son API d'administration) qui envoie `/api/films/*` vers le service films et limite à 100 requêtes par minute :

```json
{
  "uri": "/api/films/*",
  "upstream": { "type": "roundrobin", "nodes": { "films:3000": 1 } },
  "plugins": {
    "limit-count": { "count": 100, "time_window": 60, "rejected_code": 429 },
    "jwt-auth": {}
  }
}
```

Une requête sans jeton valide est refusée par la gateway : le service films ne la voit même pas.

## ⚠️ Limites et pièges

- **Point unique de panne** : si la gateway tombe, toutes les API tombent. Il en faut au moins deux en production.
- **Ne pas y mettre de logique métier** : elle route et contrôle, la décision métier reste dans le service.
- **Les droits fins restent dans le service** : la gateway vérifie *qui* tu es, le service vérifie *ce que tu as le droit de faire* (voir [[Authentification vs autorisation]]).
- **Une étape de plus** : un peu de latence, et une configuration de plus à versionner.

## 🔗 Liens

- **Prérequis :** [[Reverse proxy et load balancer]], [[HTTP]]
- **Voir aussi :** [[Monolithe vs microservices]], [[Sessions cookies et JWT]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://apisix.apache.org/docs/apisix/getting-started/README/
