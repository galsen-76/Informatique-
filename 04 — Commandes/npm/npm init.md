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
# npm init

> [!info] npm
> Crée le fichier `package.json` d'un nouveau projet Node.

## Pourquoi l'utiliser
`package.json` décrit le projet : nom, scripts, dépendances. Sans lui, `npm install` ne sait pas quoi enregistrer.

## Dans quel contexte
Une fois, au début d'un projet Node.

## Syntaxe
```bash
npm init [-y]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-y` | Accepte toutes les valeurs par défaut sans poser de questions |

## Exemple concret
```bash
npm init -y
```

## Résultat attendu
Un fichier `package.json` est créé dans le dossier courant.



## Relier
- **Commandes complémentaires** : [[npm install]] · [[node]]
- **Concepts associés** : [[npm]] · [[Node.js]]
