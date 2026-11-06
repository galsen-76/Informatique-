---
type: command
tool: Angular
level: debutant
concepts:
  - "[[Angular CLI]]"
tags:
  - commande
  - angular
---
# ng

> [!info] Angular
> La commande de l'Angular CLI : créer, générer, lancer, tester et construire un projet Angular.

## Pourquoi l'utiliser
Travailler sur un projet Angular sans écrire la configuration à la main.

## Dans quel contexte
Tous les jours dans un projet Angular, et dans la CI.

## Syntaxe
```bash
ng <commande> [options]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `new nom` | crée un projet |
| `serve` | serveur de développement (4200) |
| `g c / g s / g guard` | génère composant, service, garde |
| `build` | build de production |
| `test` | tests unitaires |
| `update` | met à jour Angular |

## Exemple concret
```bash
ng new taches
ng g c pages/detail-tache
ng serve --open
ng build
```

## Résultat attendu
Les fichiers créés (`CREATE src/app/...`) ; pour `serve`, l'adresse locale.

## Variantes utiles
- `npx ng …` : la version du projet
- `ng version` : versions installées

> [!warning] Erreurs fréquentes
> - `ng: command not found` : CLI non installé (`npm i -g @angular/cli`) ou utiliser `npx ng`
> - Port 4200 déjà utilisé : `ng serve --port 4300`

## Relier
- **Commandes complémentaires** : [[npx]] · [[npm run]]
- **Concepts associés** : [[Angular CLI]]
