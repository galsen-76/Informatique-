---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - outils/build
aliases:
  - "Outils de Build et Bundlers"
parent: "[[Outils]]"
children: []
related_theory:
  - "[[JS-09-Modules-ESM|Modules ES JavaScript]]"
  - "[[NODE-01-Node-npm|Node.js et npm]]"
  - "[[TG-01-Comment-fonctionne-un-programme|Comment fonctionne un programme]]"
related_snippets:
  - "[[04_Snippets/out-02-outillage-build-vite-bundlers]]"
related_projects: []
source: "https://vite.dev/guide/"
---

# Outils de Build et Bundlers

> [!abstract] Introduction
> Un bundler (Vite, esbuild, webpack, Rollup) transforme les sources (TS, SFC, SCSS, imports) en fichiers optimisés pour le navigateur ; Vite est l'outil de Vue et, via esbuild/Vite, d'Angular moderne.

> [!warning]- Prérequis
> [[JS-09-Modules-ESM|Modules ES JavaScript]]

---

## Théorie

> [!question]- C'est quoi ?
> Tâches d'un outil de build :
> - Transpiler TS → JS, SCSS → CSS, `.vue` → JS
> - Résoudre et **regrouper** les imports (bundling) en chunks
> - **Tree-shaking**, **minification**, hash dans les noms de fichiers (cache)
> - **Source maps** pour le débogage
> - Serveur de dev avec **HMR** (rechargement à chaud)

> [!example]- Analogie
> Le bundler est l'éditeur d'un livre : il rassemble les chapitres (modules), retire les passages inutiles (tree-shaking), compresse la mise en page (minification) et imprime une édition prête à vendre.

> [!question]- Pourquoi l'utiliser ?
> Comprendre les erreurs de build, les tailles de bundle, les variables d'environnement, le lazy loading et la configuration (`vite.config.ts`, `angular.json`).

> [!question]- Comment ça marche ?
> - Vite en dev : sert les modules ESM natifs + esbuild (ultra rapide) ; en prod : bundle optimisé (Rollup, puis Rolldown)
> - Angular CLI : builder `application` basé sur esbuild + serveur de dev Vite
> - Variables d'env : `import.meta.env.VITE_*` (Vite), fichiers `environment.ts` / `define` (Angular)
> - Analyse : `rollup-plugin-visualizer`, `ng build --stats-json`

> [!question]- Quand l'utiliser ?
> Configuration initiale, optimisation, ajout d'alias (`@/` → `src/`), proxy vers l'API en dev.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les variables d'env du front sont PUBLIQUES (intégrées au bundle) : jamais de secret.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Bundle | Fichier JS final regroupé |
| Chunk | Morceau de bundle chargé séparément |
| HMR | Remplacement de module à chaud |
| Minification | Réduction de la taille du code |
| Source map | Correspondance code compilé ↔ source |

---

## Points clés

- Vite = dev rapide + build optimisé
- Hash dans les noms → cache long terme
- Aucune clé secrète dans les variables du front
- Proxy de dev pour éviter les soucis CORS en local

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Mettre une clé API privée dans `VITE_…`
> - Importer une librairie entière (`lodash`) au lieu de la fonction utile

---

## Exemple minimal

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { proxy: { '/api': 'http://localhost:3000' } },   // plus de CORS en dev
});
```

> [!note] Ce que j'en retiens
> Le proxy fait croire au navigateur que l'API est sur la même origine en développement.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Stratégie de découpage (vendor chunks), budgets de taille dans la CI (`budgets` Angular)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Outils]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/out-02-outillage-build-vite-bundlers]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi les variables d'environnement front ne sont-elles jamais secrètes ?

---

## Tâches

- [ ] #task Configurer alias + proxy dans CinéTrack Vue et `proxy.conf.json` dans CinéTrack Angular
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
