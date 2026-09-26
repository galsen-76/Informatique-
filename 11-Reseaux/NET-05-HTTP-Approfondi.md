---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - reseaux/http
aliases:
  - "HTTP Approfondi"
parent: "[[Réseaux]]"
related_theory:
  - "[[ARCH-04-API-REST-Design|API REST Design]]"
  - "[[JS-10-Fetch-JSON-HTTP|Fetch API et JSON]]"
  - "[[SEC-07-CORS-Same-Origin|CORS et Same-Origin Policy]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/HTTP"
---

# HTTP Approfondi

> [!abstract] En bref
> **HTTP** est la langue que parlent ton front et ton API. Une requête = une **méthode** (que veux-tu faire ?), une **URL** (sur quoi ?), des **en-têtes** (des infos en plus) et parfois un **corps** (les données). La réponse = un **code** (comment ça s'est passé ?), des en-têtes et un corps. C'est la note la plus utile de tout le réseau.

## Une requête et sa réponse

```http
POST /reviews HTTP/1.1
Host: api.cinetrack.fr
Content-Type: application/json
Authorization: Bearer eyJhbGciOi…

{ "movieId": 27205, "rating": 9, "comment": "Un chef-d'œuvre." }
```

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /reviews/812

{ "id": 812, "movieId": 27205, "rating": 9, … }
```

## Les méthodes

| Méthode | Action | Corps | Répétable sans effet de plus ? |
|---|---|---|---|
| **GET** | lire | non | oui |
| **POST** | créer, déclencher une action | oui | **non** (2 POST = 2 créations) |
| **PUT** | remplacer entièrement | oui | oui |
| **PATCH** | modifier une partie | oui | en général |
| **DELETE** | supprimer | non | oui |

« Répétable sans effet de plus » s'appelle **idempotent** : utile pour savoir si on peut réessayer une requête en cas de coupure.

## Les codes de réponse

| Famille | Sens | Les plus courants |
|---|---|---|
| **2xx** | ✅ succès | 200 OK, 201 Created, 204 No Content |
| **3xx** | ↪️ redirection | 301 déplacé définitivement, 302 temporairement, 304 pas modifié (cache) |
| **4xx** | ❌ erreur du **client** | 400 requête invalide, 401 non authentifié, 403 interdit, 404 introuvable, 409 conflit, 422 invalide, 429 trop de requêtes |
| **5xx** | 💥 erreur du **serveur** | 500 erreur interne, 502 / 503 / 504 serveur injoignable ou surchargé |

**Réflexe de débogage :** 4xx → regarde ce que **tu envoies**. 5xx → regarde les **logs du serveur**.

## Les en-têtes utiles

| En-tête | Rôle |
|---|---|
| `Content-Type: application/json` | le format du corps |
| `Authorization: Bearer <jeton>` | qui je suis |
| `Accept-Language: fr` | la langue souhaitée |
| `Cache-Control` | règles de cache (voir [[NET-06-Cookies-Cache-HTTP\|Cache]]) |
| `Set-Cookie` / `Cookie` | cookies (voir [[NET-06-Cookies-Cache-HTTP\|Cookies]]) |
| `Access-Control-Allow-Origin` | autorisations CORS (voir [[SEC-07-CORS-Same-Origin\|CORS]]) |
| `Location` | l'adresse de la ressource créée ou de la redirection |

## HTTP est « sans mémoire »

Chaque requête est **indépendante** : le serveur ne se souvient pas de la précédente. Pour savoir qui tu es, il faut renvoyer à chaque fois un jeton ou un cookie. C'est pour ça que l'authentification existe (voir [[SEC-03-Authentification-Sessions-JWT|Sessions et JWT]]).

## Observer

F12 → **Network** : clique sur une requête pour voir ses en-têtes, le corps envoyé, la réponse et le temps de chaque étape. En ligne de commande : `curl -v https://api.cinetrack.fr/movies`.

Bien concevoir les URL et les réponses d'une API : [[ARCH-04-API-REST-Design|Design d'API REST]].

## Pièges

- **Toujours répondre 200** avec `{ "error": "…" }` dedans : le front ne peut pas réagir correctement.
- **Un GET qui modifie des données** : les navigateurs, caches et robots peuvent le rappeler à tout moment.
- **Confondre 401 et 403** : 401 = « qui es-tu ? », 403 = « je sais qui tu es, mais c'est non ».
