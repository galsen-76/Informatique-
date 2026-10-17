---
type: notion
statut: a apprendre
resume: "L'adresse de la base de données, le secret des jetons, le port : ces réglages changent entre ton ordinateur, la CI et la production, et certains sont secrets."
revu:
sources:
  - "https://docs.nestjs.com/techniques/configuration"
---
# Configuration et environnements NestJS

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : L'adresse de la base de données, le secret des jetons, le port : ces réglages changent entre ton ordinateur, la CI et la production, et certains sont **secrets**.

## Le problème

**Pourquoi c'est utile ?**
Pour lire les réglages (base, secrets, port) depuis l'environnement, différents en local, en CI et en prod.

**Qu'est-ce qui se passait sans ça ?**
Les réglages étaient écrits en dur dans le code, et les secrets finissaient dans Git.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

On ne les écrit donc **jamais dans le code** : ils viennent de **variables d'environnement**, vérifiées au démarrage.

### Le fichier `.env`

```bash
# .env  (JAMAIS commité)
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://cinetrack:motdepasse@localhost:5432/cinetrack
JWT_SECRET=une-longue-chaine-aleatoire-de-64-caracteres
JWT_EXPIRES_IN=15m
TMDB_TOKEN=eyJhbGciOi…
CORS_ORIGINS=http://localhost:4200
```

```bash
# .env.example  (commité : sert de modèle, SANS les vraies valeurs)
DATABASE_URL=postgresql://user:password@localhost:5432/cinetrack
JWT_SECRET=
TMDB_TOKEN=
```

Et dans `.gitignore` : `.env`.

### En production

Les variables ne viennent pas d'un fichier `.env` mais de l'**hébergeur** ou de la **CI** (variables GitLab CI masquées, secrets de la plateforme). Voir [[Gestion des secrets]].

## 🧪 Exemple

### Lire la configuration

```ts
@Injectable()
export class TmdbClient {
  constructor(private readonly config: ConfigService<Env, true>) {}

  private token = this.config.get('TMDB_TOKEN', { infer: true });   // typé
}
```

Jamais `process.env.X` dispersé dans le code : tout passe par `ConfigService`.

## ⚠️ Limites et pièges

- **Commiter `.env`** : les secrets sont dans l'historique Git pour toujours. S'il a été poussé, **change les secrets**.
- **Une valeur par défaut pour un secret** (`JWT_SECRET ?? 'secret'`) : en production, si la variable manque, tout le monde peut fabriquer des jetons valides.
- **Oublier `z.coerce.number()`** : les variables d'environnement sont toujours du **texte**.

## 🏋️ S'entraîner

### Vérifier la configuration au démarrage

Mieux vaut que l'API **refuse de démarrer** avec un message clair plutôt que de planter plus tard sur une variable manquante.

```bash
npm i @nestjs/config zod
```

```ts
// config/env.schema.ts
export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  TMDB_TOKEN: z.string().min(1),
  CORS_ORIGINS: z.string().transform(s => s.split(',')),
});
export type Env = z.infer<typeof EnvSchema>;
```

```ts
// app.module.ts
ConfigModule.forRoot({
  isGlobal: true,
  validate: (config) => EnvSchema.parse(config),   // plante au démarrage si invalide
})
```

## 🔗 Liens

- **Prérequis :** [[Fondamentaux NestJS]]
- **Voir aussi :** [[Gestion des secrets]], [[Déploiement et build Angular]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.nestjs.com/techniques/configuration
