---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/vscode
aliases:
  - "VS Code et Productivité"
parent: "[[Outils]]"
related_theory:
  - "[[IJ-10-Transition-VSCode|Transition vers VS Code]]"
related_projects: []
source: "https://code.visualstudio.com/docs"
---

# VS Code Productivité

> [!abstract] En bref
> **VS Code** est l'éditeur le plus utilisé pour le front. Léger, gratuit, il devient très puissant avec les bonnes extensions et quelques raccourcis. Si tu utilises IntelliJ au travail, voir [[IJ-10-Transition-VSCode|la transition]] ; les deux font le travail.

## Les extensions à installer

| Extension | Pour |
|---|---|
| **WSL** | travailler dans Linux depuis Windows (`code .` dans Ubuntu) |
| **Vue - Official** | Vue et TypeScript dans les `.vue` |
| **Angular Language Service** | autocomplétion et erreurs dans les templates Angular |
| **ESLint** + **Prettier** | qualité et mise en forme (voir [[OUT-03-ESLint-Prettier-Qualite\|ESLint / Prettier]]) |
| **Tailwind CSS IntelliSense** | autocomplétion des classes Tailwind |
| **Prisma** | coloration et formatage de `schema.prisma` |
| **GitLens** | historique et auteur de chaque ligne |
| **Error Lens** | les erreurs affichées directement sur la ligne |
| **Docker** | gérer les conteneurs |

## Les raccourcis essentiels (Windows)

| Raccourci | Action |
|---|---|
| `Ctrl+P` | ouvrir un fichier par son nom |
| `Ctrl+Shift+P` | **toutes les commandes** |
| `Ctrl+Shift+F` | chercher dans tout le projet |
| `F12` / `Ctrl+clic` | aller à la définition |
| `Shift+F12` | voir toutes les utilisations |
| `F2` | renommer partout |
| `Ctrl+.` | corrections rapides (ajouter un import…) |
| `Alt+↑` / `Alt+↓` | déplacer la ligne |
| `Shift+Alt+↓` | dupliquer la ligne |
| `Ctrl+D` | sélectionner l'occurrence suivante (multi-curseur) |
| `Ctrl+/` | commenter |
| `` Ctrl+` `` | ouvrir le terminal |
| `Ctrl+B` | afficher / cacher l'explorateur |

## Les réglages utiles

```json
// .vscode/settings.json (commité : partagé avec l'équipe)
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

Un fichier `.vscode/extensions.json` peut recommander les extensions du projet à toute l'équipe.

## Déboguer dans l'éditeur

Plutôt que des `console.log` : **Run and Debug** (`Ctrl+Shift+D`), puis un point d'arrêt en cliquant dans la marge. Fonctionne pour Node / NestJS (« JavaScript Debug Terminal » puis `npm run start:dev`) et pour le navigateur.

## Pièges

- **Trop d'extensions** : l'éditeur ralentit. Garde celles que tu utilises.
- **Deux formateurs qui se battent** (Prettier et un autre) : fixe `editor.defaultFormatter`.
