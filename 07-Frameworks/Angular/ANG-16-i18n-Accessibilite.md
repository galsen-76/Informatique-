---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
aliases:
  - "Internationalisation & Accessibilité Angular"
tags:
  - frameworks/angular/i18n-a11y
parent: "[[Angular]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/i18n"
---

# Internationalisation & Accessibilité Angular

> [!abstract] En bref
> **i18n** (*internationalisation*) : proposer l'application en plusieurs langues et formater dates et nombres selon le pays. **a11y** (*accessibilité*) : la rendre utilisable par tous, au clavier et avec un lecteur d'écran. Deux sujets souvent exigés en entreprise, surtout pour des applications publiques.

## Formater selon la langue : les pipes

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

## Traduire l'application

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

## Accessibilité : ce qu'Angular t'aide à faire

Les règles générales sont dans [[HTML-03-Accessibilite-Web|Accessibilité web]]. Spécifique à Angular :

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

## Pièges

- **Un `div (click)`** : pas de clavier ni de lecteur d'écran. Utilise `<button>`.
- **Changer de page sans déplacer le focus ni changer le titre** : l'utilisateur du lecteur d'écran ne sait pas que la page a changé.
- **Concaténer des traductions** (`'Bonjour ' + nom`) : l'ordre des mots change selon les langues. Utilise des paramètres (`Bonjour {{name}}`).
