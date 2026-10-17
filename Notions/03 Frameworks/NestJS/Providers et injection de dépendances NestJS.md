---
type: notion
statut: a apprendre
resume: "Un provider est une classe que NestJS crée et fournit automatiquement à ceux qui en ont besoin : un service, un repository, un client externe."
revu:
sources:
  - "https://docs.nestjs.com/providers"
---
# Providers et injection de dépendances NestJS

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un **provider** est une classe que NestJS crée et fournit automatiquement à ceux qui en ont besoin : un service, un repository, un client externe.

## Le problème

**Pourquoi c'est utile ?**
Pour que NestJS crée et fournisse automatiquement les services dont une classe a besoin.

**Qu'est-ce qui se passait sans ça ?**
Chaque classe créait ses dépendances avec new : impossible de les remplacer par des fausses dans les tests.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Tu écris `constructor(private readonly movies: MoviesService)`, et NestJS s'occupe du reste. C'est exactement l'injection de dépendances d'Angular.

### Le principe

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
- dans les tests, tu remplaces un service par un **faux** en une ligne (voir [[Tests NestJS|Tests]]).

### Dépendre d'un « contrat » plutôt que d'une classe

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

Changer de prestataire d'e-mail = changer **une ligne** dans le module. C'est le « D » de [[Principes SOLID|SOLID]].

## 🧪 Exemple

### Fournir autre chose qu'une classe

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

## ⚠️ Limites et pièges

- **« Nest can't resolve dependencies »** : le provider n'est pas dans `providers` du module, ou pas exporté par son module d'origine (voir [[Modules NestJS|Modules]]).
- **Créer un service avec `new`** : il ne reçoit pas ses dépendances, et les tests ne peuvent plus le remplacer.
- **Dépendance circulaire** (A a besoin de B qui a besoin de A) : signe qu'un morceau devrait être extrait dans un troisième service.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux NestJS]]
- **Voir aussi :** [[Programmation orientée objet]], [[Principes SOLID]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.nestjs.com/providers
