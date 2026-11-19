---
type: exercise
status: a-faire
difficulty: difficile
concepts:
  - "[[ORM]]"
  - "[[Migration de base de données]]"
  - "[[Base NoSQL]]"
tags:
  - exercice
---
# Exercice — Faire évoluer une base avec un ORM et des migrations

> [!info] Objectif
> Brancher une petite API sur PostgreSQL avec un ORM, faire évoluer son schéma, et ajouter un cache Redis.
> Notions : [[ORM]] · [[Migration de base de données]] · [[Base NoSQL]]

## Consignes
- [ ] Dans un projet Node, installe Prisma (`npm i -D prisma`, `npm i @prisma/client`, `npx prisma init`) et pointe `DATABASE_URL` vers ta base Docker
- [ ] Décris les modèles `Projet` et `Tache` (relation 1-N) dans `schema.prisma`, puis `npx prisma migrate dev --name init`
- [ ] Regarde le SQL généré dans `prisma/migrations` : retrouve les clés
- [ ] Ajoute un champ `echeance DateTime?` à `Tache` et crée une deuxième migration
- [ ] Écris un script qui crée un projet avec 3 tâches dans une transaction (`prisma.$transaction` ou création imbriquée), puis les relit avec leur projet
- [ ] Active les logs de requêtes (`new PrismaClient({ log: ["query"] })`) et provoque un problème N+1 ; corrige-le avec `include`
- [ ] Lance Redis dans Docker et mets en cache 60 secondes le résultat d'une requête lente

> [!question]- Indice
> Pour Redis en Node : le paquet `redis` ; `await client.set(cle, JSON.stringify(v), { EX: 60 })` puis `JSON.parse(await client.get(cle))`.

> [!question]- Solution
> ```prisma
> model Projet {
>   id     Int     @id @default(autoincrement())
>   nom    String  @unique
>   taches Tache[]
> }
> model Tache {
>   id        Int       @id @default(autoincrement())
>   nom       String
>   echeance  DateTime?
>   projet    Projet    @relation(fields: [projetId], references: [id], onDelete: Cascade)
>   projetId  Int
> }
> ```
> ```js
> const p = await prisma.projet.create({
>   data: { nom: "Chantier", taches: { create: [{ nom: "Lot 1" }, { nom: "Lot 2" }, { nom: "Lot 3" }] } },
> });                                              // une seule transaction
> const taches = await prisma.tache.findMany({ include: { projet: true } });   // une requête, pas N+1
>
> const cle = "taches:toutes";
> let data = await redis.get(cle);
> if (!data) { data = JSON.stringify(await prisma.tache.findMany()); await redis.set(cle, data, { EX: 60 }); }
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
