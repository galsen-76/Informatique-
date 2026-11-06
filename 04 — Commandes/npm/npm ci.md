---
type: command
tool: npm
level: debutant
concepts:
  - "[[npm]]"
  - "[[package.json]]"
tags:
  - commande
  - npm
---
# npm ci

> [!info] npm
> Installe exactement les versions du package-lock.json, après avoir supprimé node_modules.

## Pourquoi l'utiliser
Installation reproductible et rapide.

## Dans quel contexte
CI, Dockerfile, après un clone.

## Syntaxe
```bash
npm ci [--omit=dev]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `--omit=dev` | sans les devDependencies (image de production) |

## Exemple concret
```bash
npm ci
npm ci --omit=dev
```

## Résultat attendu
`added 214 packages in 6s`

## Variantes utiles
- `npm install` : en développement, peut modifier le lock

> [!warning] Erreurs fréquentes
> - Lock absent ou désynchronisé : `npm ci` échoue (régénère avec `npm install` et commite le lock)

## Relier
- **Commandes complémentaires** : [[npm install]]
- **Concepts associés** : [[npm]] · [[package.json]]
