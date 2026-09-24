---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/bdd/orm
aliases:
  - "ORM Concepts et Problème N+1"
parent: "[[Bases de Données]]"
children: []
related_theory:
  - "[[ORM-03-Comparatif-ORM-TypeScript|Comparatif ORM TypeScript]]"
  - "[[ORM-02-Prisma-Client-Requetes-Relations|Prisma Client Requêtes et Relations]]"
related_snippets:
  - "[[04_Snippets/bdd-08-orm-concepts-n-plus-1]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.prisma.io/docs/orm/prisma-client/queries/query-optimization-performance"
---

# ORM Concepts et Problème N+1

> [!abstract] Introduction
> Un ORM (Object-Relational Mapper) fait le lien entre objets du code et tables SQL ; pratique, il cache aussi des pièges de performance, dont le célèbre problème N+1.

> [!warning]- Prérequis
> [[SQL-03-Jointures|Jointures SQL]]

---

## Théorie

> [!question]- C'est quoi ?
> Problème N+1 :
> ```typescript
> const films = await prisma.film.findMany();                    // 1 requête
> for (const f of films) {
>   f.critiques = await prisma.critique.findMany({ where: { filmId: f.id } });  // + N requêtes !
> }
> // ✅ Solution : 1 ou 2 requêtes
> const films2 = await prisma.film.findMany({ include: { critiques: true } });
> ```

> [!example]- Analogie
> Aller au supermarché une fois par article de la liste de courses, au lieu d'y aller une fois avec toute la liste.

> [!question]- Pourquoi l'utiliser ?
> 100 films = 101 requêtes : invisible en dev avec 3 lignes, catastrophique en production.

> [!question]- Comment ça marche ?
> - Chargement anticipé (`include`, `JOIN FETCH` en JPA)
> - Chargement par lots (DataLoader en GraphQL)
> - Activer les logs SQL en dev pour compter les requêtes
> - Chargement paresseux (lazy loading) des ORM = source fréquente de N+1

> [!question]- Quand l'utiliser ?
> Vérifier le nombre de requêtes pour chaque endpoint de liste.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Tout inclure « au cas où » charge trop de données (over-fetching) → `select` ciblé.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| ORM | Mappe objets ↔ tables |
| N+1 | 1 requête pour la liste + N pour les détails |
| Eager loading | Chargement anticipé des relations |
| Lazy loading | Chargement à l'accès |

---

## Points clés

- Logs SQL activés en dev
- `include`/`select` ciblés
- Surveiller le nombre de requêtes par endpoint

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Boucle avec `await` sur la BDD

---

## Exemple minimal

```typescript
new PrismaClient({ log: ['query'] });   // affiche chaque requête SQL en dev
```

> [!note] Ce que j'en retiens
> Voir les requêtes, c'est repérer immédiatement un N+1.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Mettre en place des tests qui vérifient le nombre de requêtes d'un endpoint

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Bases de Données]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/bdd-08-orm-concepts-n-plus-1]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Comment détecter un problème N+1 ?

> [!faq]- Questions d'entretien
> - Qu'est-ce que le problème N+1 ?

---

## Tâches

- [ ] #task Provoquer puis corriger un N+1 sur l'endpoint des critiques
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
