---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Interface & Fondamentaux IntelliJ IDEA"
tags:
  - outils/intellij/fondamentaux
parent: "[[IntelliJ IDEA]]"
children:
  - "[[IJ-02-Raccourcis-Clavier|Raccourcis Clavier IntelliJ]]"
  - "[[IJ-03-Navigation-Recherche|Navigation et Recherche IntelliJ]]"
related_theory: []
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.jetbrains.com/help/idea/"
---

# Interface & Fondamentaux IntelliJ IDEA

> [!abstract] Introduction
> IntelliJ IDEA est un IDE complet de JetBrains, plus intelligent que VSCode par défaut car il comprend profondément la structure du code sans extensions.

> [!warning]- Prérequis
> Avoir déjà utilisé un éditeur de code (VSCode) aide à repérer les différences par contraste.

---

## Théorie

> [!question]- C'est quoi ?
> Un IDE (Integrated Development Environment) intègre nativement énormément d'outils avancés (refactoring, débogueur, outils DB) sans extensions.

> [!example]- Analogie
> VSCode est un atelier vide qu'on équipe soi-même, outil par outil (extension par extension). IntelliJ est un atelier déjà entièrement équipé à la livraison.

> [!question]- Pourquoi l'utiliser ?
> L'indexation profonde du projet permet un renommage fiable, une détection d'erreurs précise, une navigation instantanée — souvent moins fiable via extensions tierces sur VSCode.

> [!question]- Comment ça marche ?
> IntelliJ indexe tout le projet au démarrage (analyse types, fonctions, dépendances) avant même de commencer à coder.

> [!question]- Quand l'utiliser ?
> Particulièrement pertinent pour Java/Kotlin, mais efficace aussi pour TypeScript/JavaScript, Python (avec plugin), et le web en général.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pour un petit script rapide ou une édition ponctuelle d'un fichier isolé, l'indexation initiale plus longue d'IntelliJ est disproportionnée face à VSCode qui s'ouvre quasi instantanément.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Indexer | Analyser et cataloguer tout le contenu d'un projet pour le retrouver instantanément |
| IDE | Environnement de développement intégré, tout-en-un |

---

## Points clés

- IntelliJ = IDE complet, VSCode = éditeur léger + extensions
- Indexation plus longue au démarrage, navigation ensuite bien plus rapide
- Panneaux : Project (fichiers), éditeur, Structure, Terminal/Git/Run
- Version gratuite (Community) et payante (Ultimate)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Ouvrir un très gros projet et s'impatienter pendant l'indexation, pensant que l'IDE a planté
> - Vouloir tout configurer manuellement comme sur VSCode, sans explorer les fonctionnalités déjà natives

---

## Paramètres / Configuration

| Panneau | Description |
|-----------|-------------|
| Project | Arborescence des fichiers |
| Structure | Aperçu des classes/fonctions du fichier |
| Terminal/Git/Run | Onglets en bas de l'écran |

---

## Exemple minimal
> Sujet lié à l'interface, pas au code — bloc non applicable.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[IntelliJ IDEA]]
- Sous-sujets → [[IJ-02-Raccourcis-Clavier|Raccourcis Clavier IntelliJ]], [[IJ-03-Navigation-Recherche|Navigation et Recherche IntelliJ]]
- À comparer avec → [[OUT-04-VSCode-Productivite|VSCode - Fondamentaux]]

**Pratique :**
- Extrait de code → (aucun, sujet non-code)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi IntelliJ met plus de temps à ouvrir un projet que VSCode, sans dire "indexation" ?

---

## Tâches

- [ ] #task Ouvrir un premier projet dans IntelliJ et observer l'indexation
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Pour du TypeScript/Angular, faut-il Ultimate ou Community suffit ?
