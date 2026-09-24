---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M04
aliases:
  - "Programmation Réactive (RxJS) Angular"
tags:
  - frameworks/angular/rxjs
parent: "[[Angular]]"
children:
  - "[[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]]"
  - "[[ANG-10-Signals|Signals Angular]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-rxjs-basique]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/rxjs"
---

# Programmation Réactive (RxJS) Angular

> [!abstract] Introduction
> RxJS manipule des flux de valeurs arrivant dans le temps (clics, réponses serveur), en les combinant comme un tableau classique.

> [!warning]- Prérequis
> [[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]].

---

## Théorie

> [!question]- C'est quoi ?
> Un `Observable` représente un flux ; on s'y abonne avec `.subscribe()` pour recevoir ses valeurs.

> [!example]- Analogie
> Un `Observable` est un abonnement à une newsletter : tu t'inscris (`subscribe`) et reçois les nouvelles éditions au fil du temps, sans avoir à revérifier ta boîte mail toi-même.

> [!question]- Pourquoi l'utiliser ?
> Gérer des événements asynchrones combinés (attendre un délai, annuler la requête précédente) sans des dizaines de `setTimeout` manuels.

> [!question]- Comment ça marche ?
> ```typescript
> recherche$.pipe(
>   debounceTime(300),
>   switchMap(texte => this.http.get(`/api/films?q=${texte}`))
> ).subscribe(resultats => console.log(resultats));
> ```

> [!question]- Quand l'utiliser ?
> Requêtes HTTP, événements combinés dans le temps, formulaires réactifs. Pour du simple état local sans notion de temps, [[ANG-10-Signals|Signals Angular]] est souvent préféré aujourd'hui.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Oublier de se désabonner crée une fuite de mémoire — le composant peut disparaître mais l'abonnement continue de tourner en arrière-plan.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Observable | Objet représentant un flux de valeurs dans le temps |
| Opérateur | Fonction transformant un flux via `.pipe()` |
| `switchMap` | Annule le flux précédent si un nouveau démarre |

---

## Points clés

- `.subscribe()` déclenche la réception des valeurs
- `.pipe()` enchaîne des opérateurs de transformation
- Toujours se désabonner (ou utiliser l'`async pipe`)
- `debounceTime`, `switchMap`, `catchError` sont les opérateurs les plus courants

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier de se désabonner, créant une fuite de mémoire
> - Utiliser `mergeMap` là où `switchMap` était nécessaire (garder d'anciennes requêtes obsolètes)
> - Confondre `Observable` (flux) et `Promise` (valeur unique différée)

---

## Paramètres / Configuration

| Opérateur | Description |
|-----------|-------------|
| `map` | Transforme chaque valeur |
| `filter` | Garde certaines valeurs |
| `debounceTime(ms)` | Attend un délai de silence |
| `switchMap` | Annule le flux précédent |
| `catchError` | Intercepte une erreur |

---

## Exemple minimal

```typescript
this.recherche.valueChanges.pipe(
  debounceTime(300),
  switchMap(texte => this.http.get(`/api/films?q=${texte}`))
).subscribe(resultats => console.log(resultats));
```

> [!note] Ce que j'en retiens
> `debounceTime` attend que l'utilisateur arrête de taper, `switchMap` annule automatiquement la requête précédente si une nouvelle démarre.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Désabonnement moderne : `takeUntilDestroyed()`, `async` pipe ou `toSignal()`
> - Voir [[ANG-24-RxJS-Avance|RxJS Avancé]] pour Subjects, opérateurs d'aplatissement et partage

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → [[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]], [[ANG-10-Signals|Signals Angular]]
- À comparer avec → [[ANG-10-Signals|Signals Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-rxjs-basique]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi ne PAS se désabonner cause une fuite de mémoire, sans dire "Observable" ?

> [!faq]- Questions d'entretien
> - Qu'est-ce qu'un Observable ? Différence avec une Promise ?

---

## Tâches

- [ ] #task Implémenter une recherche avec `debounceTime` + `switchMap`
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Dans quels cas choisir `mergeMap` ou `concatMap` plutôt que `switchMap` ?
