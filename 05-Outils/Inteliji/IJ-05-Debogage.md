---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Débogage dans IntelliJ"
tags:
  - outils/intellij/debogage
parent: "[[IntelliJ IDEA]]"
children: []
related_theory: []
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.jetbrains.com/help/idea/debugging-code.html"
---

# Débogage dans IntelliJ

> [!abstract] Introduction
> Le débogueur permet de mettre le programme en pause à une ligne précise pour inspecter l'état exact des variables, sans `console.log`.

> [!warning]- Prérequis
> [[IJ-01-Interface-Fondamentaux|Interface et Fondamentaux IntelliJ]].

---

## Théorie

> [!question]- C'est quoi ?
> Un breakpoint (point rouge dans la marge) arrête l'exécution à une ligne précise pour inspecter les variables et la pile d'appels.

> [!example]- Analogie
> Un breakpoint est un arrêt sur image d'un film à un moment précis, permettant d'examiner chaque détail du cadre avant de reprendre la lecture.

> [!question]- Pourquoi l'utiliser ?
> Inspecter l'état d'un programme sans modifier le code, contrairement à parsemer des `console.log` temporaires.

> [!question]- Comment ça marche ?
> Lancer en mode Debug (pas Run). `F8` (Step Over), `F7` (Step Into), `Shift+F8` (Step Out), `F9` (Resume). Breakpoint conditionnel possible (clic droit).

> [!question]- Quand l'utiliser ?
> Bug difficile à comprendre en lisant seulement le code ; breakpoint conditionnel pour isoler un cas précis dans une boucle.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Lancer en mode Run (pas Debug) rend les breakpoints inactifs — piège fréquent pour les nouveaux utilisateurs, qui se demandent pourquoi "rien ne s'arrête".

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Breakpoint | Marqueur arrêtant l'exécution à une ligne précise |
| Call stack | Historique des fonctions ayant mené jusqu'au point d'arrêt |

---

## Points clés

- Breakpoint = clic dans la marge, mode Debug requis (pas Run)
- `F8`/`F7`/`Shift+F8`/`F9` : les 4 commandes essentielles
- Breakpoint conditionnel : ne s'arrête que si une condition est vraie

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Lancer en mode Run au lieu de Debug, rendant les breakpoints inactifs
> - Confondre Step Over (n'entre pas dans la fonction) et Step Into (entre dedans)

---

## Paramètres / Configuration

| Action | Raccourci (Mac) |
|-----------|-------------|
| Step Over | `F8` |
| Step Into | `F7` |
| Step Out | `Shift+F8` |
| Resume | `F9` |

---

## Exemple minimal
> Le débogage s'observe en pratique dans l'IDE — bloc non applicable ici.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[IntelliJ IDEA]]
- Sous-sujets → (aucun)
- À comparer avec → [[OUT-04-VSCode-Productivite|VSCode - Debugger]]

**Pratique :**
- Extrait de code → (aucun, sujet non-code)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer la différence Step Over/Step Into avec un exemple concret ?

---

## Tâches

- [ ] #task Poser un breakpoint sur une fonction et l'inspecter en mode Debug
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment déboguer une application Angular tournant dans le navigateur, depuis IntelliJ ?
