---
created: 2026-09-26
modified: 2026-09-26
type: project
status: "🔴 Not Started"
tags:
  - projet
aliases:
  - "Lab TypeScript"
---

# 🧪 Lab TypeScript

> [!abstract] Objectif
> Devenir solide en **JavaScript puis TypeScript sans framework**, pour comprendre ce qu'Angular et Vue font à ta place. Le HTML/CSS n'est pas l'objectif : il est généré par l'IA (ou minimal), tout l'effort va au code TS, aux types et aux tests.

**Période :** M01 → M03 de la [[Roadmap-12-mois|Roadmap 12 mois]]  
**Stack :** TypeScript strict, Vite (template `vanilla-ts`), Vitest, ESLint/Prettier, DOM natif, `fetch`

> [!info] Pourquoi pas un portfolio HTML/CSS ?
> Le portfolio sera fait plus tard **en Angular ou en Vue avec une librairie UI** (voir [[02_Projects/Capstone|Capstone]]) : il montrera alors tes vraies compétences. Ici on muscle le langage.

---

## Jalons

### M01 — JavaScript et DOM
- [ ] #task `npm create vite@latest lab-ts -- --template vanilla-ts`, dépôt GitLab, commits conventionnels
- [ ] #task Page « Films » (HTML/CSS générés par l'IA) : sélectionner les éléments avec `querySelector` typé ([[JS-14-Selectionner-Elements-DOM|Sélectionner des éléments du DOM]])
- [ ] #task Afficher une liste de films depuis un tableau en créant les éléments à la main ([[JS-15-Manipuler-le-DOM|Manipuler le DOM]])
- [ ] #task Filtre par texte + délégation d'événements (un seul écouteur sur la liste)
- [ ] #task Bouton favori avec `data-*` et `aria-pressed`

### M02 — JavaScript avancé
- [ ] #task Module `utils.ts` codé de tête : `debounce`, `throttle`, `once`, `memoize`, `groupBy`
- [ ] #task Recherche via une API publique (TMDB/OMDb) : `fetch`, `AbortController`, états chargement / vide / erreur
- [ ] #task Favoris et thème persistés dans `localStorage` (lecture sûre avec valeur par défaut)
- [ ] #task Mini `EventEmitter` (pattern Observer) utilisé pour notifier la liste quand un favori change
- [ ] #task 3 exercices d'ordre d'exécution (event loop) écrits sous forme de tests

### M03 — TypeScript strict
- [ ] #task `strict: true`, zéro `any`, ESLint `no-explicit-any`
- [ ] #task Modèle `Film` + état de chargement en union discriminée (`idle | loading | success | error`) avec vérification d'exhaustivité
- [ ] #task Classe générique `Depot<T extends { id: number }>` (ajouter, trouver, supprimer) + tests
- [ ] #task Validation de la réponse d'API avec Zod (`z.infer` pour le type)
- [ ] #task 20+ tests Vitest (utils, dépôt, validation)
- [ ] #task README : ce que j'ai appris, ce que les frameworks feront à ma place

---

## Notes à mobiliser

- [[JS-14-Selectionner-Elements-DOM|Sélectionner des éléments du DOM]] · [[JS-15-Manipuler-le-DOM|Manipuler le DOM]] · [[JS-08-DOM-Evenements|DOM et événements]]
- [[JS-03-Fonctions-Scope-Closures|Closures]] · [[JS-06-Event-Loop|Event loop]] · [[JS-07-Promises-Async-Await|Promises]] · [[JS-10-Fetch-JSON-HTTP|Fetch]]
- [[TypeScript]] (TS-01 → TS-19), en particulier [[TS-06-Generics|Generics]], [[TS-09-Type-Narrowing|Narrowing]], [[TS-18-Patterns-TypeScript-Pro|Patterns pro]], [[TS-19-Validation-Runtime-Zod|Zod]]
- [[TEST-02-Tests-Unitaires-Vitest-Jest|Tests unitaires Vitest]]

---

## Définition de « terminé »

- Code sur GitLab, pipeline de lint + tests vert
- Aucun `any`, aucune erreur TypeScript
- Je sais expliquer chaque fichier sans l'avoir sous les yeux

---

## Journal

- 2026-09-26 : projet créé (remplace le portfolio HTML/CSS)

## Notes libres

- ?
