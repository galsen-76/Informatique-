---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M04
tags:
  - frameworks/angular/pipes
aliases:
  - "Pipes Angular"
parent: "[[Angular]]"
related_theory:
  - "[[ANG-03-Templates-Data-Binding|Templates & Data Binding Angular]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/templates/pipes"
---

# Pipes Angular

> [!abstract] En bref
> Un **pipe** transforme une valeur **pour l'affichage**, directement dans le template : `{{ date | date:'longDate' }}` affiche « 15 septembre 2021 ». Angular en fournit plusieurs, et tu peux créer les tiens pour un formatage que tu répètes.

## Les pipes fournis

| Pipe | Exemple | Affiche |
|---|---|---|
| `date` | `{{ releaseDate \| date:'longDate' }}` | 15 septembre 2021 |
| `currency` | `{{ budget \| currency:'EUR' }}` | 165 000 000,00 € |
| `number` | `{{ 7.834 \| number:'1.1-1' }}` | 7,8 |
| `percent` | `{{ 0.42 \| percent }}` | 42 % |
| `uppercase` / `lowercase` / `titlecase` | `{{ 'dune' \| titlecase }}` | Dune |
| `slice` | `{{ overview \| slice:0:120 }}` | les 120 premiers caractères |
| `json` | `{{ movie \| json }}` | l'objet en texte (pour déboguer) |
| `async` | `{{ movies$ \| async }}` | la dernière valeur d'un Observable |
| `keyvalue` | `@for (e of obj \| keyvalue; …)` | parcourir un objet |

Pour afficher en français : voir la configuration `LOCALE_ID` dans [[ANG-16-i18n-Accessibilite|i18n]].

On peut les enchaîner : `{{ title | slice:0:20 | uppercase }}`.

## Créer ton pipe

Durée d'un film (en minutes) affichée en « 2 h 28 » :

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  transform(minutes: number | null | undefined): string {
    if (!minutes) return '—';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h ? `${h} h ${m.toString().padStart(2, '0')}` : `${m} min`;
  }
}
```

```ts
@Component({ imports: [DurationPipe], template: `{{ movie().runtime | duration }}` })
```

## Pourquoi un pipe plutôt qu'une méthode ?

Un pipe est **pur** par défaut : Angular ne le recalcule que si sa valeur d'entrée change. Une méthode `{{ formatDuration(m) }}` est rappelée à **chaque** vérification de l'écran.

| Besoin | Outil |
|---|---|
| formater une valeur réutilisée dans plusieurs templates | pipe |
| calcul propre à un composant | `computed` |

## Pièges

- **Oublier d'importer le pipe** dans le composant : « The pipe 'duration' could not be found ».
- **Mettre de la logique métier dans un pipe** (filtrer une liste, appeler une API) : un pipe **formate**, c'est tout.
- **`async` plusieurs fois sur le même Observable HTTP** : autant de requêtes. Préfère `toSignal` dans la classe.
