---
type: command
tool: npm
level: debutant
concepts:
  - "[[Version sémantique (semver)]]"
tags:
  - commande
  - npm
---
# npm outdated

> [!info] npm
> Liste les dépendances qui ont des versions plus récentes.

## Pourquoi l'utiliser
Savoir quoi mettre à jour et si c'est risqué.

## Dans quel contexte
Maintenance régulière d'un projet.

## Syntaxe
```bash
npm outdated
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| Current | version installée |
| Wanted | la plus récente permise par la plage |
| Latest | la dernière publiée |

## Exemple concret
```bash
npm outdated
npm update
```

## Résultat attendu
Un tableau par dépendance ; rien si tout est à jour.

## Variantes utiles
- `npm install paquet@latest` : passer à la dernière (lire les notes si majeure)
- `npm audit` : failles connues

> [!warning] Erreurs fréquentes
> - Passer une majeure sans lire les notes de version

## Relier
- **Commandes complémentaires** : [[npm install]]
- **Concepts associés** : [[Version sémantique (semver)]]
