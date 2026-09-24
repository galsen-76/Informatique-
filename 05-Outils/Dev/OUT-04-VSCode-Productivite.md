---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/vscode
aliases:
  - "VS Code et Productivité"
parent: "[[Outils]]"
children: []
related_theory:
  - "[[IJ-10-Transition-VSCode|Transition vers VS Code]]"
related_snippets:
  - "[[04_Snippets/out-04-vscode-productivite]]"
related_projects: []
source: "https://code.visualstudio.com/docs"
---

# VS Code et Productivité

> [!abstract] Introduction
> VS Code est l'éditeur le plus utilisé en front ; bien configuré (extensions, raccourcis, débogueur, settings partagés), il rivalise avec IntelliJ/WebStorm pour Angular et Vue.

---

## Théorie

> [!question]- C'est quoi ?
> Extensions essentielles : **Angular Language Service**, **Vue - Official**, ESLint, Prettier, EditorConfig, GitLens, Error Lens, Docker, REST Client/Thunder Client, Playwright Test.
> Raccourcis : `Ctrl+P` (fichier), `Ctrl+Shift+P` (commandes), `F12` (définition), `Shift+F12` (références), `F2` (renommer), `Alt+↑/↓` (déplacer ligne), `Ctrl+D` (multi-curseur), `` Ctrl+` `` (terminal intégré).

> [!example]- Analogie
> Un établi : l'outil ne fait pas l'artisan, mais un établi bien rangé fait gagner des heures chaque semaine.

> [!question]- Pourquoi l'utiliser ?
> Productivité, refactorings sûrs, débogage directement dans l'éditeur.

> [!question]- Comment ça marche ?
> - `.vscode/extensions.json` (extensions recommandées) et `.vscode/settings.json` commités pour l'équipe
> - `launch.json` pour déboguer Angular/Vue (Chrome) et NestJS (Node)
> - Format on save + ESLint fix on save

> [!question]- Quand l'utiliser ?
> Selon la préférence de l'équipe (IntelliJ Ultimate/WebStorm est aussi excellent, voir [[IJ-01-Interface-Fondamentaux|Interface & Fondamentaux IntelliJ IDEA]]).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Accumuler des dizaines d'extensions ralentit l'éditeur.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Command Palette | Accès à toutes les commandes |
| Workspace settings | Paramètres propres au projet |
| Language Service | Moteur d'autocomplétion d'un langage |

---

## Points clés

- Paramètres de projet commités
- Apprendre 10 raccourcis vaut mieux que 50 extensions
- Débogueur intégré

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Extensions Vue 2 (Vetur) installées sur un projet Vue 3

---

## Exemple minimal

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

> [!note] Ce que j'en retiens
> Trois lignes de configuration = code toujours formaté et corrigé.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Snippets personnalisés, tâches, dev containers

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Outils]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[IJ-01-Interface-Fondamentaux|Interface & Fondamentaux IntelliJ IDEA]]

**Pratique :**
- Extrait de code → [[04_Snippets/out-04-vscode-productivite]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quels fichiers `.vscode` partager avec l'équipe ?

---

## Tâches

- [ ] #task Créer `.vscode/extensions.json` et `settings.json` pour CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
