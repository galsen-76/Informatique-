---
type: notion
statut: a apprendre
resume: "Prisma Client est l'objet avec lequel tu interroges la base en TypeScript : prisma.review.findMany({ where: { movieId: 42 } })."
revu:
sources:
  - "https://www.prisma.io/docs/orm/prisma-client/queries"
---
# Prisma Client requêtes et relations

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Prisma Client est l'objet avec lequel tu interroges la base en TypeScript : `prisma.review.findMany({ where: { movieId: 42 } })`.

## Le problème

**Pourquoi c'est utile ?**
Pour interroger la base en TypeScript avec l'autocomplétion des champs et des relations.

**Qu'est-ce qui se passait sans ça ?**
On écrivait du SQL en texte, sans vérification, et les fautes de frappe n'apparaissaient qu'à l'exécution.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Il écrit le SQL pour toi, et l'éditeur te propose les champs et relations disponibles. Voici les requêtes dont CinéTrack-API a besoin.

### Lire

```ts
// Un seul, par clé unique
prisma.user.findUnique({ where: { email } });

// Plusieurs, avec filtre, tri et pagination
prisma.review.findMany({
  where: { movieId: 42, rating: { gte: 7 } },          // note ≥ 7
  orderBy: { createdAt: 'desc' },
  skip: (page - 1) * 20,
  take: 20,
});

// Compter
prisma.review.count({ where: { movieId: 42 } });

// Premier trouvé
prisma.review.findFirst({ where: { userId, movieId } });
```

| Filtre | Sens |
|---|---|
| `{ rating: 8 }` | égal |
| `{ rating: { gte: 7, lte: 9 } }` | entre 7 et 9 |
| `{ title: { contains: 'dune', mode: 'insensitive' } }` | contient (sans tenir compte des majuscules) |
| `{ id: { in: [1, 2, 3] } }` | dans la liste |
| `{ OR: [{…}, {…}] }`, `{ NOT: {…} }` | ou / sauf |
| `{ posterPath: null }` | vide |

### Charger les relations : `include`

```ts
// La critique avec son auteur (seulement l'e-mail) et son film
prisma.review.findMany({
  where: { movieId: 42 },
  include: {
    user: { select: { id: true, email: true } },
    movie: true,
  },
});

// Un film avec ses 5 dernières critiques et le nombre total
prisma.movie.findUnique({
  where: { id: 42 },
  include: {
    reviews: { take: 5, orderBy: { createdAt: 'desc' } },
    _count: { select: { reviews: true } },
  },
});
```

### Écrire

```ts
prisma.review.create({ data: { rating: 8, comment: '…', userId, movieId } });

prisma.review.update({ where: { id }, data: { rating: 9 } });

prisma.review.delete({ where: { id } });

// Créer ou mettre à jour (le film vient de TMDB, on le garde en base)
prisma.movie.upsert({
  where: { id: tmdbMovie.id },
  create: { id: tmdbMovie.id, title: tmdbMovie.title },
  update: { title: tmdbMovie.title },
});

prisma.movie.update({ where: { id }, data: { viewCount: { increment: 1 } } });
```

### Calculer : la note moyenne d'un film

```ts
const stats = await prisma.review.aggregate({
  where: { movieId: 42 },
  _avg: { rating: true },
  _count: true,
});
// stats._avg.rating → 7.8
```

### Le type des résultats

Prisma **devine** le type exact selon ton `select` / `include` :

```ts
const r = await prisma.review.findFirst({ include: { user: { select: { email: true } } } });
r?.user.email;        // ✅ typé
r?.user.passwordHash; // ❌ n'existe pas dans ce résultat
```

## 🧪 Exemple

### Choisir les champs : `select`

```ts
prisma.user.findUnique({
  where: { id },
  select: { id: true, email: true, role: true },      // PAS le passwordHash
});
```

## ⚠️ Limites et pièges

- **Requête dans une boucle** (charger l'auteur de chaque critique une par une) : 1 + N requêtes. Utilise `include`. Voir [[08 ORM et problème N+1|N+1]].
- **`findMany` sans `take`** : sur une grosse table, tu ramènes tout. Pagine toujours.
- **`findUnique` sur un champ non unique** : refusé, utilise `findFirst`.
- **Oublier `select`** sur l'utilisateur : le mot de passe haché part dans la réponse.

## 🔗 Liens

- **Prérequis :** [[01 Prisma schéma et migrations|Prisma schéma et migrations]]
- **Voir aussi :** [[03 Jointures SQL|Jointures SQL]], [[08 ORM et problème N+1|ORM et problème N+1]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.prisma.io/docs/orm/prisma-client/queries
