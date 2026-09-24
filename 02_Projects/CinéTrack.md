---
created: 2026-09-24
modified: 2026-09-24
type: project
status: "🔴 Not Started"
tags:
  - projet
aliases:
  - "CinéTrack"
---

# 🎬 CinéTrack

> [!abstract] Objectif
> Application Angular de suivi de films : recherche, fiche détaillée, favoris, notes et critiques. C'est le fil rouge qui sert d'exemple dans la plupart des notes.

**Période :** M04 → M05 de la [[Roadmap-12-mois|Roadmap 12 mois]]  
**Stack :** Angular (standalone, signals, contrôle de flux), RxJS, HttpClient, Reactive Forms, Vitest, Angular Material/CDK

---

## Jalons

### M04
- [ ] #task `ng new` + structure par features
- [ ] #task Recherche de films (API publique TMDB/OMDb) avec debounceTime + switchMap
- [ ] #task Page détail avec paramètre de route
- [ ] #task Favoris (service + signals, persistés en localStorage)
- [ ] #task Formulaire réactif « ajouter une critique » avec validation
- [ ] #task Pipes `duree` et `tronquer`

### M05
- [ ] #task OnPush partout, store signals (ou Signal Store)
- [ ] #task Lazy loading des features + `@defer` sur les blocs lourds
- [ ] #task Intercepteurs (erreurs globales, puis token en M09)
- [ ] #task 20+ tests (services, pipes, composants)
- [ ] #task Accessibilité : navigation clavier, contrastes, `aria-live`
- [ ] #task Audit Lighthouse et optimisation

---

## Notes à mobiliser

- [[ANG-01-Fondamentaux|Fondamentaux Angular]]
- [[ANG-10-Signals|Signals Angular]]
- [[ANG-24-RxJS-Avance|RxJS Avancé]]
- [[ANG-28-Architecture-Projet-Angular|Architecture d'un Projet Angular]]
- [[ANG-14-Tests|Tests Angular]]

---

## Définition de « terminé »

- Code sur GitLab, MR relues (par toi-même au minimum), pipeline vert
- README : objectif, captures, démarrage en 5 minutes, choix techniques
- Tests sur la logique importante
- Accessible et responsive (pour les fronts)

---

## Journal

- 2026-09-24 : projet créé

## Notes libres

- ?
