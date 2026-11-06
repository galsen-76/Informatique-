---
type: command
tool: npm
level: debutant
concepts:
  - "[[package.json]]"
  - "[[npm]]"
tags:
  - commande
  - npm
---
# npm run

> [!info] npm
> Lance un script défini dans la section scripts de package.json.

## Pourquoi l'utiliser
Démarrer, tester, construire un projet sans connaître les commandes exactes.

## Dans quel contexte
Tous les jours, et dans la CI.

## Syntaxe
```bash
npm run <script> [-- arguments]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| (sans nom) | liste les scripts |
| `npm test` / `npm start` | raccourcis sans `run` |
| `-- --watch` | passe des arguments au script |
| `--if-present` | ne plante pas si le script n'existe pas |

## Exemple concret
```bash
npm run
npm run dev
npm run build -- --mode production
```

## Résultat attendu
La sortie de la commande du script ; code de sortie de cette commande.

## Variantes utiles
- `npm run lint --workspaces` : dans un monorepo

> [!warning] Erreurs fréquentes
> - `Missing script: "dev"` : le script n'existe pas dans ce `package.json` (mauvais dossier ?)

## Relier
- **Commandes complémentaires** : [[npm install]] · [[npx]]
- **Concepts associés** : [[package.json]] · [[npm]]
