---
type: notion
statut: maitrise
resume: "Prettier met en forme ton code automatiquement (espaces, guillemets, retours à la ligne) : plus aucun débat de style. ESLint repère les erreurs et les mauvaises pratiques (variable inutilisée, any, Promise oubliée)."
revu:
sources:
  - "https://eslint.org/docs/latest/"
---
# ESLint et Prettier

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : **Prettier** met en forme ton code automatiquement (espaces, guillemets, retours à la ligne) : plus aucun débat de style. **ESLint** repère les erreurs et les mauvaises pratiques (variable inutilisée, `any`, Promise oubliée).

## Le problème

**Pourquoi c'est utile ?**
Pour mettre en forme le code automatiquement et repérer les erreurs et mauvaises pratiques.

**Qu'est-ce qui se passait sans ça ?**
Des débats sans fin sur les espaces et les guillemets dans les MR, et des bugs simples (variable inutilisée, promesse oubliée) qui passaient.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Branchés à la sauvegarde et avant chaque commit, ils gardent le code propre sans effort.

### Qui fait quoi

| Outil | Rôle | Exemple |
|---|---|---|
| **Prettier** | la **forme** | `"` → `'`, point-virgule, indentation |
| **ESLint** | le **fond** | variable déclarée jamais utilisée, `==` au lieu de `===`, `await` oublié |
| **TypeScript** (`tsc`, `vue-tsc`) | les **types** | mauvais type passé à une fonction |

### Les règles ESLint qui valent de l'or

| Règle | Attrape |
|---|---|
| `@typescript-eslint/no-explicit-any` | les `any` |
| `@typescript-eslint/no-floating-promises` | une Promise lancée sans `await` ni gestion d'erreur |
| `@typescript-eslint/no-unused-vars` | le code mort |
| `eqeqeq` | `==` au lieu de `===` |
| `no-console` (en avertissement) | les `console.log` oubliés |
| règles Vue / Angular | `:key` manquant, mauvaise syntaxe de template |

### Automatiser

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

## 🧪 Exemple

### Installation

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

## ⚠️ Limites et pièges

- **Désactiver une règle** (`// eslint-disable-next-line`) pour faire disparaître l'erreur sans la comprendre.
- **Prettier et ESLint en désaccord** sur la forme : laisse la forme à Prettier (la config ESLint recommandée désactive les règles de forme).
- **Reformater tout un projet existant dans une MR fonctionnelle** : fais-le dans une MR à part, sinon la revue devient illisible.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Qualité lint et SonarQube]], [[Conventions de commits et SemVer]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://eslint.org/docs/latest/
