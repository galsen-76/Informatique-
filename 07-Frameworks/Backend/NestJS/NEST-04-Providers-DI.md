---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/nestjs/di
aliases:
  - "Providers et Injection de Dépendances NestJS"
parent: "[[NestJS]]"
related_theory:
  - "[[TG-05-Paradigmes-POO|Programmation Orientée Objet]]"
  - "[[ARCH-11-SOLID|SOLID]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/providers"
---

# Providers et Injection de Dépendances NestJS

> [!abstract] En bref
> Un **provider** est une classe que NestJS crée et fournit automatiquement à ceux qui en ont besoin : un service, un repository, un client externe. Tu écris `constructor(private readonly movies: MoviesService)`, et NestJS s'occupe du reste. C'est exactement l'injection de dépendances d'Angular.

## Le principe

```ts
@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly movies: MoviesService,
  ) {}
}
```

NestJS voit que `ReviewsService` a besoin de `PrismaService` et `MoviesService`, les crée (une seule fois) et les lui donne.

**Pourquoi c'est utile :**
- tu ne crées jamais les objets à la main (`new MoviesService(new PrismaService(…))`) ;
- **un seul exemplaire** partagé par défaut ;
- dans les tests, tu remplaces un service par un **faux** en une ligne (voir [[NEST-11-Tests-NestJS|Tests]]).

## Fournir autre chose qu'une classe

```ts
@Module({
  providers: [
    MoviesService,                                            // cas normal

    { provide: 'TMDB_BASE_URL', useValue: 'https://api.themoviedb.org/3' },   // une valeur

    {                                                          // un objet construit à partir de la config
      provide: TmdbClient,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => new TmdbClient(config.getOrThrow('TMDB_TOKEN')),
    },

    { provide: MailSender, useClass: process.env.NODE_ENV === 'test' ? FakeMailSender : SmtpMailSender },
  ],
})
```

| Forme | Sert à |
|---|---|
| `useValue` | fournir une valeur fixe |
| `useFactory` | construire l'objet avec une fonction (souvent à partir de la config) |
| `useClass` | choisir quelle classe fournir |

Pour injecter une valeur fournie par un nom : `constructor(@Inject('TMDB_BASE_URL') private baseUrl: string)`.

## Dépendre d'un « contrat » plutôt que d'une classe

```ts
export abstract class MailSender {
  abstract send(to: string, subject: string, body: string): Promise<void>;
}

@Injectable()
export class SmtpMailSender extends MailSender { /* envoi réel */ }

// dans le module
{ provide: MailSender, useClass: SmtpMailSender }

// dans un service
constructor(private readonly mail: MailSender) {}   // ne sait pas quelle implémentation il reçoit
```

Changer de prestataire d'e-mail = changer **une ligne** dans le module. C'est le « D » de [[ARCH-11-SOLID|SOLID]].

## Pièges

- **« Nest can't resolve dependencies »** : le provider n'est pas dans `providers` du module, ou pas exporté par son module d'origine (voir [[NEST-02-Modules|Modules]]).
- **Créer un service avec `new`** : il ne reçoit pas ses dépendances, et les tests ne peuvent plus le remplacer.
- **Dépendance circulaire** (A a besoin de B qui a besoin de A) : signe qu'un morceau devrait être extrait dans un troisième service.
