---
type: notion
statut: en cours
resume: "Ton navigateur ne comprend ni le TypeScript, ni les fichiers .vue, ni le SCSS."
revu:
sources:
  - "https://vite.dev/guide/"
---
# Outils de build Vite et bundlers

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Ton navigateur ne comprend ni le TypeScript, ni les fichiers `.vue`, ni le SCSS.

## Le problème

**Pourquoi c'est utile ?**
Pour transformer TypeScript, .vue et SCSS en fichiers que le navigateur comprend, et les optimiser.

**Qu'est-ce qui se passait sans ça ?**
On chargeait des dizaines de fichiers séparés, non optimisés, dans le bon ordre à la main.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Un **outil de build** (Vite pour Vue, le builder d'Angular CLI) **transforme** tes sources en fichiers que le navigateur sait lire, et les **optimise** pour la production. Pendant le développement, il rafraîchit la page instantanément à chaque sauvegarde.

### Ce qu'il fait

```mermaid
flowchart LR
  S["Tes sources<br/>.ts .vue .scss<br/>imports"] --> B["Vite / Angular CLI"]
  B --> D["npm run dev<br/>serveur local,<br/>rechargement instantané"]
  B --> P["npm run build<br/>dist/ : .js .css .html<br/>minifiés, découpés"]
```

| Étape | En clair |
|---|---|
| **Transpiler** | TypeScript → JavaScript, `.vue` → JavaScript |
| **Regrouper** (*bundle*) | des centaines de fichiers → quelques fichiers |
| **Supprimer le code inutile** (*tree-shaking*) | ce qui n'est jamais importé disparaît |
| **Minifier** | retirer espaces et raccourcir les noms → fichiers plus légers |
| **Découper** (*code splitting*) | un fichier par page chargée à la demande |
| **Nommer avec une empreinte** | `main-4f3a2b.js` : le navigateur recharge seulement ce qui a changé |

### Angular CLI

```bash
ng serve          # développement : http://localhost:4200
ng build          # production → dist/
```

La configuration est dans `angular.json`. Angular utilise esbuild et Vite en interne : tu n'as rien à régler pour commencer.

### Pourquoi c'est rapide aujourd'hui

Les anciens outils (webpack) reconstruisaient tout le projet à chaque modification. Vite, en développement, envoie les fichiers **au fur et à mesure** au navigateur et utilise **esbuild** (écrit en Go, très rapide) : démarrage en une seconde.

## 🧪 Exemple

### Vite (Vue)

```bash
npm run dev       # serveur de développement : http://localhost:5173
npm run build     # production → dist/
npm run preview   # tester la version de production en local
```

```ts
// vite.config.ts
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: {
    proxy: { '/api': 'http://localhost:3000' },   // appelle ton API sans problème de CORS en dev
  },
});
```

Les variables d'environnement : fichiers `.env`, `.env.production`, lues avec `import.meta.env.VITE_…` (et visibles par tous dans le navigateur).

## ⚠️ Limites et pièges

- **Tester seulement avec `npm run dev`** : certains problèmes n'apparaissent qu'au build de production. Lance `npm run build` avant de pousser.
- **Un bundle énorme** : regarde quelles librairies pèsent le plus (`npx vite-bundle-visualizer`).
- **Un secret dans une variable `VITE_`** : il finit dans le JavaScript public.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Modules ES JavaScript]], [[npm]], [[Compilé vs interprété]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://vite.dev/guide/
