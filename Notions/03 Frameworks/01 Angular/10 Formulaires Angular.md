---
type: notion
statut: a apprendre
resume: "Angular propose deux façons d'écrire un formulaire : template-driven (tout dans le HTML avec ngModel, pour un champ ou deux) et Reactive Forms (le formulaire est décrit en TypeScript, typé et testable)."
revu:
sources:
  - "https://angular.dev/guide/forms"
---
# Formulaires Angular

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Angular propose deux façons d'écrire un formulaire : **template-driven** (tout dans le HTML avec `ngModel`, pour un champ ou deux) et **Reactive Forms** (le formulaire est décrit en TypeScript, typé et testable).

## Le problème

**Pourquoi c'est utile ?**
Pour gérer saisie, validation et erreurs d'un formulaire de façon typée et testable.

**Qu'est-ce qui se passait sans ça ?**
On lisait chaque champ à la main et on écrivait la validation dans tous les sens, sans pouvoir la tester.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

En entreprise, c'est presque toujours Reactive Forms. Cas concret : le formulaire « ajouter une critique » de CinéTrack.

### Le choix

| | Template-driven | **Reactive Forms** |
|---|---|---|
| Défini dans | le HTML (`ngModel`) | le TypeScript (`FormGroup`) |
| Typage | faible | **fort** |
| Validation complexe | difficile | facile |
| Tests | difficiles | faciles |
| Pour | une barre de recherche | tout vrai formulaire |

### Les validateurs

| Validateur | Règle |
|---|---|
| `Validators.required` | obligatoire |
| `Validators.minLength(n)` / `maxLength(n)` | longueur |
| `Validators.min(n)` / `max(n)` | valeur |
| `Validators.email` | format e-mail |
| `Validators.pattern(/…/)` | forme imposée |

Un validateur personnalisé est une simple fonction :

```ts
const noSpaces: ValidatorFn = (c) => /\s/.test(c.value) ? { noSpaces: true } : null;
```

### Réagir aux changements d'un champ

```ts
this.form.controls.rating.valueChanges.subscribe(v => console.log('nouvelle note', v));
// ou en signal
rating = toSignal(this.form.controls.rating.valueChanges, { initialValue: 5 });
```

### Template-driven, pour les cas simples

```ts
imports: [FormsModule]
```
```html
<input type="search" [(ngModel)]="search" name="search">
```

> [!note] Signal Forms
> Angular prépare une nouvelle API de formulaires basée sur les signals. Vérifie son état dans la documentation de ta version ; Reactive Forms reste la référence dans le code existant.

## 🧪 Exemple

### Reactive Forms : le formulaire de critique

```ts
import { Component, inject, input, output } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  imports: [ReactiveFormsModule],
  templateUrl: './review-form.component.html',
})
export class ReviewFormComponent {
  movieId = input.required<number>();
  saved = output<Review>();

  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    rating: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
    comment: ['', [Validators.required, Validators.minLength(10)]],
    spoiler: [false],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();           // affiche les erreurs de tous les champs
      return;
    }
    const value = this.form.getRawValue();    // typé : { rating: number; comment: string; spoiler: boolean }
    this.saved.emit({ movieId: this.movieId(), ...value });
    this.form.reset();
  }
}
```

```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <label for="rating">Note (1 à 10)</label>
  <input id="rating" type="number" formControlName="rating">

  <label for="comment">Critique</label>
  <textarea id="comment" formControlName="comment"></textarea>
  @if (form.controls.comment.touched && form.controls.comment.errors; as e) {
    @if (e['required']) { <p class="error">La critique est obligatoire.</p> }
    @if (e['minlength']) { <p class="error">Au moins 10 caractères.</p> }
  }

  <label><input type="checkbox" formControlName="spoiler"> Contient des spoilers</label>

  <button type="submit">Publier</button>
</form>
```

`NonNullableFormBuilder` : après `reset()`, les champs reviennent à leur valeur de départ au lieu de `null`.

## ⚠️ Limites et pièges

- **Oublier `ReactiveFormsModule`** dans `imports` : `formGroup` inconnu.
- **Afficher les erreurs dès l'ouverture** : attends que le champ soit `touched`.
- **Oublier `markAllAsTouched()`** à l'envoi : l'utilisateur clique, rien ne se passe, aucune erreur visible.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Un formulaire de critique

Crée un formulaire réactif avec une note (obligatoire, entre 1 et 5) et un texte (obligatoire, 10 caractères minimum). Le bouton est désactivé tant que le formulaire est invalide.

> [!success]- Solution
> ```ts
> export class ReviewForm {
>   private fb = inject(NonNullableFormBuilder);
>
>   form = this.fb.group({
>     rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
>     content: ['', [Validators.required, Validators.minLength(10)]],
>   });
>
>   submit() {
>     if (this.form.invalid) return;
>     console.log(this.form.getRawValue());   // { rating: number, content: string }
>   }
> }
> ```
>
> ```html
> <form [formGroup]="form" (ngSubmit)="submit()">
>   <input type="number" formControlName="rating" />
>   <textarea formControlName="content"></textarea>
>   <button type="submit" [disabled]="form.invalid">Publier</button>
> </form>
> ```
>
> (`ReactiveFormsModule` à importer.)

#### Exercice 2 · Afficher une erreur

Affiche « 10 caractères minimum » sous le texte, seulement si l'utilisateur a quitté le champ et que la longueur est insuffisante.

> [!success]- Solution
> ```html
> @if (form.controls.content.touched && form.controls.content.hasError('minlength')) {
>   <p class="error">10 caractères minimum</p>
> }
> ```
>
> `touched` évite d'afficher l'erreur avant que l'utilisateur ait commencé.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Angular|Fondamentaux Angular]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://angular.dev/guide/forms
