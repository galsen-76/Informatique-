---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/bdd/postgresql
aliases:
  - "PostgreSQL en Pratique"
parent: "[[Bases de Données]]"
children: []
related_theory:
  - "[[BDD-01-Fondamentaux-SGBD|Fondamentaux des Bases de Données]]"
  - "[[SEC-10-Gestion-des-Secrets|Gestion des Secrets]]"
related_snippets:
  - "[[04_Snippets/bdd-09-postgresql-pratique]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/"
---

# PostgreSQL en Pratique

> [!abstract] Introduction
> Les commandes et réflexes du quotidien avec PostgreSQL : psql, rôles et droits, sauvegarde/restauration, extensions utiles.

> [!warning]- Prérequis
> [[BDD-01-Fondamentaux-SGBD|Fondamentaux des Bases de Données]]

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> psql -h localhost -U cine -d cinetrack
> \l        # bases        \dt   # tables      \d films   # structure d'une table
> \du       # rôles        \x    # affichage étendu   \q  # quitter
> pg_dump -Fc -U cine cinetrack > cinetrack.dump      # sauvegarde
> pg_restore -U cine -d cinetrack_restore cinetrack.dump
> ```

> [!example]- Analogie
> psql est le tableau de bord moteur ouvert : moins joli qu'une interface graphique, mais tu vois et contrôles tout.

> [!question]- Pourquoi l'utiliser ?
> Déboguer en direct, inspecter une base de recette, restaurer une sauvegarde, créer des accès en lecture seule.

> [!question]- Comment ça marche ?
> Sécurité : un rôle applicatif avec les droits minimaux (pas superuser), un rôle lecture seule pour l'analyse.
> ```sql
> CREATE ROLE app_cinetrack LOGIN PASSWORD '…';
> GRANT CONNECT ON DATABASE cinetrack TO app_cinetrack;
> GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_cinetrack;
> ```
> Extensions : `pg_trgm` (recherche floue), `pgcrypto`, `uuid-ossp`, `pg_stat_statements`, `pgvector` (IA).

> [!question]- Quand l'utiliser ?
> Au quotidien en dev, et pour tout diagnostic en recette/production (avec prudence et accès lecture seule).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Travailler directement en production sans transaction ni sauvegarde est la cause de nombreux incidents.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| psql | Client en ligne de commande |
| Rôle | Utilisateur ou groupe PostgreSQL |
| pg_dump | Outil de sauvegarde logique |
| Extension | Module ajoutant des fonctionnalités |

---

## Points clés

- Moindre privilège pour l'application
- Sauvegardes automatiques ET tests de restauration
- `\d table` pour lire une structure rapidement

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Connexion en superuser depuis l'application

---

## Exemple minimal

```sql
SELECT query, calls, mean_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 5;
```

> [!note] Ce que j'en retiens
> Les 5 requêtes les plus lentes en moyenne : point de départ de toute optimisation.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Paramétrage (shared_buffers, work_mem), VACUUM/autovacuum, réplication

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Bases de Données]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/bdd-09-postgresql-pratique]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi l'application ne doit-elle pas utiliser le rôle superuser ?

---

## Tâches

- [ ] #task Faire une sauvegarde puis une restauration de la base CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
