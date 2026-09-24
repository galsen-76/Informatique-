---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/bdd/migrations
aliases:
  - "Migrations de Base de Données"
parent: "[[Bases de Données]]"
children: []
related_theory:
  - "[[ORM-01-Prisma-Schema-Migrations|Prisma Schéma et Migrations]]"
  - "[[CICD-02-Pipeline-Full-Stack|Pipeline CI/CD Full Stack]]"
related_snippets:
  - "[[04_Snippets/bdd-05-migrations]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://martinfowler.com/articles/evodb.html"
---

# Migrations de Base de Données

> [!abstract] Introduction
> Les migrations sont des scripts versionnés qui font évoluer la structure (et parfois les données) de la base de façon reproductible, dans le même dépôt Git que le code.

> [!warning]- Prérequis
> [[SQL-07-DDL-Contraintes-Types|DDL Contraintes et Types SQL]]

---

## Théorie

> [!question]- C'est quoi ?
> Outils : Prisma Migrate, TypeORM migrations, Flyway/Liquibase (Java), Alembic (Python), Knex.
> ```text
> prisma/migrations/
> ├── 20260901120000_init/migration.sql
> ├── 20260915093000_ajout_favoris/migration.sql
> └── migration_lock.toml
> ```

> [!example]- Analogie
> Le carnet d'entretien d'une voiture : chaque intervention est datée et numérotée ; un mécanicien peut remettre n'importe quelle voiture au même niveau en suivant le carnet.

> [!question]- Pourquoi l'utiliser ?
> Tous les environnements (dev de chaque développeur, CI, recette, prod) ont exactement la même structure ; historique et relecture en revue de code.

> [!question]- Comment ça marche ?
> - Une table technique enregistre les migrations appliquées
> - Appliquées automatiquement au déploiement (job CI ou démarrage) avant la nouvelle version du code
> - **Expand / contract** pour ne rien casser : 1) ajouter la nouvelle colonne (compatible), 2) déployer le code qui écrit les deux, 3) migrer les données, 4) basculer la lecture, 5) supprimer l'ancienne colonne

> [!question]- Quand l'utiliser ?
> Tout changement de schéma, sans exception.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un rollback de migration destructive peut être impossible → sauvegarde avant, migrations compatibles avant/arrière.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Migration | Changement versionné de schéma |
| Expand/contract | Migration en plusieurs étapes compatibles |
| Seed | Données de base |
| Drift | Écart entre la base réelle et les migrations |

---

## Points clés

- Jamais de modification manuelle du schéma en prod
- Migrations relues en code review
- Compatibilité ascendante pour les déploiements sans interruption

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Renommer une colonne en une étape alors que l'ancienne version du code tourne encore
> - Migration qui verrouille une grosse table (ajout d'index sans `CONCURRENTLY`)

---

## Exemple minimal

```sql
-- sans bloquer les écritures (PostgreSQL)
CREATE INDEX CONCURRENTLY idx_critiques_film ON critiques (film_id);
```

> [!note] Ce que j'en retiens
> Sur une table en production, certaines opérations doivent être faites « en ligne ».

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Planifier des migrations de données volumineuses par lots

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Bases de Données]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/bdd-05-migrations]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi renommer une colonne en une seule migration est-il risqué ?

---

## Tâches

- [ ] #task Appliquer les migrations dans le pipeline CI de CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
