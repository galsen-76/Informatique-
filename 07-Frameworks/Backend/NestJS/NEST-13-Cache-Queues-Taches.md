---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M09
tags:
  - backend/nestjs/cache-queues
aliases:
  - "Cache Queues et Tâches Planifiées NestJS"
parent: "[[NestJS]]"
children: []
related_theory:
  - "[[ARCH-09-Cache-Performance|Cache et Performance]]"
  - "[[BDD-07-Redis-Cle-Valeur|Redis Cache Clé-Valeur]]"
  - "[[ARCH-08-Architecture-Evenementielle|Architecture Événementielle]]"
related_snippets:
  - "[[04_Snippets/nest-13-cache-queues-taches]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/techniques/queues"
---

# Cache Queues et Tâches Planifiées NestJS

> [!abstract] Introduction
> Pour rester rapide et fiable, une API met en cache les lectures coûteuses (Redis), déporte les traitements longs dans des files de tâches (BullMQ) et exécute des tâches planifiées (cron).

> [!warning]- Prérequis
> [[BDD-07-Redis-Cle-Valeur|Redis Cache Clé-Valeur]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> // Cache
> @UseInterceptors(CacheInterceptor) @CacheTTL(60_000)
> @Get('populaires') populaires() { return this.films.populaires(); }
> // Queue (BullMQ)
> await this.emailsQueue.add('bienvenue', { userId }, { attempts: 3, backoff: { type: 'exponential', delay: 5000 } });
> @Processor('emails') export class EmailsProcessor extends WorkerHost {
>   async process(job: Job<{ userId: number }>) { await this.mailer.bienvenue(job.data.userId); }
> }
> // Cron
> @Cron('0 3 * * *') async nettoyer() { await this.tokens.supprimerExpires(); }
> ```

> [!example]- Analogie
> Le cache est un pense-bête sur le comptoir (pas besoin de retourner à l'entrepôt) ; la queue est une corbeille « à traiter » vidée par des collègues en arrière-boutique pendant que tu continues de servir les clients.

> [!question]- Pourquoi l'utiliser ?
> Réponses rapides (l'utilisateur n'attend pas l'envoi d'un email), résilience (retry), lissage de charge, tâches de maintenance automatiques.

> [!question]- Comment ça marche ?
> - Cache : `@nestjs/cache-manager` avec store Redis ; stratégie cache-aside ; invalidation à l'écriture
> - Queues : `@nestjs/bullmq` + Redis ; workers éventuellement dans un process séparé
> - Cron : `@nestjs/schedule` (attention : chaque instance exécute le cron → verrou distribué ou instance dédiée)

> [!question]- Quand l'utiliser ?
> Cache : lectures fréquentes et coûteuses. Queue : emails, génération de PDF, appels à des API lentes, traitements lourds. Cron : purge, rapports.

> [!danger]- Quand NE PAS l'utiliser / Limites
> « Il n'y a que deux choses difficiles en informatique : l'invalidation de cache et nommer les choses. » Un cache mal invalidé sert des données fausses.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Cache-aside | Lire le cache, sinon la BDD puis remplir le cache |
| TTL | Durée de vie d'une entrée de cache |
| Job | Tâche placée dans une file |
| Worker | Process qui consomme les jobs |
| Idempotence | Rejouer une tâche ne change pas le résultat |

---

## Points clés

- Cache pour les lectures, invalider sur écriture
- Jobs idempotents car ils peuvent être rejoués
- Retry avec backoff exponentiel
- Cron + plusieurs instances = attention aux doublons

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Mettre en cache des données personnalisées avec une clé commune → fuite de données entre utilisateurs
> - Job non idempotent rejoué → email envoyé 3 fois

---

## Exemple minimal

```typescript
async populaires(): Promise<Film[]> {
  const cle = 'films:populaires';
  const enCache = await this.cache.get<Film[]>(cle);
  if (enCache) return enCache;
  const films = await this.prisma.film.findMany({ orderBy: { vues: 'desc' }, take: 20 });
  await this.cache.set(cle, films, 60_000);
  return films;
}
```

> [!note] Ce que j'en retiens
> Le pattern cache-aside en 6 lignes.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Stratégies d'invalidation (TTL, événements), stampede protection
> - Observabilité des files (Bull Board), dead-letter queue

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[NestJS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/nest-13-cache-queues-taches]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un job doit-il être idempotent ?

---

## Tâches

- [ ] #task Envoyer l'email de bienvenue via une queue
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
