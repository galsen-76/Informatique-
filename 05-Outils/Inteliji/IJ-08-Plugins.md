---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Plugins IntelliJ"
tags:
  - outils/intellij/plugins
parent: "[[IntelliJ IDEA]]"
children: []
related_theory: []
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://plugins.jetbrains.com/"
---

# Plugins IntelliJ

> [!abstract] Introduction
> IntelliJ peut être étendu par des plugins, mais fonctionne déjà très bien nativement — les plugins servent surtout à ajouter des langages/frameworks absents par défaut.

> [!warning]- Prérequis
> [[IJ-01-Interface-Fondamentaux|Interface et Fondamentaux IntelliJ]].

---

## Théorie

> [!question]- C'est quoi ?
> Un plugin ajoute un support de langage/framework ou une fonctionnalité de confort, installable via Preferences → Plugins.

> [!example]- Analogie
> Sur VSCode, les extensions sont les fondations mêmes de la maison. Sur IntelliJ, les plugins sont des annexes ajoutées à une maison déjà complète.

> [!question]- Pourquoi l'utiliser ?
> Certains langages (Python, Go, Rust) nécessitent un plugin dédié pour un support complet, même sur IntelliJ Ultimate.

> [!question]- Comment ça marche ?
> Preferences → Plugins → recherche dans le Marketplace → Install → redémarrage si demandé.

> [!question]- Quand l'utiliser ?
> Installer le plugin du langage principal utilisé ; plugins de confort (Key Promoter X) pendant la transition depuis VSCode.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Sur-installer des plugins ralentit un IDE déjà plus lourd que VSCode par défaut — chaque plugin ajoute un coût de performance.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Marketplace | Catalogue de plugins intégré à IntelliJ |

---

## Points clés

- IntelliJ inclut déjà beaucoup nativement, contrairement à VSCode
- Le plugin Python est souvent indispensable même sur Ultimate
- Key Promoter X aide à apprendre les raccourcis en venant de VSCode
- Ne pas sur-installer, chaque plugin a un coût de performance

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Installer trop de plugins "au cas où", ralentissant l'IDE
> - Chercher un plugin pour une fonctionnalité déjà native

---

## Paramètres / Configuration

| Plugin | Utilité |
|-----------|-------------|
| Python | Support complet du langage |
| Key Promoter X | Apprentissage des raccourcis |
| Rainbow Brackets | Lisibilité des parenthèses imbriquées |

---

## Exemple minimal
> Sujet lié à la configuration de l'outil — bloc non applicable.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[IntelliJ IDEA]]
- Sous-sujets → (aucun)
- À comparer avec → [[OUT-04-VSCode-Productivite|VSCode - Extensions]]

**Pratique :**
- Extrait de code → (aucun, sujet non-code)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi IntelliJ a besoin de moins de plugins que VSCode a besoin d'extensions ?

---

## Tâches

- [ ] #task Installer le plugin Python et vérifier le support complet
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Différence de plugins nécessaires entre Community et Ultimate pour Angular/Python ?
