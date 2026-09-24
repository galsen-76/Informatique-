---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/orm/prisma-client
aliases:
  - "Prisma Client Requêtes et Relations"
parent: "[[ORM]]"
children: []
related_theory:
  - "[[ORM-01-Prisma-Schema-Migrations|Prisma Schéma et Migrations]]"
  - "[[SQL-03-Jointures|Jointures SQL]]"
  - "[[BDD-08-ORM-Concepts-N-plus-1|ORM Concepts et Problème N+1]]"
related_snippets:
  - "[[04_Snippets/orm-02-prisma-client-requetes-relations]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.prisma.io/docs/orm/prisma-client/queries"
---

# Prisma Client Requêtes et Relations

> [!abstract] Introduction
> Prisma Client offre une API typée pour lire, filtrer, paginer, écrire et charger des relations — en générant le SQL à ta place.

> [!warning]- Prérequis
> [[ORM-01-Prisma-Schema-Migrations|Prisma Schéma et Migrations]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> await prisma.film.findMany({
>   where: { annee: { gte: 2000 }, titre: { contains: 'star', mode: 'insensitive' } },
>   include: { _count: { select: { favoris: true } } },
>   orderBy: [{ annee: 'desc' }, { titre: 'asc' }],
>   take: 20, skip: 0,
> });
> await prisma.film.create({ data: { titre: 'Dune', annee: 2021 } });
> await prisma.film.update({ where: { id: 1 }, data: { titre: 'Dune : Première partie' } });
> await prisma.film.delete({ where: { id: 1 } });
> await prisma.user.findUnique({ where: { id: 1 }, include: { favoris: { include: { film: true } } } });
> ```

> [!example]- Analogie
> Prisma Client est un traducteur : tu formules ta demande en TypeScript, il la traduit en SQL correct et te rend des objets typés.

> [!question]- Pourquoi l'utiliser ?
> Autocomplétion et vérification des requêtes à la compilation, protection contre l'injection SQL, relations faciles.

> [!question]- Comment ça marche ?
> Correspondances SQL : `where` = WHERE, `orderBy` = ORDER BY, `take/skip` = LIMIT/OFFSET, `include` = JOIN (requêtes séparées ou jointure selon la stratégie), `select` = colonnes, `groupBy`/`aggregate` = GROUP BY.
> Écritures imbriquées : `create: { favoris: { create: [...] } }`, `connect`, `upsert`.
> Pagination par curseur (`cursor`) pour les grandes tables.

> [!question]- Quand l'utiliser ?
> 99 % des requêtes CRUD. SQL brut (`$queryRaw` paramétré) pour le reporting complexe.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pas de contrôle fin du SQL généré ; attention aux `include` en cascade qui chargent énormément de données.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `include` | Charge une relation |
| `select` | Choisit les champs |
| `connect` | Lie à un enregistrement existant |
| `upsert` | Crée ou met à jour |
| Pagination curseur | Reprend après un identifiant plutôt qu'un offset |

---

## Points clés

- `select` ciblé pour les listes
- `include` au lieu de boucles (N+1)
- Pagination par curseur pour de gros volumes
- `$queryRaw` toujours avec template tag (paramètres)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `$queryRawUnsafe` avec concaténation → injection SQL
> - Charger toute une table sans `take`

---

## Exemple minimal

```typescript
const filmsPopulaires = await prisma.favori.groupBy({
  by: ['filmId'], _count: { filmId: true },
  orderBy: { _count: { filmId: 'desc' } }, take: 10,
});
```

> [!note] Ce que j'en retiens
> Un GROUP BY + ORDER BY + LIMIT typé, sans écrire de SQL.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Activer les logs de requêtes et analyser le SQL généré avec EXPLAIN

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[ORM]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/orm-02-prisma-client-requetes-relations]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Comment Prisma évite-t-il l'injection SQL ?

---

## Tâches

- [ ] #task Écrire l'endpoint « top 10 des films favoris »
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
