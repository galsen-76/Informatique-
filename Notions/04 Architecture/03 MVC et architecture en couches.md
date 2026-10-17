---
type: notion
statut: a apprendre
resume: "L'architecture la plus répandue : l'application est découpée en couches empilées, chacune avec un rôle précis, et chaque couche ne parle qu'à celle du dessous."
revu:
sources:
  - "https://en.wikipedia.org/wiki/Multitier_architecture"
---
# MVC et architecture en couches

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : L'architecture la plus répandue : l'application est découpée en **couches** empilées, chacune avec un rôle précis, et chaque couche ne parle **qu'à celle du dessous**.

## Le problème

**Pourquoi c'est utile ?**
Pour séparer l'affichage, la logique métier et l'accès aux données, chacun dans sa couche.

**Qu'est-ce qui se passait sans ça ?**
Des requêtes SQL dans les contrôleurs et des règles métier dans l'affichage : tout était mélangé et impossible à tester.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Une requête descend (controller → service → accès aux données → base), la réponse remonte. C'est l'organisation de CinéTrack-API.

### Le schéma

![[Architecture_backend.png]]

> Requête HTTP → controller (reçoit la requête, vérifie la sécurité) → service métier → repository / DAO → base de données, puis réponse en sens inverse.

### Les couches

| Couche | Rôle | Dans NestJS | Ne fait PAS |
|---|---|---|---|
| **Présentation** (controller) | recevoir la requête, valider, répondre | `movies.controller.ts` + DTO | de règle métier |
| **Métier** (service) | appliquer les règles : droits, calculs, vérifications | `movies.service.ts` | de HTTP, de SQL |
| **Accès aux données** (repository) | lire et écrire en base | Prisma, ou `movies.repository.ts` | de règle métier |
| **Données** | stocker | PostgreSQL | |

Image : au restaurant, le **serveur** prend la commande (controller), le **cuisinier** prépare selon la recette (service), le **magasinier** va chercher les ingrédients (repository), la **réserve** les stocke (base).

### Pourquoi c'est utile

- **Changer une couche sans toucher aux autres** : passer de Prisma à du SQL brut ne modifie que le repository.
- **Tester chaque couche seule** : le service se teste avec un faux repository.
- **Savoir où chercher** : un bug de droits est dans le service, un bug de validation dans le DTO.

### Et côté front ?

La même idée existe : **pages** (présentation) → **stores / composables** (état, logique) → **api + mapper** (accès aux données). Voir [[05 Architecture frontend|Architecture front-end]] et [[04 Structure de projet|Structure de projet]].

## 🧪 Exemple

### Exemple : « publier une critique »

```ts
// Présentation : reçoit, valide (DTO), délègue
@Post()
create(@Body() dto: CreateReviewDto, @CurrentUser() user: AuthUser) {
  return this.reviews.create(dto, user.id);
}

// Métier : les règles
async create(dto: CreateReviewDto, userId: number) {
  await this.movies.ensureExists(dto.movieId);                 // le film existe ?
  const already = await this.repo.findByUserAndMovie(userId, dto.movieId);
  if (already) throw new ConflictException('Critique déjà écrite pour ce film');
  return this.repo.create({ ...dto, userId });
}

// Accès aux données : seulement Prisma
findByUserAndMovie(userId: number, movieId: number) {
  return this.prisma.review.findUnique({ where: { userId_movieId: { userId, movieId } } });
}
```

## ⚠️ Limites et pièges

- **Un controller qui appelle Prisma directement** en sautant le service : la logique finit éparpillée.
- **Un service « passe-plat »** qui ne fait que rappeler le repository : acceptable au début, mais ne crée pas de couches vides par principe.
- **Une couche du bas qui appelle une couche du haut** (le repository qui lance une exception HTTP) : les dépendances ne vont que vers le bas.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux de l'architecture logicielle|Fondamentaux de l'architecture logicielle]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://en.wikipedia.org/wiki/Multitier_architecture
