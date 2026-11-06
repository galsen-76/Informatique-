---
type: command
tool: Node
level: debutant
concepts:
  - "[[Gestionnaire de versions de Node (nvm)]]"
tags:
  - commande
  - node
---
# nvm

> [!info] Node
> Installe et sélectionne des versions de Node.js.

## Pourquoi l'utiliser
Avoir la version de Node attendue par chaque projet.

## Dans quel contexte
Installation de la machine, changement de projet.

## Syntaxe
```bash
nvm <commande> [version]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `install 22` / `--lts` | installe |
| `use 22` | active dans ce terminal |
| `use` | lit `.nvmrc` |
| `ls` | versions installées |
| `alias default 22` | par défaut |

## Exemple concret
```bash
nvm install --lts
nvm use
node -v
```

## Résultat attendu
`Now using node v22.11.0 (npm v10.9.0)`

## Variantes utiles
- `fnm` : alternative rapide, aussi sous Windows

> [!warning] Erreurs fréquentes
> - `nvm: command not found` : rouvrir le terminal après l'installation

## Relier
- **Commandes complémentaires** : [[node]] · [[npm install]]
- **Concepts associés** : [[Gestionnaire de versions de Node (nvm)]]
