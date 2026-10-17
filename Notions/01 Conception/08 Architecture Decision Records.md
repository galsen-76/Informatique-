---
type: notion
statut: a apprendre
resume: "Un ADR est une page courte qui explique une décision technique importante : pourquoi on a choisi NestJS, PostgreSQL ou un monorepo."
revu:
sources:
  - "https://adr.github.io/"
---
# Architecture Decision Records

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un **ADR** est une **page courte** qui explique une décision technique importante : **pourquoi** on a choisi NestJS, PostgreSQL ou un monorepo.

## Le problème

**Pourquoi c'est utile ?**
Pour garder une trace courte des grandes décisions techniques et de leurs raisons.

**Qu'est-ce qui se passait sans ça ?**
Six mois plus tard, personne ne savait pourquoi on avait choisi telle base ou tel framework. On rediscutait les mêmes choix, ou on les cassait sans le savoir.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Dans six mois (ou en entretien), tu sauras justifier tes choix au lieu de répondre « je ne sais plus ». C'est aussi un excellent contenu à montrer dans un projet de portfolio.

### Le modèle

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

### Où les ranger

```text
docs/adr/
├── 0001-monorepo.md
├── 0002-postgresql.md
└── 0003-nestjs.md
```

Dans le dépôt, versionnés avec le code.

### Les règles

- **Une page maximum.**
- **On ne modifie pas** un ADR accepté : si la décision change, on écrit un nouvel ADR (« remplace l'ADR-003 »). L'historique reste lisible.
- **Seulement les décisions coûteuses à changer** : framework, base de données, authentification, hébergement, structure du projet.

## 🧪 Exemple

### Sur tes projets

3 ou 4 ADR par projet suffisent. En entretien, « j'ai choisi PostgreSQL plutôt que MongoDB parce que mes données sont très liées entre elles (utilisateurs, films, critiques) » montre que tu **réfléchis**, pas seulement que tu codes.

## ⚠️ Limites et pièges

- **Écrire l'ADR après coup** pour justifier un choix sans vraie comparaison.
- **Un ADR pour chaque petit choix** : les décisions importantes sont noyées.
- **Oublier les inconvénients** : toute décision en a.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[05 Documentation technique|Documentation technique]], [[05 Choisir son framework backend|Choisir son framework backend]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://adr.github.io/
