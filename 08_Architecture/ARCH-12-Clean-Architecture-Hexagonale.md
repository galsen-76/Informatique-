---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M10
tags:
  - architecture/hexagonale
aliases:
  - "Architecture Hexagonale et Clean Architecture"
parent: "[[Architecture Logicielle]]"
children: []
related_theory:
  - "[[ARCH-03-Architecture-en-Couches|Architecture en Couches]]"
  - "[[ARCH-11-SOLID|SOLID]]"
  - "[[ARCH-13-Domain-Driven-Design|Domain-Driven Design]]"
related_snippets:
  - "[[04_Snippets/arch-12-clean-architecture-hexagonale]]"
related_projects: []
source: "https://alistair.cockburn.us/hexagonal-architecture/"
---

# Architecture Hexagonale et Clean Architecture

> [!abstract] Introduction
> L'architecture hexagonale (ports & adapters) et la Clean Architecture placent la logique métier au centre, indépendante des frameworks, de la base de données et de l'UI ; les détails techniques se branchent autour via des interfaces.

> [!warning]- Prérequis
> [[ARCH-03-Architecture-en-Couches|Architecture en Couches]], [[ARCH-11-SOLID|SOLID]]

---

## Théorie

> [!question]- C'est quoi ?
> ```mermaid
> flowchart LR
>   subgraph Adapters entrants
>     HTTP["Controller REST (NestJS)"]
>     CLI["Job / CLI"]
>   end
>   subgraph Cœur["Domaine + cas d'usage"]
>     UC["Cas d'usage : AjouterFavori"]
>     D["Entités / règles métier"]
>     P1(["Port : FavorisRepository"])
>     P2(["Port : Notifieur"])
>   end
>   subgraph Adapters sortants
>     DB["PrismaFavorisRepository"]
>     MAIL["EmailNotifieur"]
>   end
>   HTTP --> UC
>   CLI --> UC
>   UC --> D
>   UC --> P1
>   UC --> P2
>   DB -. implémente .-> P1
>   MAIL -. implémente .-> P2
> ```
> Règle de dépendance : les dépendances pointent **vers le centre** ; le domaine ne connaît ni NestJS, ni Prisma, ni HTTP.

> [!example]- Analogie
> Le cœur métier est un moteur ; les adapters sont les prises et câbles. On peut changer la prise (REST → GraphQL) ou la batterie (PostgreSQL → Mongo) sans toucher au moteur.

> [!question]- Pourquoi l'utiliser ?
> Tester le métier sans BDD ni serveur, changer de technologie sans réécrire les règles, protéger le code métier (la partie qui a de la valeur) des évolutions des frameworks.

> [!question]- Comment ça marche ?
> ```typescript
> // Port (domaine)
> export interface FavorisRepository { existe(u: number, f: number): Promise<boolean>; ajouter(u: number, f: number): Promise<void> }
> // Cas d'usage (domaine, aucun import NestJS/Prisma)
> export class AjouterFavori {
>   constructor(private repo: FavorisRepository) {}
>   async executer(userId: number, filmId: number) {
>     if (await this.repo.existe(userId, filmId)) throw new FavoriDejaPresent();
>     await this.repo.ajouter(userId, filmId);
>   }
> }
> // Adapter (infrastructure)
> @Injectable() export class PrismaFavorisRepository implements FavorisRepository { /* Prisma */ }
> ```

> [!question]- Quand l'utiliser ?
> Domaine métier riche et durable (règles complexes, plusieurs points d'entrée). Pour un CRUD simple, une architecture en couches classique suffit.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Plus de fichiers, d'interfaces et de mapping entre objets : surcoût réel pour des applications simples.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Port | Interface définie par le domaine |
| Adapter | Implémentation technique d'un port |
| Cas d'usage | Action métier orchestrée (application service) |
| Règle de dépendance | Le centre ne dépend jamais de l'extérieur |

---

## Points clés

- Le métier au centre, sans dépendance technique
- Ports = interfaces, adapters = implémentations
- Tests unitaires du métier sans mock de framework
- Adapter la rigueur à la complexité du domaine

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Appliquer l'hexagonal à un CRUD de 3 tables
> - Laisser fuiter les types Prisma dans le domaine

---

## Exemple minimal

```typescript
// Test du cas d'usage avec un faux repository en mémoire
const repo = new FavorisEnMemoire();
await new AjouterFavori(repo).executer(1, 42);
await expect(new AjouterFavori(repo).executer(1, 42)).rejects.toThrow(FavoriDejaPresent);
```

> [!note] Ce que j'en retiens
> La règle métier se teste en millisecondes, sans base ni serveur.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Choisir le niveau d'architecture par module (CRUD simple vs cœur métier complexe)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Architecture Logicielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/arch-12-clean-architecture-hexagonale]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Dans quel sens pointent les dépendances en Clean Architecture ?

---

## Tâches

- [ ] #task Implémenter le module favoris de l'API en hexagonal et comparer avec la version en couches
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
