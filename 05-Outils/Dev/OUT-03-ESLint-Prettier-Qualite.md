---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M03
tags:
  - outils/qualite
aliases:
  - "ESLint Prettier et Hooks"
parent: "[[Outils]]"
related_theory:
  - "[[TEST-08-Qualite-Lint-SonarQube|Qualité Linting et Analyse Statique]]"
  - "[[GIT-07-Conventions-Commits-SemVer|Conventions de Commits et SemVer]]"
related_projects: []
source: "https://eslint.org/docs/latest/"
---

# ESLint Prettier et Qualité

> [!abstract] En bref
> **Prettier** met en forme ton code automatiquement (espaces, guillemets, retours à la ligne) : plus aucun débat de style. **ESLint** repère les erreurs et les mauvaises pratiques (variable inutilisée, `any`, Promise oubliée). Branchés à la sauvegarde et avant chaque commit, ils gardent le code propre sans effort.

## Qui fait quoi

| Outil | Rôle | Exemple |
|---|---|---|
| **Prettier** | la **forme** | `"` → `'`, point-virgule, indentation |
| **ESLint** | le **fond** | variable déclarée jamais utilisée, `==` au lieu de `===`, `await` oublié |
| **TypeScript** (`tsc`, `vue-tsc`) | les **types** | mauvais type passé à une fonction |

## Installation

Déjà proposés par `npm create vue@latest`. Pour Angular : `ng add @angular-eslint/schematics` et `npm i -D prettier`.

```json
// .prettierrc
{ "singleQuote": true, "semi": true, "printWidth": 110, "trailingComma": "all" }
```

```json
// package.json
"scripts": {
  "lint": "eslint .",
  "format": "prettier --write ."
}
```

## Les règles ESLint qui valent de l'or

| Règle | Attrape |
|---|---|
| `@typescript-eslint/no-explicit-any` | les `any` |
| `@typescript-eslint/no-floating-promises` | une Promise lancée sans `await` ni gestion d'erreur |
| `@typescript-eslint/no-unused-vars` | le code mort |
| `eqeqeq` | `==` au lieu de `===` |
| `no-console` (en avertissement) | les `console.log` oubliés |
| règles Vue / Angular | `:key` manquant, mauvaise syntaxe de template |

## Automatiser

**1. À la sauvegarde** (éditeur) :
- VS Code : `"editor.formatOnSave": true` + extension ESLint.
- IntelliJ : *Settings → Tools → Actions on Save* → Reformat + Run ESLint --fix.

**2. Avant chaque commit** (husky + lint-staged) :

```bash
npm i -D husky lint-staged
npx husky init
```

```json
// package.json
"lint-staged": {
  "*.{ts,vue}": ["eslint --fix", "prettier --write"],
  "*.{css,scss,json,md}": ["prettier --write"]
}
```

```bash
# .husky/pre-commit
npx lint-staged
```

Seuls les fichiers modifiés sont vérifiés : c'est rapide.

**3. Dans la CI** : `npm run lint` et `vue-tsc --noEmit` / `tsc --noEmit` bloquent la MR si ça ne passe pas.

## Pièges

- **Désactiver une règle** (`// eslint-disable-next-line`) pour faire disparaître l'erreur sans la comprendre.
- **Prettier et ESLint en désaccord** sur la forme : laisse la forme à Prettier (la config ESLint recommandée désactive les règles de forme).
- **Reformater tout un projet existant dans une MR fonctionnelle** : fais-le dans une MR à part, sinon la revue devient illisible.
