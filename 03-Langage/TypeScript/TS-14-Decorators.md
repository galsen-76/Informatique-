---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M03
aliases:
  - "Decorators"
tags:
  - frontend/typescript/decorators
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-05-Classes|Classes TypeScript]]"
  - "[[ANG-02-Composants|Composants Angular]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/decorators.html"
---

# Decorators

> [!abstract] En bref
> Un **décorateur** est une étiquette `@Quelquechose` collée au-dessus d'une classe, d'une méthode ou d'une propriété. Elle donne des informations au framework : « cette classe est un composant », « cette méthode répond à GET /movies ». Tu ne les écriras presque jamais toi-même, mais **tu les utilises partout** en Angular et NestJS.

## L'image

Une **étiquette sur un colis** : « fragile », « à livrer au 3e étage ». Le colis ne change pas, mais le livreur (le framework) sait comment le traiter.

## Ceux que tu vas croiser

**Angular**

```ts
@Component({                        // « cette classe est un composant »
  selector: 'app-movie-card',
  template: `<h3>{{ movie().title }}</h3>`,
})
export class MovieCardComponent {
  movie = input.required<Movie>();
}

@Injectable({ providedIn: 'root' }) // « cette classe est un service injectable »
export class MoviesApi {}
```

**NestJS**

```ts
@Controller('movies')                       // routes qui commencent par /movies
export class MoviesController {
  @Get(':id')                               // répond à GET /movies/:id
  findOne(@Param('id') id: string) {}       // récupère le :id de l'URL

  @Post()
  @UseGuards(AuthGuard)                     // réservé aux utilisateurs connectés
  create(@Body() dto: CreateMovieDto) {}    // récupère le corps de la requête
}

export class CreateMovieDto {
  @IsString() @MinLength(1)                 // règles de validation (class-validator)
  title!: string;
}
```

## Ce qu'il faut savoir

- Le `@` est suivi d'une **fonction** : `@Component(…)` appelle la fonction `Component` avec tes options.
- Les décorateurs se lisent **de haut en bas** mais s'appliquent de bas en haut quand il y en a plusieurs.
- Angular utilise de moins en moins de décorateurs sur les propriétés : `@Input()` est remplacé par `input()`, `@Output()` par `output()`.

## Pièges

- **Oublier les parenthèses** : `@Injectable` au lieu de `@Injectable()` → erreur.
- **Écrire tes propres décorateurs** pour de la logique métier : c'est rarement nécessaire et difficile à tester. Une simple fonction suffit presque toujours.
