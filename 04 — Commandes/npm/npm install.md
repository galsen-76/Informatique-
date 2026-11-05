---
type: command
tool: npm
level: debutant
concepts:
  - "[[npm]]"
  - "[[Node.js]]"
tags:
  - commande
  - npm
---
# npm install

> [!info] npm
> Installe des paquets (et les enregistre dans `package.json`), ou toutes les dépendances d'un projet existant.

## Pourquoi l'utiliser
Récupérer des bibliothèques (Express…) sans les recopier à la main, avec des versions maîtrisées.

## Dans quel contexte
Ajouter une bibliothèque, ou après un `git clone` pour reconstruire `node_modules`.

## Syntaxe
```bash
npm install [paquet] [-D]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `(sans argument)` | Installe tout ce qui est listé dans `package.json` |
| `paquet` | Le paquet à ajouter, ex. `express` |
| `-D` | En dépendance de développement (`devDependencies`) |

## Exemple concret
```bash
npm install express
npm install -D nodemon
```

## Résultat attendu
`added 64 packages` — le dossier `node_modules` et `package-lock.json` sont mis à jour.

> [!warning] Erreurs fréquentes
> - Lancer la commande hors du dossier du projet : un `package.json` se crée au mauvais endroit.
> - Committer `node_modules` : ajouter `node_modules/` au `.gitignore`.


## Relier
- **Commandes complémentaires** : [[npm init]] · [[node]]
- **Concepts associés** : [[npm]] · [[Node.js]]
