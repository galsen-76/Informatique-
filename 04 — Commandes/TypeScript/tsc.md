---
type: command
tool: TypeScript
level: debutant
concepts:
  - "[[Compilation TypeScript (tsc et tsconfig)]]"
tags:
  - commande
  - typescript
---
# tsc

> [!info] TypeScript
> Le compilateur TypeScript : vérifie les types et produit du JavaScript.

## Pourquoi l'utiliser
Compiler ou vérifier un projet TypeScript.

## Dans quel contexte
Build d'un backend ou d'une bibliothèque, vérification dans la CI.

## Syntaxe
```bash
npx tsc [options]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| (seul) | compile selon `tsconfig.json` |
| `--init` | crée un `tsconfig.json` |
| `--noEmit` | vérifie sans écrire de fichiers |
| `--watch` | recompile à chaque modification |
| `-p chemin` | utilise un autre tsconfig |

## Exemple concret
```bash
npx tsc --init
npx tsc
npx tsc --noEmit
```

## Résultat attendu
Rien si tout va bien ; sinon `src/index.ts:4:7 - error TS2322: Type 'string' is not assignable to type 'number'.`

## Variantes utiles
- `npx tsx fichier.ts` : exécute directement (sans vérifier)

> [!warning] Erreurs fréquentes
> - `tsc fichier.ts` ignore `tsconfig.json`
> - Installer TypeScript globalement : préfère la version du projet avec `npx`

## Relier
- **Commandes complémentaires** : [[npx]] · [[npm run]]
- **Concepts associés** : [[Compilation TypeScript (tsc et tsconfig)]]
