---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Plugins IntelliJ"
tags:
  - outils/intellij/plugins
parent: "[[IntelliJ IDEA]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://plugins.jetbrains.com/"
---

# Plugins IntelliJ

> [!abstract] En bref
> IntelliJ fait déjà presque tout d'origine (TypeScript, Angular, Vue, Git, bases de données, tests). Les plugins servent à ajouter ce qui manque. Règle : **peu de plugins**, bien choisis, sinon l'IDE ralentit.

## Ce qui est déjà inclus (inutile de chercher un plugin)

TypeScript, JavaScript, Angular, Vue, HTML, CSS / SCSS, ESLint, Prettier, Git, terminal, client HTTP (`.http`), outil base de données (IntelliJ Ultimate / WebStorm), Docker, débogueur.

Vérifie qu'ils sont activés : *Settings → Plugins → Installed*.

## Les plugins utiles

| Plugin | Pour |
|---|---|
| **Key Promoter X** | apprendre les raccourcis (affiche le raccourci de chaque clic) |
| **Prisma ORM** | coloration et autocomplétion de `schema.prisma` |
| **Tailwind CSS** | autocomplétion des classes (souvent déjà inclus) |
| **Rainbow Brackets** | parenthèses colorées par niveau |
| **GitToolBox** | auteur et date du dernier changement sur chaque ligne |
| **.env files support** | coloration des fichiers `.env` |
| **Mermaid** | aperçu des diagrammes dans les `.md` |

## Installer

*Settings → Plugins → Marketplace* → rechercher → *Install* → redémarrer si demandé.

## Pièges

- **Chercher un plugin pour une fonctionnalité déjà native** (réflexe VS Code) : regarde d'abord dans `Ctrl+Shift+A`.
- **Trop de plugins** : démarrage lent, instabilité. Désinstalle ce que tu n'utilises plus.
- **Un plugin non maintenu** : vérifie la date de mise à jour et la compatibilité avec ta version d'IntelliJ.
