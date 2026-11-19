---
type: concept
domain: typescript
module: "[[Module 06 - TypeScript]]"
status: a-decouvrir
level: debutant
niveau: 6
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[TypeScript]]"
  - "[[Gestionnaire de paquets]]"
parents:
  - "[[TypeScript]]"
related:
  - "[[Pipeline GitLab CI]]"
next_review: 
tags:
  - concept
  - typescript
---
# Compilation TypeScript (tsc et tsconfig)

> [!info] En une phrase
> tsc est le compilateur TypeScript : il lit tsconfig.json, vérifie les types de tout le projet et produit les fichiers JavaScript.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
- **`tsc`** : vérifie et compile. `tsc --noEmit` vérifie seulement.
- **`tsconfig.json`** : la configuration du projet.
```json
{
  "compilerOptions": {
    "target": "ES2022",        // version de JS produite
    "module": "ESNext",
    "strict": true,            // toutes les vérifications : à garder !
    "outDir": "dist",          // où écrire les .js
    "rootDir": "src",
    "sourceMap": true          // pour déboguer le .ts dans le navigateur
  },
  "include": ["src"]
}
```
Dans les projets React (Vite), Vue ou Angular, la compilation est faite par l'outil du framework ; `tsconfig.json` reste la référence des règles.
Les **fichiers de types** `.d.ts` décrivent une bibliothèque JS (paquets `@types/…`).

### Pourquoi ça existe
Les moteurs JS n'exécutent pas TypeScript : il faut une étape qui vérifie puis traduit.

### Le problème résolu
Avoir les mêmes règles pour toute l'équipe et un échec clair (dans la CI aussi) si le code ne respecte pas les types.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
S[src/*.ts] --> T[tsc]
  C[tsconfig.json] --> T
  T --> D[dist/*.js]
```

### Exemple concret
```bash
npm install --save-dev typescript
npx tsc --init          # crée tsconfig.json
npx tsc                 # compile src/ vers dist/
node dist/index.js
npx tsc --noEmit        # vérification seule (utile en CI)
```
Pour exécuter directement un `.ts` en développement : `npx tsx fichier.ts`.

### Cas d'utilisation
- Job de vérification des types dans une pipeline CI
- Compiler une bibliothèque ou un backend Node
- Comprendre les erreurs du build Angular ou Vite

> [!warning] À ne pas confondre
> Vite et `tsx` **retirent** les types sans les vérifier (pour aller vite) : seul `tsc` (ou l'éditeur) vérifie. Un projet peut donc tourner avec des erreurs de type ; d'où `tsc --noEmit` dans la CI.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine le trajet d'un fichier `.ts` jusqu'au navigateur : tsc lit tsconfig, vérifie, produit du `.js`. Marque où une erreur de type est attrapée.

> [!example] ⚖️ Avant / après
> Avant / après : le même bug de type en JavaScript (vu à l'exécution) puis en TypeScript (vu à la compilation). Dessine quand tu le découvres.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Compilation TypeScript (tsc et tsconfig) » et je l'intègre ici avec `![[Schéma - Compilation TypeScript (tsc et tsconfig).excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[TypeScript]] · [[Gestionnaire de paquets]]
- **Complémentaires** : [[Pipeline GitLab CI]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
