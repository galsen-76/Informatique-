---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M04
tags:
  - frameworks/angular/pipes
aliases:
  - "Pipes Angular"
parent: "[[Angular]]"
children: []
related_theory:
  - "[[ANG-03-Templates-Data-Binding|Templates & Data Binding Angular]]"
related_snippets:
  - "[[04_Snippets/ang-20-pipes]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/templates/pipes"
---

# Pipes Angular

> [!abstract] Introduction
> Un pipe transforme une valeur pour l'affichage directement dans le template (`{{ prix | currency:'EUR' }}`) ; Angular en fournit (date, currency, async…) et on peut créer les siens.

> [!warning]- Prérequis
> [[ANG-03-Templates-Data-Binding|Templates & Data Binding Angular]]

---

## Théorie

> [!question]- C'est quoi ?
> ```html
> {{ film.sortie | date:'longDate' }}
> {{ film.budget | currency:'EUR':'symbol':'1.0-0' }}
> {{ film.titre | uppercase }}
> {{ films$ | async }}
> ```

> [!example]- Analogie
> Un pipe est un filtre photo : l'image d'origine (la donnée) ne change pas, seul son rendu à l'écran est transformé.

> [!question]- Pourquoi l'utiliser ?
> Garder la logique de formatage hors du composant, réutilisable partout, et performante (un pipe pur n'est recalculé que si son entrée change).

> [!question]- Comment ça marche ?
> ```typescript
> @Pipe({ name: 'duree' })
> export class DureePipe implements PipeTransform {
>   transform(minutes: number): string {
>     const h = Math.floor(minutes / 60), m = minutes % 60;
>     return h ? `${h} h ${m.toString().padStart(2, '0')}` : `${m} min`;
>   }
> }
> ```
> Importer le pipe dans `imports: [DureePipe]` du composant standalone, puis `{{ film.duree | duree }}`.
> - **Pur** (défaut) : recalculé seulement si la référence d'entrée change
> - **Impur** (`pure: false`) : recalculé à chaque détection → coûteux
> - `async` : s'abonne/désabonne automatiquement à un Observable/Promise

> [!question]- Quand l'utiliser ?
> Formatage d'affichage (dates, montants, durées, troncature). Pour une logique dépendant de plusieurs données, préférer un `computed()`.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Appeler une méthode dans le template (`{{ formater(x) }}`) est réexécuté à chaque détection : un pipe pur ou un computed est préférable.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Pipe pur | Recalculé uniquement quand l'entrée change |
| Pipe impur | Recalculé à chaque détection de changement |
| `async` pipe | Gère l'abonnement à un Observable dans le template |

---

## Points clés

- Pipes intégrés : date, currency, number, percent, uppercase, json, async, keyvalue
- Locale française : `provide(LOCALE_ID, 'fr-FR')` + `registerLocaleData`
- Pur par défaut, garder pur
- `async` évite les fuites d'abonnement

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Pipe impur pour filtrer une liste → très lent
> - Oublier d'importer le pipe dans le composant standalone
> - Muter le tableau en entrée d'un pipe pur → pas de recalcul

---

## Exemple minimal

```html
@if (film$ | async; as film) {
  <h2>{{ film.titre }}</h2>
  <p>{{ film.duree | duree }} · {{ film.sortie | date:'yyyy' }}</p>
}
```

> [!note] Ce que j'en retiens
> `async` + `as` : abonnement, désabonnement et variable locale en une ligne.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Préférer `toSignal()` à `async` dans du code 100 % signals
> - Tester un pipe comme une fonction pure

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[VUE-06-Computed-Watchers|Computed & Watchers Vue.js]]

**Pratique :**
- Extrait de code → [[04_Snippets/ang-20-pipes]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un pipe pur ne se met-il pas à jour si je fais `films.push()` ?

---

## Tâches

- [ ] #task Créer les pipes `duree` et `tronquer` pour CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
