---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M10
tags:
  - architecture/ddd
aliases:
  - "Domain-Driven Design"
parent: "[[Architecture Logicielle]]"
children: []
related_theory:
  - "[[ARCH-12-Clean-Architecture-Hexagonale|Architecture Hexagonale et Clean Architecture]]"
  - "[[ARCH-02-Monolithe-vs-Microservices|Monolithe vs Microservices]]"
related_snippets:
  - "[[04_Snippets/arch-13-domain-driven-design]]"
related_projects: []
source: "https://martinfowler.com/bliki/DomainDrivenDesign.html"
---

# Domain-Driven Design

> [!abstract] Introduction
> Le DDD est une approche qui place le domaine métier et son langage au cœur de la conception : langage omniprésent, bounded contexts, agrégats, entités et objets valeur.

> [!warning]- Prérequis
> [[ARCH-12-Clean-Architecture-Hexagonale|Architecture Hexagonale et Clean Architecture]]

---

## Théorie

> [!question]- C'est quoi ?
> **Stratégique** :
> - **Langage omniprésent** (ubiquitous language) : mêmes mots dans les discussions métier et dans le code
> - **Bounded context** : frontière où un modèle et son langage sont cohérents (« Client » en Facturation ≠ « Client » en Support)
> - **Context map** : relations entre contextes
> **Tactique** :
> - **Entité** : identité qui persiste (Utilisateur #42)
> - **Objet valeur** : défini par ses valeurs, immuable (Email, Montant, Période)
> - **Agrégat** : grappe d'objets modifiée comme un tout via une racine, frontière de cohérence transactionnelle
> - **Événement de domaine** : « FilmAjoutéAuxFavoris »
> - **Repository**, **service de domaine**

> [!example]- Analogie
> Un traducteur spécialisé : avant de traduire des contrats, il apprend le vocabulaire juridique exact, sinon il traduit juste mais faux.

> [!question]- Pourquoi l'utiliser ?
> Sur des domaines complexes (assurance, énergie, industrie — typique des clients d'ESN), le principal risque est de mal comprendre le métier ; le DDD aligne code et métier.

> [!question]- Comment ça marche ?
> ```typescript
> // Objet valeur : valide à la construction, immuable
> export class Email {
>   private constructor(readonly valeur: string) {}
>   static creer(v: string): Email {
>     if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) throw new EmailInvalide(v);
>     return new Email(v.toLowerCase());
>   }
> }
> ```
> Bounded contexts → modules NestJS (voire microservices) ; événements de domaine → communication entre contextes.

> [!question]- Quand l'utiliser ?
> Logiciels métier complexes et durables. Inutile pour un CRUD ou un site vitrine.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Coûteux à apprendre et à appliquer ; nécessite un accès réel aux experts métier.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Ubiquitous language | Vocabulaire commun métier/code |
| Bounded context | Frontière de cohérence d'un modèle |
| Agrégat | Ensemble cohérent modifié via sa racine |
| Objet valeur | Objet sans identité, défini par ses valeurs |
| Événement de domaine | Fait métier significatif passé |

---

## Points clés

- Le langage métier dans le code
- Découper par bounded contexts
- Invariants protégés par les agrégats
- Objets valeur pour valider tôt

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Faire du « DDD » uniquement avec des noms de dossiers (entities/, repositories/) sans travail avec le métier

---

## Exemple minimal

```text
Contextes CinéTrack : Catalogue (films, genres) · Communauté (critiques, notes, modération) · Compte (utilisateurs, auth)
« Film » du Catalogue ≠ « FilmNoté » de la Communauté
```

> [!note] Ce que j'en retiens
> Des frontières claires = des modules indépendants qui évoluent sans se casser mutuellement.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Animer un Event Storming avec le métier

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Architecture Logicielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/arch-13-domain-driven-design]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre une entité et un objet valeur ?

---

## Tâches

- [ ] #task Lire « DDD Distilled » (Vaughn Vernon) ou le résumé de Martin Fowler
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
