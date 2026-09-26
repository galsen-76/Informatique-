---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M08
tags:
  - backend/nestjs/config
aliases:
  - "Configuration et Environnements NestJS"
parent: "[[NestJS]]"
related_theory:
  - "[[SEC-10-Gestion-des-Secrets|Gestion des Secrets]]"
  - "[[ANG-17-Deploiement-Build|Déploiement & Build Angular]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/techniques/configuration"
---

# Configuration et Environnements NestJS

> [!abstract] En bref
> L'adresse de la base de données, le secret des jetons, le port : ces réglages changent entre ton ordinateur, la CI et la production, et certains sont **secrets**. On ne les écrit donc **jamais dans le code** : ils viennent de **variables d'environnement**, vérifiées au démarrage.

## Le fichier `.env`

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

## Vérifier la configuration au démarrage

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

## Lire la configuration

```ts
@Injectable()
export class TmdbClient {
  constructor(private readonly config: ConfigService<Env, true>) {}

  private token = this.config.get('TMDB_TOKEN', { infer: true });   // typé
}
```

Jamais `process.env.X` dispersé dans le code : tout passe par `ConfigService`.

## En production

Les variables ne viennent pas d'un fichier `.env` mais de l'**hébergeur** ou de la **CI** (variables GitLab CI masquées, secrets de la plateforme). Voir [[SEC-10-Gestion-des-Secrets|Gestion des secrets]].

## Pièges

- **Commiter `.env`** : les secrets sont dans l'historique Git pour toujours. S'il a été poussé, **change les secrets**.
- **Une valeur par défaut pour un secret** (`JWT_SECRET ?? 'secret'`) : en production, si la variable manque, tout le monde peut fabriquer des jetons valides.
- **Oublier `z.coerce.number()`** : les variables d'environnement sont toujours du **texte**.
