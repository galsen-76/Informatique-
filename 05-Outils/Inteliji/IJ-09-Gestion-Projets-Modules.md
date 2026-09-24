---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Gestion de Projets & Modules IntelliJ"
tags:
  - outils/intellij/projets
parent: "[[IntelliJ IDEA]]"
children: []
related_theory: []
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.jetbrains.com/help/idea/creating-and-managing-projects.html"
---

# Gestion de Projets & Modules IntelliJ

> [!abstract] Introduction
> IntelliJ organise le travail autour de Run Configurations (comment lancer un projet) et de SDKs/Interpreters (quelle version du langage utiliser).

> [!warning]- Prérequis
> [[IJ-01-Interface-Fondamentaux|Interface et Fondamentaux IntelliJ]], [[PY-13-Environnements-Virtuels-Pip|Environnements Virtuels et Pip]] pour la partie Python.

---

## Théorie

> [!question]- C'est quoi ?
> Une Run Configuration mémorise comment démarrer un projet précis. Un SDK/Interpreter est la version du langage utilisée pour comprendre le code.

> [!example]- Analogie
> Le SDK est comme choisir la bonne langue de traduction pour un interprète avant une réunion — sans le bon réglage, il comprend de travers ce qui se dit, même si le contenu est correct.

> [!question]- Pourquoi l'utiliser ?
> Sans le bon SDK configuré, IntelliJ peut mal interpréter la syntaxe et signaler de fausses erreurs.

> [!question]- Comment ça marche ?
> Preferences → Languages & Frameworks → Node.js (config SDK Node). Preferences → Project → Python Interpreter (lié à un venv). Menu "Add Configuration" pour créer une Run Configuration.

> [!question]- Quand l'utiliser ?
> Configurer le SDK dès l'ouverture d'un nouveau projet ; créer une Run Configuration pour chaque façon de lancer le projet.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Oublier de configurer le bon SDK/Interpreter cause de FAUSSES erreurs qui n'ont rien à voir avec le vrai code — un piège fréquent pour les débutants sur IntelliJ.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Run Configuration | Réglage enregistré pour démarrer un projet en un clic |
| SDK/Interpreter | Version du langage utilisée par IntelliJ pour ce projet |
| Module (IntelliJ) | Sous-partie d'un projet global, avec ses propres réglages |

---

## Points clés

- SDK/Interpreter mal configuré = fausses erreurs signalées
- IntelliJ peut créer/gérer directement un venv Python
- Une Run Configuration se relance en un clic
- Un "module" IntelliJ diffère d'un module de code (fichier)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Ignorer des erreurs signalées par IntelliJ qui viennent en réalité d'un SDK mal configuré
> - Confondre "module" IntelliJ (sous-partie du projet) avec un module de code Python/TypeScript

---

## Paramètres / Configuration

| Réglage | Emplacement |
|-----------|-------------|
| SDK Node.js | Preferences → Languages & Frameworks → Node.js |
| Interpreter Python | Preferences → Project → Python Interpreter |
| Run Configuration | Menu déroulant en haut à droite |

---

## Exemple minimal
> Sujet lié à la configuration de l'outil — bloc non applicable.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[IntelliJ IDEA]]
- Sous-sujets → (aucun)
- À comparer avec → [[OUT-04-VSCode-Productivite|VSCode - Configuration de projet]]

**Pratique :**
- Extrait de code → (aucun, sujet non-code)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je diagnostiquer une "fausse erreur" causée par un SDK mal configuré ?

---

## Tâches

- [ ] #task Configurer le SDK Node.js pour un projet Angular importé
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Gérer un projet avec dossier Angular ET dossier Python (API) dans le même dépôt, via les modules IntelliJ ?
