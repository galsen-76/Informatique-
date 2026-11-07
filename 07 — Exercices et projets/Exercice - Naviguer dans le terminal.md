---
type: exercise
status: reussi
difficulty: reussi
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
- [x] Créer `git.md` vide ([[New-Item]] en PowerShell, [[touch]] en Bash)
- [x] Écrire la ligne `# Mes notes Git` dans `git.md`, puis **ajouter** une deuxième ligne sans effacer la première ([[Set-Content]] et `Add-Content` en PowerShell, [[echo]] avec `>` et `>>` en Bash), et afficher le fichier ([[cat]])
- [x] Ouvrir `git.md` dans un éditeur, ajouter une troisième ligne et enregistrer ([[nano]] en Bash, `notepad` ou `code` en PowerShell)
- [x] Aller dans `code/api`, puis revenir à `labo` avec un chemin relatif ([[cd]])
- [x] Afficher le contenu de `labo`, fichiers cachés compris ([[ls]] / [[Get-ChildItem]])

> [!question]- Solution (PowerShell)
> ```powershell
> mkdir labo/notes, labo/code/api
> New-Item labo/notes/git.md
> Set-Content labo/notes/git.md "# Mes notes Git"
> Add-Content labo/notes/git.md "git status montre l'état"
> Get-Content labo/notes/git.md
> notepad labo/notes/git.md      # ou : code labo/notes/git.md
> cd labo/code/api
> cd ../..
> Get-ChildItem -Force
> ```

> [!question]- Solution (Bash, dans WSL)
> ```bash
> mkdir -p labo/notes labo/code/api
> touch labo/notes/git.md
> echo "# Mes notes Git" > labo/notes/git.md
> echo "git status montre l'état" >> labo/notes/git.md
> cat labo/notes/git.md
> nano labo/notes/git.md     # écrire, Ctrl+O, Entrée, Ctrl+X
> cd labo/code/api
> cd ../..
> ls -la
> ```

## Ce que j'en retiens
- Le dossier courant décide de tout : [[Système de fichiers]].
