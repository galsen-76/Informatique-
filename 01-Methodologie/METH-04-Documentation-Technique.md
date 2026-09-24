---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - methodologie/documentation
aliases:
  - "Documentation Technique"
parent: "[[Méthodologie]]"
children: []
related_theory:
  - "[[CONC-08-ADR-Architecture-Decision-Records|Architecture Decision Records ADR]]"
  - "[[NEST-12-OpenAPI-Swagger|OpenAPI et Swagger NestJS]]"
related_snippets:
  - "[[04_Snippets/meth-04-documentation-technique]]"
related_projects: []
source: "https://diataxis.fr/"
---

# Documentation Technique

> [!abstract] Introduction
> La bonne documentation technique aide quelqu'un à utiliser, installer ou faire évoluer un logiciel : README, docs d'API (OpenAPI), commentaires TSDoc, ADR, guides — au bon endroit et à jour.

---

## Théorie

> [!question]- C'est quoi ?
> Cadre **Diátaxis** — 4 types de documentation :
> | Type | Répond à | Exemple |
> |---|---|---|
> | Tutoriel | « Apprends-moi » | Premier projet pas à pas |
> | Guide pratique | « Comment faire X ? » | Ajouter une migration |
> | Référence | « Quels sont les détails ? » | Doc API OpenAPI, TSDoc |
> | Explication | « Pourquoi ? » | ADR, architecture |

> [!example]- Analogie
> Une bonne documentation est un panneau indicateur au bon carrefour ; une mauvaise est un livre de 300 pages rangé dans une autre ville.

> [!question]- Pourquoi l'utiliser ?
> Onboarding rapide, moins d'interruptions pour l'équipe, maintenance possible après ton départ.

> [!question]- Comment ça marche ?
> README minimal d'un projet :
> ```markdown
> # CinéTrack API
> Objectif en une phrase.
> ## Prérequis — Node 22, Docker
> ## Démarrer — `cp .env.example .env && docker compose up -d && npm run dev`
> ## Scripts — dev, test, lint, build
> ## Architecture — lien vers docs/ et ADR
> ## Contribuer — conventions de branches et commits
> ```
> TSDoc pour les fonctions publiques non évidentes :
> ```typescript
> /**
>  * Calcule la note moyenne pondérée d'un film.
>  * @param notes - notes de 1 à 5
>  * @returns moyenne arrondie au dixième, 0 si aucune note
>  */
> ```

> [!question]- Quand l'utiliser ?
> En même temps que le code (dans la Definition of Done).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Une doc fausse est pire que pas de doc : la garder proche du code (dans le dépôt) et la générer quand possible.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| README | Point d'entrée d'un dépôt |
| TSDoc/JSDoc | Commentaires structurés de documentation |
| Diátaxis | Cadre des 4 types de documentation |
| Docs as code | Documentation versionnée avec le code |

---

## Points clés

- README qui permet de démarrer en 5 minutes
- Docs dans le dépôt, relues en MR
- Générer ce qui peut l'être (OpenAPI, TypeDoc)
- Commenter le pourquoi, pas le quoi

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Wiki externe jamais mis à jour
> - Commentaires qui paraphrasent le code

---

## Exemple minimal

```text
Test du README : un nouveau venu démarre-t-il le projet sans poser de question ?
```

> [!note] Ce que j'en retiens
> Le README se teste comme du code : par un utilisateur réel.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Mettre en place une documentation vivante (Storybook, OpenAPI, ADR, diagrammes Mermaid)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Méthodologie]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/meth-04-documentation-technique]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quels sont les 4 types de documentation selon Diátaxis ?

---

## Tâches

- [ ] #task Écrire les README de CinéTrack front et API
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
