---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/orm/prisma
aliases:
  - "Prisma Schéma et Migrations"
parent: "[[ORM]]"
children:
  - "[[ORM-02-Prisma-Client-Requetes-Relations|Prisma Client Requêtes et Relations]]"
related_theory:
  - "[[BDD-02-Modelisation-Normalisation|Modélisation Relationnelle et Normalisation]]"
  - "[[BDD-05-Migrations|Migrations de Base de Données]]"
related_snippets:
  - "[[04_Snippets/orm-01-prisma-schema-migrations]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.prisma.io/docs/orm/prisma-schema"
---

# Prisma Schéma et Migrations

> [!abstract] Introduction
> Avec Prisma, on décrit les tables dans un fichier `schema.prisma` ; Prisma génère les migrations SQL et un client TypeScript entièrement typé.

> [!warning]- Prérequis
> [[SQL-01-Fondamentaux-SELECT|Fondamentaux SQL SELECT]], [[BDD-02-Modelisation-Normalisation|Modélisation Relationnelle et Normalisation]]

---

## Théorie

> [!question]- C'est quoi ?
> ```prisma
> datasource db {
>   provider = "postgresql"
>   url      = env("DATABASE_URL")   // Prisma 7+ : l'URL peut être déplacée dans prisma.config.ts
> }
> generator client {
>   provider = "prisma-client-js"    // Prisma 7+ : nouveau générateur "prisma-client" (vérifier la doc de ta version)
> }
>
> model User {
>   id        Int      @id @default(autoincrement())
>   email     String   @unique
>   hash      String
>   role      Role     @default(USER)
>   favoris   Favori[]
>   createdAt DateTime @default(now())
> }
> model Film {
>   id      Int      @id @default(autoincrement())
>   titre   String
>   annee   Int
>   favoris Favori[]
>   @@index([titre])
> }
> model Favori {
>   user   User @relation(fields: [userId], references: [id], onDelete: Cascade)
>   userId Int
>   film   Film @relation(fields: [filmId], references: [id])
>   filmId Int
>   @@id([userId, filmId])
> }
> enum Role { USER ADMIN }
> ```

> [!example]- Analogie
> Le schéma est le plan de l'entrepôt ; une migration est un ordre de travaux daté (« ajouter une étagère ») ; l'historique des migrations permet de reconstruire l'entrepôt à l'identique n'importe où.

> [!question]- Pourquoi l'utiliser ?
> Une seule source de vérité pour la structure de la BDD, versionnée dans Git, appliquée identiquement en dev, CI et prod.

> [!question]- Comment ça marche ?
> ```bash
> npx prisma migrate dev --name ajout_favoris   # crée + applique la migration (dev)
> npx prisma migrate deploy                     # applique les migrations en prod/CI
> npx prisma generate                           # régénère le client typé
> npx prisma studio                             # interface pour explorer les données
> npx prisma db seed                            # données initiales
> ```

> [!question]- Quand l'utiliser ?
> Chaque évolution de structure passe par une migration commitée.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les migrations destructrices (renommer/supprimer une colonne) doivent être pensées pour ne pas perdre de données ni casser la version en cours de déploiement (expand/contract).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Modèle | Table décrite dans le schéma |
| Relation | Lien entre modèles via clé étrangère |
| Migration | Script SQL versionné de changement de structure |
| Seed | Données initiales |

---

## Points clés

- `migrate dev` en local, `migrate deploy` en prod
- Migrations commitées et relues comme du code
- Index sur les colonnes de recherche/jointure
- `onDelete` réfléchi pour chaque relation

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Modifier une migration déjà appliquée ailleurs
> - `prisma db push` en production (pas d'historique)
> - Renommer un champ → Prisma génère drop + add (perte de données) si on ne corrige pas le SQL

---

## Exemple minimal

```sql
-- migration générée (extrait) : relisez toujours le SQL
ALTER TABLE "Film" ADD COLUMN "duree" INTEGER;
CREATE INDEX "Film_titre_idx" ON "Film"("titre");
```

> [!note] Ce que j'en retiens
> Toujours relire le SQL généré avant de commiter la migration.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Stratégie expand/contract pour des migrations sans interruption de service

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[ORM]]
- Sous-sujets → [[ORM-02-Prisma-Client-Requetes-Relations|Prisma Client Requêtes et Relations]]
- À comparer avec → [[ORM-03-Comparatif-ORM-TypeScript|Comparatif ORM TypeScript]]

**Pratique :**
- Extrait de code → [[04_Snippets/orm-01-prisma-schema-migrations]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi ne jamais modifier une migration déjà partagée ?

---

## Tâches

- [ ] #task Écrire le schéma CinéTrack (User, Film, Favori, Critique) et le seed
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
