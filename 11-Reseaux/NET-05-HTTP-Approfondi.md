---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - reseaux/http
aliases:
  - "HTTP Approfondi"
parent: "[[Réseaux]]"
children:
  - "[[NET-06-Cookies-Cache-HTTP|Cookies et Cache HTTP]]"
  - "[[NET-07-HTTP2-HTTP3|HTTP2 et HTTP3]]"
related_theory:
  - "[[ARCH-04-API-REST-Design|API REST Design]]"
  - "[[JS-10-Fetch-JSON-HTTP|Fetch API et JSON]]"
  - "[[SEC-07-CORS-Same-Origin|CORS et Same-Origin Policy]]"
related_snippets:
  - "[[04_Snippets/net-05-http-approfondi]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/HTTP"
---

# HTTP Approfondi

> [!abstract] Introduction
> HTTP est le protocole requête/réponse du web : une méthode, une URL, des en-têtes et un corps ; le serveur répond avec un code de statut, des en-têtes et un corps. C'est le langage commun entre ton front Angular/Vue et ton API.

> [!warning]- Prérequis
> [[NET-01-Fondamentaux-OSI-TCP-IP|Fondamentaux Réseaux Modèles OSI et TCP IP]]

---

## Théorie

> [!question]- C'est quoi ?
> ```http
> POST /api/films HTTP/1.1
> Host: cinetrack.fr
> Content-Type: application/json
> Authorization: Bearer eyJ...
>
> {"titre":"Dune","annee":2021}
> ```
> ```http
> HTTP/1.1 201 Created
> Content-Type: application/json
> Location: /api/films/42
>
> {"id":42,"titre":"Dune","annee":2021}
> ```
> **Méthodes** : GET (lire), POST (créer/action), PUT (remplacer), PATCH (modifier partiellement), DELETE (supprimer), OPTIONS (preflight), HEAD.
> **Propriétés** : *sûre* (ne modifie rien : GET, HEAD, OPTIONS) ; *idempotente* (répéter = même effet : GET, PUT, DELETE, mais PAS POST).

> [!example]- Analogie
> Une commande au comptoir : le verbe (je veux commander/annuler), l'objet (quel plat, URL), les précisions (en-têtes : sans gluten, à emporter), le contenu (corps) ; le serveur répond avec un code (servi, rupture de stock, pas compris).

> [!question]- Pourquoi l'utiliser ?
> Concevoir une API correcte, lire l'onglet Network, choisir les bons codes de statut, comprendre cache, auth, CORS.

> [!question]- Comment ça marche ?
> Codes de statut :
> | Famille | Sens | Exemples |
> |---|---|---|
> | 1xx | Information | 101 Switching Protocols (WebSocket) |
> | 2xx | Succès | 200 OK, 201 Created, 204 No Content |
> | 3xx | Redirection | 301 permanente, 302/307 temporaire, 304 Not Modified |
> | 4xx | Erreur client | 400 Bad Request, 401 non authentifié, 403 interdit, 404, 409 conflit, 422, 429 trop de requêtes |
> | 5xx | Erreur serveur | 500, 502 Bad Gateway, 503 indisponible, 504 timeout |
> En-têtes clés : `Content-Type`, `Accept`, `Authorization`, `Cookie`/`Set-Cookie`, `Cache-Control`, `ETag`, `Location`, `Origin`, `User-Agent`.
> HTTP est **sans état** : chaque requête est indépendante (d'où cookies/tokens).

> [!question]- Quand l'utiliser ?
> Tous les jours : conception d'API, débogage front/back.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les codes ne suffisent pas à décrire l'erreur : ajouter un corps d'erreur structuré.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Méthode (verbe) | Action demandée |
| Code de statut | Résultat de la requête |
| En-tête | Métadonnée |
| Idempotent | Répéter ne change pas le résultat |
| Sans état | Aucune mémoire entre requêtes |

---

## Points clés

- 401 = pas authentifié, 403 = authentifié mais pas autorisé
- POST n'est pas idempotent → attention aux doubles clics
- PATCH partiel, PUT complet
- HTTP est sans état

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Renvoyer 200 avec `{ "error": ... }`
> - Utiliser GET pour une action qui modifie des données

---

## Exemple minimal

```bash
curl -i -X PATCH http://localhost:3000/api/films/42 \
  -H 'Content-Type: application/json' -d '{"annee":2022}'
```

> [!note] Ce que j'en retiens
> `-i` affiche statut et en-têtes : la moitié du débogage.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Clés d'idempotence (`Idempotency-Key`) pour les POST critiques (paiement)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Réseaux]]
- Sous-sujets → [[NET-06-Cookies-Cache-HTTP|Cookies et Cache HTTP]], [[NET-07-HTTP2-HTTP3|HTTP2 et HTTP3]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/net-05-http-approfondi]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre 401 et 403 ? Entre PUT et PATCH ?

> [!faq]- Questions d'entretien
> - Qu'est-ce qu'une méthode idempotente ?

---

## Tâches

- [ ] #task Lire 20 requêtes dans l'onglet Network d'une application du travail et expliquer chaque code
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
