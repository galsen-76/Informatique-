---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M03
tags:
  - outils/qualite
aliases:
  - "ESLint Prettier et Hooks"
parent: "[[Outils]]"
children: []
related_theory:
  - "[[TEST-08-Qualite-Lint-SonarQube|Qualité Linting et Analyse Statique]]"
  - "[[GIT-07-Conventions-Commits-SemVer|Conventions de Commits et SemVer]]"
related_snippets:
  - "[[04_Snippets/out-03-eslint-prettier-qualite]]"
related_projects: []
source: "https://eslint.org/docs/latest/"
---

# ESLint Prettier et Hooks

> [!abstract] Introduction
> ESLint détecte les erreurs et mauvaises pratiques dans le code, Prettier le formate automatiquement ; combinés à des hooks Git (husky + lint-staged), ils garantissent un code homogène dans toute l'équipe.

> [!warning]- Prérequis
> [[NODE-01-Node-npm|Node.js et npm]]

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> ng add @angular-eslint/schematics          # Angular
> npm create vue@latest                       # propose ESLint + Prettier
> npx eslint . --fix
> npx prettier . --write
> ```
> Config moderne « flat config » (`eslint.config.js`) avec `typescript-eslint`, `angular-eslint`, `eslint-plugin-vue`.

> [!example]- Analogie
> Prettier est le correcteur de mise en page (marges, retraits) ; ESLint est le relecteur qui signale les phrases ambiguës et les fautes de logique.

> [!question]- Pourquoi l'utiliser ?
> Zéro débat de style en revue de code, bugs détectés avant l'exécution (variable inutilisée, promesse non attendue, `any`), code homogène.

> [!question]- Comment ça marche ?
> - Prettier : formatage uniquement (pas de règle de logique) ; désactiver les règles de style d'ESLint qui entrent en conflit
> - ESLint : règles de qualité ; `typescript-eslint` en mode type-aware pour les règles avancées (`no-floating-promises`)
> - IDE : formatage à l'enregistrement
> - Hooks : husky (`pre-commit`) + lint-staged (seulement les fichiers modifiés)
> - CI : `npm run lint` bloque la MR

> [!question]- Quand l'utiliser ?
> Dès le premier commit d'un projet.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Trop de règles strictes d'un coup sur un vieux projet → activer progressivement.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Linter | Analyseur statique de code |
| Formatter | Outil de mise en forme automatique |
| Flat config | Nouveau format de configuration ESLint |
| lint-staged | Lance les outils sur les fichiers indexés |

---

## Points clés

- Prettier formate, ESLint vérifie
- Formatage auto à l'enregistrement
- Lint obligatoire en CI
- Règles partagées dans le dépôt

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Désactiver les règles avec `// eslint-disable` partout
> - Formats différents entre IDE de l'équipe (pas de config commitée)

---

## Exemple minimal

```json
{
  "lint-staged": {
    "*.{ts,vue,html}": ["eslint --fix", "prettier --write"],
    "*.{scss,css,json,md}": ["prettier --write"]
  }
}
```

> [!note] Ce que j'en retiens
> Chaque commit est automatiquement lint et formaté, sans y penser.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Écrire une règle ESLint custom pour une convention d'équipe

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Outils]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/out-03-eslint-prettier-qualite]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi séparer formatage (Prettier) et qualité (ESLint) ?

---

## Tâches

- [ ] #task Configurer ESLint + Prettier + husky + lint-staged sur CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
