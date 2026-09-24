---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M07
tags:
  - reseaux/cache-cookies
aliases:
  - "Cookies et Cache HTTP"
parent: "[[Réseaux]]"
children: []
related_theory:
  - "[[NET-05-HTTP-Approfondi|HTTP Approfondi]]"
  - "[[JS-11-Stockage-Navigateur|Stockage Navigateur]]"
  - "[[ARCH-09-Cache-Performance|Cache et Performance]]"
related_snippets:
  - "[[04_Snippets/net-06-cookies-cache-http]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/HTTP/Caching"
---

# Cookies et Cache HTTP

> [!abstract] Introduction
> Les cookies donnent une mémoire à un protocole sans état ; le cache HTTP (Cache-Control, ETag) évite de retélécharger ce qui n'a pas changé — deux mécanismes essentiels pour l'auth et la performance.

> [!warning]- Prérequis
> [[NET-05-HTTP-Approfondi|HTTP Approfondi]]

---

## Théorie

> [!question]- C'est quoi ?
> **Cookie** : posé par `Set-Cookie`, renvoyé automatiquement par le navigateur.
> Attributs : `HttpOnly`, `Secure`, `SameSite=Strict|Lax|None`, `Domain`, `Path`, `Max-Age`/`Expires`.
> **Cache** :
> - `Cache-Control: public, max-age=31536000, immutable` → fichiers avec hash (JS/CSS buildés)
> - `Cache-Control: no-cache` → revalider à chaque fois (index.html)
> - `Cache-Control: no-store` → ne jamais stocker (données sensibles)
> - `ETag` / `If-None-Match` → `304 Not Modified` si inchangé

> [!example]- Analogie
> Le cache, c'est garder une copie du menu du restaurant chez soi : on ne redemande le menu que s'il a changé (ETag) ou s'il est trop vieux (max-age).

> [!question]- Pourquoi l'utiliser ?
> Un site Angular/Vue bien configuré se recharge quasi instantanément ; mal configuré, les utilisateurs gardent une vieille version après un déploiement.

> [!question]- Comment ça marche ?
> Stratégie SPA classique :
> - `index.html` : `no-cache` (toujours vérifier la dernière version)
> - `main-ABC123.js`, `styles-XYZ.css` (hash dans le nom) : `max-age=1 an, immutable`
> - API : `no-store` pour les données privées, `max-age` court ou ETag pour les données publiques

> [!question]- Quand l'utiliser ?
> Configuration du serveur web/CDN au déploiement, conception des endpoints publics.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un cache mal réglé sert des données privées à d'autres utilisateurs (cache partagé/CDN) → `private` ou `no-store`.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Cache-Control | Règles de mise en cache |
| ETag | Empreinte d'une version de ressource |
| 304 | Réponse « pas modifié, utilise ta copie » |
| CDN | Réseau de caches proches des utilisateurs |
| SameSite | Contrôle l'envoi cross-site d'un cookie |

---

## Points clés

- index.html jamais en cache longue durée
- Fichiers hashés en cache 1 an
- Données privées : no-store/private
- Cookies d'auth : HttpOnly + Secure + SameSite

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Mettre index.html en cache 1 an → les utilisateurs ne voient jamais la nouvelle version
> - Cache CDN sur une réponse contenant des données personnelles

---

## Exemple minimal

```nginx
location = /index.html { add_header Cache-Control "no-cache"; }
location ~* \.(js|css|woff2|png|svg)$ { add_header Cache-Control "public, max-age=31536000, immutable"; }
```

> [!note] Ce que j'en retiens
> Deux règles Nginx suffisent pour un cache parfait d'une SPA.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Stratégies stale-while-revalidate, cache CDN par route, invalidation au déploiement

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Réseaux]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/net-06-cookies-cache-http]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi peut-on mettre les fichiers JS buildés en cache un an ?

---

## Tâches

- [ ] #task Vérifier les en-têtes de cache de la production d'une app du travail
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
