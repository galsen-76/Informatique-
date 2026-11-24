---
type: concept
module: "[[Module 08 - Backend et API REST]]"
related:
  - "[[Code de statut HTTP]]"
  - "[[Endpoint]]"
tags:
  - concept
  - backend
---
# Méthode HTTP

> [!info] En une phrase
> La méthode (GET, POST, PUT, PATCH, DELETE) dit ce qu'une requête veut faire de la ressource : lire, créer, remplacer, modifier ou supprimer.

## 1 · Comprendre
### Définition
| Méthode | Sens | Corps | Sûre | Idempotente |
| --- | --- | --- | --- | --- |
| `GET` | lire | non | oui | oui |
| `POST` | créer, ou lancer une action | oui | non | non |
| `PUT` | remplacer entièrement | oui | non | oui |
| `PATCH` | modifier en partie | oui | non | non (en général) |
| `DELETE` | supprimer | rarement | non | oui |
| `HEAD` / `OPTIONS` | en-têtes seuls / capacités (CORS) | non | oui | oui |
- **Sûre** : ne modifie rien côté serveur.
- **Idempotente** : la faire 1 fois ou 10 fois donne le même état final (on peut la rejouer après une coupure).

### Pourquoi ça existe
Un même chemin (`/taches/12`) doit permettre plusieurs actions ; la méthode dit laquelle.

### Le problème résolu
Des API prévisibles : tout le monde sait qu'un GET ne casse rien et qu'un DELETE supprime.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
T["/taches/12"] --> G[GET lire]
  T --> P[PATCH modifier]
  T --> D[DELETE supprimer]
```

### Exemple concret
```bash
curl -i https://jsonplaceholder.typicode.com/todos/1                       # GET
curl -i -X PATCH https://jsonplaceholder.typicode.com/todos/1 \
     -H "Content-Type: application/json" -d '{"completed":true}'
curl -i -X DELETE https://jsonplaceholder.typicode.com/todos/1
```

### Cas d'utilisation
- Concevoir les routes d'une API
- Comprendre pourquoi un navigateur envoie un OPTIONS avant ta requête (CORS)
- Savoir quelles requêtes on peut rejouer

> [!warning] À ne pas confondre
> `PUT` (remplace tout : les champs absents disparaissent) et `PATCH` (seulement les champs envoyés). Et un `GET` qui modifie des données est une erreur de conception (les robots et les caches le rejouent).

## 3 · Relier
- **Prérequis** : [[HTTP]]
- **Complémentaires** : [[Code de statut HTTP]] · [[Endpoint]]
