---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - backend/bdd/redis
aliases:
  - "Redis Cache Clé-Valeur"
parent: "[[Bases de Données]]"
children: []
related_theory:
  - "[[ARCH-09-Cache-Performance|Cache et Performance]]"
  - "[[NEST-13-Cache-Queues-Taches|Cache Queues et Tâches Planifiées NestJS]]"
related_snippets:
  - "[[04_Snippets/bdd-07-redis-cle-valeur]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://redis.io/docs/latest/"
---

# Redis Cache Clé-Valeur

> [!abstract] Introduction
> Redis est une base clé-valeur en mémoire, ultra rapide, utilisée comme cache, stockage de sessions, file de messages, compteur ou limiteur de débit.

> [!warning]- Prérequis
> [[BDD-01-Fondamentaux-SGBD|Fondamentaux des Bases de Données]]

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> SET film:42 '{"titre":"Dune"}' EX 3600   # expire dans 1 h
> GET film:42
> INCR vues:film:42
> LPUSH file:emails '{"to":"a@b.fr"}'
> ZADD top:films 150 "42"                   # sorted set : classement
> ```

> [!example]- Analogie
> Redis est le post-it collé sur ton écran : instantané à lire, mais pas fait pour archiver des documents.

> [!question]- Pourquoi l'utiliser ?
> Réduire la charge sur la BDD, partager un état entre plusieurs instances de l'API (sessions, rate limiting, WebSocket), files de jobs (BullMQ).

> [!question]- Comment ça marche ?
> Structures : strings, hashes, lists, sets, sorted sets, streams. TTL par clé. Persistance optionnelle (RDB/AOF). Pub/Sub.
> Nommage des clés : `domaine:id:attribut`.

> [!question]- Quand l'utiliser ?
> Cache, sessions, compteurs, classements, rate limiting, queues.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Données en RAM (coût, taille) ; ce n'est pas la source de vérité : tout doit pouvoir être reconstruit depuis la BDD.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| TTL | Durée de vie d'une clé |
| Éviction | Suppression automatique quand la mémoire est pleine |
| Pub/Sub | Publication/abonnement de messages |
| Sorted set | Ensemble trié par score |

---

## Points clés

- Toujours un TTL sur le cache
- Redis n'est pas la source de vérité
- Clés nommées et préfixées

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Clés sans TTL qui remplissent la mémoire
> - `KEYS *` en production (bloquant) → `SCAN`

---

## Exemple minimal

```typescript
// Rate limiting simple : 100 requêtes / minute / IP
const cle = `rl:${ip}:${Math.floor(Date.now() / 60000)}`;
const n = await redis.incr(cle);
if (n === 1) await redis.expire(cle, 60);
if (n > 100) throw new HttpException('Trop de requêtes', 429);
```

> [!note] Ce que j'en retiens
> INCR + EXPIRE = compteur par fenêtre de temps, partagé entre toutes les instances.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Stratégies d'éviction, Redis Cluster/Sentinel

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Bases de Données]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/bdd-07-redis-cle-valeur]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi Redis ne doit-il pas être la source de vérité ?

---

## Tâches

- [ ] #task Ajouter Redis au docker-compose et mettre en cache les films populaires
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
