---
type: command
tool: Node.js
level: debutant
concepts:
  - "[[Node.js]]"
tags:
  - commande
  - nodejs
---
# node

> [!info] Node.js
> Exécute un fichier JavaScript avec Node.js (ou ouvre une console interactive).

## Pourquoi l'utiliser
C'est ainsi qu'on lance un script ou un serveur en dehors du navigateur.

## Dans quel contexte
Démarrer une API, tester un bout de code.

## Syntaxe
```bash
node <fichier.js>
node --watch <fichier.js>
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `fichier.js` | Le point d'entrée du programme |
| `--watch` | Relance automatiquement à chaque modification (Node 18+) |
| `--version` | Affiche la version installée |

## Exemple concret
```bash
node --watch server.js
```

## Résultat attendu
Les `console.log` du programme s'affichent ; un serveur reste actif jusqu'à `Ctrl+C`.

> [!warning] Erreurs fréquentes
> - `Cannot find module` : mauvais dossier courant ou dépendance non installée.
> - `EADDRINUSE` : le port est déjà pris, voir [[Erreur - EADDRINUSE port déjà utilisé]].


## Relier
- **Commandes complémentaires** : [[npm install]] · [[npm init]]
- **Concepts associés** : [[Node.js]]
