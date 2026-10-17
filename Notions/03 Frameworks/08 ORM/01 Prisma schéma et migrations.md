---
type: notion
statut: a apprendre
resume: "Avec Prisma, tu décris tes tables dans un seul fichier, schema.prisma."
revu:
sources:
  - "https://www.prisma.io/docs/orm/prisma-schema"
---
# Prisma schéma et migrations

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Avec **Prisma**, tu décris tes tables dans un seul fichier, `schema.prisma`.

## Le problème

**Pourquoi c'est utile ?**
Pour décrire les tables dans un seul fichier et en déduire le SQL et un client typé.

**Qu'est-ce qui se passait sans ça ?**
On écrivait le SQL de création et les types TypeScript séparément, et ils finissaient par ne plus correspondre.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Prisma en déduit le **SQL** pour créer ou modifier la base (les **migrations**), et un **client TypeScript** entièrement typé pour faire tes requêtes. Tu modifies le schéma, tu lances une commande, tout suit.

### Le schéma de CinéTrack-API

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
}

model User {
  id           Int        @id @default(autoincrement())
  email        String     @unique
  passwordHash String
  role         Role       @default(USER)
  reviews      Review[]
  favorites    Favorite[]
  createdAt    DateTime   @default(now())
}

model Movie {
  id          Int        @id                  // l'id TMDB
  title       String
  releaseYear Int?
  posterPath  String?
  reviews     Review[]
  favorites   Favorite[]
}

model Review {
  id        Int      @id @default(autoincrement())
  rating    Int
  comment   String
  spoiler   Boolean  @default(false)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    Int
  movie     Movie    @relation(fields: [movieId], references: [id])
  movieId   Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, movieId])                  // une seule critique par film et par utilisateur
  @@index([movieId])
}

model Favorite {
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    Int
  movie     Movie    @relation(fields: [movieId], references: [id])
  movieId   Int
  createdAt DateTime @default(now())

  @@id([userId, movieId])                      // clé composée : pas de doublon
}
```

> [!note] Versions
> La syntaxe de `generator` et l'emplacement de l'URL de connexion évoluent entre les versions majeures de Prisma (fichier `prisma.config.ts` dans les versions récentes). Suis la documentation de la version installée.

### Lire un modèle

| Écriture | Sens |
|---|---|
| `Int @id @default(autoincrement())` | clé primaire numérotée automatiquement |
| `String @unique` | deux lignes ne peuvent pas avoir la même valeur |
| `String?` | peut être vide (`NULL`) |
| `@default(now())` | date de création automatique |
| `@updatedAt` | date de modification automatique |
| `Review[]` | « un utilisateur a plusieurs critiques » |
| `@relation(fields: [userId], references: [id])` | la clé étrangère |
| `onDelete: Cascade` | supprimer l'utilisateur supprime ses critiques |
| `@@unique([a, b])` | la **combinaison** est unique |
| `@@index([movieId])` | accélère les recherches par film (voir Index) |

### Les commandes

| Commande | Rôle |
|---|---|
| `npx prisma init` | crée le dossier `prisma/` et le `.env` |
| `npx prisma migrate dev --name add-reviews` | crée une migration SQL **et** l'applique en local |
| `npx prisma migrate deploy` | applique les migrations en **production** (dans la CI) |
| `npx prisma generate` | régénère le client TypeScript |
| `npx prisma studio` | interface web pour voir et modifier les données |
| `npx prisma db seed` | remplit la base avec des données de départ |
| `npx prisma migrate reset` | efface et recrée la base (**développement seulement**) |

### Le déroulé quand tu ajoutes un champ

1. Modifie `schema.prisma` (ex. `runtime Int?` dans `Movie`).
2. `npx prisma migrate dev --name add-movie-runtime`.
3. Relis le fichier SQL généré dans `prisma/migrations/`.
4. **Commite** le schéma **et** la migration.
5. En production, la CI lance `prisma migrate deploy`.

Les migrations, c'est l'**historique** de ta base, comme Git pour le code. Voir [[06 Migrations|Migrations]].

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Modifier une migration déjà appliquée ailleurs** : les bases divergent. Crée une nouvelle migration.
- **`migrate dev` en production** : il peut proposer d'effacer la base. En production : `migrate deploy`.
- **Ajouter un champ obligatoire** à une table qui contient déjà des lignes : la migration échoue. Mets une valeur par défaut, ou rends-le optionnel d'abord.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[03 Normalisation|Normalisation]], [[06 Migrations|Migrations]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.prisma.io/docs/orm/prisma-schema
