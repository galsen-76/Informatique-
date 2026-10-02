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

## Pourquoi ça marche

HTTP est **sans mémoire** (*stateless*) : chaque requête contient tout ce qu'il faut pour être comprise seule. C'est ce qui permet à n'importe quel serveur de répondre, de mettre des réponses en cache et de répartir la charge.

Les **méthodes** et les **codes** sont des conventions partagées par tous les outils : un navigateur sait qu'un GET peut être rejoué sans risque, un proxy sait qu'un 304 veut dire « utilise ton cache », un client sait qu'un 4xx vient de lui et un 5xx du serveur. Respecter ces conventions, c'est permettre à tous ces outils de fonctionner correctement avec ton API.

## Contre-exemple

**Intuition fausse : « 401 et 403, c'est pareil : accès refusé ».**

```text
GET /favorites                       (sans jeton) → 401 : « qui es-tu ? connecte-toi »
GET /admin/users  (connecté, pas admin)          → 403 : « je sais qui tu es, mais c'est non »
```

Le front doit réagir différemment : un **401** renvoie vers la connexion, un **403** affiche « accès interdit ». Se reconnecter n'y changerait rien.

## Pièges

- **Toujours répondre 200** avec `{ "error": "…" }` dedans : le front ne peut pas réagir correctement.
- **Un GET qui modifie des données** : les navigateurs, caches et robots peuvent le rappeler à tout moment.
- **Confondre 401 et 403** : 401 = « qui es-tu ? », 403 = « je sais qui tu es, mais c'est non ».

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Quelles sont les parties d'une requête HTTP ?**

> [!check]- Réponse
> Une méthode, une URL, des en-têtes et parfois un corps.

**2. Que signifie « idempotent », et quelle méthode ne l'est pas ?**

> [!check]- Réponse
> Répéter la requête n'a pas plus d'effet que l'envoyer une fois ; POST ne l'est pas (2 POST = 2 créations).

**3. Quel réflexe de débogage pour un 4xx ? pour un 5xx ?**

> [!check]- Réponse
> 4xx : regarder ce que j'envoie ; 5xx : regarder les logs du serveur.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Méthode et code

Pour chaque action de CinéTrack, donne la méthode HTTP et le code de réponse attendu en cas de succès :
1. lister les films populaires ;
2. publier une critique ;
3. modifier seulement la note d'une critique ;
4. supprimer une critique (sans corps de réponse).

> [!tip]- Indice 1
> Lire, créer, modifier une partie, supprimer : quatre méthodes différentes.

> [!tip]- Indice 2
> Une création renvoie un code spécial ; une réponse sans corps aussi.

> [!success]- Solution
> 1. `GET /movies/popular` → **200**
> 2. `POST /reviews` → **201 Created**
> 3. `PATCH /reviews/812` → **200**
> 4. `DELETE /reviews/812` → **204 No Content**

### Exercice 2 · Quel code ?

Quel code HTTP l'API doit-elle renvoyer ?
1. La note envoyée vaut 12 alors qu'elle doit être entre 1 et 5.
2. Le film demandé n'existe pas.
3. L'utilisateur n'a pas envoyé de jeton.
4. L'utilisateur a déjà critiqué ce film (une seule critique autorisée).
5. La base de données est en panne.
6. L'utilisateur envoie 200 requêtes en une minute.

> [!tip]- Indice 1
> Distingue d'abord : erreur du client (4xx) ou du serveur (5xx) ?

> [!tip]- Indice 2
> Un conflit avec l'état actuel des données a son propre code ; trop de requêtes aussi.

> [!success]- Solution
> 1. **400** (ou 422) : données invalides.
> 2. **404** : introuvable.
> 3. **401** : non authentifié.
> 4. **409** : conflit.
> 5. **500** (ou 503) : erreur du serveur.
> 6. **429** : trop de requêtes.

### Transfert · Le bouton « Payer » cliqué deux fois

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Sur une connexion mobile instable, un utilisateur clique deux fois sur « Réserver ma place ». Le front envoie deux `POST /reservations`, et l'utilisateur se retrouve avec deux réservations. Explique pourquoi avec les notions de la note, et propose deux solutions.

> [!tip]- Indice 1
> POST est-il idempotent ?

> [!tip]- Indice 2
> On peut agir côté front (empêcher le double envoi) et côté serveur (reconnaître une requête déjà reçue).

> [!success]- Solution
> POST **n'est pas idempotent** : deux POST créent deux ressources.
>
> 1. **Côté front** : désactiver le bouton pendant l'envoi.
> 2. **Côté serveur** : faire envoyer par le front un identifiant unique de demande (une clé d'idempotence, dans un en-tête) ; le serveur ignore une demande déjà traitée avec la même clé. On peut aussi interdire deux réservations identiques en base (contrainte unique).

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer ce que veut dire « HTTP est sans mémoire » et ses conséquences
- [ ] **Rappeler** : Dire de mémoire les méthodes, l'idempotence et les familles de codes
- [ ] **Utiliser** : Choisir la bonne méthode et le bon code pour une route d'API
- [ ] **Résoudre un problème nouveau** : Prévoir le comportement d'un client face à 401, 403, 404, 409, 429
- [ ] **Repérer les erreurs** : Déboguer une requête avec l'onglet Network et `curl -v`
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand ne pas utiliser GET : toute action qui modifie des données
