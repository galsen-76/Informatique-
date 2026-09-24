---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M05
tags:
  - frameworks/angular/ssr
aliases:
  - "SSR et Hydratation Angular"
parent: "[[Angular]]"
children: []
related_theory:
  - "[[ANG-17-Deploiement-Build|Déploiement & Build Angular]]"
  - "[[ANG-15-Performance-Bonnes-Pratiques|Performance & Bonnes Pratiques Angular]]"
related_snippets:
  - "[[04_Snippets/ang-26-ssr-hydratation]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/ssr"
---

# SSR et Hydratation Angular

> [!abstract] Introduction
> Le Server-Side Rendering génère le HTML côté serveur pour un premier affichage rapide et un bon référencement ; l'hydratation réutilise ce HTML côté client au lieu de tout reconstruire.

> [!warning]- Prérequis
> [[ANG-17-Deploiement-Build|Déploiement & Build Angular]]

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> ng new mon-app --ssr        # ou : ng add @angular/ssr
> ```
> Modes de rendu par route (`app.routes.server.ts`) : `RenderMode.Prerender` (SSG au build), `RenderMode.Server` (SSR à chaque requête), `RenderMode.Client` (CSR classique).
> L'hydratation : `provideClientHydration()` ; incrémentale avec `withIncrementalHydration()` et les blocs `@defer (hydrate on viewport)`.

> [!example]- Analogie
> CSR : on livre un meuble en kit, le client monte tout lui-même (écran blanc pendant le montage). SSR : on livre le meuble monté ; l'hydratation, c'est brancher l'électricité sur un meuble déjà en place plutôt que le démonter/remonter.

> [!question]- Pourquoi l'utiliser ?
> SEO (contenu lisible par les robots), aperçus de liens (Open Graph), meilleur LCP (premier affichage), utile sur mobile lent.

> [!question]- Comment ça marche ?
> 1. Le serveur Node (Express) exécute l'app Angular et renvoie du HTML complet
> 2. Le navigateur affiche le HTML immédiatement
> 3. Le JS se charge, Angular « hydrate » : attache les événements au DOM existant
> 4. `TransferState` / cache HTTP évite de refaire côté client les requêtes déjà faites côté serveur (automatique avec HttpClient + hydratation)

> [!question]- Quand l'utiliser ?
> Sites publics avec enjeu SEO/perf (catalogue, médias, e-commerce). Pas utile pour un back-office derrière authentification.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pas de `window`, `document`, `localStorage` côté serveur → protéger avec `afterNextRender` ou `isPlatformBrowser`. Nécessite un serveur Node (sauf prerender) et complexifie le déploiement.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| CSR | Rendu côté client |
| SSR | Rendu côté serveur à chaque requête |
| SSG / Prerender | HTML généré au build |
| Hydratation | Réutilisation du DOM serveur par le client |
| LCP | Largest Contentful Paint, métrique de premier affichage |

---

## Points clés

- `@angular/ssr` (ex-Angular Universal)
- Choisir le mode de rendu par route
- Protéger le code navigateur-only
- Mismatch serveur/client = erreurs d'hydratation

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Accéder à `localStorage` dans un constructor → crash du serveur
> - Manipuler le DOM directement → erreur d'hydratation (NG0500)
> - Afficher `new Date()` ou du random → contenu différent serveur/client

---

## Exemple minimal

```typescript
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'films/:id', renderMode: RenderMode.Server },
  { path: 'compte/**', renderMode: RenderMode.Client },
];
```

> [!note] Ce que j'en retiens
> Chaque page choisit sa stratégie : accueil statique, fiche film SEO, espace compte côté client.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Mesurer les Core Web Vitals avant/après SSR
> - Configurer le cache CDN des pages prerender

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[VUE-18-Nuxt-SSR|Nuxt et SSR Vue.js]]

**Pratique :**
- Extrait de code → [[04_Snippets/ang-26-ssr-hydratation]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `localStorage` plante-t-il en SSR ?

> [!faq]- Questions d'entretien
> - Différence entre SSR, SSG et CSR ?

---

## Tâches

- [ ] #task Créer un projet `--ssr` et observer le HTML source reçu (Ctrl+U)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
