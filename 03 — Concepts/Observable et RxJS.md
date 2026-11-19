---
type: concept
domain: frontend
module: "[[Module 20 - Angular]]"
status: a-decouvrir
level: avance
niveau: 4
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Asynchrone et Promesse]]"
  - "[[Service et injection de dépendances]]"
parents:
  - "[[Angular]]"
related:
  - "[[async et await]]"
next_review: 
method: []
tags:
  - concept
  - frontend
---
# Observable et RxJS

> [!info] En une phrase
> Un Observable est un flux de valeurs dans le temps (réponses HTTP, saisies, minuteries) ; RxJS fournit les opérateurs pour le transformer, et Angular l'utilise partout.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Une [[Asynchrone et Promesse|Promesse]] donne **une** valeur, une fois. Un **Observable** peut en donner **plusieurs**, et ne démarre que quand on s'y **abonne** (`subscribe`).
```ts
this.http.get<Tache[]>("/api/taches")          // Observable<Tache[]>, rien n'est envoyé encore
  .pipe(
    map((ts) => ts.filter((t) => !t.fini)),
    catchError(() => of([])),                  // valeur de secours en cas d'erreur
  )
  .subscribe((ts) => this.taches = ts);        // maintenant la requête part
```
Opérateurs courants : `map`, `filter`, `tap` (effet de bord), `catchError`, `debounceTime` (attendre une pause), `distinctUntilChanged`, `switchMap` (annuler la requête précédente et lancer la nouvelle), `combineLatest`.
Dans un template, le pipe **`async`** s'abonne et se désabonne tout seul : `@for (t of taches$ | async; track t.id)`. Convention : un nom qui finit par `$` est un Observable.
Depuis Angular 16, les **signals** remplacent RxJS pour l'état simple (`toSignal(observable)` fait le pont).

### Pourquoi ça existe
Une interface reçoit des flux d'événements (frappes, réponses, notifications) qu'il faut combiner, filtrer et annuler.

### Le problème résolu
Exprimer simplement des comportements difficiles : recherche pendant la frappe sans surcharger le serveur, annulation des requêtes périmées.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
S[Saisie] --> D[debounceTime]
  D --> U[distinctUntilChanged]
  U --> W[switchMap requête]
  W --> A[Affichage]
```

### Exemple concret
```ts
recherche = new FormControl("");
resultats$ = this.recherche.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((q) => this.http.get<Tache[]>(`/api/taches?q=${encodeURIComponent(q ?? "")}`)),
);
```
```html
<input [formControl]="recherche" />
@for (t of resultats$ | async; track t.id) { <li>{{ t.nom }}</li> }
```

### Cas d'utilisation
- Toute requête HTTP dans Angular
- Recherche pendant la saisie
- Flux temps réel (WebSocket)

> [!warning] À ne pas confondre
> Oublier le `subscribe` (ou le pipe `async`) : **aucune requête n'est envoyée**. Et s'abonner à la main sans se désabonner crée des fuites de mémoire (`takeUntilDestroyed()` ou le pipe `async` règlent ça).

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine `this.service.lister().subscribe(...)` comme un tuyau dans le temps : l'abonnement, la valeur qui arrive, la fin du flux.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   G[http.get] --> R[Requête envoyée]
>   R --> S[subscribe après]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Observable et RxJS » et je l'intègre ici avec `![[Schéma - Observable et RxJS.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[MesDépenses 10 - Angular, afficher la liste]]
- [[MesDépenses 11 - Angular, ajouter et supprimer]]

## 4 · Relier
- **Prérequis** : [[Asynchrone et Promesse]] · [[Service et injection de dépendances]]
- **Complémentaires** : [[async et await]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
