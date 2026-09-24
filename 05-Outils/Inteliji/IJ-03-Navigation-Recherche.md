---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Navigation & Recherche dans IntelliJ"
tags:
  - outils/intellij/navigation
parent: "[[IntelliJ IDEA]]"
children: []
related_theory: []
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.jetbrains.com/help/idea/searching-everywhere.html"
---

# Navigation & Recherche dans IntelliJ

> [!abstract] Introduction
> Grâce à l'indexation, IntelliJ permet de sauter instantanément vers un fichier, une fonction ou un usage, sans dérouler l'arborescence manuellement.

> [!warning]- Prérequis
> [[IJ-01-Interface-Fondamentaux|Interface et Fondamentaux IntelliJ]], [[IJ-02-Raccourcis-Clavier|Raccourcis Clavier IntelliJ]].

---

## Théorie

> [!question]- C'est quoi ?
> Plusieurs modes de recherche : universelle, aller à la définition, trouver tous les usages, historique de navigation.

> [!example]- Analogie
> "Aller à la définition" c'est remonter à la source d'une rivière. "Trouver les usages" c'est suivre tous les affluents qui en partent — deux directions opposées et complémentaires.

> [!question]- Pourquoi l'utiliser ?
> Sur un gros projet, dérouler l'arborescence manuellement devient très lent — la recherche indexée retrouve instantanément n'importe quoi.

> [!question]- Comment ça marche ?
> `Cmd/Ctrl+B` va à la définition. `Cmd/Ctrl+Alt+F7` trouve tous les usages. La recherche accepte des abréviations approximatives.

> [!question]- Quand l'utiliser ?
> "Trouver les usages" avant de modifier/supprimer quelque chose, pour mesurer l'impact.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Sur le réseau `bridge` par défaut sans indexation à jour (projet fraîchement modifié depuis l'extérieur), la recherche peut ne pas refléter l'état le plus récent — réindexer si les résultats semblent incohérents.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Recherche floue | Recherche acceptant des abréviations approximatives |
| Usages | Tous les endroits où un élément est utilisé dans le projet |

---

## Points clés

- Double `Shift` = point d'entrée universel
- `Cmd/Ctrl+B` = définition, `Cmd/Ctrl+Alt+F7` = usages
- Recherche floue : pas besoin du nom exact complet
- `Cmd/Ctrl+Shift+F` = recherche dans tout le contenu des fichiers

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Supprimer une fonction sans avoir vérifié ses usages au préalable
> - Chercher un fichier par navigation manuelle alors que la recherche universelle serait 10x plus rapide

---

## Paramètres / Configuration

| Action | Raccourci (Mac) |
|-----------|-------------|
| Recherche universelle | `Shift Shift` |
| Aller à la définition | `Cmd+B` |
| Trouver les usages | `Cmd+Alt+F7` |
| Rechercher dans le contenu | `Cmd+Shift+F` |

---

## Exemple minimal
> Sujet lié à la navigation dans l'outil, pas au code — bloc non applicable.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[IntelliJ IDEA]]
- Sous-sujets → (aucun)
- À comparer avec → [[OUT-04-VSCode-Productivite|VSCode - Recherche globale]]

**Pratique :**
- Extrait de code → (aucun, sujet non-code)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Saurais-je expliquer la différence entre "aller à la définition" et "trouver les usages" à quelqu'un qui ne connaît pas IntelliJ ?

---

## Tâches

- [ ] #task Utiliser "Trouver les usages" avant de modifier une fonction
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Peut-on restreindre la recherche à un seul dossier plutôt qu'à tout le projet ?
