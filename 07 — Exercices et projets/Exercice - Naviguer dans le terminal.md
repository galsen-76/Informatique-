---
type: exercise
status: reussi
difficulty: facile
concepts:
  - "[[Terminal]]"
  - "[[Système de fichiers]]"
tags:
  - exercice
---
# Exercice — Naviguer dans le terminal

> [!info] Objectif
> Créer cette arborescence **sans utiliser la souris**, puis la parcourir.

```text
labo/
├── notes/
│   └── git.md
└── code/
    └── api/
```

## Consignes
- [x] Créer les dossiers en une seule commande ([[mkdir]])
- [x] Créer `git.md` (`New-Item` en PowerShell, `touch` en Bash)
- [x] Aller dans `code/api`, puis revenir à `labo` avec un chemin relatif ([[cd]])
- [x] Afficher le contenu de `labo`, fichiers cachés compris ([[ls]] / [[Get-ChildItem]])

> [!question]- Solution (PowerShell)
> ```powershell
> mkdir labo/notes, labo/code/api
> New-Item labo/notes/git.md
> cd labo/code/api
> cd ../..
> Get-ChildItem -Force
> ```

## Ce que j'en retiens
- Le dossier courant décide de tout : [[Système de fichiers]].
