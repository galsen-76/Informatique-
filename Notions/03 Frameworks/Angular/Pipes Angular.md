---
type: notion
statut: a apprendre
resume: "Un pipe transforme une valeur pour l'affichage, directement dans le template : {{ date | date:'longDate' }} affiche « 15 septembre 2021 »."
revu:
sources:
  - "https://angular.dev/guide/templates/pipes"
---
# Pipes Angular

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un **pipe** transforme une valeur **pour l'affichage**, directement dans le template : `{{ date | date:'longDate' }}` affiche « 15 septembre 2021 ».

## Le problème

**Pourquoi c'est utile ?**
Pour formater une valeur à l'affichage (date, prix, texte) directement dans le template.

**Qu'est-ce qui se passait sans ça ?**
Le même code de formatage était recopié dans chaque composant.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Angular en fournit plusieurs, et tu peux créer les tiens pour un formatage que tu répètes.

### Les pipes fournis

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

Pour afficher en français : voir la configuration `LOCALE_ID` dans [[Internationalisation et accessibilité Angular|i18n]].

On peut les enchaîner : `{{ title | slice:0:20 | uppercase }}`.

### Pourquoi un pipe plutôt qu'une méthode ?

Un pipe est **pur** par défaut : Angular ne le recalcule que si sa valeur d'entrée change. Une méthode `{{ formatDuration(m) }}` est rappelée à **chaque** vérification de l'écran.

| Besoin | Outil |
|---|---|
| formater une valeur réutilisée dans plusieurs templates | pipe |
| calcul propre à un composant | `computed` |

## 🧪 Exemple

### Créer ton pipe

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

## ⚠️ Limites et pièges

- **Oublier d'importer le pipe** dans le composant : « The pipe 'duration' could not be found ».
- **Mettre de la logique métier dans un pipe** (filtrer une liste, appeler une API) : un pipe **formate**, c'est tout.
- **`async` plusieurs fois sur le même Observable HTTP** : autant de requêtes. Préfère `toSignal` dans la classe.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Un pipe « durée »

Écris un pipe `runtime` qui transforme `155` (minutes) en `2 h 35`, et `45` en `45 min`.

> [!success]- Solution
> ```ts
> @Pipe({ name: 'runtime' })
> export class RuntimePipe implements PipeTransform {
>   transform(minutes: number | null | undefined): string {
>     if (!minutes) return '';
>     const h = Math.floor(minutes / 60);
>     const m = minutes % 60;
>     return h ? `${h} h ${String(m).padStart(2, '0')}` : `${m} min`;
>   }
> }
> ```
>
> ```html
> {{ movie.runtime | runtime }}
> ```

#### Exercice 2 · Pipe ou méthode ?

Pourquoi `{{ movie.runtime | runtime }}` est-il préférable à `{{ formatRuntime(movie.runtime) }}` ?

> [!success]- Solution
> Un pipe **pur** (le cas par défaut) n'est recalculé que si sa valeur d'entrée change. Une méthode dans le template est rappelée **à chaque vérification** du composant.
>
> Le pipe est aussi réutilisable partout et testable seul.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Angular]]
- **Voir aussi :** [[Templates et data binding Angular]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://angular.dev/guide/templates/pipes
