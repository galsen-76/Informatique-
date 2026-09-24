---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M10
tags:
  - architecture/frontend
aliases:
  - "Architecture Frontend"
parent: "[[Architecture Logicielle]]"
children: []
related_theory:
  - "[[ANG-28-Architecture-Projet-Angular|Architecture d'un Projet Angular]]"
  - "[[VUE-19-Architecture-Projet-Vue|Architecture d'un Projet Vue.js]]"
  - "[[ARCH-02-Monolithe-vs-Microservices|Monolithe vs Microservices]]"
related_snippets:
  - "[[04_Snippets/arch-14-architecture-frontend]]"
related_projects: []
source: "https://martinfowler.com/articles/micro-frontends.html"
---

# Architecture Frontend

> [!abstract] Introduction
> Les choix d'architecture côté front : rendu (CSR/SSR/SSG), gestion d'état (local, partagé, serveur), découpage (features, monorepo, micro-frontends), design system et contrats avec le backend.

> [!warning]- Prérequis
> [[ANG-28-Architecture-Projet-Angular|Architecture d'un Projet Angular]], [[VUE-19-Architecture-Projet-Vue|Architecture d'un Projet Vue.js]]

---

## Théorie

> [!question]- C'est quoi ?
> Axes de décision :
> | Axe | Options |
> |---|---|
> | Rendu | CSR (SPA), SSR, SSG, hybride par route |
> | État | local (signal/ref), partagé (service/store), serveur (cache de requêtes), URL (filtres dans l'URL) |
> | Découpage | par feature, monorepo (Nx, Turborepo), micro-frontends (Module Federation, Native Federation) |
> | UI | design system interne, lib (Material, PrimeNG/PrimeVue), Tailwind |
> | Contrat back | REST + OpenAPI, GraphQL, BFF (Backend For Frontend) |

> [!example]- Analogie
> Architecturer un front, c'est urbaniser une ville : quartiers (features), réseaux communs (core), règles d'urbanisme (lint, conventions), et parfois des villes jumelles (micro-frontends).

> [!question]- Pourquoi l'utiliser ?
> Une application front d'entreprise vit des années avec plusieurs équipes : sans architecture, chaque ajout coûte plus cher que le précédent.

> [!question]- Comment ça marche ?
> Types d'état et où les mettre :
> ```mermaid
> flowchart TB
>   S["Donnée ?"] --> Q1{"Vient du serveur ?"}
>   Q1 -- Oui --> SV["Cache serveur<br/>(service + signals / TanStack Query)"]
>   Q1 -- Non --> Q2{"Doit survivre au rechargement / partage de lien ?"}
>   Q2 -- Oui --> URL["URL (query params) ou localStorage"]
>   Q2 -- Non --> Q3{"Partagée entre écrans ?"}
>   Q3 -- Oui --> ST["Store global (service/NgRx/Pinia)"]
>   Q3 -- Non --> LOC["État local du composant"]
> ```
> Micro-frontends : plusieurs applications (éventuellement Angular ET Vue) composées dans une même page, déployées indépendamment — utile quand plusieurs équipes autonomes travaillent sur un même produit.

> [!question]- Quand l'utiliser ?
> Dès qu'un front dépasse une équipe ou quelques dizaines d'écrans ; micro-frontends seulement pour une vraie autonomie d'équipes.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Micro-frontends = complexité (versions partagées, cohérence UI, performance) ; beaucoup d'équipes s'en passent avec un monorepo bien structuré.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| BFF | Backend dédié à un front |
| Micro-frontend | Front découpé en applications indépendantes |
| Monorepo | Plusieurs projets dans un dépôt |
| Module Federation | Chargement de code d'une autre app à l'exécution |
| État serveur | Données dont la source de vérité est le backend |

---

## Points clés

- Choisir le rendu par besoin (SEO, perf, auth)
- Classer l'état : local, partagé, serveur, URL
- Monorepo + règles de dépendances avant micro-frontends
- Design system partagé Angular/Vue via tokens CSS

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Tout mettre dans un store global
> - Micro-frontends « parce que c'est moderne »

---

## Exemple minimal

```typescript
// Filtres dans l'URL : partageables et restaurés au rechargement (Angular)
const route = inject(ActivatedRoute);
genre = toSignal(route.queryParamMap.pipe(map(p => p.get('genre') ?? 'tous')), { initialValue: 'tous' });
```

> [!note] Ce que j'en retiens
> L'URL est un état : un lien partagé retrouve exactement la même liste filtrée.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Rédiger la vision d'architecture front d'un produit (ADR, règles Nx, design system, stratégie de tests)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Architecture Logicielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/arch-14-architecture-frontend]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Où ranger l'état « filtre de recherche » et pourquoi ?

> [!faq]- Questions d'entretien
> - Comment organiseriez-vous le front d'une application utilisée par 5 équipes ?

---

## Tâches

- [ ] #task Cartographier l'architecture front des projets Angular et Vue au travail
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
