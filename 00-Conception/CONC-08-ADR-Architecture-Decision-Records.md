---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - conception/adr
aliases:
  - "Architecture Decision Records ADR"
parent: "[[Conception]]"
children: []
related_theory:
  - "[[METH-04-Documentation-Technique|Documentation Technique]]"
  - "[[BACK-00-Choisir-son-Backend|Choisir son Backend]]"
related_snippets:
  - "[[04_Snippets/conc-08-adr-architecture-decision-records]]"
related_projects: []
source: "https://adr.github.io/"
---

# Architecture Decision Records ADR

> [!abstract] Introduction
> Un ADR est un court document qui trace une décision technique importante : son contexte, la décision prise, les alternatives et les conséquences — pour que l'équipe sache POURQUOI dans 2 ans.

---

## Théorie

> [!question]- C'est quoi ?
> ```markdown
> # ADR-003 : Utiliser NestJS pour l'API CinéTrack
> Date : 2026-10-01 — Statut : Accepté
>
> ## Contexte
> Fronts en Angular et Vue (TypeScript). Équipe de 2 devs front. Besoin d'une API REST + auth.
>
> ## Décision
> NestJS + Prisma + PostgreSQL.
>
> ## Alternatives considérées
> - Spring Boot : robuste mais nouveau langage pour l'équipe
> - Express seul : trop peu structurant
>
> ## Conséquences
> + Un seul langage, types partagés, architecture familière (Angular)
> − Moins adapté au calcul CPU intensif ; écosystème Java de l'entreprise non réutilisé
> ```

> [!example]- Analogie
> Le carnet de bord d'un navire : on note pourquoi on a changé de cap, pour que le prochain capitaine ne refasse pas la même erreur.

> [!question]- Pourquoi l'utiliser ?
> Les décisions oubliées sont rediscutées sans fin ou annulées par méconnaissance ; l'ADR accélère l'onboarding et les revues d'architecture.

> [!question]- Comment ça marche ?
> - Fichiers Markdown numérotés dans le dépôt (`docs/adr/`)
> - Immuables : on ne modifie pas un ADR accepté, on en crée un nouveau qui le remplace (« Remplacé par ADR-007 »)
> - Statuts : Proposé, Accepté, Déprécié, Remplacé

> [!question]- Quand l'utiliser ?
> Choix de framework, de BDD, de structure, d'authentification, de stratégie de déploiement — tout ce qui est coûteux à changer.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Documenter chaque micro-choix noie les décisions importantes.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| ADR | Architecture Decision Record |
| Contexte | Situation et contraintes au moment du choix |
| Conséquences | Effets positifs et négatifs acceptés |

---

## Points clés

- Court (1 page)
- Alternatives et conséquences obligatoires
- Versionné avec le code

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - ADR écrit après coup pour justifier sans vraie comparaison

---

## Exemple minimal

```text
docs/adr/
├── 0001-structure-monorepo.md
├── 0002-postgresql.md
└── 0003-nestjs.md
```

> [!note] Ce que j'en retiens
> Le « pourquoi » d'une architecture tient dans une poignée de fichiers courts.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Animer une discussion d'architecture et la conclure par un ADR

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Conception]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/conc-08-adr-architecture-decision-records]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un ADR accepté ne se modifie-t-il pas ?

---

## Tâches

- [ ] #task Écrire les 3 premiers ADR de CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
