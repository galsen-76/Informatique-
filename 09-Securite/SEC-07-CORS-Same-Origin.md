---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M07
tags:
  - securite/cors
aliases:
  - "CORS et Same-Origin Policy"
parent: "[[Sécurité]]"
children: []
related_theory:
  - "[[NET-05-HTTP-Approfondi|HTTP Approfondi]]"
  - "[[NEST-01-Fondamentaux|Fondamentaux NestJS]]"
related_snippets:
  - "[[04_Snippets/sec-07-cors-same-origin]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/HTTP/CORS"
---

# CORS et Same-Origin Policy

> [!abstract] Introduction
> La Same-Origin Policy empêche une page de lire les réponses d'une autre origine ; CORS est le mécanisme par lequel un SERVEUR autorise explicitement certaines origines — l'erreur la plus rencontrée par les développeurs front.

> [!warning]- Prérequis
> [[NET-05-HTTP-Approfondi|HTTP Approfondi]]

---

## Théorie

> [!question]- C'est quoi ?
> **Origine** = protocole + domaine + port. `http://localhost:4200` ≠ `http://localhost:3000` → origines différentes.
> Le navigateur envoie `Origin: http://localhost:4200` ; le serveur répond `Access-Control-Allow-Origin: http://localhost:4200` pour autoriser.
> **Requête préalable (preflight)** : pour les requêtes « non simples » (PUT, DELETE, JSON, en-tête Authorization), le navigateur envoie d'abord `OPTIONS` pour demander la permission.

> [!example]- Analogie
> La Same-Origin Policy est une règle de l'immeuble : on ne lit pas le courrier des voisins. CORS, c'est le voisin qui écrit sur sa boîte « Marie du 3e peut prendre mon courrier ».

> [!question]- Pourquoi l'utiliser ?
> Comprendre que l'erreur CORS se règle CÔTÉ SERVEUR, et pourquoi elle existe (empêcher un site malveillant de lire tes données avec tes cookies).

> [!question]- Comment ça marche ?
> ```typescript
> // NestJS
> app.enableCors({
>   origin: ['https://cinetrack.fr', 'http://localhost:4200', 'http://localhost:5173'],
>   credentials: true,       // si cookies
>   methods: ['GET', 'POST', 'PATCH', 'DELETE'],
> });
> ```
> En développement : proxy du serveur de dev (Angular `proxy.conf.json`, Vite `server.proxy`) → même origine, pas de CORS.
> En production : front et API sous le même domaine (reverse proxy `/api`) → pas de CORS du tout.

> [!question]- Quand l'utiliser ?
> Dès que front et API sont sur des origines différentes.

> [!danger]- Quand NE PAS l'utiliser / Limites
> CORS protège les UTILISATEURS dans le navigateur, pas l'API : curl/Postman ignorent CORS. Ce n'est PAS une authentification.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Origine | Protocole + domaine + port |
| Preflight | Requête OPTIONS de vérification |
| `Access-Control-Allow-Origin` | En-tête d'autorisation d'origine |
| Credentials | Cookies/auth envoyés en cross-origin |

---

## Points clés

- L'erreur CORS se corrige côté serveur (ou proxy)
- Jamais `origin: '*'` avec `credentials: true` (interdit)
- Proxy en dev, même domaine en prod
- CORS n'est pas une sécurité de l'API

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Désactiver la sécurité du navigateur pour « tester »
> - Autoriser dynamiquement n'importe quelle origine reçue (réflexion de l'Origin)

---

## Exemple minimal

```json
// proxy.conf.json (Angular) → ng serve --proxy-config proxy.conf.json
{ "/api": { "target": "http://localhost:3000", "secure": false } }
```

> [!note] Ce que j'en retiens
> Le navigateur ne voit qu'une seule origine : le problème CORS disparaît en dev.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Diagnostiquer un preflight qui échoue dans l'onglet Network (OPTIONS, en-têtes)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Sécurité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sec-07-cors-same-origin]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi Postman n'a-t-il jamais d'erreur CORS ?

> [!faq]- Questions d'entretien
> - Qu'est-ce que CORS et comment résolvez-vous une erreur CORS ?

---

## Tâches

- [ ] #task Provoquer une erreur CORS entre CinéTrack Angular et l'API, puis la corriger de 2 façons
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
