---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - conception/adr
aliases:
  - "Architecture Decision Records ADR"
parent: "[[Conception]]"
related_theory:
  - "[[METH-04-Documentation-Technique|Documentation Technique]]"
  - "[[BACK-00-Choisir-son-Backend|Choisir son Backend]]"
related_projects: []
source: "https://adr.github.io/"
---

# Architecture Decision Records ADR

> [!abstract] En bref
> Un **ADR** est une **page courte** qui explique une décision technique importante : **pourquoi** on a choisi NestJS, PostgreSQL ou un monorepo. Dans six mois (ou en entretien), tu sauras justifier tes choix au lieu de répondre « je ne sais plus ». C'est aussi un excellent contenu à montrer dans un projet de portfolio.

## Le modèle

```markdown
# ADR-003 : NestJS pour l'API de CinéTrack

Date : 2026-10-01 · Statut : Accepté

## Contexte
Le front est en Angular (TypeScript). Je veux une API REST avec authentification,
une base relationnelle, et une structure claire.

## Décision
NestJS + Prisma + PostgreSQL.

## Alternatives étudiées
- Express seul : trop libre, il faudrait tout structurer soi-même.
- Spring Boot : solide, mais un deuxième langage à apprendre.

## Conséquences
+ Un seul langage (TypeScript) du front à la base, types partagés.
+ Même logique que Angular (modules, injection de dépendances).
− Moins adapté aux calculs très lourds.
```

4 parties : **contexte** (la situation), **décision**, **alternatives** (ce qu'on a écarté et pourquoi), **conséquences** (le bon **et** le moins bon).

## Où les ranger

```text
docs/adr/
├── 0001-monorepo.md
├── 0002-postgresql.md
└── 0003-nestjs.md
```

Dans le dépôt, versionnés avec le code.

## Les règles

- **Une page maximum.**
- **On ne modifie pas** un ADR accepté : si la décision change, on écrit un nouvel ADR (« remplace l'ADR-003 »). L'historique reste lisible.
- **Seulement les décisions coûteuses à changer** : framework, base de données, authentification, hébergement, structure du projet.

## Sur tes projets

3 ou 4 ADR par projet suffisent. En entretien, « j'ai choisi PostgreSQL plutôt que MongoDB parce que mes données sont très liées entre elles (utilisateurs, films, critiques) » montre que tu **réfléchis**, pas seulement que tu codes.

## Pièges

- **Écrire l'ADR après coup** pour justifier un choix sans vraie comparaison.
- **Un ADR pour chaque petit choix** : les décisions importantes sont noyées.
- **Oublier les inconvénients** : toute décision en a.
