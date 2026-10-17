---
type: notion
statut: a apprendre
resume: "i18n (internationalisation) : proposer l'application en plusieurs langues et formater dates et nombres selon le pays. a11y (accessibilité) : la rendre utilisable par tous, au clavier et avec un lecteur d'écran."
revu:
sources:
  - "https://angular.dev/guide/i18n"
---
# Internationalisation et accessibilité Angular

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : **i18n** (*internationalisation*) : proposer l'application en plusieurs langues et formater dates et nombres selon le pays. **a11y** (*accessibilité*) : la rendre utilisable par tous, au clavier et avec un lecteur d'écran.

## Le problème

**Pourquoi c'est utile ?**
Pour proposer l'application en plusieurs langues et la rendre utilisable par tous.

**Qu'est-ce qui se passait sans ça ?**
Les textes étaient écrits en dur, et l'application était inutilisable au clavier ou au lecteur d'écran.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Deux sujets souvent exigés en entreprise, surtout pour des applications publiques.

### Formater selon la langue : les pipes

```ts
// app.config.ts
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }]
```

```html
{{ movie().releaseDate | date: 'longDate' }}   <!-- 15 septembre 2021 -->
{{ budget | currency: 'EUR' }}                  <!-- 165 000 000,00 € -->
{{ rating | number: '1.1-1' }}                  <!-- 7,8 -->
```

### Accessibilité : ce qu'Angular t'aide à faire

Les règles générales sont dans [[08 Accessibilité web|Accessibilité web]]. Spécifique à Angular :

| Besoin | Outil |
|---|---|
| Attributs ARIA dynamiques | `[attr.aria-expanded]="open()"` |
| Annoncer un changement (« 20 films chargés ») | `LiveAnnouncer` du CDK |
| Garder le focus dans une modale | `cdkTrapFocus` du CDK |
| Titre de page à chaque route | `title` dans les routes |
| Composants accessibles tout faits | PrimeNG, Angular Material, Angular Aria |
| Vérifier | Lighthouse, extension axe DevTools, `eslint-plugin` template accessibility |

```ts
private announcer = inject(LiveAnnouncer);
this.announcer.announce(`${count} films trouvés`);
```

## 🧪 Exemple

### Traduire l'application

Deux approches :

| | `@angular/localize` (officiel) | **Transloco** / ngx-translate |
|---|---|---|
| Principe | textes marqués `i18n` dans le HTML, **un build par langue** | fichiers JSON de traductions, **changement de langue en direct** |
| Idéal pour | sites publics, performance | applications métier, choix de langue par l'utilisateur |

```html
<!-- @angular/localize -->
<h1 i18n>Films populaires</h1>

<!-- Transloco -->
<h1>{{ 'movies.popular' | transloco }}</h1>
```

Pour CinéTrack, le français seul suffit. Retiens surtout : **pas de texte écrit en dur dans le TypeScript** si l'application doit être traduite un jour.

## ⚠️ Limites et pièges

- **Un `div (click)`** : pas de clavier ni de lecteur d'écran. Utilise `<button>`.
- **Changer de page sans déplacer le focus ni changer le titre** : l'utilisateur du lecteur d'écran ne sait pas que la page a changé.
- **Concaténer des traductions** (`'Bonjour ' + nom`) : l'ordre des mots change selon les langues. Utilise des paramètres (`Bonjour {{name}}`).

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Formater en français

Affiche la date de sortie `2021-09-15` au format « 15 sept. 2021 », la note `7.8123` avec une décimale, et un prix en euros. Que faut-il configurer pour le français ?

> [!success]- Solution
> ```ts
> // app.config.ts
> import { registerLocaleData } from '@angular/common';
> import localeFr from '@angular/common/locales/fr';
> registerLocaleData(localeFr);
>
> providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }]
> ```
>
> ```html
> {{ movie.releaseDate | date: 'mediumDate' }}   <!-- 15 sept. 2021 -->
> {{ movie.rating | number: '1.1-1' }}           <!-- 7,8 -->
> {{ 12.5 | currency: 'EUR' }}                   <!-- 12,50 € -->
> ```

#### Exercice 2 · Un bouton-icône accessible

Rends ce bouton favori accessible : nom lu par le lecteur d'écran, état (appuyé ou non) annoncé.

```html
<button (click)="toggle()"><i class="pi pi-heart"></i></button>
```

> [!success]- Solution
> ```html
> <button
>   type="button"
>   (click)="toggle()"
>   [attr.aria-label]="'Ajouter ' + movie().title + ' aux favoris'"
>   [attr.aria-pressed]="isFavorite()">
>   <i class="pi pi-heart" aria-hidden="true"></i>
> </button>
> ```

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Angular|Fondamentaux Angular]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://angular.dev/guide/i18n
