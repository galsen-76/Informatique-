---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Refactoring dans IntelliJ"
tags:
  - outils/intellij/refactoring
parent: "[[IntelliJ IDEA]]"
children: []
related_theory: []
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.jetbrains.com/help/idea/refactoring-source-code.html"
---

# Refactoring dans IntelliJ

> [!abstract] Introduction
> Modifier la structure du code (renommer, déplacer) sans changer son comportement, avec la garantie qu'aucun usage n'est cassé ailleurs dans le projet.

> [!warning]- Prérequis
> [[IJ-03-Navigation-Recherche|Navigation et Recherche IntelliJ]].

---

## Théorie

> [!question]- C'est quoi ?
> IntelliJ sait exactement où chaque élément est utilisé (indexation) et peut modifier TOUS les endroits concernés simultanément et de façon fiable.

> [!example]- Analogie
> Un simple rechercher-remplacer est un correcteur automatique de texte qui change chaque occurrence du mot "avocat" — même si l'un parlait de fruit et l'autre de métier. Le refactoring IntelliJ comprend le SENS du code, pas juste le texte.

> [!question]- Pourquoi l'utiliser ?
> Un rechercher-remplacer classique risque de toucher un mot identique mais dans un contexte différent — IntelliJ comprend le code, pas juste le texte.

> [!question]- Comment ça marche ?
> `Shift+F6` renomme partout ; `Cmd/Ctrl+Alt+V` extrait une variable ; `Cmd/Ctrl+Alt+M` extrait une méthode. Déplacer un fichier met à jour automatiquement les imports.

> [!question]- Quand l'utiliser ?
> Renommer dès qu'un nom n'est plus clair ; extraire dès qu'un code se répète ou devient illisible.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Utiliser un rechercher-remplacer texte classique (pas le refactoring dédié) pour renommer une variable risque de toucher un mot identique dans un contexte différent.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Refactoriser | Réorganiser du code sans changer son comportement |

---

## Points clés

- `Shift+F6` renomme en toute sécurité à travers tout le projet
- Extraction de variable/méthode automatisée
- Déplacer un fichier met à jour les imports automatiquement
- Comprend la STRUCTURE, pas juste le texte

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Utiliser un rechercher-remplacer texte au lieu du refactoring dédié pour renommer
> - Déplacer un fichier manuellement (drag hors d'IntelliJ) au lieu de le glisser dans l'arborescence Project, cassant les imports

---

## Paramètres / Configuration

| Action | Raccourci (Mac) |
|-----------|-------------|
| Renommer | `Shift+F6` |
| Extraire une variable | `Cmd+Alt+V` |
| Extraire une méthode | `Cmd+Alt+M` |

---

## Exemple minimal
> Sujet lié au refactoring d'outil, pas à un extrait de code isolé pertinent — bloc non applicable.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[IntelliJ IDEA]]
- Sous-sujets → (aucun)
- À comparer avec → [[OUT-04-VSCode-Productivite|VSCode - Rename Symbol]]

**Pratique :**
- Extrait de code → (aucun, sujet non-code)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi le refactoring IntelliJ est plus sûr qu'un rechercher-remplacer classique ?

---

## Tâches

- [ ] #task Renommer une variable mal nommée et observer les changements
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? "Extract Interface" fonctionne-t-il aussi bien en TypeScript qu'en Java ?
