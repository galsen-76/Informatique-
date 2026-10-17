---
type: notion
statut: a apprendre
resume: "Une migration est un fichier qui décrit une modification de la structure de la base (ajouter une table, une colonne, un index)."
revu:
sources:
  - "https://martinfowler.com/articles/evodb.html"
---
# Migrations

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une **migration** est un fichier qui décrit **une modification de la structure** de la base (ajouter une table, une colonne, un index).

## Le problème

**Pourquoi c'est utile ?**
Pour faire évoluer la structure de la base de façon versionnée, identique partout.

**Qu'est-ce qui se passait sans ça ?**
On modifiait la base à la main sur chaque machine : la prod, la CI et les postes n'avaient jamais la même structure.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Les migrations sont versionnées avec le code : chaque développeur, la CI et la production appliquent **les mêmes changements, dans le même ordre**. C'est Git, mais pour ta base de données.

### Le problème sans migrations

Tu ajoutes une colonne `runtime` à la main dans ta base locale. Ton code marche. Tu pousses. Chez ton collègue et en production, la colonne n'existe pas → tout plante.

### Les commandes Prisma

| Commande | Où | Effet |
|---|---|---|
| `prisma migrate dev --name xxx` | ta machine | crée la migration et l'applique |
| `prisma migrate deploy` | CI / production | applique les migrations en attente |
| `prisma migrate reset` | ta machine | efface la base et rejoue tout (+ seed) |
| `prisma migrate status` | partout | liste ce qui est appliqué ou non |

### Les règles d'or

1. **Une migration appliquée ne se modifie jamais.** Pour corriger, crée une nouvelle migration.
2. **Relis le SQL généré** avant de commiter : Prisma peut proposer de supprimer une colonne (et ses données) quand tu la renommes.
3. **Commite le schéma ET la migration** ensemble.
4. **Les migrations tournent dans la CI**, jamais à la main en production.

### Modifier sans casser (production avec des données)

Renommer `title` en `name` en une seule migration supprime les données. La méthode sûre, en plusieurs déploiements :

1. ajouter la nouvelle colonne `name` ;
2. copier les données (`UPDATE movies SET name = title`) ;
3. faire lire et écrire le code dans `name` ;
4. plus tard, supprimer `title`.

Pareil pour une colonne obligatoire : l'ajouter d'abord optionnelle (ou avec une valeur par défaut), la remplir, puis la rendre obligatoire.

### Le seed : les données de départ

```ts
// prisma/seed.ts
await prisma.user.upsert({
  where: { email: 'admin@cinetrack.fr' },
  create: { email: 'admin@cinetrack.fr', passwordHash: await argon2.hash('…'), role: 'ADMIN' },
  update: {},
});
```

Utile pour les tests et pour démarrer une base de développement avec des données réalistes.

## 🧪 Exemple

### Le principe

```mermaid
flowchart LR
  S["Tu modifies<br/>schema.prisma"] --> M["prisma migrate dev<br/>crée 20260926_add_runtime/migration.sql"]
  M --> G["git commit<br/>schéma + migration"]
  G --> CI["CI / production<br/>prisma migrate deploy"]
  CI --> DB[("Base à jour")]
```

```text
prisma/migrations/
├── 20260901120000_init/migration.sql
├── 20260915093000_add_reviews/migration.sql
└── 20260926101500_add_movie_runtime/migration.sql
```

La base garde une table interne qui note **quelles migrations ont déjà été appliquées**. `migrate deploy` applique seulement les nouvelles.

## ⚠️ Limites et pièges

- **`migrate dev` ou `migrate reset` en production** : risque d'effacer les données.
- **Des migrations en conflit** entre deux branches : après le merge, régénère une migration propre en local.

## 🔗 Liens

- **Prérequis :** [[01 Modèle relationnel et SGBD|Modèle relationnel et SGBD]]
- **Voir aussi :** [[01 Prisma schéma et migrations|Prisma schéma et migrations]], [[05 Pipeline CI CD full stack|Pipeline CI CD full stack]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://martinfowler.com/articles/evodb.html
