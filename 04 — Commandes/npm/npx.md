---
type: command
tool: npm
level: debutant
concepts:
  - "[[npm]]"
tags:
  - commande
  - npm
---
# npx

> [!info] npm
> Exécute un outil installé dans le projet (node_modules/.bin), ou le télécharge temporairement.

## Pourquoi l'utiliser
Lancer tsc, vitest, eslint ou un générateur sans installation globale.

## Dans quel contexte
Créer un projet, lancer un outil ponctuellement.

## Syntaxe
```bash
npx <outil> [arguments]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `npx outil` | utilise la version du projet si présente |
| `npx outil@version` | force une version |
| `-y` | accepte le téléchargement sans question |

## Exemple concret
```bash
npx tsc --noEmit
npx vitest
npm create vite@latest mon-app
```

## Résultat attendu
Le résultat de l'outil.

## Variantes utiles
- `npm exec` : équivalent

> [!warning] Erreurs fréquentes
> - Lancer un paquet inconnu au nom mal tapé : c'est du code d'un inconnu (vérifie le nom)

## Relier
- **Commandes complémentaires** : [[npm run]] · [[tsc]]
- **Concepts associés** : [[npm]]
